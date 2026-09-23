/**
 * Order records + confirmation emails.
 *
 * Runs after a payment is captured. Sends:
 *   1. a confirmation email to the customer
 *   2. a full order email to the shop (this is the durable order record)
 *   3. an optional webhook POST (e.g. Zapier/Make → Google Sheets) if configured
 *
 * Configure with Cloudflare secrets (`wrangler secret put NAME`):
 *   RESEND_API_KEY     - Resend API key (https://resend.com)
 *   ORDER_TO_EMAIL     - where shop order notifications go
 *   ORDER_FROM_EMAIL   - optional "From" (default uses Resend's test sender)
 *   ORDER_WEBHOOK_URL  - optional JSON POST of every order
 *
 * Nothing here may throw into the payment flow: the customer has already paid.
 */

export interface OrderItem {
  title: string;
  size: string;
  quantity: number;
}

export interface OrderRecord {
  reference: string;
  paypalOrderId: string;
  captureId: string;
  placedAt: string;
  customer: { name: string; email: string };
  shipping: {
    name: string;
    line1: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  currency: string;
  total: string;
}

export function makeReference(): string {
  return `ER-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function itemLines(items: OrderItem[]): string {
  if (!items.length) return "  (see PayPal transaction for details)";
  return items.map((i) => `  • ${i.quantity} × ${i.title} — size ${i.size}`).join("\n");
}

function addressBlock(o: OrderRecord): string {
  return [o.shipping.name, o.shipping.line1, o.shipping.city, o.shipping.postalCode, o.shipping.country]
    .filter(Boolean)
    .join("\n");
}

/** Plain-text order record — used for the shop email and the webhook. */
export function buildShopText(o: OrderRecord): string {
  return [
    `NEW ORDER — ${o.reference}`,
    `Placed: ${o.placedAt}`,
    "",
    `Total: ${o.currency} ${o.total}`,
    "",
    "Items:",
    itemLines(o.items),
    "",
    "Ship to:",
    addressBlock(o),
    "",
    `Customer: ${o.customer.name || "—"}`,
    `Email: ${o.customer.email || "—"}`,
    "",
    `PayPal order: ${o.paypalOrderId}`,
    `PayPal capture: ${o.captureId || "—"}`,
  ].join("\n");
}

function esc(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

/** Customer-facing confirmation email. Short, plain, British English. */
export function buildCustomerHtml(o: OrderRecord): string {
  const rows = o.items.length
    ? o.items
        .map(
          (i) =>
            `<tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(i.title)}<br><span style="color:#6b7280;font-size:13px">Size ${esc(i.size)} · Qty ${i.quantity}</span></td></tr>`
        )
        .join("")
    : `<tr><td style="padding:8px 0">Your order</td></tr>`;

  return `<!doctype html><html><body style="margin:0;background:#f4f5f2;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0F2131">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
  <p style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#1C7C83;margin:0 0 8px">Ériu Sports</p>
  <h1 style="font-size:26px;margin:0 0 12px">Thanks for your order</h1>
  <p style="margin:0 0 20px;line-height:1.6">Hi ${esc(o.customer.name.split(" ")[0] || "there")}, we've got your order and we're getting it ready. Your reference is <strong>${esc(o.reference)}</strong>.</p>
  <table style="width:100%;border-collapse:collapse;margin:0 0 20px">${rows}</table>
  <p style="margin:0 0 6px"><strong>Total paid:</strong> ${esc(o.currency)} ${esc(o.total)}</p>
  <p style="margin:0 0 4px"><strong>Delivering to:</strong></p>
  <p style="margin:0 0 24px;line-height:1.6;color:#374151">${esc(addressBlock(o)).replace(/\n/g, "<br>")}</p>
  <p style="margin:0 0 24px;line-height:1.6">It will arrive within 8–14 days of your order. If anything looks wrong, just reply to this email.</p>
  <p style="font-size:13px;color:#6b7280;margin:0">Ériu Sports · Irish-run</p>
</div></body></html>`;
}

async function sendEmail(opts: {
  apiKey: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${opts.apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: opts.from,
        to: opts.to,
        reply_to: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export interface NotifyResult {
  shopEmailed: boolean;
  customerEmailed: boolean;
  webhookPosted: boolean;
}

/** Never throws — a failure here must not break a paid order. */
export async function notifyOrder(order: OrderRecord): Promise<NotifyResult> {
  const result: NotifyResult = { shopEmailed: false, customerEmailed: false, webhookPosted: false };

  const apiKey = process.env.RESEND_API_KEY;
  const shopTo = process.env.ORDER_TO_EMAIL;
  const from = process.env.ORDER_FROM_EMAIL || "Ériu Sports <onboarding@resend.dev>";
  const webhook = process.env.ORDER_WEBHOOK_URL;

  const shopText = buildShopText(order);

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ ...order, summary: shopText }),
      });
      result.webhookPosted = res.ok;
    } catch {
      /* ignore */
    }
  }

  if (apiKey && shopTo) {
    result.shopEmailed = await sendEmail({
      apiKey,
      from,
      to: shopTo,
      replyTo: order.customer.email || undefined,
      subject: `New order ${order.reference} — ${order.currency} ${order.total}`,
      text: shopText,
    });
  }

  if (apiKey && order.customer.email) {
    result.customerEmailed = await sendEmail({
      apiKey,
      from,
      to: order.customer.email,
      replyTo: shopTo,
      subject: `Your Ériu Sports order ${order.reference}`,
      text: `Thanks for your order.\n\nReference: ${order.reference}\nTotal: ${order.currency} ${order.total}\n\nItems:\n${itemLines(order.items)}\n\nDelivering to:\n${addressBlock(order)}\n\nIt will arrive within 8–14 days of your order.`,
      html: buildCustomerHtml(order),
    });
  }

  return result;
}
