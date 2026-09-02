import { NextResponse } from "next/server";
import { generateAccessToken, PAYPAL_API } from "@/lib/paypal";
import { makeReference, notifyOrder, type OrderItem, type OrderRecord } from "@/lib/order-notify";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderID } = body;

    if (!orderID || typeof orderID !== "string" || orderID.trim() === "") {
      return NextResponse.json({ error: "Invalid order ID." }, { status: 400 });
    }

    const accessToken = await generateAccessToken();

    const response = await fetch(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: err.message || "Failed to capture PayPal order." },
        { status: response.status }
      );
    }

    const data = await response.json();

    // ---- Record the order and send confirmations -------------------------
    // The payment has succeeded by this point, so nothing below may throw.
    const reference = makeReference();
    let notified = { shopEmailed: false, customerEmailed: false, webhookPosted: false };

    try {
      const unit = data?.purchase_units?.[0] ?? {};
      const capture = unit?.payments?.captures?.[0] ?? {};
      const shipping = unit?.shipping ?? {};
      const addr = shipping?.address ?? {};
      const payer = data?.payer ?? {};

      const items: OrderItem[] = Array.isArray(body.items)
        ? body.items
            .filter((i: unknown) => i && typeof i === "object")
            .map((i: Record<string, unknown>) => ({
              title: String(i.title ?? "").slice(0, 200),
              size: String(i.size ?? "").slice(0, 20),
              quantity: Number(i.quantity) || 1,
            }))
        : [];

      const payerName = [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(" ");

      const order: OrderRecord = {
        reference,
        paypalOrderId: String(data?.id ?? orderID),
        captureId: String(capture?.id ?? ""),
        placedAt: new Date().toISOString(),
        customer: {
          name: shipping?.name?.full_name || payerName || "",
          email: payer?.email_address || (typeof body.email === "string" ? body.email : "") || "",
        },
        shipping: {
          name: shipping?.name?.full_name || payerName || "",
          line1: addr?.address_line_1 || "",
          city: addr?.admin_area_2 || "",
          postalCode: addr?.postal_code || "",
          country: addr?.country_code || "",
        },
        items,
        currency: capture?.amount?.currency_code || "EUR",
        total: capture?.amount?.value || "",
      };

      notified = await notifyOrder(order);
    } catch {
      // Recording failed — the payment still stands. Details remain in PayPal.
    }

    return NextResponse.json({ ...data, reference, notified });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to capture order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
