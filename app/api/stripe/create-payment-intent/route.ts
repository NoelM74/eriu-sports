import { NextResponse } from "next/server";

/**
 * Creates a Stripe PaymentIntent for the order.
 *
 * The customer's contact + shipping details are attached to the intent so every
 * card order carries its delivery address into the Stripe dashboard, and the
 * customer receives a Stripe receipt. Without this, card orders arrive with no
 * address and cannot be fulfilled.
 */
export async function POST(req: Request) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0 || amount > 10000) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const params = new URLSearchParams({
      amount: String(Math.round(amount * 100)),
      currency: "eur",
      "automatic_payment_methods[enabled]": "true",
    });

    const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

    const email = str(body.email);
    const name = str(body.name);
    const address = (body.address ?? {}) as Record<string, unknown>;
    const line1 = str(address.line1);
    const city = str(address.city);
    const postalCode = str(address.postal_code);
    const country = str(address.country) || "IE";

    // Receipt to the customer + a searchable email on the payment
    if (email) {
      params.set("receipt_email", email);
      params.set("metadata[customer_email]", email.slice(0, 500));
    }

    // Shipping address — shows in the Stripe dashboard under the payment
    if (name && line1) {
      params.set("shipping[name]", name.slice(0, 250));
      params.set("shipping[address][line1]", line1.slice(0, 250));
      if (city) params.set("shipping[address][city]", city.slice(0, 100));
      if (postalCode) params.set("shipping[address][postal_code]", postalCode.slice(0, 40));
      params.set("shipping[address][country]", country.slice(0, 2).toUpperCase());
    }

    // What they actually ordered (sizes + quantities), for fulfilment
    const items = str(body.items);
    if (items) params.set("metadata[order_items]", items.slice(0, 490));

    const response = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Stripe payment failed." },
        { status: response.status }
      );
    }

    return NextResponse.json({ clientSecret: data.client_secret });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
