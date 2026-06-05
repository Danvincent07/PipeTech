'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getAvailableBatchesForProduct } from '@/lib/actions/inventory';
import type { PaymentMethod } from '@/types';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CompleteSaleData {
  items: CartItem[];
  paymentMethod: PaymentMethod;
  amountPaid: number;
  notes?: string;
}

export async function completeSale(data: CompleteSaleData) {
  const supabase = await createClient();

  // Get current user (cashier)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Authentication required');
  }

  // Validate cart is not empty
  if (!data.items.length) {
    throw new Error('Cart is empty');
  }

  // Calculate totals
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0; // No tax for now
  const taxTotal = subtotal * taxRate;
  const grandTotal = subtotal + taxTotal;

  // Validate payment amount for cash
  if (data.paymentMethod === 'cash' && data.amountPaid < grandTotal) {
    throw new Error('Insufficient payment amount');
  }

  // Start transaction
  try {
    // 1. Check inventory availability for all items (FIFO)
    const batchAllocations: Array<{
      productId: string;
      allocations: Array<{
        batchId: string;
        quantity: number;
      }>;
    }> = [];

    for (const item of data.items) {
      const result = await getAvailableBatchesForProduct(
        item.id,
        item.quantity
      );

      if (!result.success) {
        throw new Error(
          `Insufficient stock for ${item.name}. Available: ${result.available}, Required: ${item.quantity}`
        );
      }

      // Allocate FIFO
      const allocations: Array<{ batchId: string; quantity: number }> = [];
      let remainingQuantity = item.quantity;

      for (const batch of result.batches) {
        if (remainingQuantity === 0) break;

        const quantityFromBatch = Math.min(
          batch.quantity_current,
          remainingQuantity
        );
        allocations.push({
          batchId: batch.id,
          quantity: quantityFromBatch,
        });
        remainingQuantity -= quantityFromBatch;
      }

      batchAllocations.push({
        productId: item.id,
        allocations,
      });
    }

    // 2. Generate sale number
    const { data: saleNumber, error: saleNumberError } = await supabase.rpc(
      'generate_sale_number'
    );

    if (saleNumberError || !saleNumber) {
      throw new Error('Failed to generate sale number');
    }

    // 3. Create sale record
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        sale_number: saleNumber,
        cashier_id: user.id,
        subtotal,
        tax_total: taxTotal,
        grand_total: grandTotal,
        payment_method: data.paymentMethod,
        payment_status: 'paid',
        amount_paid: data.amountPaid,
        notes: data.notes,
      })
      .select()
      .single();

    if (saleError || !sale) {
      throw new Error('Failed to create sale record');
    }

    // 4. Create sale items with batch allocations
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const { allocations } = batchAllocations[i];

      for (const allocation of allocations) {
        const { error: itemError } = await supabase.from('sale_items').insert({
          sale_id: sale.id,
          product_id: item.id,
          batch_id: allocation.batchId,
          quantity: allocation.quantity,
          unit_price: item.price,
          line_total: item.price * allocation.quantity,
        });

        if (itemError) {
          throw new Error('Failed to create sale item');
        }

        // 5. Update batch inventory (FIFO deduction)
        const { error: batchError } = await supabase.rpc('execute_sql', {
          sql: `
            UPDATE inventory_batches
            SET quantity_current = quantity_current - ${allocation.quantity}
            WHERE id = '${allocation.batchId}'
          `,
        });

        // Fallback if RPC doesn't exist - direct update
        if (batchError) {
          const { error: updateError } = await supabase
            .from('inventory_batches')
            .update({
              quantity_current: supabase.raw(
                `quantity_current - ${allocation.quantity}`
              ),
            })
            .eq('id', allocation.batchId);

          if (updateError) {
            throw new Error('Failed to update batch inventory');
          }
        }
      }
    }

    // Revalidate relevant pages
    revalidatePath('/pos');
    revalidatePath('/sales');
    revalidatePath('/inventory');

    // Redirect to sale details
    redirect(`/sales/${sale.id}`);
  } catch (error) {
    console.error('Sale completion error:', error);
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error; // Re-throw redirect
    }
    throw error;
  }
}
