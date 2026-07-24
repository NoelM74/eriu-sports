import Link from "next/link";
import Garment from "@/components/shop/Garment";
import PricingCalculator from "./PricingCalculator";
import { familyCounts, FAMILY_LABELS } from "@/lib/catalog";
import type { Family } from "@/lib/catalog/types";

/* ---------- Spec strip ---------- */
export function SpecStrip() {
  const items = [
    { b: <>10<em>pc</em></>, s: "Minimum order" },
    { b: <>8</>, s: "Product families" },
    { b: <>40<em>+</em></>, s: "Stock colourways" },
    { b: <>3</>, s: "Branding methods" },
    { b: <>XS–4XL</>, s: "Men & women fits" },
    { b: <>10–14<em>d</em></>, s: "Production lead" },
  ];
  return (
    <div className="e-spec-strip">
      <div className="e-wrap">
        <div className="e-spec-row">
          {items.map((it, i) => (
            <div className="e-spec" key={i}>
              <b>{it.b}</b>
              <span>{it.s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- The Range ---------- */
const FAMILY_STYLE: Record<Family, { body: string; trim: string; gender: string }> = {
  tee: { body: "#1A533E", trim: "#0F2131", gender: "Men + Women" },
  tank: { body: "#1C7C83", trim: "#0F2131", gender: "Men + Women" },
  compression: { body: "#151515", trim: "#1C7C83", gender: "Men + Women" },
  shorts: { body: "#133D2D", trim: "#C7E85B", gender: "Men + Women" },
  leggings: { body: "#155F65", trim: "#CBC3AF", gender: "Women + Men" },
  yoga: { body: "#CBC3AF", trim: "#1A533E", gender: "Women + Men" },
  layer: { body: "#0F2131", trim: "#1C7C83", gender: "Men + Women" },
  accessory: { body: "#1A533E", trim: "#C7E85B", gender: "One size" },
};

export function RangeGrid() {
  const families = familyCounts();
  return (
    <section id="range" className="e-section e-wrap">
      <div className="e-sec-head" data-reveal>
        <div>
          <p className="e-eyebrow">The Range · Blanks built to be branded</p>
          <h2>Everything your<br />squad trains in.</h2>
        </div>
        <p className="lead">
          One supplier, one consistent fit block across the whole kit — so tops, shorts and layers all sit
          right on every body, men and women alike.
        </p>
      </div>

      <div className="e-grid-4">
        {families.map(({ family, count }) => {
          const st = FAMILY_STYLE[family];
          return (
            <Link className="e-card" href={`/shop?family=${family}`} key={family}>
              <span className="e-gtag">{st.gender}</span>
              <div className="art">
                <Garment family={family} body={st.body} trim={st.trim} title={FAMILY_LABELS[family]} />
              </div>
              <div className="meta">
                <div className="top">
                  <h3>{FAMILY_LABELS[family]}</h3>
                  <span className="sub">{count} {count === 1 ? "style" : "styles"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Customise (3-step + pricing) ---------- */
export function Customise() {
  return (
    <section id="customise" className="e-dark-sec e-section">
      <div className="e-wrap">
        <div className="e-sec-head" data-reveal>
          <div>
            <p className="e-eyebrow" style={{ color: "var(--e-teal-br)" }}>
              Customise · Your logo, your colours, your kit
            </p>
            <h2>Three steps from<br />blank to branded.</h2>
          </div>
          <p>
            No art fees on approved logos. No reorder minimums once your kit is on file. Free digital
            mock-up before anything goes into production.
          </p>
        </div>

        <div className="e-steps">
          <div className="e-step" data-reveal>
            <p className="no">STEP 01</p>
            <h3>Pick your blanks</h3>
            <p>Choose garments and colourways from the range and set your size run — e.g. 4×S, 10×M, 6×L. Mix men&apos;s and women&apos;s fits in one order.</p>
            <span className="ico"><svg viewBox="0 0 100 100" fill="none" stroke="var(--e-teal-br)" strokeWidth="4"><rect x="20" y="20" width="60" height="60" rx="6" /><path d="M32 44h36M32 58h24" /></svg></span>
          </div>
          <div className="e-step" data-reveal>
            <p className="no">STEP 02</p>
            <h3>Add your branding</h3>
            <p>Upload a logo, drop pins for placement — left chest, full back, sleeve — and choose print, embroidery or full-colour sublimation. Add names &amp; numbers per unit.</p>
            <span className="ico"><svg viewBox="0 0 100 100" fill="none" stroke="var(--e-teal-br)" strokeWidth="4"><circle cx="50" cy="50" r="30" /><path d="M38 50l8 8 16-18" /></svg></span>
          </div>
          <div className="e-step" data-reveal>
            <p className="no">STEP 03</p>
            <h3>We make it</h3>
            <p>Approve the digital mock-up and unit price, and we produce and ship in 10–14 days. Reorders in two clicks, at the same locked-in pricing.</p>
            <span className="ico"><svg viewBox="0 0 100 100" fill="none" stroke="var(--e-teal-br)" strokeWidth="4"><path d="M20 40l30-16 30 16-30 16z" /><path d="M20 40v24l30 16 30-16V40" /></svg></span>
          </div>
        </div>

        <PricingCalculator />
      </div>
    </section>
  );
}

/* ---------- Fabric tech ---------- */
const TECH = [
  { tag: "Dry < 3 min", h: "Rapid Quick-Dry", p: "Moisture-wicking knit pulls sweat off the skin and spreads it wide to flash-evaporate — the wetter it gets, the faster it works.", d: "M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11Z" },
  { tag: "Air-flow mesh", h: "Breathable Panels", p: "Engineered mesh zones at the back and underarm keep air moving through the highest-heat areas during hard efforts.", d: "M4 8h13a3 3 0 1 0-3-3M4 12h16M4 16h11a3 3 0 1 1-3 3" },
  { tag: "4-way stretch", h: "Full-Range Stretch", p: "Elastane-blended knit moves with a squat, a reach and a sprint, then recovers its shape — no bagging at the knee or seat.", d: "M4 12h4l2-5 4 10 2-5h4" },
  { tag: "Anti-microbial", h: "Odour Control", p: "An anti-microbial finish resists the bacteria that cause kit to smell — so training tops stay fresher between washes.", d: "M12 3l7 4v5c0 5-3 8-7 9-4-1-7-4-7-9V7z" },
  { tag: "UPF 50+", h: "Sun-Ready", p: "Outdoor and marathon styles block UV so your club stays covered through long sessions in open sun.", d: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v3M12 19v3M2 12h3M19 12h3" },
  { tag: "240 GSM", h: "Squat-Proof Knit", p: "Higher-density fabric on leggings and yoga styles stays fully opaque under stretch — tested, not assumed.", d: "M6 3v6a6 6 0 0 0 12 0V3M4 21h16" },
];

export function FabricTech() {
  return (
    <section id="fabric" className="e-section e-wrap">
      <div className="e-sec-head" data-reveal>
        <div>
          <p className="e-eyebrow">Fabric technology · Engineered to perform</p>
          <h2>Not blanks.<br />Base layers with a spec sheet.</h2>
        </div>
        <p className="lead">Every body is knit from performance yarn and rated, so what you order is what you get — batch after batch.</p>
      </div>
      <div className="e-tech-grid">
        {TECH.map((t) => (
          <div className="e-tech" key={t.h} data-reveal>
            <div className="row">
              <div className="badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={t.d} /></svg></div>
              <span className="stag">{t.tag}</span>
            </div>
            <h3>{t.h}</h3>
            <p>{t.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Use cases ---------- */
export function UseCases() {
  return (
    <section id="cases" className="e-section e-wrap">
      <div className="e-sec-head" data-reveal>
        <div>
          <p className="e-eyebrow">Built for · Every kind of team</p>
          <h2>Who we kit out.</h2>
        </div>
        <p className="lead">From a twelve-person CrossFit box to a nationwide corporate rollout — same range, same quality, scaled to the order.</p>
      </div>
      <div className="e-cases">
        <Link href="/for/teams" className="e-case c1" data-reveal>
          <div className="bg" />
          <span className="wm"><svg viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="3"><circle cx="50" cy="50" r="30" /><path d="M50 20v60M20 50h60" /></svg></span>
          <div className="body">
            <p className="k">Clubs &amp; Teams</p>
            <h3>Match-day to<br />training kit</h3>
            <p>Full squad kits with names, numbers and sponsor logos — consistent across every player, replaceable one unit at a time.</p>
            <span className="go">See team kits →</span>
          </div>
        </Link>
        <Link href="/for/gyms" className="e-case c2" data-reveal>
          <div className="bg" />
          <span className="wm"><svg viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 50h60M30 35v30M70 35v30M20 42v16M80 42v16" /></svg></span>
          <div className="body">
            <p className="k">Gyms &amp; Studios</p>
            <h3>Retail-ready<br />branded lines</h3>
            <p>Your own-brand activewear to sell at the front desk — tanks, leggings and hoodies your members actually want to wear out.</p>
            <span className="go">Build a gym line →</span>
          </div>
        </Link>
        <Link href="/for/business" className="e-case c3" data-reveal>
          <div className="bg" />
          <span className="wm"><svg viewBox="0 0 100 100" fill="none" stroke="#fff" strokeWidth="3"><rect x="24" y="30" width="52" height="40" rx="4" /><path d="M40 30v-6h20v6" /></svg></span>
          <div className="body">
            <p className="k">Corporate &amp; Events</p>
            <h3>Merch that<br />gets worn</h3>
            <p>Conference drops, charity runs and staff kits people keep — premium leisurewear branded to your identity, not landfill tees.</p>
            <span className="go">Plan an event drop →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ---------- Proof ---------- */
export function Proof() {
  return (
    <div className="e-proof">
      <div className="e-wrap e-section e-proof-in">
        <div data-reveal>
          <p className="e-eyebrow">Why brands reorder</p>
          <p className="e-quote">
            &ldquo;We came for the price break on 200 tanks. We{" "}
            <span className="hl">stayed because the fabric and fit matched the big activewear labels</span>{" "}
            — at a kit-supplier price.&rdquo;
          </p>
          <p className="e-quote-by">— Studio owner · 6-location fitness group, Leinster</p>
        </div>
        <div className="e-logos" data-reveal>
          <div className="lg">NORTHSIDE BOX <span>· CrossFit</span></div>
          <div className="lg">TARA RUGBY <span>· Club</span></div>
          <div className="lg">FLOW STUDIO <span>· Yoga</span></div>
          <div className="lg">MERIDIAN <span>· Corporate</span></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Final CTA ---------- */
export function FinalCTA() {
  return (
    <section className="e-section e-wrap e-cta">
      <div className="e-cta-card" data-reveal>
        <p className="e-eyebrow">Start today</p>
        <h2>Your brand, on gear worth wearing.</h2>
        <p>Send us your logo and roughly what you need. We&apos;ll come back with a digital mock-up and a locked-in unit price within one working day — free, no commitment.</p>
        <div className="row">
          <Link className="e-btn e-btn-solid" href="/customise">Start a bulk order →</Link>
          <Link className="e-btn e-btn-ghost" href="/customise">Order a sample pack</Link>
        </div>
      </div>
    </section>
  );
}
