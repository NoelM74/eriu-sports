import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(key, {
      // Required for Edge / Cloudflare Workers — uses fetch instead of Node http
      httpClient: Stripe.createFetchHttpClient(),
    });

    const body = await req.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0 || amount > 10000) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
