import { NextRequest, NextResponse } from "next/server";

/**
 * Quote-request endpoint.
 *
 * Delivers a bulk-order quote request to the business. Configure ONE of:
 *   - QUOTE_WEBHOOK_URL   (easiest: a Formspree / Zapier / Make / n8n endpoint that accepts JSON POST)
 *   - RESEND_API_KEY + QUOTE_TO_EMAIL   (send email via Resend; optional QUOTE_FROM_EMAIL)
 *
 * Set these as Cloudflare secrets, e.g.  `wrangler secret put QUOTE_WEBHOOK_URL`
 *
 * If NOTHING is configured the endpoint returns 501 (not_configured) — the client then
 * routes the customer to a real mailto so a genuine message is still sent. It never fakes success.
 */

interface QuoteLine {
  name: string;
  family: string;
  colourway: string;
  method: string;
  placement: string;
  namesNumbers: boolean;
  run: string;
  qty: number;
  unit: number;
  total: number;
}

interface QuoteBody {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  needBy?: string;
  wantsSamples?: boolean;
  notes?: string;
  lines: QuoteLine[];
  totalUnits: number;
  orderTotal: number;
}

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function reference(): string {
  return `ER-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function toPlainText(b: QuoteBody, ref: string): string {
  const lines = (b.lines || [])
    .map((l) => `• ${l.qty} × ${l.name} (${l.colourway}) — ${l.method}, ${l.placement}${l.namesNumbers ? ", names & numbers" : ""} [${l.run}] @ €${l.unit.toFixed(2)}/unit = €${l.total.toFixed(2)}`)
    .join("\n");
  return [
    `Quote request ${ref}`,
    `From: ${b.name}${b.company ? ` (${b.company})` : ""}`,
    `Email: ${b.email}`,
    b.phone ? `Phone: ${b.phone}` : "",
    `Deliver to: ${b.country || "—"}`,
    b.needBy ? `Needed by: ${b.needBy}` : "",
    b.wantsSamples ? "Wants a sample pack first: YES" : "",
    "",
    "Order:",
    lines,
    "",
    `Total: ${b.totalUnits} pieces — €${(b.orderTotal ?? 0).toFixed(2)} (est.)`,
    b.notes ? `\nNotes: ${b.notes}` : "",
  ].filter(Boolean).join("\n");
}

export async function POST(req: NextRequest) {
  let body: QuoteBody;
  try {
    body = (await req.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Server-side validation — never trust the client
  if (!body?.name?.trim() || !isEmail(body.email) || !Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 422 });
  }

  const ref = reference();
  const text = toPlainText(body, ref);

  const webhook = process.env.QUOTE_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL || "Ériu Quotes <onboarding@resend.dev>";

  try {
    if (webhook) {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ reference: ref, summary: text, ...body }),
      });
      if (!r.ok) throw new Error(`webhook ${r.status}`);
      return NextResponse.json({ ok: true, reference: ref });
    }

    if (resendKey && to) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          reply_to: body.email,
          subject: `Quote request ${ref} — ${body.name}`,
          text,
        }),
      });
      if (!r.ok) throw new Error(`resend ${r.status}`);
      return NextResponse.json({ ok: true, reference: ref });
    }

    // Nothing configured — be honest, don't fake receipt.
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 501 });
  } catch {
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }
}
