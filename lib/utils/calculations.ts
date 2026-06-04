/**
 * Calculation utilities for the POS system
 */

export interface LineItem {
  quantity: number;
  unitPrice: number;
}

/**
 * Calculate the subtotal from an array of line items
 */
export function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((total, item) => {
    return total + item.quantity * item.unitPrice;
  }, 0);
}

/**
 * Calculate the total amount after tax and discount
 * Formula: (subtotal - discount) * (1 + taxRate/100)
 * Tax rate is a percentage applied to the discounted amount
 */
export function calculateTotalAmount(
  subtotal: number,
  taxRate: number,
  discountAmount: number
): number {
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = calculateTax(afterDiscount, taxRate);
  return afterDiscount + taxAmount;
}

/**
 * Calculate change to give back to customer
 */
export function calculateChange(totalAmount: number, amountPaid: number): number {
  const change = amountPaid - totalAmount;
  return change > 0 ? change : 0;
}

/**
 * Calculate tax amount from subtotal and tax rate percentage
 */
export function calculateTax(amount: number, taxRate: number): number {
  return (amount * taxRate) / 100;
}

/**
 * Apply discount to an amount
 * @param amount - The original amount
 * @param discount - The discount value (percentage or fixed amount)
 * @param type - 'percentage' or 'fixed'
 */
export function applyDiscount(
  amount: number,
  discount: number,
  type: 'percentage' | 'fixed'
): number {
  if (type === 'percentage') {
    if (discount >= 100) {
      return 0;
    }
    return amount - (amount * discount) / 100;
  } else {
    // Fixed amount
    const result = amount - discount;
    return result < 0 ? 0 : result;
  }
}
