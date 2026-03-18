"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, cartTotal, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-3">Your Cart</p>
        <h1 className="text-4xl font-bold uppercase text-[#0F2131] mb-6">Your cart is empty</h1>
        <p className="text-[#757575] mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/catalog"
          className="inline-block bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#133d2d] transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const shipping = cartTotal >= 50 ? 0 : 4.99;
  const total = cartTotal + shipping;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-1">Your Cart</p>
        <h1 className="text-4xl font-bold uppercase text-[#0F2131] mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-0 divide-y divide-gray-100">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 text-[10px] font-bold uppercase tracking-widest text-[#757575]">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="grid grid-cols-12 gap-4 py-6 items-center">
                {/* Image + name */}
                <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-gray-50 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#1C7C83]">
                      {item.product.category}
                    </p>
                    <p className="text-sm font-semibold text-[#0F2131] leading-tight">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[#757575] mt-0.5">Size: {item.size}</p>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-xs text-red-500 hover:text-red-700 mt-1 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden sm:flex col-span-2 justify-center text-sm text-[#0F2131]">
                  €{item.product.price.toFixed(2)}
                </div>

                {/* Qty */}
                <div className="col-span-6 sm:col-span-2 flex justify-start sm:justify-center">
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#0F2131] hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[#0F2131]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#0F2131] hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="col-span-6 sm:col-span-2 text-right text-sm font-bold text-[#0F2131]">
                  €{(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f5f7f6] p-6 sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-[#404040]">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#404040]">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-[#1A533E] font-semibold">FREE</span>
                    ) : (
                      `€${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-[#1C7C83] font-medium">
                    Add €{(50 - cartTotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between font-bold text-[#0F2131]">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-[#1A533E] text-white text-sm font-bold uppercase tracking-widest py-4 text-center hover:bg-[#133d2d] transition-colors"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/catalog"
                className="block text-center text-xs font-medium text-[#757575] hover:text-[#1A533E] transition-colors mt-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
