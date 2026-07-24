# LLM Council Transcript — Ériu Rebuild Review
**Date:** 2026-07-24
**Question:** Review everything created so far for improvements or shortfalls.

## Framed question
Review the Ériu rebuild (live Next.js/Cloudflare e-commerce site being rebuilt on a branch from a retro football-jersey shop into a custom bulk performance-leisurewear manufacturer). Built so far: new design system, homepage, 24-product catalogue with a bulk size-run configurator + tiered pricing + branding options, an /order cart, and a /order/checkout quote form that is currently a demo with a mailto fallback. Products are SVG silhouettes (no photography); legacy jersey pages + payment routes still present; not yet deployed. At stake: replacing a live revenue site and flipping B2C single-item → B2B bulk/quote.

## Anonymisation map (revealed)
- Response A = The Expansionist
- Response B = The Contrarian
- Response C = The Executor
- Response D = The First Principles Thinker
- Response E = The Outsider

---

## Advisor responses

### The Contrarian
The demo checkout isn't a "known gap" to wire later — it's a live trap. Checkout mints a reference and tells the customer "we'll send your quote within one working day." Nothing is sent. The mailto is an optional afterthought that most won't click and that depends on a configured mail client. The happy path manufactures false confidence and silently drops real B2B leads — worse than a broken button. Second landmine: two parallel commerce systems coexist — legacy Stripe/PayPal cart/checkout/products/catalog ship alongside new /order and /shop, meaning live payment endpoints, duplicate SEO content, split trust, and a customer who can actually pay for a single jersey on a site that claims 10-piece minimums. Third: MOQ is enforced per product page, but the cart has no cross-order minimum. And the fatal non-technical flaw: pitching "world-class, built to perfection" B2B trust while every product is an SVG silhouette. No buyer drops four figures on bulk activewear they've never seen photographed. That gap, not the code, sinks launch.

### The First Principles Thinker
You're optimising the storefront. But a B2B bulk buyer converts on trust that a factory 500km away will deliver 250 correctly-branded garments, on time, at an agreed price. Everything world-class about the build — colourway switcher, volume slider, JSON-LD — answers a B2C question in a market that asks a B2B one. The three things that close a bulk quote: proof of production capability (real samples, client logos, turnaround, MOQ economics), a frictionless human quote path, and a sample/first-order de-risker. The build has none — checkout is a mailto demo, products are silhouettes, no factory story, no lead time, no "order a sample pack," no case study. The real risk isn't copy or Lighthouse; it's flipping a live revenue B2C site into a B2B model whose funnel (quote→sample→PO→repeat) has never been validated with one real buyer. Reframe the milestone: not "finish 100 products," but "get one real bulk quote through a working inbox with real photography of three hero products." Ship it as a lead-gen page against the live site first; don't replace proven revenue with an unproven model.

