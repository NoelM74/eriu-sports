import { getGeoConfig, CurrencyCode } from './geo';

/**
 * Calculate shipping cost based on country/region.
 * Falls back to EU rates if no country specified.
 */
export function calculateShipping(
  subtotal: number,
  countryCode?: string
): { cost: number; currency: CurrencyCode; symbol: string; freeThreshold: number } {
  const config = getGeoConfig(countryCode);

  return {
    cost: subtotal > config.freeShippingThreshold ? 0 : config.shippingRate,
    currency: config.currency,
    symbol: config.symbol,
    freeThreshold: config.freeShippingThreshold,
  };
}

/**
 * Legacy function for backward compatibility.
 * Returns just the cost for existing code that doesn't need full config.
 */
export function calculateShippingCost(subtotal: number, countryCode?: string): number {
  return calculateShipping(subtotal, countryCode).cost;
}
