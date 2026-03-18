"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

const steps = ["Cart", "Shipping", "Payment", "Confirm"] as const;

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<"shipping" | "payment" | "confirm">("shipping");
  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "" });
  const [shipping, setShipping] = useState({
    address: "", city: "", county: "", eircode: "", country: "Ireland",
  });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

  const shippingCost = cartTotal >= 50 ? 0 : 4.99;
  const total = cartTotal + shippingCost;

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold uppercase text-[#0F2131] mb-4">Your cart is empty</h1>
        <Link href="/catalog" className="text-[#1A533E] font-semibold hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    clearCart();
    setStep("confirm");
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Progress bar */}
      <div className="border-b border-gray-100 bg-[#f5f7f6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-0">
          {steps.map((s, i) => {
            const active =
              (s === "Cart") ||
              (s === "Shipping" && (step === "shipping" || step === "payment" || step === "confirm")) ||
              (s === "Payment" && (step === "payment" || step === "confirm")) ||
              (s === "Confirm" && step === "confirm");
            return (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${active ? "text-[#1A533E]" : "text-[#757575]"}`}>
                  <span className={`w-6 h-6 flex items-center justify-center text-[10px] font-black border ${active ? "bg-[#1A533E] border-[#1A533E] text-white" : "border-[#d1d5db] text-[#757575]"}`}>
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <span className="mx-3 text-[#d1d5db] text-xs">›</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {step === "confirm" ? (
        /* Confirmation */
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
          <div className="w-16 h-16 bg-[#1A533E] flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-3">Order Confirmed</p>
          <h1 className="text-4xl font-bold uppercase text-[#0F2131] mb-4">Thank You!</h1>
          <p className="text-[#404040] mb-2">Your order has been placed successfully.</p>
          <p className="text-[#757575] text-sm mb-10">A confirmation email will be sent to <strong>{contact.email || "your inbox"}</strong>.</p>
          <Link
            href="/catalog"
            className="inline-block bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#133d2d] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Forms */}
            <div className="lg:col-span-2">
              {step === "shipping" && (
                <form
                  onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
                  className="space-y-8"
                >
                  {/* Contact */}
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-4">
                      Contact Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">First Name</label>
                        <input
                          type="text"
                          required
                          value={contact.firstName}
                          onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Last Name</label>
                        <input
                          type="text"
                          required
                          value={contact.lastName}
                          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping address */}
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Street Address</label>
                        <input
                          type="text"
                          required
                          value={shipping.address}
                          onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">City / Town</label>
                        <input
                          type="text"
                          required
                          value={shipping.city}
                          onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">County</label>
                        <input
                          type="text"
                          required
                          value={shipping.county}
                          onChange={(e) => setShipping({ ...shipping, county: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Eircode</label>
                        <input
                          type="text"
                          value={shipping.eircode}
                          onChange={(e) => setShipping({ ...shipping, eircode: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Country</label>
                        <select
                          value={shipping.country}
                          onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors bg-white"
                        >
                          <option>Ireland</option>
                          <option>United Kingdom</option>
                          <option>United States</option>
                          <option>Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest py-4 hover:bg-[#133d2d] transition-colors"
                  >
                    Continue to Payment →
                  </button>
                </form>
              )}

              {step === "payment" && (
                <form onSubmit={handlePlaceOrder} className="space-y-8">
                  <button
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="text-xs text-[#757575] hover:text-[#1A533E] transition-colors font-medium"
                  >
                    ← Back to Shipping
                  </button>

                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-4">
                      Payment Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Card Number</label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: e.target.value })}
                          maxLength={19}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Name on Card</label>
                        <input
                          type="text"
                          required
                          value={card.name}
                          onChange={(e) => setCard({ ...card, name: e.target.value })}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                          maxLength={5}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#404040] uppercase tracking-wide mb-1.5">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                          maxLength={4}
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-[#0F2131] focus:outline-none focus:border-[#1C7C83] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#757575]">
                    <svg className="w-4 h-4 text-[#1A533E]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Secure 256-bit SSL encrypted checkout
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest py-4 hover:bg-[#133d2d] transition-colors"
                  >
                    Place Order · €{total.toFixed(2)}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#f5f7f6] p-6 sticky top-24">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-5">
                  Your Order
                </h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                      <div className="relative w-14 h-14 bg-gray-100 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-[#1A533E] text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0F2131] truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#757575]">Size: {item.size}</p>
                      </div>
                      <p className="text-xs font-bold text-[#0F2131] shrink-0">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#404040]">
                    <span>Subtotal</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#404040]">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <span className="text-[#1A533E] font-semibold">FREE</span> : `€${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#0F2131] text-base pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
