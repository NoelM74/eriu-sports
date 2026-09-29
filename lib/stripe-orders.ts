/**
 * Card payments through Stripe: order records and confirmation emails.
 *
 * The basket is priced on the server (see order-pricing.ts) when the PaymentIntent
 * is created, and the order details are stored on the PaymentIntent as metadata.
 * The order record is then built from Stripe's copy, never from the browser.
 *
 * Settings, set in Cloudflare:
 *   STRIPE_SECRET_KEY      - secret: live secret key
 *   STRIPE_WEBHOOK_SECRET  - secret: signing secret of the webhook at /api/stripe/webhook
 * The card form also needs NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as a build variable.
 */
import { notifyOrder, type OrderItem, type OrderRecord } from './order-notify';

/* eslint-disable @typescript-eslint/no-explicit-any */
type PaymentIntent = any;

export async function stripe(path: string, init: { method?: string; params?: URLSearchParams } = {}): Promise<Response> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe is not configured.');
  return fetch(`https://api.stripe.com/v1${path}`, {
    method: init.method ?? 'GET',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: init.params,
  });
}

export async function getPaymentIntent(id: string): Promise<PaymentIntent | null> {
  const res = await stripe(`/payment_intents/${encodeURIComponent(id)}`);
  return res.ok ? res.json() : null;
}

/**
 * Items are stored as metadata item_1, item_2… each "qty|size|unit price|title".
 * Stripe allows 50 metadata keys of up to 500 characters.
 */
export function itemMetadata(lines: { quantity: number; sizeLabel: string; unitPrice: number; title: string }[]) {
  return lines.map((l, i) => [
    `item_${i + 1}`,
    `${l.quantity}|${l.sizeLabel}|${l.unitPrice.toFixed(2)}|${l.title}`.slice(0, 500),
  ] as const);
}

function itemsFrom(meta: Record<string, string>): OrderItem[] {
  return Object.keys(meta)
    .filter((k) => /^item_\d+$/.test(k))
    .sort((a, b) => Number(a.slice(5)) - Number(b.slice(5)))
    .map((k) => {
      const [quantity, size, unitPrice, ...title] = meta[k].split('|');
      return { quantity: Number(quantity) || 1, size, unitPrice, title: title.join('|') };
    });
}

/** Stripe's status in the same words as PayPal's, so the emails read the same. */
function statusOf(pi: PaymentIntent): string {
  if (pi.status === 'succeeded') return 'COMPLETED';
  if (pi.status === 'processing') return 'PENDING';
  return String(pi.status ?? 'UNKNOWN').toUpperCase();
}

export function recordFromIntent(pi: PaymentIntent): OrderRecord {
  const meta: Record<string, string> = pi.metadata ?? {};
  const ship = pi.shipping ?? {};
  const addr = ship.address ?? {};
  return {
    provider: 'Card (Stripe)',
    reference: meta.reference || pi.id,
    paypalOrderId: pi.id,
    captureId: String(pi.latest_charge ?? ''),
    placedAt: new Date((pi.created ?? Date.now() / 1000) * 1000).toISOString(),
    paymentStatus: statusOf(pi),
    customer: { name: ship.name || '', email: pi.receipt_email || meta.customer_email || '', phone: ship.phone || '' },
    shipping: {
      name: ship.name || '',
      line1: addr.line1 || '',
      line2: addr.line2 || '',
      city: addr.city || '',
      region: addr.state || '',
      postalCode: addr.postal_code || '',
      country: addr.country || '',
    },
    items: itemsFrom(meta),
    currency: String(pi.currency ?? 'eur').toUpperCase(),
    total: ((pi.amount_received || pi.amount || 0) / 100).toFixed(2),
  };
}

/**
 * Records and emails a paid card order once. Marks the PaymentIntent with
 * metadata "recorded" so the checkout and the webhook don't both send emails.
 * Never throws: the customer has already paid.
 */
export async function recordIntent(pi: PaymentIntent): Promise<OrderRecord | null> {
  try {
    const status = statusOf(pi);
    if (status !== 'COMPLETED' && status !== 'PENDING') return null;
    const already = pi.metadata?.recorded;
    if (already === status || already === 'COMPLETED') return recordFromIntent(pi);

    await stripe(`/payment_intents/${encodeURIComponent(pi.id)}`, {
      method: 'POST',
      params: new URLSearchParams({ 'metadata[recorded]': status }),
    });
    const record = recordFromIntent(pi);
    await notifyOrder(record);
    return record;
  } catch (e) {
    console.error(`[order] Could not record Stripe payment ${pi?.id}: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}

/** Checks a Stripe webhook signature (the Stripe-Signature header). */
export async function verifyStripeSignature(payload: string, header: string, secret: string): Promise<boolean> {
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=') as [string, string]));
  const t = parts.t;
  const signatures = header
    .split(',')
    .filter((p) => p.startsWith('v1='))
    .map((p) => p.slice(3));
  if (!t || signatures.length === 0) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;

  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${t}.${payload}`));
  const expected = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  // Compare in constant time.
  return signatures.some((s) => {
    if (s.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < s.length; i++) diff |= s.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  });
}
