import { NextResponse } from "next/server";
import { generateAccessToken, PAYPAL_API } from "@/lib/paypal";
import { captureOf, captureOrder, recordOrder } from "@/lib/paypal-orders";
import { alertShop } from "@/lib/order-notify";

/**
 * PayPal webhook. Set it up in the PayPal developer dashboard (your live app →
 * Webhooks) pointing at https://eriusports.com/api/paypal/webhook with these events:
 *   - Checkout order approved   (CHECKOUT.ORDER.APPROVED)
 *   - Payment capture denied    (PAYMENT.CAPTURE.DENIED)
 *   - Payment capture reversed  (PAYMENT.CAPTURE.REVERSED)
 *   - Payment capture refunded  (PAYMENT.CAPTURE.REFUNDED)
 * then save its webhook ID as the PAYPAL_WEBHOOK_ID secret in Cloudflare.
 *
 * If a customer approves a payment but closes the page before the site captures it,
 * this captures it and records the order, so no approved payment is left hanging.
 */
async function verified(req: Request, rawBody: string): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.error("[paypal-webhook] PAYPAL_WEBHOOK_ID is not set, so the webhook can't be verified.");
    return false;
  }
  const h = (name: string) => req.headers.get(name) ?? "";
  const token = await generateAccessToken();
  const res = await fetch(`${PAYPAL_API}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      auth_algo: h("paypal-auth-algo"),
      cert_url: h("paypal-cert-url"),
      transmission_id: h("paypal-transmission-id"),
      transmission_sig: h("paypal-transmission-sig"),
      transmission_time: h("paypal-transmission-time"),
      webhook_id: webhookId,
      webhook_event: JSON.parse(rawBody),
    }),
  });
  const data = await res.json().catch(() => ({}));
  return data?.verification_status === "SUCCESS";
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  try {
    if (!(await verified(req, rawBody))) {
      return NextResponse.json({ error: "Not verified." }, { status: 401 });
    }
    const event = JSON.parse(rawBody);
    const type = String(event?.event_type ?? "");
    const resource = event?.resource ?? {};

    if (type === "CHECKOUT.ORDER.APPROVED") {
      const result = await captureOrder(String(resource.id));
      if (result.outcome === "captured") {
        const status = captureOf(result.order).status;
        console.log(`[paypal-webhook] Captured approved order ${resource.id} (${status}) that the checkout didn't finish.`);
        await recordOrder(result.order);
      }
    } else if (
      type === "PAYMENT.CAPTURE.DENIED" ||
      type === "PAYMENT.CAPTURE.REVERSED" ||
      type === "PAYMENT.CAPTURE.REFUNDED"
    ) {
      const what = type.split(".").pop()!.toLowerCase();
      const ref = resource.invoice_id || resource.id;
      await alertShop(
        `Payment ${what}: ${ref}`,
        `PayPal says the payment for order ${ref} was ${what}.\n\nAmount: ${resource.amount?.currency_code ?? ""} ${resource.amount?.value ?? ""}\nPayPal capture: ${resource.id}\n\nCheck PayPal before shipping or refunding anything.`
      );
    }
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error(`[paypal-webhook] ${error instanceof Error ? error.message : error}`);
    // A 500 makes PayPal retry later, which is what we want if PayPal or email was briefly down.
    return NextResponse.json({ error: "Webhook failed." }, { status: 500 });
  }
}
