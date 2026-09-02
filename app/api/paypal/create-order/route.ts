import { NextResponse } from "next/server";
import { generateAccessToken, PAYPAL_API } from "@/lib/paypal";

/**
 * Creates a PayPal order.
 *
 * The shipping address collected at checkout is sent to PayPal and locked in
 * (SET_PROVIDED_ADDRESS), so the order ships to the address the customer typed
 * rather than whatever happens to be on their PayPal account. The order summary
 * is attached as the description so it appears on the PayPal transaction.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0 || amount > 10000) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }

    const accessToken = await generateAccessToken();

    const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

    const name = str(body.name);
    const address = (body.address ?? {}) as Record<string, unknown>;
    const line1 = str(address.line1);
    const city = str(address.city);
    const postalCode = str(address.postal_code);
    const countryCode = (str(address.country) || "IE").slice(0, 2).toUpperCase();
    const items = str(body.items);

    const purchaseUnit: Record<string, unknown> = {
      amount: {
        currency_code: "EUR",
        value: amount.toFixed(2),
      },
    };

    if (items) purchaseUnit.description = items.slice(0, 127);

    // Ship to the address entered at checkout
    const hasAddress = Boolean(name && line1);
    if (hasAddress) {
      purchaseUnit.shipping = {
        name: { full_name: name.slice(0, 300) },
        address: {
          address_line_1: line1.slice(0, 300),
          admin_area_2: city.slice(0, 120),
          postal_code: postalCode.slice(0, 60),
          country_code: countryCode,
        },
      };
    }

    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [purchaseUnit],
        application_context: {
          shipping_preference: hasAddress ? "SET_PROVIDED_ADDRESS" : "GET_FROM_FILE",
          user_action: "PAY_NOW",
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to create PayPal order." },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
