"use client";

import { useCurrency } from '@/lib/currency-context';

interface PriceDisplayProps {
    eurPrice: number;
}

export default function PriceDisplay({ eurPrice }: PriceDisplayProps) {
    const { convertPrice, formatPrice } = useCurrency();
    const convertedPrice = convertPrice(eurPrice);

    return (
        <p className="text-3xl font-bold tracking-tight text-gray-900">
            {formatPrice(convertedPrice)}
        </p>
    );
}
