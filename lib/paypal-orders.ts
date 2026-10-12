/**
 * Capturing PayPal orders and turning them into order records.
 * Shared by the checkout capture route and the PayPal webhook, so an order is
 * captured and recorded the same way whichever gets there first.
 */
import { generateAccessToken, PAYPAL_API } from './paypal';
import { notifyOrder, type OrderItem, type OrderRecord } from './order-notify';

/* eslint-disable @typescript-eslint/no-explicit-any */
type PayPalOrder = any;

export interface CaptureResult {
  /**
   * captured: we captured it now. already: it was captured before. declined: card refused.
   * rejected: not an order this site created (see isOurOrder), so not captured. failed: anything else.
   */
  outcome: 'captured' | 'already' | 'declined' | 'rejected' | 'failed';
  order?: PayPalOrder;
  status?: number;
  error?: string;
  /** PayPal's error details, passed back so the checkout can react (e.g. ask for another card). */
  details?: unknown;
}

async function paypal(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await generateAccessToken();
  return fetch(`${PAYPAL_API}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init.headers ?? {}),
    },
  });
}

export async function getOrder(orderID: string): Promise<PayPalOrder | null> {
  const res = await paypal(`/v2/checkout/orders/${encodeURIComponent(orderID)}`);
  return res.ok ? res.json() : null;
}

/**
 * Our public client ID lets anyone create a PayPal order in their own browser, at any
 * price and with any items. So every order this site creates carries a signature in
 * reference_id, made with our PayPal secret over the reference, total and each line's
 * quantity and price. Only orders with a matching signature are captured.
 */
export interface SignedOrder {
  reference: string;
  currency: string;
  total: number | string;
  lines: { quantity: number | string; unitPrice: number | string }[];
}

const money = (v: number | string) => Number(v).toFixed(2);

export async function signOrder(o: SignedOrder): Promise<string> {
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!secret) throw new Error('PayPal credentials are not configured.');
  const text = [
    'eriu-order-v1',
    o.reference,
    String(o.currency).toUpperCase(),
    money(o.total),
    o.lines.map((l) => `${Number(l.quantity)}x${money(l.unitPrice)}`).join(','),
  ].join('|');
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(text));
  return `eriu1-${[...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('')}`;
}

/** True if this is an order the site created (see signOrder), checked against PayPal's copy. */
export async function isOurOrder(order: PayPalOrder): Promise<boolean> {
  const units = order?.purchase_units;
  if (!Array.isArray(units) || units.length !== 1) return false;
  const unit = units[0];
  const items: any[] = Array.isArray(unit.items) ? unit.items : [];
  if (!unit.invoice_id || !unit.amount?.value || items.length === 0) return false;
  const expected = await signOrder({
    reference: String(unit.invoice_id),
    currency: String(unit.amount.currency_code ?? ''),
    total: unit.amount.value,
    lines: items.map((i) => ({ quantity: i.quantity, unitPrice: i.unit_amount?.value })),
  });
  const actual = String(unit.reference_id ?? '');
  // Compare in constant time.
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

/**
 * Captures an approved order, but only one this site created. Asks PayPal for the
 * full order back (items, address, invoice ID) so the record comes from PayPal,
 * not from the browser.
 */
export async function captureOrder(orderID: string, requestId?: string): Promise<CaptureResult> {
  const existing = await getOrder(orderID);
  if (!existing) {
    return { outcome: 'failed', status: 502, error: "We couldn't reach PayPal to confirm your payment. You haven't been charged. Please try again." };
  }
  if (!(await isOurOrder(existing))) {
    const amount = existing?.purchase_units?.[0]?.amount;
    console.error(`[paypal] Order ${orderID} (${amount?.currency_code ?? ''} ${amount?.value ?? ''}) wasn't created by this site, so it wasn't captured.`);
    return {
      outcome: 'rejected',
      status: 400,
      error: "We couldn't match this payment to your order, so it wasn't taken. Please refresh the page and try again.",
    };
  }
  if (existing.status === 'COMPLETED') return { outcome: 'already', order: existing };

  const res = await paypal(`/v2/checkout/orders/${encodeURIComponent(orderID)}/capture`, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
      ...(requestId ? { 'PayPal-Request-Id': requestId } : {}),
    },
  });
  const body = await res.json().catch(() => ({}));

  if (res.ok) return { outcome: 'captured', order: body };

  const issue = body?.details?.[0]?.issue;
  if (issue === 'ORDER_ALREADY_CAPTURED') {
    return { outcome: 'already', order: await getOrder(orderID) };
  }
  console.error(`[paypal] Capture of ${orderID} failed: ${res.status} ${issue ?? ''} ${body?.message ?? ''}`);
  if (issue === 'INSTRUMENT_DECLINED') {
    return { outcome: 'declined', status: res.status, error: 'Your card or bank declined the payment.', details: body.details };
  }
  return {
    outcome: 'failed',
    status: res.status,
    error: body?.details?.[0]?.description || body?.message || 'Payment could not be completed.',
    details: body?.details,
  };
}

/** The capture on an order, with its status: COMPLETED, PENDING, DECLINED, etc. */
export function captureOf(order: PayPalOrder): { id: string; status: string; amount: string; currency: string } {
  const capture = order?.purchase_units?.[0]?.payments?.captures?.[0] ?? {};
  return {
    id: String(capture.id ?? ''),
    status: String(capture.status ?? 'UNKNOWN'),
    amount: String(capture.amount?.value ?? ''),
    currency: String(capture.amount?.currency_code ?? 'EUR'),
  };
}

/**
 * Contact details typed at checkout travel with the PayPal order in custom_id,
 * so the webhook can record them too. Format: "p:<phone>;e:<email>", max 127 chars.
 */
export function packContact(phone: string, email: string): string {
  return `p:${phone.replace(/;/g, '')};e:${email}`.slice(0, 127);
}

function unpackContact(custom: unknown): { phone?: string; email?: string } {
  const m = /^p:([^;]*);e:(.*)$/.exec(String(custom ?? ''));
  return m ? { phone: m[1] || undefined, email: m[2] || undefined } : {};
}

/** Builds the order record from PayPal's copy of the order. */
export function recordFromOrder(order: PayPalOrder, contact: { email?: string; phone?: string } = {}): OrderRecord {
  const unit = order?.purchase_units?.[0] ?? {};
  const shipping = unit.shipping ?? {};
  const addr = shipping.address ?? {};
  const payer = order?.payer ?? {};
  const capture = captureOf(order);
  const payerName = [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(' ');
  const typed = unpackContact(unit.custom_id);

  const items: OrderItem[] = (Array.isArray(unit.items) ? unit.items : []).map((i: any) => ({
    title: String(i.name ?? ''),
    // The size is stored in the item description, e.g. "Size M" or "Size XXS, age 2–3".
    size: String(i.description ?? '').replace(/^Size\s+/i, ''),
    quantity: Number(i.quantity) || 1,
    unitPrice: i.unit_amount?.value,
  }));

  return {
    reference: String(unit.invoice_id ?? order?.id ?? ''),
    paypalOrderId: String(order?.id ?? ''),
    captureId: capture.id,
    placedAt: new Date().toISOString(),
    paymentStatus: capture.status,
    customer: {
      name: shipping.name?.full_name || payerName || '',
      email: contact.email || typed.email || payer?.email_address || '',
      phone: contact.phone || typed.phone || payer?.phone?.phone_number?.national_number || '',
    },
    shipping: {
      name: shipping.name?.full_name || payerName || '',
      line1: addr.address_line_1 || '',
      line2: addr.address_line_2 || '',
      city: addr.admin_area_2 || '',
      region: addr.admin_area_1 || '',
      postalCode: addr.postal_code || '',
      country: addr.country_code || '',
    },
    items,
    currency: capture.currency,
    total: capture.amount,
  };
}

/** Records and emails an order. Never throws: the customer has already paid. */
export async function recordOrder(order: PayPalOrder, contact?: { email?: string; phone?: string }) {
  try {
    const record = recordFromOrder(order, contact);
    const notified = await notifyOrder(record);
    return { record, notified };
  } catch (e) {
    console.error(`[order] Could not record PayPal order ${order?.id}: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}
