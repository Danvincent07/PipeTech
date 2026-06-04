import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required').regex(/^[A-Z0-9-]+$/, 'SKU must contain only uppercase letters, numbers, and hyphens'),
  size_inches: z.coerce.number().int().positive('Size must be a positive number'),
  unit_price_retail: z.coerce.number().positive('Retail price must be greater than 0'),
  unit_price_wholesale: z.coerce.number().positive('Wholesale price must be greater than 0'),
  reorder_threshold: z.coerce.number().int().nonnegative('Reorder threshold must be 0 or greater').optional(),
  reorder_quantity: z.coerce.number().int().positive('Reorder quantity must be greater than 0').optional(),
})

export type ProductFormData = z.infer<typeof productSchema>

export const inventoryBatchSchema = z.object({
  product_id: z.string().uuid('Invalid product ID'),
  batch_number: z.string().min(1, 'Batch number is required'),
  quantity_received: z.coerce.number().int().positive('Quantity must be greater than 0'),
  cost_per_unit: z.coerce.number().positive('Cost per unit must be greater than 0'),
  received_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  notes: z.string().optional(),
})

export type InventoryBatchFormData = z.infer<typeof inventoryBatchSchema>
