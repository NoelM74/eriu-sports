import { getGeoConfig, CurrencyCode } from './geo';
import { FREE_DELIVERY_OVER, SHIPPING_FEE } from './collections';

/**
 * Delivery cost in euro. One flat fee worldwide, free at or over the threshold.
 * The country only picks the display currency.
 */
export function calculateShipping(
  subtotal: number,
  countryCode?: string
): { cost: number; currency: CurrencyCode; symbol: string; freeThreshold: number } {
  const config = getGeoConfig(countryCode);

  return {
    cost: subtotal >= FREE_DELIVERY_OVER ? 0 : SHIPPING_FEE,
    currency: config.currency,
    symbol: config.symbol,
    freeThreshold: FREE_DELIVERY_OVER,
  };
}

/**
 * Legacy function for backward compatibility.
 * Returns just the cost for existing code that doesn't need full config.
 */
export function calculateShippingCost(subtotal: number, countryCode?: string): number {
  return calculateShipping(subtotal, countryCode).cost;
}
