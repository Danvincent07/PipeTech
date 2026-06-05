'use server';

import { createClient } from '@/lib/supabase/server';
import type { SaleWithItems } from '@/types';

/**
 * Get all sales with pagination
 */
export async function getSales(options?: {
  limit?: number;
  offset?: number;
}): Promise<SaleWithItems[]> {
  const supabase = await createClient();
  const { limit = 50, offset = 0 } = options || {};

  const { data, error } = await supabase
    .from('sales')
    .select(
      `
      *,
      cashier:users!sales_cashier_id_fkey (
        full_name
      ),
      items:sale_items (
        *,
        product:products (
          *
        )
      )
    `
    )
    .order('sale_date', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching sales:', error);
    return [];
  }

  return data as any;
}

/**
 * Get a single sale by ID with full details
 */
export async function getSaleById(id: string): Promise<SaleWithItems | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('sales')
    .select(
      `
      *,
      cashier:users!sales_cashier_id_fkey (
        full_name
      ),
      items:sale_items (
        *,
        product:products (
          *
        )
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching sale:', error);
    return null;
  }

  return data as any;
}

/**
 * Get sales statistics
 */
export async function getSalesStats() {
  const supabase = await createClient();

  // Get today's sales
  const today = new Date().toISOString().split('T')[0];

  const { data: todaySales, error: todayError } = await supabase
    .from('sales')
    .select('grand_total')
    .gte('sale_date', today);

  const todayTotal = todaySales?.reduce(
    (sum, sale) => sum + sale.grand_total,
    0
  ) || 0;

  const todayCount = todaySales?.length || 0;

  // Get this month's sales
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  const firstDayStr = firstDayOfMonth.toISOString().split('T')[0];

  const { data: monthSales, error: monthError } = await supabase
    .from('sales')
    .select('grand_total')
    .gte('sale_date', firstDayStr);

  const monthTotal = monthSales?.reduce(
    (sum, sale) => sum + sale.grand_total,
    0
  ) || 0;

  const monthCount = monthSales?.length || 0;

  return {
    today: {
      total: todayTotal,
      count: todayCount,
    },
    month: {
      total: monthTotal,
      count: monthCount,
    },
  };
}
