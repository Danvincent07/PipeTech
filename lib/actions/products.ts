'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { productSchema, inventoryBatchSchema } from '@/lib/validations/product'
import type { ProductWithStock } from '@/types'

export async function getProducts(): Promise<ProductWithStock[]> {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      inventory_batches (
        quantity_current
      )
    `)
    .order('name')

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  // Calculate total stock for each product
  const productsWithStock = products.map((product) => {
    const totalStock = product.inventory_batches?.reduce(
      (sum: number, batch: any) => sum + (batch.quantity_current || 0),
      0
    ) || 0

    return {
      ...product,
      inventory_batches: undefined, // Remove the nested array
      totalStock,
    } as ProductWithStock
  })

  return productsWithStock
}

export async function getProductById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch product: ${error.message}`)
  }

  return data
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    name: formData.get('name'),
    sku: formData.get('sku'),
    size_inches: formData.get('size_inches'),
    unit_price_retail: formData.get('unit_price_retail'),
    unit_price_wholesale: formData.get('unit_price_wholesale'),
    reorder_threshold: formData.get('reorder_threshold'),
    reorder_quantity: formData.get('reorder_quantity'),
  }

  const validated = productSchema.parse(rawData)

  const { error } = await supabase.from('products').insert(validated)

  if (error) {
    throw new Error(`Failed to create product: ${error.message}`)
  }

  revalidatePath('/products')
  return { success: true }
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    name: formData.get('name'),
    sku: formData.get('sku'),
    size_inches: formData.get('size_inches'),
    unit_price_retail: formData.get('unit_price_retail'),
    unit_price_wholesale: formData.get('unit_price_wholesale'),
    reorder_threshold: formData.get('reorder_threshold'),
    reorder_quantity: formData.get('reorder_quantity'),
  }

  const validated = productSchema.parse(rawData)

  const { error } = await supabase
    .from('products')
    .update(validated)
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`)
  }

  revalidatePath('/products')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`)
  }

  revalidatePath('/products')
  return { success: true }
}
