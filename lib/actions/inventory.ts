'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { inventoryBatchSchema } from '@/lib/validations/product'
import type { InventoryBatch } from '@/types'

export async function getInventoryBatches(): Promise<InventoryBatch[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inventory_batches')
    .select(`
      *,
      product:products (
        name,
        sku
      )
    `)
    .order('received_date', { ascending: false })

  if (error) {
    console.error('Error fetching inventory batches:', error)
    return []
  }

  return data as any
}

export async function createInventoryBatch(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    product_id: formData.get('product_id'),
    batch_number: formData.get('batch_number'),
    quantity_received: formData.get('quantity_received'),
    cost_per_unit: formData.get('cost_per_unit'),
    received_date: formData.get('received_date'),
    notes: formData.get('notes'),
  }

  const validated = inventoryBatchSchema.parse(rawData)

  const { error } = await supabase.from('inventory_batches').insert({
    ...validated,
    quantity_current: validated.quantity_received, // Initially all stock is current
  })

  if (error) {
    throw new Error(`Failed to create inventory batch: ${error.message}`)
  }

  revalidatePath('/inventory')
  revalidatePath('/pos')
  return { success: true }
}

/**
 * Get available batches for a product (FIFO order)
 * Used internally by sales actions
 */
export async function getAvailableBatchesForProduct(
  productId: string,
  requiredQuantity: number
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('inventory_batches')
    .select('*')
    .eq('product_id', productId)
    .gt('quantity_current', 0)
    .order('received_date', { ascending: true }) // FIFO

  if (error) {
    throw new Error(`Failed to fetch batches: ${error.message}`)
  }

  // Check if total available stock meets requirement
  const totalAvailable = data.reduce((sum, batch) => sum + batch.quantity_current, 0)

  if (totalAvailable < requiredQuantity) {
    return {
      success: false,
      available: totalAvailable,
      batches: [],
    }
  }

  return {
    success: true,
    available: totalAvailable,
    batches: data,
  }
}
