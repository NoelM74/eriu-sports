import { NextResponse } from "next/server";
import { priceBasket, REGION_REQUIRED } from "@/lib/order-pricing";
import { makeReference } from "@/lib/order-notify";
import { itemMetadata, stripe } from "@/lib/stripe-orders";

/**
 * Creates a Stripe PaymentIntent for a card payment.
 *
 * The browser only sends what's in the basket and where to deliver it. The amount
 * is worked out here from the catalogue, the same way as for PayPal, so it can't
 * be changed in the browser and old baskets can't pay old prices.
 *
 * The items, our order reference and the delivery address are stored on the
 * PaymentIntent, so every card payment in the Stripe dashboard shows the full
 * order, and the order emails are built from Stripe's copy.
 */
export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Card payments aren't available right now. Please use PayPal." }, { status: 503 });
    }

    const body = await req.json();
    const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

    let priced;
    try {
      priced = priceBasket(body.lines);
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid basket." }, { status: 400 });
    }

    const shown = Number(body.expectedTotal);
    if (Number.isFinite(shown) && Math.abs(shown - priced.total) > 0.009) {
      return NextResponse.json(
        { error: `Prices have changed since you loaded this page. Your total is now €${priced.total.toFixed(2)}. Please refresh and try again.` },
        { status: 409 }
      );
    }

    const email = str(body.email);
    const name = str(body.name);
    const phone = str(body.phone);
    const address = (body.address ?? {}) as Record<string, unknown>;
    const country = (str(address.country) || "IE").slice(0, 2).toUpperCase();
    const region = str(address.region);

    if (!name || !str(address.line1) || !str(address.city)) {
      return NextResponse.json({ error: "Please fill in your name and delivery address." }, { status: 400 });
    }
    if (REGION_REQUIRED.includes(country) && !region) {
      return NextResponse.json({ error: "Please add your state, province or county." }, { status: 400 });
    }

    const reference = makeReference();
    const params = new URLSearchParams({
      amount: String(Math.round(priced.total * 100)),
      currency: "eur",
      "automatic_payment_methods[enabled]": "true",
      description: `Ériu Sports order ${reference}`,
      "metadata[reference]": reference,
      "metadata[item_total]": priced.itemTotal.toFixed(2),
      "metadata[shipping]": priced.shipping.toFixed(2),
      "shipping[name]": name.slice(0, 250),
      "shipping[address][line1]": str(address.line1).slice(0, 250),
      "shipping[address][city]": str(address.city).slice(0, 100),
      "shipping[address][country]": country,
    });
    if (str(address.line2)) params.set("shipping[address][line2]", str(address.line2).slice(0, 250));
    if (region) params.set("shipping[address][state]", region.slice(0, 100));
    if (str(address.postal_code)) params.set("shipping[address][postal_code]", str(address.postal_code).slice(0, 40));
    if (phone) params.set("shipping[phone]", phone.slice(0, 40));
    if (email) {
      params.set("receipt_email", email);
      params.set("metadata[customer_email]", email.slice(0, 500));
    }
    for (const [key, value] of itemMetadata(priced.lines).slice(0, 45)) params.set(`metadata[${key}]`, value);

    const response = await stripe("/payment_intents", { method: "POST", params });
    const data = await response.json();

    if (!response.ok) {
      console.error(`[stripe] Create PaymentIntent failed: ${response.status} ${data.error?.code ?? ""} ${data.error?.message ?? ""}`);
      return NextResponse.json({ error: data.error?.message || "Card payment couldn't be started." }, { status: response.status });
    }

    return NextResponse.json({ clientSecret: data.client_secret, reference });
  } catch (error: unknown) {
    console.error(`[stripe] Create PaymentIntent error: ${error instanceof Error ? error.message : error}`);
    return NextResponse.json({ error: "We couldn't start the card payment. Please try again in a moment." }, { status: 500 });
  }
}
