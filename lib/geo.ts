/**
 * Geo/Currency utility for internationalization.
 * Maps country codes to the display currency. Delivery is a flat fee worldwide (see lib/shipping.ts).
 */

export type CurrencyCode = 'EUR' | 'GBP' | 'USD';
export type LocaleCode = 'en-IE' | 'en-GB' | 'en-US';

export interface GeoConfig {
    currency: CurrencyCode;
    locale: LocaleCode;
    symbol: string;
}

// Country to locale/currency mapping
const countryToLocale: Record<string, GeoConfig> = {
    // Ireland / EU
    IE: { currency: 'EUR', locale: 'en-IE', symbol: '€' },
    // United Kingdom
    GB: { currency: 'GBP', locale: 'en-GB', symbol: '£' },
    // United States
    US: { currency: 'USD', locale: 'en-US', symbol: '$' },
    // Default EU
    EU: { currency: 'EUR', locale: 'en-IE', symbol: '€' },
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
 * Fixed display rates only: the shop always charges in euro, and other currencies are a guide.
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
