"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

export default function PayPalPaymentForm({
  amount,
  onSuccess,
}: {
  amount: number;
  onSuccess: () => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const initialOptions = {
    clientId: paypalClientId as string,
    currency: "EUR",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="w-full relative z-0">
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect", color: "gold" }}
          createOrder={async () => {
            setError(null);
            try {
              const response = await fetch("/api/paypal/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
              });

              const orderData = await response.json();

              if (!response.ok) {
                throw new Error(orderData.error || "Unable to create order.");
              }
              if (!orderData.id) {
                throw new Error("PayPal did not return an order ID.");
              }

              return orderData.id as string;
            } catch (err: unknown) {
              const message =
                err instanceof Error ? err.message : "Could not initiate PayPal checkout.";
              setError(message);
              throw err;
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch("/api/paypal/capture-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              });

              const orderData = await response.json();

              if (!response.ok) {
                throw new Error(orderData.error || "Payment capture failed.");
              }

              const errorDetail = orderData?.details?.[0];
              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              } else if (errorDetail) {
                throw new Error(
                  errorDetail.description || "Payment could not be completed."
                );
              }

              onSuccess();
            } catch (err: unknown) {
              const message =
                err instanceof Error ? err.message : "Payment failed. Please try again.";
              setError(message);
            }
          }}
          onError={() => {
            setError("An error occurred during payment processing. Please try again.");
          }}
        />
      </div>
      {error && (
        <div className="mt-4 text-red-500 font-medium text-sm text-center">{error}</div>
      )}
    </PayPalScriptProvider>
  );
}
