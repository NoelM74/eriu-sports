"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import StripePaymentForm from "@/components/checkout/StripePaymentForm";
import PayPalPaymentForm from "@/components/checkout/PayPalPaymentForm";
import { calculateShipping } from "@/lib/shipping";

interface FormFields {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validateForm(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.firstName.trim()) errors.firstName = "First name is required.";
  if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
  if (!fields.address.trim()) errors.address = "Address is required.";
  if (!fields.city.trim()) errors.city = "City is required.";
  if (!fields.postalCode.trim()) errors.postalCode = "Postal code is required.";
  return errors;
}

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();

  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  const [formReady, setFormReady] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [fields, setFields] = useState<FormFields>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-[#0F2131] mb-4 uppercase tracking-wider">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mb-8 max-w-md text-center">
          Looks like you haven&apos;t added any vintage classics to your cart yet.
        </p>
        <Link
          href="/catalog"
          className="bg-[#0A7A44] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#086035] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleSuccess = () => {
    clearCart();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-[#0A7A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold text-[#0F2131] mb-4 uppercase tracking-tight text-center">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-8 max-w-md text-center text-lg">
          Thank you for choosing Ériu Sports. Your vintage jersey is getting prepped for
          shipment right now. A confirmation email is on its way.
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

  const shippingCost = calculateShipping(cartTotal);
  const orderTotal = Math.round((cartTotal + shippingCost) * 100) / 100;

  const handleField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleContinueToPayment = () => {
    setFormSubmitted(true);
    const validationErrors = validateForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormReady(true);
  };

  const inputClass = (field: keyof FormErrors) =>
    `mt-1 block w-full rounded-md shadow-sm focus:ring-[#0A7A44] sm:text-sm py-3 px-4 bg-gray-50 border ${
      formSubmitted && errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-400"
        : "border-gray-300 focus:border-[#0A7A44]"
    }`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* Checkout Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-[#0F2131] uppercase tracking-tight">
            Checkout
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2 md:mt-0 items-center flex gap-1">
            <svg className="w-4 h-4 text-[#0A7A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure 256-bit SSL Encrypted Payment
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Form Side */}
          <section className="lg:col-span-7 mb-10 lg:mb-0">
            <div className="space-y-8">

              {/* Contact Info */}
              <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
                <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={fields.email}
                      onChange={handleField}
                      disabled={formReady}
                      className={inputClass("email")}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {formSubmitted && errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <input
                      id="newsletter"
                      name="newsletter"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-[#0A7A44] focus:ring-[#0A7A44]"
                    />
                    <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-600">
                      Email me with news and offers regarding vintage drops
                    </label>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
                <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={fields.firstName}
                      onChange={handleField}
                      disabled={formReady}
                      className={inputClass("firstName")}
                      autoComplete="given-name"
                    />
                    {formSubmitted && errors.firstName && (
                      <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={fields.lastName}
                      onChange={handleField}
                      disabled={formReady}
                      className={inputClass("lastName")}
                      autoComplete="family-name"
                    />
                    {formSubmitted && errors.lastName && (
                      <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={fields.address}
                      onChange={handleField}
                      disabled={formReady}
                      className={inputClass("address")}
                      autoComplete="street-address"
                    />
                    {formSubmitted && errors.address && (
                      <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={fields.city}
                      onChange={handleField}
                      disabled={formReady}
                      className={inputClass("city")}
                      autoComplete="address-level2"
                    />
                    {formSubmitted && errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={fields.postalCode}
                      onChange={handleField}
                      disabled={formReady}
                      className={inputClass("postalCode")}
                      autoComplete="postal-code"
                    />
                    {formSubmitted && errors.postalCode && (
                      <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>
                    )}
                  </div>
                </div>

                {!formReady && (
                  <button
                    onClick={handleContinueToPayment}
                    className="mt-8 w-full bg-[#0F2131] text-white py-4 px-6 uppercase font-bold tracking-widest hover:bg-[#0A7A44] transition-colors"
                  >
                    Continue to Payment
                  </button>
                )}

                {formReady && (
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-[#0A7A44] font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Details confirmed
                    </span>
                    <button
                      onClick={() => setFormReady(false)}
                      className="text-sm text-gray-500 underline hover:text-[#0F2131] transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Details — only shown once form is complete */}
              {formReady && (
                <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100">
                  <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">
                    Payment Method
                  </h2>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <label
                      className={`flex-1 border-2 p-4 flex items-center cursor-pointer rounded-md ${
                        paymentMethod === "stripe"
                          ? "border-[#0A7A44] bg-[#0A7A44]/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={() => setPaymentMethod("stripe")}
                        className="h-4 w-4 text-[#0A7A44] focus:ring-[#0A7A44] border-gray-300"
                      />
                      <span className="ml-3 font-medium text-[#0F2131]">
                        Credit / Debit Card
                      </span>
                    </label>
                    <label
                      className={`flex-1 border-2 p-4 flex items-center cursor-pointer rounded-md ${
                        paymentMethod === "paypal"
                          ? "border-[#0A7A44] bg-[#0A7A44]/5"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="h-4 w-4 text-[#0A7A44] focus:ring-[#0A7A44] border-gray-300"
                      />
                      <span className="ml-3 font-medium text-[#0F2131]">PayPal</span>
                    </label>
                  </div>

                  <div className="mt-6">
                    {paymentMethod === "stripe" && (
                      <StripePaymentForm amount={orderTotal} onSuccess={handleSuccess} />
                    )}
                    {paymentMethod === "paypal" && (
                      <PayPalPaymentForm amount={orderTotal} onSuccess={handleSuccess} />
                    )}
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* Order Summary Side */}
          <section className="lg:col-span-5 relative">
            <div className="bg-white p-6 sm:p-8 shadow-sm rounded-lg border border-gray-100 sticky top-28">
              <h2 className="text-xl font-bold text-[#0F2131] uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              <ul className="divide-y divide-gray-200 border-b border-gray-200 mb-6">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.size}`} className="py-4 flex">
                    <div className="relative h-16 w-16 bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-4 flex-1 flex flex-col pt-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-bold text-[#0F2131] truncate max-w-[200px]">
                          {item.product.title}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          €{(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
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
                    {shippingCost === 0 ? (
                      <span className="text-[#0A7A44] font-bold uppercase tracking-wider text-xs">
                        Free
                      </span>
                    ) : (
                      `€${shippingCost.toFixed(2)}`
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4 text-[#0F2131]">
                  <dt className="text-base font-extrabold uppercase">Total</dt>
                  <dd className="text-xl font-extrabold">€{orderTotal.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 py-3 rounded">
                <svg className="w-4 h-4 text-[#1C7C83]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                100% Secure Checkout Guarantee
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
