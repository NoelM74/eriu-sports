"use client";

import { useState } from "react";

// Vela Racer Tank tiers (mirror of data/catalog pricing for the marketing demo).
const BASE = 22;
function unitPrice(q: number): number {
  if (q >= 250) return 13.0;
  if (q >= 100) return 15.0;
  if (q >= 50) return 17.0;
  if (q >= 25) return 19.5;
  return 22.0;
}
function fmt(n: number): string {
  return n.toLocaleString("en-IE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PricingCalculator() {
  const [qty, setQty] = useState(50);
  const unit = unitPrice(qty);
  const pct = Math.round((1 - unit / BASE) * 100);

  return (
    <div className="e-pricer" id="pricing" data-reveal>
      <div>
        <p className="lbl">Live volume pricing · Vela Racer Tank, 1-colour print</p>
        <h3>The more you kit, the less you pay.</h3>
        <div className="e-qty-read"><b>{qty}</b><span className="lbl">units</span></div>
        <input
          type="range"
          min={10}
          max={500}
          step={5}
          value={qty}
          onChange={(e) => setQty(parseInt(e.target.value, 10))}
          aria-label="Order quantity"
        />
        <div className="e-ticks"><span>10</span><span>50</span><span>100</span><span>250</span><span>500</span></div>
      </div>
      <div className="e-price-out">
        <p className="lbl">Your unit price</p>
        <div className="unit"><span className="cur">€</span><span className="val">{fmt(unit)}</span></div>
        <p className="per">per piece · incl. 1 branding position</p>
        <p className="tot">Order total <em>€{fmt(unit * qty)}</em></p>
        <span className="e-save">{pct > 0 ? `Save ${pct}% vs. 10-pack` : "Best small-batch rate"}</span>
      </div>
    </div>
  );
}
