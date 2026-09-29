import { NextResponse } from "next/server";
import { generateAccessToken, PAYPAL_API } from "@/lib/paypal";
import { priceBasket, REGION_REQUIRED } from "@/lib/order-pricing";
import { makeReference } from "@/lib/order-notify";
import { packContact } from "@/lib/paypal-orders";

/**
 * Creates a PayPal order.
 *
 * The browser only sends what's in the basket and where to deliver it. Prices,
 * stock and delivery are worked out here from the catalogue, so the amount can't
 * be changed in the browser and old baskets can't pay old prices.
 *
 * Every item goes to PayPal as its own line (name, size, quantity, price) with the
 * delivery charge and our order reference, so the full order shows in PayPal and
 * in PayPal's payment emails even if our own emails fail.
 *
 * The delivery address typed at checkout is locked in (SET_PROVIDED_ADDRESS).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

    let priced;
    try {
      priced = priceBasket(body.lines);
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : "Invalid basket." }, { status: 400 });
    }

    // The page shows a total; if our prices differ (e.g. changed since the page loaded), stop and say so.
    const shown = Number(body.expectedTotal);
    if (Number.isFinite(shown) && Math.abs(shown - priced.total) > 0.009) {
      return NextResponse.json(
        { error: `Prices have changed since you loaded this page. Your total is now €${priced.total.toFixed(2)}. Please refresh and try again.` },
        { status: 409 }
      );
    }

    const name = str(body.name);
    const email = str(body.email);
    const phone = str(body.phone);
    const address = (body.address ?? {}) as Record<string, unknown>;
    const countryCode = (str(address.country) || "IE").slice(0, 2).toUpperCase();
    const region = str(address.region);
    const line1 = str(address.line1);

    if (!name || !line1 || !str(address.city)) {
      return NextResponse.json({ error: "Please fill in your name and delivery address." }, { status: 400 });
    }
    if (REGION_REQUIRED.includes(countryCode) && !region) {
      return NextResponse.json({ error: "Please add your state, province or county." }, { status: 400 });
    }

    const reference = makeReference();
    const eur = (n: number) => ({ currency_code: "EUR", value: n.toFixed(2) });

    const purchaseUnit = {
      invoice_id: reference,
      custom_id: packContact(phone, email),
      description: `Ériu Sports order ${reference}`,
      soft_descriptor: "ERIUSPORTS",
      amount: {
        ...eur(priced.total),
        breakdown: { item_total: eur(priced.itemTotal), shipping: eur(priced.shipping) },
      },
      items: priced.lines.map((l) => ({
        name: l.title.slice(0, 127),
        description: `Size ${l.sizeLabel}`.slice(0, 127),
        sku: `${l.slug}-${l.size}`.slice(0, 127),
        quantity: String(l.quantity),
        unit_amount: eur(l.unitPrice),
        category: "PHYSICAL_GOODS",
      })),
      shipping: {
        name: { full_name: name.slice(0, 300) },
        address: {
          address_line_1: line1.slice(0, 300),
          ...(str(address.line2) && { address_line_2: str(address.line2).slice(0, 300) }),
          admin_area_2: str(address.city).slice(0, 120),
          ...(region && { admin_area_1: region.slice(0, 300) }),
          postal_code: str(address.postal_code).slice(0, 60),
          country_code: countryCode,
        },
      },
    };

    const accessToken = await generateAccessToken();
    const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": `create-${reference}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [purchaseUnit],
        application_context: {
          brand_name: "Ériu Sports",
          shipping_preference: "SET_PROVIDED_ADDRESS",
          user_action: "PAY_NOW",
        },
      }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = data?.details?.[0];
      console.error(`[paypal] Create order failed: ${response.status} ${detail?.issue ?? ""} ${detail?.field ?? ""} ${data?.message ?? ""}`);
      const addressProblem = /address|postal|admin_area|country/i.test(`${detail?.field ?? ""} ${detail?.issue ?? ""}`);
      return NextResponse.json(
        {
          error: addressProblem
            ? "PayPal couldn't accept that address. Please check your postcode, city and state or county."
            : detail?.description || data?.message || "Failed to create PayPal order.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ id: data.id, reference });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create order.";
    console.error(`[paypal] Create order error: ${message}`);
    return NextResponse.json({ error: "We couldn't start the payment. Please try again in a moment." }, { status: 500 });
  }
}
