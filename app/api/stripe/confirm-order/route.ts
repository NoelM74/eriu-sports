import { NextResponse } from "next/server";
import { getPaymentIntent, recordIntent } from "@/lib/stripe-orders";

/**
 * Called by the checkout after a card payment. Checks the payment with Stripe
 * (never trusting the browser), then records and emails the order once.
 * The Stripe webhook does the same if the customer closes the page too early.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = typeof body.paymentIntentId === "string" ? body.paymentIntentId.trim() : "";
    if (!/^pi_[A-Za-z0-9]+$/.test(id)) {
      return NextResponse.json({ error: "Invalid payment." }, { status: 400 });
    }

    const pi = await getPaymentIntent(id);
    if (!pi) return NextResponse.json({ error: "Payment not found." }, { status: 404 });

    if (pi.status !== "succeeded" && pi.status !== "processing") {
      return NextResponse.json({ error: "Your payment didn't go through. You haven't been charged." }, { status: 402 });
    }

    const record = await recordIntent(pi);
    return NextResponse.json({
      reference: record?.reference ?? pi.metadata?.reference,
      status: pi.status === "succeeded" ? "COMPLETED" : "PENDING",
    });
  } catch (error: unknown) {
    console.error(`[stripe] Confirm order error: ${error instanceof Error ? error.message : error}`);
    return NextResponse.json({ error: "Something went wrong confirming your payment. Please email us before trying again." }, { status: 500 });
  }
}