### The Expansionist
The configurator and typed data model are the crown jewels, and they're being treated as store furniture instead of the actual product. What's built — per-unit tiered pricing, branding methods, placements, size-run matrices, MOQ logic, fabric specs, curated cross-sell — is a quote engine, not a catalogue. The 10x move: expose it as a shareable, editable quote link a coach/gym owner can tweak and forward to whoever holds the budget. Adjacent upside: drop a logo onto the SVG garment for see-your-brand-before-you-buy (Gymshark can't); saved-config reorders as a recurring-revenue moat; the data model as a wedge into corporate merch, events, hospitality, universities (each a landing page + filter); programmatic SEO (products × families × use-cases × cities = hundreds of "custom tank tops for gyms in Dublin" pages). It's a kit-configuration platform that happens to sell blanks — price and position it as the former.

### The Outsider
Walking in cold: the name "ÉRIU" stops me — I can't say it, don't know what it means or what you sell. "Performance wear, branded as yours" — I read it twice; am I buying clothes or a service? The cartoon silhouette drawings kill the "premium" claim — for a 10+ order with my logo I need real stitching, fabric, people. The stats ("620+ teams, 85k units/yr, 4.9★") read as invented with no names, logos, or reviews behind them. I never learn what it costs — a slider that "drops" but the real number hides behind "request a quote." Too many front doors — "Shop the range," "Order samples," "Start a bulk order," "Request a quote" — four verbs for one thing; tell me the ONE next step. And who are you? No "made in," no lead times, no faces, no minimum-to-delivery timeline. That silence stops me ordering.

### The Executor
The single biggest blocker: the checkout goes nowhere. A mailto fallback is not "taking orders" — you have a brochure, not a business. Critical path: (1) Day 1-2, wire the quote form to a real destination (Formspree, Resend, or Supabase) that emails the owner and stores the lead — no Stripe needed; this is quote-request. (2) Day 1 parallel, get a preview URL live (resolve the Cloudflare connector or deploy the branch to Vercel/Pages temporarily). (3) Week 1, photography stopgap — 6-10 hero flat-lays/mockups for bestsellers, keep SVGs elsewhere with a "sample imagery" note. (4) Week 1, 301-redirect old /products, /catalog, /cart and kill legacy pages before flipping DNS. Cut/defer: full 100-200 catalogue, tests, R2/Cloudflare Images, multi-currency, perf/a11y. Monday morning: pick the form endpoint, get one preview URL in the owner's hands.

---

## Peer reviews (5 reviewers)

**Reviewer 1:** Strongest = B (widest ground + specificity, fuses technical landmines with the non-technical dealbreaker). Biggest blind spot = A (sharp vision, untethered from launch reality — gold-plates a foundation that can't take an order). All missed: nobody questions whether the *manufacturing capability itself is real*; exposing full pricing/MOQ hands competitors the playbook; DNS-cutover revenue/SEO continuity.

**Reviewer 2:** Strongest = B (names highest-stakes verifiable failures and ranks them). Biggest blind spot = A (optimises the ceiling while the floor is on fire). All missed: the revenue/business risk of tearing down a live working B2C site for an unvalidated B2B model — cash flow during transition, existing SEO/customers, legal/tax of abandoned payment routes, rollback plan.

**Reviewer 3:** Strongest = A (alone understands what was actually built — a quote engine — and reasons from it). Biggest blind spot = A (ignores the dead checkout + dual payment systems). All missed: should this proven jersey shop be replaced by an unvalidated pivot at all? Run the new funnel alongside the earning site and validate one real quote before cannibalising.

**Reviewer 4:** Strongest = B (sees the whole system; catches launch-sinking failures). Biggest blind spot = A (growth strategy on a foundation that doesn't stand up). All missed: business risk of the pivot at ownership level — existing revenue/customers/SEO equity destroyed; who operates a manufacturer (supply chain, working capital); legal/tax of live payment routes; GDPR on the mailto lead path.

**Reviewer 5:** Strongest = B (names the precise highest-stakes defect + structural rot). Biggest blind spot = A (castle-building on sand). All missed: the owner's actual position — a live revenue business gambled on an unvalidated pivot with no migration/rollback plan, no demand evidence, no unit economics.

---

## Chairman verdict

### Where the council agrees
1. **The checkout is the number-one problem.** It generates a reference and promises a quote, but sends nothing. This is worse than a broken button — it silently drops real leads. (Contrarian, Executor, First Principles)
2. **No real photography = no conversion.** SVG silhouettes fatally undercut a "premium / world-class" B2B claim. Nobody spends four figures on unphotographed kit. (Contrarian, Outsider, First Principles)
3. **Trust/proof is missing:** no factory story, lead times, client names, "made in", faces, or sample pack; stats read as invented. (Outsider, First Principles)
4. **The legacy dual system is a liability** — live payment routes + duplicate SEO + a buyable single jersey on a 10-piece-minimum site. Redirect/kill before launch. (Contrarian, Executor)
5. **A preview URL must exist**; nothing is real until the owner can see it. Launch with 24 products, not 100. (Executor)

### Where the council clashes
**Altitude — build the platform vs fix the floor.** The Expansionist alone argues the configurator is a quote-engine platform and pushes 10x moves (shareable quote links, programmatic SEO, adjacent verticals). Every other advisor and 4/5 reviewers flagged this as the biggest blind spot: right about *what* it is, wrong about *when*. Resolution: bank the vision; pull only the two cheapest, conversion-relevant ideas forward (logo-on-garment mockup; shareable/saved quote); fix the broken lead path first.

**Replace vs run-alongside.** The First Principles Thinker and the peer round land the deepest point: don't replace proven B2C revenue with an unvalidated B2B model. Run the new funnel *alongside* the live site as lead-gen until one real quote lands.

### Blind spots the council caught (via peer review)
- **The pivot itself is unvalidated** — no evidence bulk buyers exist; don't cannibalise live revenue before one real quote.
- **No migration/rollback plan** for DNS cutover; existing SEO/customers at risk.
- **Live legacy payment routes** taking real cards while the "real" checkout is a demo — legal/tax/refund exposure.
- **GDPR** on the mailto/lead path.
- **Exposing full tiered pricing/MOQ** publicly hands competitors the playbook.
- **Manufacturing/fulfilment reality** — who makes 250-garment runs, sampling, working capital — the thing buyers actually pay for.

### The recommendation
Stop adding features. Convert the build from a brochure into a lead-capture machine, and validate the pivot without killing the live site:
1. Run the new site **alongside** the live jersey site (subdomain or preview URL) so current revenue is protected.
2. **Wire the quote form to a real inbox + stored lead** — the difference between a business and a brochure.
3. Get **6–10 real hero photos or logo-on-garment mockups** for the bestsellers.
4. **Fix the honesty/trust gaps** — don't show a fake confirmation until a server has the payload; add lead time, MOQ-to-delivery, made-in, sample pack; make stats real or remove them; cut the four competing CTAs to one.

Defer catalogue scale, multi-currency, tests, R2, and every 10x platform move until one real bulk quote has come through.

### The one thing to do first
**Wire /order/checkout to a real destination (owner's inbox + stored lead) and stop it showing a "we've got it" confirmation until the payload is actually received.** Until that exists, everything else is polish on a brochure.
