import { NextResponse } from "next/server";
import { recordIntent, verifyStripeSignature } from "@/lib/stripe-orders";
import { alertShop } from "@/lib/order-notify";

/**
 * Stripe webhook. In the Stripe dashboard (Developers → Webhooks), add an endpoint
 * at https://eriusports.com/api/stripe/webhook with these events:
 *   payment_intent.succeeded, payment_intent.processing,
 *   payment_intent.payment_failed, charge.refunded, charge.dispute.created
 * then save its signing secret as the STRIPE_WEBHOOK_SECRET secret in Cloudflare.
 *
 * Records paid card orders even if the customer closed the page before the
 * checkout confirmed them, and alerts the shop about refunds and disputes.
 */
export async function POST(req: Request) {
  const payload = await req.text();
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set, so the webhook can't be verified.");
      return NextResponse.json({ error: "Not configured." }, { status: 401 });
    }
    if (!(await verifyStripeSignature(payload, req.headers.get("stripe-signature") ?? "", secret))) {
      return NextResponse.json({ error: "Not verified." }, { status: 401 });
    }

    const event = JSON.parse(payload);
    const obj = event?.data?.object ?? {};

    switch (event?.type) {
      case "payment_intent.succeeded":
      case "payment_intent.processing":
        await recordIntent(obj);
        break;
      case "charge.refunded":
      case "charge.dispute.created": {
        const what = event.type === "charge.refunded" ? "refunded" : "disputed";
        const ref = obj.metadata?.reference || obj.payment_intent || obj.id;
        await alertShop(
          `Card payment ${what}: ${ref}`,
          `Stripe says the card payment for ${ref} was ${what}.\n\nAmount: ${((obj.amount ?? 0) / 100).toFixed(2)} ${String(obj.currency ?? "").toUpperCase()}\nStripe charge: ${obj.charge ?? obj.id}\n\nCheck Stripe before shipping anything.`
        );
        break;
      }
      case "payment_intent.payment_failed":
        console.log(`[stripe-webhook] Payment failed for ${obj.metadata?.reference ?? obj.id}: ${obj.last_payment_error?.message ?? ""}`);
        break;
    }
    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error(`[stripe-webhook] ${error instanceof Error ? error.message : error}`);
    return NextResponse.json({ error: "Webhook failed." }, { status: 500 });
  }
}
