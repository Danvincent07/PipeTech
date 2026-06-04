import { Database } from './database.types'

// Table row types
export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type InventoryBatch = Database['public']['Tables']['inventory_batches']['Row']
export type InventoryBatchInsert = Database['public']['Tables']['inventory_batches']['Insert']
export type InventoryBatchUpdate = Database['public']['Tables']['inventory_batches']['Update']

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Sale = Database['public']['Tables']['sales']['Row']
export type SaleInsert = Database['public']['Tables']['sales']['Insert']
export type SaleUpdate = Database['public']['Tables']['sales']['Update']

export type SaleItem = Database['public']['Tables']['sale_items']['Row']
export type SaleItemInsert = Database['public']['Tables']['sale_items']['Insert']

// Enum types
export type PaymentMethod = Database['public']['Enums']['payment_method']
export type PaymentStatus = Database['public']['Enums']['payment_status']
export type UserRole = Database['public']['Enums']['user_role']

// Cart item (client-side)
export interface CartItem {
  product: Product
  quantity: number
  unitPrice: number
  lineTotal: number
}

// Sale with items (joined data)
export interface SaleWithItems extends Sale {
  items: (SaleItem & {
    product: Product
  })[]
  cashier: Pick<User, 'full_name'>
}

// Product with stock (joined data)
export interface ProductWithStock extends Product {
  totalStock: number
}

// Re-export Database type for convenience
export type { Database } from './database.types'
