/**
 * Formats a number as USD currency
 * @param amount The amount to format
 * @returns Formatted currency string (e.g., "$12.34")
 */
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a number as USD without the currency symbol
 * @param amount The amount to format
 * @returns Formatted price string (e.g., "12.34")
 */
export const formatPriceWithoutSymbol = (amount: number): string => {
  return amount.toFixed(2);
};
