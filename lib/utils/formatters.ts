/**
 * Formatting utilities for the POS system
 */

/**
 * Format a number as Philippine Peso currency
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₱1,234.56")
 */
export function formatCurrency(amount: number): string {
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  const formatted = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absoluteAmount);

  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Format a date as MM/DD/YYYY
 * @param date - Date object or date string
 * @returns Formatted date string (e.g., "03/15/2024")
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Format time as 12-hour format with AM/PM
 * @param date - Date object or date string
 * @returns Formatted time string (e.g., "2:30 PM")
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  return `${hours}:${minutes} ${ampm}`;
}

/**
 * Format date and time together
 * @param date - Date object or date string
 * @returns Formatted date and time string (e.g., "03/15/2024 2:30 PM")
 */
export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}
