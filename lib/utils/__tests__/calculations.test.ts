import { describe, it, expect } from '@jest/globals';
import {
  calculateSubtotal,
  calculateTotalAmount,
  calculateChange,
  calculateTax,
  applyDiscount,
} from '../calculations';

describe('Calculations', () => {
  describe('calculateSubtotal', () => {
    it('should calculate subtotal for single item', () => {
      const items = [{ quantity: 2, unitPrice: 10 }];
      expect(calculateSubtotal(items)).toBe(20);
    });

    it('should calculate subtotal for multiple items', () => {
      const items = [
        { quantity: 2, unitPrice: 10 },
        { quantity: 3, unitPrice: 15 },
      ];
      expect(calculateSubtotal(items)).toBe(65);
    });

    it('should return 0 for empty array', () => {
      expect(calculateSubtotal([])).toBe(0);
    });

    it('should handle decimal quantities and prices', () => {
      const items = [{ quantity: 2.5, unitPrice: 10.5 }];
      expect(calculateSubtotal(items)).toBeCloseTo(26.25, 2);
    });
  });

  describe('calculateTotalAmount', () => {
    it('should calculate total with no tax or discount', () => {
      expect(calculateTotalAmount(100, 0, 0)).toBe(100);
    });

    it('should calculate total with tax', () => {
      expect(calculateTotalAmount(100, 12, 0)).toBe(112);
    });

    it('should calculate total with discount', () => {
      expect(calculateTotalAmount(100, 0, 10)).toBe(90);
    });

    it('should calculate total with both tax and discount', () => {
      expect(calculateTotalAmount(100, 12, 10)).toBe(100.8);
    });

    it('should handle decimal values correctly', () => {
      expect(calculateTotalAmount(99.99, 5.5, 7.5)).toBeCloseTo(97.58, 2);
    });
  });

  describe('calculateChange', () => {
    it('should calculate change when payment is greater than total', () => {
      expect(calculateChange(100, 150)).toBe(50);
    });

    it('should return 0 when payment equals total', () => {
      expect(calculateChange(100, 100)).toBe(0);
    });

    it('should return 0 when payment is less than total', () => {
      expect(calculateChange(100, 80)).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(calculateChange(99.99, 100)).toBeCloseTo(0.01, 2);
    });
  });

  describe('calculateTax', () => {
    it('should calculate tax amount', () => {
      expect(calculateTax(100, 12)).toBe(12);
    });

    it('should handle 0% tax rate', () => {
      expect(calculateTax(100, 0)).toBe(0);
    });

    it('should handle decimal amounts', () => {
      expect(calculateTax(99.99, 5.5)).toBeCloseTo(5.50, 2);
    });
  });

  describe('applyDiscount', () => {
    it('should apply percentage discount', () => {
      expect(applyDiscount(100, 10, 'percentage')).toBe(90);
    });

    it('should apply fixed amount discount', () => {
      expect(applyDiscount(100, 10, 'fixed')).toBe(90);
    });

    it('should not allow discount greater than amount for fixed type', () => {
      expect(applyDiscount(100, 150, 'fixed')).toBe(0);
    });

    it('should not allow percentage discount greater than 100', () => {
      expect(applyDiscount(100, 120, 'percentage')).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(applyDiscount(99.99, 7.5, 'percentage')).toBeCloseTo(92.49, 2);
    });
  });
});
