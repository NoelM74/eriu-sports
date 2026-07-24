"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Garment from "@/components/shop/Garment";
import { useOrder } from "@/lib/order-context";
import {
  orderTotal,
  nextTier,
  fromPrice,
  bestPrice,
  FAMILY_LABELS,
  GENDER_LABELS,
} from "@/lib/catalog";
import type { Product, SizeRun } from "@/lib/catalog/types";

const METHOD_LABELS: Record<string, string> = {
  print: "Screen print",
  embroidery: "Embroidery",
  sublimation: "Sublimation",
};

function fmt(n: number): string {
  return n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ProductConfigurator({ product }: { product: Product }) {
  const { addLine } = useOrder();
  const [cwIndex, setCwIndex] = useState(0);
  const [run, setRun] = useState<SizeRun>(() =>
    Object.fromEntries(product.sizes.map((s) => [s, 0]))
  );
  const [method, setMethod] = useState(product.branding.methods[0]);
  const [placement, setPlacement] = useState(product.branding.placements[0]);
  const [namesNumbers, setNamesNumbers] = useState(false);
  const [toast, setToast] = useState(false);

  const cw = product.colourways[cwIndex];
  const summary = useMemo(() => orderTotal(product, run, namesNumbers), [product, run, namesNumbers]);
  const nt = useMemo(() => nextTier(product, summary.qty), [product, summary.qty]);
  const from = fromPrice(product);
  const best = bestPrice(product);

  const setSize = (size: string, value: number) => {
    setRun((r) => ({ ...r, [size]: Math.max(0, Math.min(9999, Math.floor(value || 0))) }));
  };

  const canOrder = summary.meetsMoq;

  const addToOrder = () => {
    if (!canOrder) return;
    addLine({
      slug: product.slug,
      colourwayId: cw.id,
      run: { ...run },
      method,
      placement,
      namesNumbers,
    });
    setToast(true);
    window.setTimeout(() => setToast(false), 5000);
  };

  return (
    <>
      <div className="e-pdp">
        {/* ---- Media ---- */}
        <div className="e-pdp-media">
          <div className="e-pdp-stage">
            {product.badge && <span className="badge">{product.badge}</span>}
            <Garment family={product.family} body={cw.body} trim={cw.trim} title={`${product.name} in ${cw.name}`} />
          </div>
          <div className="e-pdp-thumbs" role="group" aria-label="Colourway preview">
            {product.colourways.map((c, i) => (
              <button
                key={c.id}
                className="e-thumb"
                aria-pressed={i === cwIndex}
                aria-label={c.name}
                onClick={() => setCwIndex(i)}
              >
                <Garment family={product.family} body={c.body} trim={c.trim} title={c.name} />
              </button>
            ))}
          </div>
        </div>

        {/* ---- Buy box ---- */}
        <div>
          <p className="e-pdp-fam">{FAMILY_LABELS[product.family]} · {GENDER_LABELS[product.gender]}</p>
          <h1>{product.name}</h1>
          <p className="tagline">{product.tagline}</p>
          {product.rating && (
            <div className="e-pdp-rating">
              <span className="stars">{"★".repeat(Math.round(product.rating))}</span>
              <span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
            </div>
          )}

          <div className="e-pdp-from">
            <span className="lbl">From</span>
            <span className="v">€{from.toFixed(2)}</span>
            <span className="to">down to €{best.toFixed(2)} at volume</span>
          </div>

          {/* Colourway */}
          <div className="e-field">
            <div className="e-field-head">
              <h3>Colourway</h3>
              <span className="hint">{cw.name}</span>
            </div>
            <div className="e-cw-row">
              {product.colourways.map((c, i) => (
                <button
                  key={c.id}
                  className="e-cw"
                  style={{ background: c.body }}
                  aria-pressed={i === cwIndex}
                  aria-label={c.name}
                  onClick={() => setCwIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Size run matrix */}
          <div className="e-field">
            <div className="e-field-head">
              <h3>Size run</h3>
              <span className="hint">Quantity per size · MOQ {product.moq}</span>
            </div>
            <div className="e-matrix">
              {product.sizes.map((size) => (
                <div className={`e-size-cell${(run[size] || 0) > 0 ? " filled" : ""}`} key={size}>
                  <label htmlFor={`sz-${size}`}>{size}</label>
                  <input
                    id={`sz-${size}`}
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={run[size] || 0}
                    onChange={(e) => setSize(size, parseInt(e.target.value, 10))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Branding */}
          <div className="e-field">
            <div className="e-field-head">
              <h3>Branding method</h3>
              <span className="hint">Included in unit price</span>
            </div>
            <div className="e-seg">
              {product.branding.methods.map((m) => (
                <button key={m} aria-pressed={method === m} onClick={() => setMethod(m)}>
                  {METHOD_LABELS[m] ?? m}
                </button>
              ))}
            </div>
          </div>

          <div className="e-field">
            <div className="e-field-head">
              <h3>Placement</h3>
              <span className="hint">Add more at checkout</span>
            </div>
            <div className="e-seg">
              {product.branding.placements.map((pl) => (
                <button key={pl} aria-pressed={placement === pl} onClick={() => setPlacement(pl)}>
                  {pl}
                </button>
              ))}
            </div>
          </div>

          {product.branding.namesAndNumbers && (
            <label className="e-check">
              <input
                type="checkbox"
                checked={namesNumbers}
                onChange={(e) => setNamesNumbers(e.target.checked)}
              />
              Add player names &amp; numbers (+€{product.branding.namesAndNumbersPrice.toFixed(2)}/unit)
            </label>
          )}

          {/* Live order summary */}
          <div className="e-order">
            <div className="e-order-top">
              <div>
                <span className="lbl">Unit price</span>
                <div className="u"><span className="cur">€</span>{fmt(summary.unit + summary.brandingPerUnit)}</div>
              </div>
              <div className="qtyb">
                <span className="lbl">Total units</span>
                <b style={{ display: "block" }}>{summary.qty}</b>
              </div>
            </div>

            {!summary.meetsMoq ? (
              <div className="e-order-nudge warn">
                Add {product.moq - summary.qty} more to reach the {product.moq}-piece minimum order.
              </div>
            ) : nt ? (
              <div className="e-order-nudge">
                Add {nt.addUnits} more to unlock €{fmt(nt.newUnit)}/unit — the next volume break.
              </div>
            ) : (
              <div className="e-order-nudge">Best volume price unlocked. 🎉</div>
            )}

            <div className="e-order-foot">
              <div className="tot">
                <span className="lbl">Order total</span>
                <div className="v">€{fmt(summary.total)}</div>
              </div>
              {summary.savingsPct > 0 && <span className="save">Saving {summary.savingsPct}%</span>}
            </div>
          </div>

          <div className="e-pdp-cta">
            <button
              className="e-btn e-btn-solid e-btn-block"
              onClick={addToOrder}
              disabled={!canOrder}
              style={!canOrder ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            >
              {canOrder ? "Add to order →" : `Add ${product.moq}+ pieces to continue`}
            </button>
          </div>
          <div className="e-pdp-cta">
            <a className="e-btn e-btn-ghost e-btn-block" href="/customise">Request a quote / samples</a>
          </div>

          <div className="e-trust">
            <span>✓ 10–14 day production</span>
            <span>✓ Free digital mock-up</span>
            <span>✓ Reorder anytime</span>
          </div>
        </div>
      </div>

      <div className={`e-toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        <span>✓ Added {summary.qty} × {product.name} ({cw.name}) — €{fmt(summary.total)}</span>
        <Link href="/order">View order →</Link>
      </div>
    </>
  );
}
