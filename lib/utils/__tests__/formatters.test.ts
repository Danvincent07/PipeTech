import { describe, it, expect } from '@jest/globals';
import { formatCurrency, formatDate, formatTime, formatDateTime } from '../formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format whole numbers', () => {
      expect(formatCurrency(100)).toBe('₱100.00');
    });

    it('should format decimal numbers', () => {
      expect(formatCurrency(123.45)).toBe('₱123.45');
    });

    it('should format large numbers with comma separators', () => {
      expect(formatCurrency(1234567.89)).toBe('₱1,234,567.89');
    });

    it('should format zero', () => {
      expect(formatCurrency(0)).toBe('₱0.00');
    });

    it('should format negative numbers', () => {
      expect(formatCurrency(-50.5)).toBe('-₱50.50');
    });

    it('should round to 2 decimal places', () => {
      expect(formatCurrency(123.456)).toBe('₱123.46');
    });
  });

  describe('formatDate', () => {
    it('should format date as MM/DD/YYYY', () => {
      const date = new Date('2024-03-15T10:30:00');
      expect(formatDate(date)).toBe('03/15/2024');
    });

    it('should handle single digit months and days', () => {
      const date = new Date('2024-01-05T10:30:00');
      expect(formatDate(date)).toBe('01/05/2024');
    });

    it('should handle date strings', () => {
      expect(formatDate('2024-12-25')).toBe('12/25/2024');
    });
  });

  describe('formatTime', () => {
    it('should format time as 12-hour with AM/PM', () => {
      const date = new Date('2024-03-15T14:30:00');
      expect(formatTime(date)).toBe('2:30 PM');
    });

    it('should format morning time', () => {
      const date = new Date('2024-03-15T09:15:00');
      expect(formatTime(date)).toBe('9:15 AM');
    });

    it('should format noon', () => {
      const date = new Date('2024-03-15T12:00:00');
      expect(formatTime(date)).toBe('12:00 PM');
    });

    it('should format midnight', () => {
      const date = new Date('2024-03-15T00:00:00');
      expect(formatTime(date)).toBe('12:00 AM');
    });

    it('should handle date strings', () => {
      expect(formatTime('2024-03-15T16:45:00')).toBe('4:45 PM');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time together', () => {
      const date = new Date('2024-03-15T14:30:00');
      expect(formatDateTime(date)).toBe('03/15/2024 2:30 PM');
    });

    it('should handle date strings', () => {
      expect(formatDateTime('2024-12-25T09:00:00')).toBe('12/25/2024 9:00 AM');
    });
  });
});
