/**
 * Geo/Currency utility for internationalization.
 * Maps country codes to currencies and shipping rates.
 */

export type CurrencyCode = 'EUR' | 'GBP' | 'USD';
export type LocaleCode = 'en-IE' | 'en-GB' | 'en-US';

export interface GeoConfig {
    currency: CurrencyCode;
    locale: LocaleCode;
    shippingRate: number;
    freeShippingThreshold: number;
    symbol: string;
}

// Country to locale/currency mapping
const countryToLocale: Record<string, GeoConfig> = {
    // Ireland / EU
    IE: { currency: 'EUR', locale: 'en-IE', shippingRate: 4.95, freeShippingThreshold: 49, symbol: '€' },
    // United Kingdom
    GB: { currency: 'GBP', locale: 'en-GB', shippingRate: 5.95, freeShippingThreshold: 39, symbol: '£' },
    // United States
    US: { currency: 'USD', locale: 'en-US', shippingRate: 12.95, freeShippingThreshold: 79, symbol: '$' },
    // Default EU
    EU: { currency: 'EUR', locale: 'en-IE', shippingRate: 7.95, freeShippingThreshold: 59, symbol: '€' },
};

// EU country codes
const euCountries = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
    'HU', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];

/**
 * Get geo configuration based on country code.
 * Uses Cloudflare header (cf-ipcountry) or defaults to EU.
 */
export function getGeoConfig(countryCode?: string): GeoConfig {
    if (!countryCode) return countryToLocale.IE;

    if (countryToLocale[countryCode]) {
        return countryToLocale[countryCode];
    }

    if (euCountries.includes(countryCode)) {
        return countryToLocale.EU;
    }

    // Default to EU for unknown countries
    return countryToLocale.EU;
}

/**
 * Extract country code from request headers.
 * Works with Cloudflare Workers (cf-ipcountry header).
 */
export function getCountryFromHeaders(headers: Headers): string | undefined {
    return headers.get('cf-ipcountry') || undefined;
}

/**
 * Convert price from EUR to target currency.
 * Uses simple fixed rates for demo purposes.
 * In production, use a real exchange rate API.
 */
const exchangeRates: Record<CurrencyCode, number> = {
    EUR: 1,
    GBP: 0.85,
    USD: 1.08,
};

export function convertPrice(eurPrice: number, currency: CurrencyCode): number {
    const rate = exchangeRates[currency] || 1;
    return Math.round(eurPrice * rate * 100) / 100;
}

/**
 * Format price with currency symbol.
 */
export function formatPrice(amount: number, currency: CurrencyCode): string {
    const symbols: Record<CurrencyCode, string> = {
        EUR: '€',
        GBP: '£',
        USD: '$',
    };
    return `${symbols[currency]}${amount.toFixed(2)}`;
}
