"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyCode, LocaleCode, getGeoConfig, GeoConfig, convertPrice, formatPrice } from './geo';

interface CurrencyContextValue {
    config: GeoConfig;
    currency: CurrencyCode;
    locale: LocaleCode;
    symbol: string;
    convertPrice: (eurAmount: number) => number;
    formatPrice: (amount: number) => string;
    setCurrency: (currency: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children, initialCountry }: { children: ReactNode; initialCountry?: string }) {
    const initialConfig = getGeoConfig(initialCountry);
    const [config, setConfig] = useState<GeoConfig>(initialConfig);

    // Load saved currency preference from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem('eriu_currency');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.currency) {
                    const newConfig = getGeoConfig(undefined);
                    newConfig.currency = parsed.currency;
                    // Update symbol based on currency
                    const symbols: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' };
                    newConfig.symbol = symbols[parsed.currency] || '€';
                    setConfig(newConfig);
                }
            }
        } catch {
            // Ignore errors
        }
    }, []);

    const setCurrency = (currency: CurrencyCode) => {
        const symbols: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' };
        const newConfig = { ...config, currency, symbol: symbols[currency] || '€' };
        setConfig(newConfig);
        try {
            localStorage.setItem('eriu_currency', JSON.stringify({ currency }));
        } catch {
            // Ignore errors
        }
    };

    const convertPriceFn = (eurAmount: number): number => {
        return convertPrice(eurAmount, config.currency);
    };

    const formatPriceFn = (amount: number): string => {
        return formatPrice(amount, config.currency);
    };

    return (
        <CurrencyContext.Provider
            value={{
                config,
                currency: config.currency,
                locale: config.locale,
                symbol: config.symbol,
                convertPrice: convertPriceFn,
                formatPrice: formatPriceFn,
                setCurrency,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const ctx = useContext(CurrencyContext);
    if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
    return ctx;
}
