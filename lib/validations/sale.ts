import { z } from 'zod'

export const checkoutSchema = z.object({
  payment_method: z.enum(['cash', 'card'], {
    required_error: 'Payment method is required',
  }),
  amount_tendered: z.coerce.number().positive('Amount must be greater than 0').optional(),
  notes: z.string().max(500, 'Notes must be 500 characters or less').optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

// Validation for cart item quantity
export const cartItemQuantitySchema = z.object({
  quantity: z.coerce.number().int().positive('Quantity must be at least 1'),
})

export type CartItemQuantityData = z.infer<typeof cartItemQuantitySchema>
