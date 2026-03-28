"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, cartTotal, removeItem, updateQty, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-[#0F2131] mb-4 uppercase tracking-wider">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven&apos;t added any vintage classics to your cart yet.</p>
        <Link 
          href="/catalog" 
          className="bg-[#0A7A44] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#086035] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:px-8 bg-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-[#0F2131] mb-10 uppercase tracking-tight">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <section className="lg:col-span-7">
          <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((item, itemIdx) => (
              <li key={`${item.product.id}-${item.size}`} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 bg-gray-100">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link href={`/catalog/${item.product.slug}`} className="font-bold text-[#0F2131] hover:text-[#0A7A44]">
                            {item.product.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">Size {item.size}</p>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">€{item.product.price.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <label htmlFor={`quantity-${itemIdx}`} className="sr-only">
                        Quantity, {item.product.title}
                      </label>
                      <select
                        id={`quantity-${itemIdx}`}
                        name={`quantity-${itemIdx}`}
                        value={item.quantity}
                        onChange={(e) => updateQty(item.product.id, item.size, Number(e.target.value))}
                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-[#0A7A44] focus:border-[#0A7A44] sm:text-sm"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                      </select>

                      <div className="absolute top-0 right-0 sm:top-1/2 sm:-translate-y-1/2 xs:top-auto">
                        <button
                          type="button"
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => removeItem(item.product.id, item.size)}
                        >
                          <span className="sr-only">Remove</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order summary */}
        <section className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
          <h2 id="summary-heading" className="text-lg font-bold text-[#0F2131] uppercase tracking-wide">
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">€{cartTotal.toFixed(2)}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">€{(cartTotal > 50 ? 0 : 5).toFixed(2)}</dd>
            </div>
            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
              <dt className="text-base font-bold text-[#0F2131]">Order total</dt>
              <dd className="text-base font-bold text-[#0F2131]">€{(cartTotal + (cartTotal > 50 ? 0 : 5)).toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <button
              onClick={() => {
                alert("Checkout functionality not yet implemented!");
                clearCart();
              }}
              type="button"
              className="w-full bg-[#0F2131] border border-transparent rounded-none shadow-sm py-4 px-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#0A7A44] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#0A7A44]"
            >
              Checkout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
