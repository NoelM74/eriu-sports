"use client";

import Link from "next/link";
import { useState } from "react";
import Garment from "@/components/shop/Garment";

const COLOURWAYS = [
  { name: "Onyx", body: "#151515", trim: "#C7E85B" },
  { name: "Ériu Emerald", body: "#1A533E", trim: "#0F2131" },
  { name: "Teal", body: "#1C7C83", trim: "#0F2131" },
  { name: "Stone", body: "#CBC3AF", trim: "#1A533E" },
  { name: "Blush", body: "#D6A7AD", trim: "#151515" },
  { name: "Volt", body: "#C7E85B", trim: "#151515" },
  { name: "Midnight", body: "#0F2131", trim: "#1C7C83" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const cw = COLOURWAYS[active];

  return (
    <section className="e-hero">
      <div className="e-wrap e-hero-grid">
        <div data-reveal>
          <p className="e-eyebrow">Custom activewear manufacturer · Made to order</p>
          <h1>
            Performance<br />wear, <em>branded</em><br /><span className="out">as yours.</span>
          </h1>
          <p className="e-hero-sub">
            Premium blank activewear, finished with <b>your</b> logo and colours.
            For teams, gyms and brands — in bulk, from just ten pieces.
          </p>
          <div className="e-hero-cta">
            <Link className="e-btn e-btn-teal" href="/shop">Shop the range →</Link>
            <Link className="e-btn e-btn-ghost" href="/customise">Order samples</Link>
          </div>
          <div className="e-hero-stats">
            <div><b>620<em>+</em></b><span>Teams &amp; brands kitted</span></div>
            <div><b>85k</b><span>Units shipped / yr</span></div>
            <div><b>10<em>pc</em></b><span>Minimum order</span></div>
            <div><b>4.9<em>★</em></b><span>Client rating</span></div>
          </div>
        </div>

        <div data-reveal>
          <div className="e-stage">
            <span className="tag">Vela Racer Tank · <em>Unisex</em></span>
            <Garment family="tank" body={cw.body} trim={cw.trim} title={`Racer tank in ${cw.name}`} />
          </div>
          <div className="e-swatches" role="group" aria-label="Choose a colourway">
            {COLOURWAYS.map((c, i) => (
              <button
                key={c.name}
                className="e-sw"
                style={{ background: c.body }}
                aria-pressed={i === active}
                aria-label={c.name}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <p className="e-sw-label">Colourway · <b>{cw.name}</b> — 1 of 40+ stock shades</p>
        </div>
      </div>
    </section>
  );
}
