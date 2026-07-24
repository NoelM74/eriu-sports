"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useOrder, lineSummary } from "@/lib/order-context";
import { FAMILY_LABELS } from "@/lib/catalog";

const SALES_EMAIL = "sales@eriusports.com";
const METHOD_LABELS: Record<string, string> = { print: "Screen print", embroidery: "Embroidery", sublimation: "Sublimation" };
const fmt = (n: number) => n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface Form {
  name: string; company: string; email: string; phone: string; country: string; needBy: string; notes: string;
}

export default function CheckoutPage() {
  const { lines, totalUnits, orderTotal, clear } = useOrder();
  const [form, setForm] = useState<Form>({ name: "", company: "", email: "", phone: "", country: "Ireland", needBy: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [ref, setRef] = useState<string | null>(null);

  const summaryText = useMemo(() => {
    const rows = lines.map((l) => {
      const s = lineSummary(l);
      if (!s.product) return "";
      const cw = s.product.colourways.find((c) => c.id === l.colourwayId)?.name ?? "";
      const run = Object.entries(l.run).filter(([, n]) => n > 0).map(([sz, n]) => `${n}×${sz}`).join(" ");
      return `• ${s.qty} × ${s.product.name} (${cw}) — ${METHOD_LABELS[l.method] ?? l.method}, ${l.placement}${l.namesNumbers ? ", names & numbers" : ""} [${run}] @ €${fmt(s.unit + s.brandingPerUnit)}/unit = €${fmt(s.total)}`;
    });
    return rows.join("\n");
  }, [lines]);

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = "Please add your name.";
    if (!form.email.trim()) e.email = "Please add your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email doesn't look right.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const mailtoHref = () => {
    const body = [
      `Quote request from ${form.name}${form.company ? ` (${form.company})` : ""}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : "",
      `Deliver to: ${form.country}`,
      form.needBy ? `Needed by: ${form.needBy}` : "",
      "",
      "Order:",
      summaryText,
      "",
      `Total: ${totalUnits} pieces — €${fmt(orderTotal)} (est.)`,
      form.notes ? `\nNotes: ${form.notes}` : "",
    ].filter(Boolean).join("\n");
    return `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(`Quote request — ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setRef(`ER-${Date.now().toString(36).toUpperCase().slice(-6)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- Confirmation ---
  if (ref) {
    return (
      <div className="eriu">
        <section className="e-section e-wrap" style={{ maxWidth: 640, textAlign: "center" }}>
          <p className="e-eyebrow">Request received</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", textTransform: "uppercase", margin: ".6rem 0 1rem" }}>
            Thanks, {form.name.split(" ")[0]}.
          </h2>
          <p style={{ color: "var(--e-muted)", marginBottom: "1.4rem" }}>
            Your reference is <b className="e-mono" style={{ color: "var(--e-ink)" }}>{ref}</b>. We&apos;ll send your
            digital mock-up and a locked-in quote within one working day.
          </p>
          <div style={{ display: "flex", gap: ".7rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="e-btn e-btn-solid" href={mailtoHref()}>Email us the details too</a>
            <Link className="e-btn e-btn-ghost" href="/shop" onClick={() => clear()}>Start a new order</Link>
          </div>
          <p style={{ color: "var(--e-muted)", fontFamily: "var(--font-mono)", fontSize: ".7rem", marginTop: "1.6rem" }}>
            Note: this is a demo submission. Connecting it to email + payment is the final wiring step.
          </p>
        </section>
      </div>
    );
  }

  // --- Empty ---
  if (lines.length === 0) {
    return (
      <div className="eriu">
        <section className="e-section e-wrap" style={{ textAlign: "center", maxWidth: 560 }}>
          <p className="e-eyebrow">Request a quote</p>
          <h2 style={{ fontSize: "clamp(1.8rem,5vw,2.6rem)", textTransform: "uppercase", margin: ".6rem 0 1rem" }}>Your order is empty.</h2>
          <p style={{ color: "var(--e-muted)", marginBottom: "1.6rem" }}>Add a few styles and set your size runs first.</p>
          <Link className="e-btn e-btn-solid" href="/shop">Shop the range →</Link>
        </section>
      </div>
    );
  }

  // --- Form ---
  return (
    <div className="eriu">
      <section className="e-section e-wrap">
        <div className="e-breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/order">Your order</Link><span>/</span><span>Request a quote</span>
        </div>
        <div className="e-sec-head"><div><p className="e-eyebrow">No payment now · Free mock-up</p><h2>Request your quote.</h2></div></div>

        <div className="e-cartwrap">
          <form className="e-form" onSubmit={submit} noValidate>
            <div className="e-form-row">
              <Field label="Your name *" id="name" value={form.name} onChange={(v) => set("name", v)} error={errors.name} />
              <Field label="Company / club" id="company" value={form.company} onChange={(v) => set("company", v)} />
            </div>
            <div className="e-form-row">
              <Field label="Email *" id="email" type="email" value={form.email} onChange={(v) => set("email", v)} error={errors.email} />
              <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
            </div>
            <div className="e-form-row">
              <Field label="Deliver to (country)" id="country" value={form.country} onChange={(v) => set("country", v)} />
              <Field label="Needed by (optional)" id="needBy" type="date" value={form.needBy} onChange={(v) => set("needBy", v)} />
            </div>
            <div className="e-form-field">
              <label htmlFor="notes">Anything else? (logo, colours, deadline)</label>
              <textarea id="notes" rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
            <button className="e-btn e-btn-solid e-btn-block" type="submit" style={{ marginTop: ".4rem" }}>Send my request →</button>
            <p style={{ color: "var(--e-muted)", fontFamily: "var(--font-mono)", fontSize: ".68rem", marginTop: ".8rem" }}>
              We reply within one working day. No charge until you approve your mock-up.
            </p>
          </form>

          <aside className="e-summary">
            <h3>Your order</h3>
            {lines.map((l) => {
              const s = lineSummary(l);
              if (!s.product) return null;
              const cw = s.product.colourways.find((c) => c.id === l.colourwayId)?.name ?? "";
              return (
                <div className="row" key={l.id}>
                  <span>{s.qty} × {s.product.name}<br /><span style={{ color: "var(--e-muted)", fontSize: ".8em" }}>{FAMILY_LABELS[s.product.family]} · {cw}</span></span>
                  <b>€{fmt(s.total)}</b>
                </div>
              );
            })}
            <div className="row" style={{ borderTop: "1px solid var(--e-line)", paddingTop: ".8rem", marginTop: ".2rem" }}>
              <span>Total ({totalUnits} pcs)</span><b>€{fmt(orderTotal)}</b>
            </div>
            <Link className="e-btn e-btn-ghost e-btn-block" href="/order" style={{ marginTop: ".8rem" }}>Edit order</Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Field({
  label, id, value, onChange, type = "text", error,
}: {
  label: string; id: string; value: string; onChange: (v: string) => void; type?: string; error?: string;
}) {
  return (
    <div className="e-form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className={error ? "err" : ""} />
      {error && <span className="e-form-err">{error}</span>}
    </div>
  );
}
