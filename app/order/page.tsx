"use client";

import Link from "next/link";
import Garment from "@/components/shop/Garment";
import { useOrder, lineSummary } from "@/lib/order-context";
import { nextTier, FAMILY_LABELS, GENDER_LABELS } from "@/lib/catalog";

const METHOD_LABELS: Record<string, string> = {
  print: "Screen print",
  embroidery: "Embroidery",
  sublimation: "Sublimation",
};
const fmt = (n: number) => n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function OrderPage() {
  const { lines, updateLine, removeLine, clear, totalUnits, orderTotal } = useOrder();

  if (lines.length === 0) {
    return (
      <div className="eriu">
        <section className="e-section e-wrap" style={{ textAlign: "center", maxWidth: 620 }}>
          <p className="e-eyebrow">Your order</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", textTransform: "uppercase", margin: ".6rem 0 1rem" }}>
            Nothing here yet.
          </h2>
          <p style={{ color: "var(--e-muted)", marginBottom: "1.6rem" }}>
            Build a size run on any product and it lands here. Mix as many styles as you like — the
            minimum is 10 pieces per product.
          </p>
          <Link className="e-btn e-btn-solid" href="/shop">Shop the range →</Link>
        </section>
      </div>
    );
  }

  return (
    <div className="eriu">
      <section className="e-section e-wrap">
        <div className="e-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Your order</span></div>
        <div className="e-sec-head">
          <div>
            <p className="e-eyebrow">Your order · {lines.length} {lines.length === 1 ? "line" : "lines"} · {totalUnits} pieces</p>
            <h2>Build your kit.</h2>
          </div>
        </div>

        <div className="e-cartwrap">
          <div className="e-lines">
            {lines.map((line) => {
              const s = lineSummary(line);
              const product = s.product;
              if (!product) return null;
              const cw = product.colourways.find((c) => c.id === line.colourwayId) ?? product.colourways[0];
              const nt = nextTier(product, s.qty);
              const sizes = product.sizes;
              return (
                <div className="e-line" key={line.id}>
                  <div className="e-line-media">
                    <Garment family={product.family} body={cw.body} trim={cw.trim} title={`${product.name} in ${cw.name}`} />
                  </div>
                  <div className="e-line-body">
                    <div className="e-line-head">
                      <div>
                        <Link href={`/shop/${product.slug}`}><h3>{product.name}</h3></Link>
                        <p className="e-line-meta">
                          {FAMILY_LABELS[product.family]} · {GENDER_LABELS[product.gender]} · {cw.name}
                        </p>
                        <p className="e-line-meta">
                          {METHOD_LABELS[line.method] ?? line.method} · {line.placement}
                          {line.namesNumbers ? " · names & numbers" : ""}
                        </p>
                      </div>
                      <button className="e-line-remove" onClick={() => removeLine(line.id)} aria-label="Remove line">Remove</button>
                    </div>

                    <div className="e-matrix e-line-matrix">
                      {sizes.map((size) => (
                        <div className={`e-size-cell${(line.run[size] || 0) > 0 ? " filled" : ""}`} key={size}>
                          <label htmlFor={`${line.id}-${size}`}>{size}</label>
                          <input
                            id={`${line.id}-${size}`}
                            type="number"
                            min={0}
                            inputMode="numeric"
                            value={line.run[size] || 0}
                            onChange={(e) =>
                              updateLine(line.id, {
                                run: { ...line.run, [size]: Math.max(0, Math.floor(parseInt(e.target.value, 10) || 0)) },
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {!s.meetsMoq ? (
                      <p className="e-line-nudge warn">Add {product.moq - s.qty} more to reach the {product.moq}-piece minimum.</p>
                    ) : nt ? (
                      <p className="e-line-nudge">Add {nt.addUnits} more to drop to €{fmt(nt.newUnit)}/unit.</p>
                    ) : (
                      <p className="e-line-nudge">Best volume price unlocked.</p>
                    )}
                  </div>

                  <div className="e-line-price">
                    <span className="lbl">€{fmt(s.unit + s.brandingPerUnit)}/unit</span>
                    <span className="q">{s.qty} pcs</span>
                    <b>€{fmt(s.total)}</b>
                    {s.savingsPct > 0 && <span className="sv">−{s.savingsPct}%</span>}
                  </div>
                </div>
              );
            })}
            <button className="e-line-remove" style={{ marginTop: ".4rem" }} onClick={clear}>Clear order</button>
          </div>

          <aside className="e-summary">
            <h3>Order summary</h3>
            <div className="row"><span>Total pieces</span><b>{totalUnits}</b></div>
            <div className="row"><span>Estimated total</span><b>€{fmt(orderTotal)}</b></div>
            <p className="e-summary-note">
              Prices update live with your quantities. Artwork, setup and delivery are confirmed on your
              free quote — no charge until you approve it.
            </p>
            <Link className="e-btn e-btn-solid e-btn-block" href="/order/checkout">Request a quote →</Link>
            <Link className="e-btn e-btn-ghost e-btn-block" href="/shop" style={{ marginTop: ".6rem" }}>Add more styles</Link>
            <div className="e-summary-trust">
              <span>✓ Free mock-up</span><span>✓ 10–14 day make</span><span>✓ Reorder anytime</span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
