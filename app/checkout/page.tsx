"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If cart is empty and haven't just succeeded, kick them back to shop
  if (items.length === 0 && !isSuccess) {
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

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Fake processing time
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-[#0A7A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-[#0F2131] mb-4 uppercase tracking-tight text-center">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 max-w-md text-center text-lg">
          Thank you for choosing Ériu Sports. Your vintage jersey is getting prepped for shipment right now. A confirmation email is on its way.
        </p>
        <Link 
          href="/catalog" 
          className="bg-[#0F2131] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#0A7A44] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const shippingCost = cartTotal > 50 ? 0 : 5;
  const orderTotal = cartTotal + shippingCost;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Checkout Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-[#0F2131] uppercase tracking-tight">Checkout</h1>
          <p className="text-sm font-medium text-gray-500 mt-2 md:mt-0 items-center flex gap-1">
            <svg className="w-4 h-4 text-[#0A7A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Secure 256-bit SSL Encrypted Payment
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Form Side */}
          <section className="lg:col-span-7 mb-10 lg:mb-0">
            <form onSubmit={handleCheckout} className="space-y-8">
              
              {/* Contact Info */}
              <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
                <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                    <input type="email" id="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" placeholder="you@example.com" />
                  </div>
                  <div className="flex items-center">
                    <input id="newsletter" name="newsletter" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[#0A7A44] focus:ring-[#0A7A44]" />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-600">Email me with news and offers regarding vintage drops</label>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
                <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                    <input type="text" id="first-name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                    <input type="text" id="last-name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" id="address" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                  </div>
                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">Postal code</label>
                    <input type="text" id="postal-code" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
                <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">Payment Method</h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 mb-4">
                     <span className="flex items-center justify-center border px-2 py-1 rounded w-12 h-8 bg-gray-50 text-xs font-bold text-blue-900 border-blue-900">VISA</span>
                     <span className="flex items-center justify-center border px-2 py-1 rounded w-12 h-8 bg-gray-50 text-xs font-bold text-red-600 border-red-600">MC</span>
                     <span className="flex items-center justify-center border px-2 py-1 rounded w-12 h-8 bg-gray-50 text-xs font-bold text-blue-500 border-blue-500">AMEX</span>
                  </div>
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Card number</label>
                    <input type="text" id="card-number" required placeholder="0000 0000 0000 0000" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">Expiration date</label>
                      <input type="text" id="expiration" required placeholder="MM/YY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                    </div>
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                      <input type="text" id="cvc" required placeholder="123" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A7A44] focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#0F2131] border border-transparent rounded-none shadow-lg shadow-[#0F2131]/20 py-5 px-4 text-base font-extrabold uppercase tracking-[0.2em] text-white hover:bg-[#0A7A44] hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A7A44] disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isProcessing ? "Processing..." : `Pay €${orderTotal.toFixed(2)}`}
                </button>
              </div>
            </form>
          </section>

          {/* Order Summary Side */}
          <section className="lg:col-span-5 relative">
            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">Order Summary</h2>
              
              <ul className="divide-y divide-gray-200 border-b border-gray-200 mb-6">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}`} className="py-4 flex">
                    <div className="relative h-16 w-16 bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                       {item.product.images[0] && (
                           <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                       )}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col pt-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-bold text-[#0F2131] truncate max-w-[200px]">{item.product.title}</span>
                        <span className="text-sm font-medium text-gray-900">€{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.size} • Qty: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-gray-900">€{cartTotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-medium text-gray-900">
                    {shippingCost === 0 ? <span className="text-[#0A7A44] font-bold uppercase tracking-wider text-xs">Free</span> : `€${shippingCost.toFixed(2)}`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-[#0F2131]">
                  <dt className="text-base font-extrabold uppercase">Total</dt>
                  <dd className="text-xl font-extrabold">€{orderTotal.toFixed(2)}</dd>
                </div>
              </dl>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-3 rounded">
                 <svg className="w-4 h-4 text-[#1C7C83]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                 100% Secure Checkout Guarantee
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
