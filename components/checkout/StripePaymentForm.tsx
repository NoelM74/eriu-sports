"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
if (!stripePublishableKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set.");
}
const stripePromise = loadStripe(stripePublishableKey);

function CheckoutForm({ amount, onSuccess }: { amount: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          onSuccess();
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/checkout",
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-6 w-full bg-[#0F2131] border border-transparent rounded-none shadow-lg shadow-[#0F2131]/20 py-5 px-4 text-base font-extrabold uppercase tracking-[0.2em] text-white hover:bg-[#0A7A44] hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A7A44] disabled:opacity-70 disabled:hover:translate-y-0"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          ) : (
            `Pay €${amount.toFixed(2)}`
          )}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="mt-4 text-red-500 font-medium text-sm text-center">
          {message}
        </div>
      )}
    </form>
  );
}

export default function StripePaymentForm({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    setFetchError(null);
    setClientSecret("");

    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to initialise payment.");
        }
        if (!data.clientSecret) {
          throw new Error("No client secret returned.");
        }
        setClientSecret(data.clientSecret);
      })
      .catch((err: Error) => {
        setFetchError(err.message || "Could not load payment form. Please try again.");
      });
  }, [amount]);

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#0A7A44",
      colorBackground: "#ffffff",
      colorText: "#0F2131",
      colorDanger: "#df1b41",
      fontFamily: "system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "4px",
    },
  };

  if (fetchError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm text-center">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="StripePayment w-full">
      {clientSecret ? (
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutForm amount={amount} onSuccess={onSuccess} />
        </Elements>
      ) : (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A7A44]"></div>
        </div>
      )}
    </div>
  );
}
