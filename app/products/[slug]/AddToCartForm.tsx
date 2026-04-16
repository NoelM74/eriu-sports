"use client";

import { useState } from 'react';
import { ShoppingCart, Heart, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useCurrency } from '@/lib/currency-context';
import { Product } from '@/lib/products';

interface AddToCartFormProps {
    product: Product;
    sizes: string[];
}

export default function AddToCartForm({ product, sizes }: AddToCartFormProps) {
    const { addItem } = useCart();
    const { convertPrice, formatPrice } = useCurrency();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [showToast, setShowToast] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);

    const convertedPrice = convertPrice(product.price);
    const totalPrice = convertedPrice * quantity;

    const handleAddToCart = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSize) {
            for (let i = 0; i < quantity; i++) {
                addItem(product, selectedSize);
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleAddToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('eriu_wishlist') || '[]');
        if (!wishlist.includes(product.slug)) {
            wishlist.push(product.slug);
            localStorage.setItem('eriu_wishlist', JSON.stringify(wishlist));
            setAddedToWishlist(true);
            setTimeout(() => setAddedToWishlist(false), 2000);
        }
    };

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-24 right-4 z-50 bg-[var(--color-emerald)] text-white px-6 py-4 shadow-lg rounded-md animate-fade-in">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Added to bag!</span>
                        <a href="/cart" className="underline ml-2 text-xs">View cart →</a>
                    </div>
                </div>
            )}

            {/* Size Chart Modal */}
            {showSizeChart && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowSizeChart(false)}>
                    <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            onClick={() => setShowSizeChart(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
                            aria-label="Close size chart"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-gray-900 mb-4">Size Guide</h2>
                        <p className="text-xs text-gray-500 mb-4">Measurements in centimetres (cm). Measure over a light shirt for best fit.</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-center border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                                        <th className="py-2 px-3 border border-gray-200 text-left">Size</th>
                                        <th className="py-2 px-3 border border-gray-200">Chest</th>
                                        <th className="py-2 px-3 border border-gray-200">Length</th>
                                        <th className="py-2 px-3 border border-gray-200">Shoulder</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {[
                                        { size: 'S',  chest: '86–91',  length: '68', shoulder: '42' },
                                        { size: 'M',  chest: '93–98',  length: '71', shoulder: '44' },
                                        { size: 'L',  chest: '100–106', length: '74', shoulder: '46' },
                                        { size: 'XL', chest: '108–114', length: '77', shoulder: '48' },
                                    ].map((row) => (
                                        <tr key={row.size} className="even:bg-gray-50">
                                            <td className="py-2 px-3 border border-gray-200 font-bold text-left">{row.size}</td>
                                            <td className="py-2 px-3 border border-gray-200">{row.chest}</td>
                                            <td className="py-2 px-3 border border-gray-200">{row.length}</td>
                                            <td className="py-2 px-3 border border-gray-200">{row.shoulder}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">If you&apos;re between sizes, we recommend sizing up for a more relaxed fit.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleAddToCart} className="mt-10">
                <div className="mt-6 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
                        Size
                    </h3>
                    <button type="button" onClick={() => setShowSizeChart(true)} className="text-sm text-[var(--color-teal)] underline hover:text-[var(--color-emerald)] transition-colors">
                        Size Guide
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`group relative flex items-center justify-center rounded-sm border px-4 py-4 text-sm font-medium uppercase transition-all ${selectedSize === size
                                ? 'bg-[var(--color-teal)] border-transparent text-white shadow-xl transform scale-105'
                                : 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                {!selectedSize && (
                    <p className="text-sm text-red-500 font-medium mt-3 italic">
                        * Please select a size
                    </p>
                )}

                {/* Quantity Selector */}
                <div className="mt-6">
                    <label htmlFor="quantity" className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
                        Quantity
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-16 h-10 text-center border border-gray-300 rounded-sm focus:ring-[var(--color-emerald)] focus:border-[var(--color-emerald)]"
                            min="1"
                            max="10"
                        />
                        <button
                            type="button"
                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add to Cart CTA */}
                <div className="mt-8 flex border-t border-gray-200 pt-8 gap-x-4">
                    <button
                        type="submit"
                        disabled={!selectedSize}
                        className={`flex max-w-xs flex-1 items-center justify-center gap-2 rounded-sm border border-transparent px-8 py-4 text-base font-extrabold uppercase text-white shadow-lg transition-all ${!selectedSize
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-[var(--color-emerald)] hover:bg-[var(--color-navy)] hover:scale-[1.02] hover:shadow-2xl'
                            } sm:w-full`}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {selectedSize ? `Add to Bag - ${formatPrice(totalPrice)}` : 'Select Size'}
                    </button>
                    <button
                        type="button"
                        onClick={handleAddToWishlist}
                        className={`ml-4 flex items-center justify-center rounded-sm px-4 py-3 transition-colors ${addedToWishlist
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                        aria-label="Add to wishlist"
                    >
                        <Heart className={`h-8 w-8 flex-shrink-0 ${addedToWishlist ? 'fill-current' : ''}`} />
                        <span className="sr-only">Add to favorites</span>
                    </button>
                </div>
            </form>
        </>
    );
}
