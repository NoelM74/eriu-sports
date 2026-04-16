"use client";

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/lib/currency-context';
import { CurrencyCode } from '@/lib/geo';

const currencies: { code: CurrencyCode; label: string; flag: string }[] = [
    { code: 'EUR', label: 'EUR (€)', flag: '🇪🇺' },
    { code: 'GBP', label: 'GBP (£)', flag: '🇬🇧' },
    { code: 'USD', label: 'USD ($)', flag: '🇺🇸' },
];

export default function CurrencySelector() {
    const { currency, setCurrency, symbol } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const currentCurrency = currencies.find(c => c.code === currency);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-[#0F2131] hover:text-[#1C7C83] transition-colors"
                aria-label="Select currency"
                aria-expanded={isOpen}
            >
                <span>{currentCurrency?.flag}</span>
                <span className="hidden sm:inline">{symbol}</span>
                <svg className="w-3 h-3 text-[#0F2131]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#0F2131]/10 shadow-xl rounded-sm z-50">
                    <div className="flex flex-col">
                        {currencies.map((curr) => (
                            <button
                                key={curr.code}
                                onClick={() => {
                                    setCurrency(curr.code);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#F8F9FA] transition-colors ${currency === curr.code ? 'bg-[#F8F9FA] font-medium' : ''
                                    }`}
                            >
                                <span>{curr.flag}</span>
                                <span>{curr.label}</span>
                                {currency === curr.code && (
                                    <svg className="w-4 h-4 text-[#1A533E] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
