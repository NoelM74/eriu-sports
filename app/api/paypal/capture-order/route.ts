import { NextResponse } from "next/server";
import { captureOf, captureOrder, recordOrder } from "@/lib/paypal-orders";

/**
 * Captures a PayPal order after the customer approves it, then records and emails it.
 * The order details come from PayPal's copy of the order, not from the browser.
 * The PayPal webhook does the same if this never runs (e.g. the tab was closed).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderID = typeof body.orderID === "string" ? body.orderID.trim() : "";
    if (!orderID || !/^[A-Z0-9-]{5,40}$/i.test(orderID)) {
      return NextResponse.json({ error: "Invalid order ID." }, { status: 400 });
    }

    // No request ID: a repeat capture then comes back as "already captured", so emails are never sent twice.
    const result = await captureOrder(orderID);

    if (result.outcome === "declined" || result.outcome === "failed") {
      // Pass PayPal's details through so the button can ask for another card.
      return NextResponse.json({ error: result.error, details: result.details }, { status: result.status ?? 502 });
    }

    const order = result.order;
    const capture = captureOf(order);
    if (capture.status !== "COMPLETED" && capture.status !== "PENDING") {
      console.error(`[paypal] Order ${orderID} capture status ${capture.status}`);
      return NextResponse.json(
        { error: "Your payment didn't go through. You haven't been charged. Please try again." },
        { status: 402 }
      );
    }

    // Only record once: if the webhook already captured it, it has sent the emails.
    const recorded = result.outcome === "captured" ? await recordOrder(order) : null;
    const reference = order?.purchase_units?.[0]?.invoice_id ?? recorded?.record.reference;

    return NextResponse.json({ reference, status: capture.status, notified: recorded?.notified });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to capture order.";
    console.error(`[paypal] Capture error: ${message}`);
    return NextResponse.json({ error: "Something went wrong confirming your payment. Please email us before trying again." }, { status: 500 });
  }
}
