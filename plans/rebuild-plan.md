# Ériu — Rebrand & Rebuild Plan

**From:** retro replica football jerseys (single-piece B2C)
**To:** premium **custom performance leisurewear**, manufactured to order and branded for teams, gyms, studios and brands. Men **and** women. Bulk orders from **MOQ 10**. Target range **100–200 products** with multiple colourway + size variants.

North-star brands: Gymshark, Alo Yoga, ON — premium look, but positioned as a **manufacturer / supplier**, not a boutique.

---

## 1. Guiding decisions (locked)

| Decision | Choice |
|---|---|
| Brand name | Keep **Ériu**, repositioned as "Ériu Performance Wear". Irish-rooted premium. |
| Palette | Keep existing emerald `#1A533E` / teal `#1C7C83` / navy `#0F2131`, warmed with a sand-greige neutral. Full light + dark themes. |
| Order model | **Hybrid** — self-serve Bulk Order Builder (size-run + tiered pricing + branding) with a "Request a quote / samples" path for large or complex jobs. |
| Hosting | Stay on **Cloudflare Workers** (Next.js via OpenNext). Add Cloudflare Images / R2 for product photography. |
| Catalogue store | Start **in-repo** (typed data) for launch; optional CMS/D1 layer later for non-dev editing. |

---

## 2. Why Cloudflare is sufficient (capacity note)

- 100–200 products with variants is a small-to-medium catalogue. Product pages are **statically generated** (`generateStaticParams`) and cached at the edge — no per-request DB.
- Workers Paid ($5/mo) covers compute + traffic comfortably.
- **The one infra upgrade is image hosting.** ~200 products × ~5 colourways × several shots = thousands of images that should **not** live in git. Use **Cloudflare Images** (an `IMAGES` binding already exists in `wrangler.jsonc`) or **R2** + image resizing. Until real photography exists, the build uses CSS/SVG garment silhouettes coloured per colourway.
- Optional later: **D1** (SQLite) / **KV** for live inventory, or a headless CMS if the team needs to edit the catalogue without deploys.

---

## 3. Data model (implemented in `lib/catalog/`)

Replaces the flat `data/products.json` single-price model. New model lives alongside the old one during migration.

### `Product`
- `slug`, `name`, `tagline`
- `family`: `tee | tank | compression | shorts | leggings | yoga | layer | accessory`
- `gender`: `men | women | unisex`
- `description`, `features[]`
- `fabric`: `{ composition, gsm, care, tech[] }` — the spec-sheet content
- `moq` (default 10)
- `pricing`: `{ base, tiers: [{ minQty, unit }] }` — volume breaks (10 / 25 / 50 / 100 / 250)
- `colourways[]`: `{ id, name, body, trim }` (hex) — later gains `images[]`
- `sizes[]`: e.g. `["XS","S","M","L","XL","2XL"]` (per-gender fit)
- `branding`: allowed `methods[]` (print / embroidery / sublimation), `placements[]`, per-unit add-ons (names & numbers)
- **Merchandising relations:** `upsells[]`, `crossSells[]`, `completeTheKit[]` (slugs), with automatic family-based fallbacks
- `badge?`, `rating?`, `reviewCount?`

### Pricing helpers (`lib/catalog/index.ts`)
- `unitPriceFor(product, qty)` → resolves the tier
- `orderTotal(product, sizeRun, brandingAddOns)` → line total
- `nextTier(product, qty)` → for the "add N more to unlock €X" cart nudge
- Accessors: `getProduct(slug)`, `allProducts()`, `byFamily()`, `byGender()`, `related(product)`

---

## 4. Site architecture (information architecture)

```
/                     New homepage (brand thesis + range + how-it-works + fabric tech)
/shop                 Catalogue listing — filters: gender, family, colour, price
/shop/[slug]          Product page — variants, size-run matrix, live pricing, branding, cross/upsell
/customise            How custom branding works (3-step) + quote/sample request
/for/teams            Use-case landing — clubs & teams
/for/gyms             Use-case landing — gyms & studios
/for/business         Use-case landing — corporate & events
/fabric               Fabric technology / spec explainer
/cart                 Bulk order (size-run lines, tier nudges)   [Phase 4]
/checkout             Deposit / full pay (Stripe + PayPal) or quote handoff   [Phase 4]
/about /contact /faq /size-guide /shipping-returns + legal   (retained/refreshed)
```

Legacy `/products/[slug]`, `/catalog`, `/collections/*` remain during migration, then are retired/redirected.

---

## 5. Product page anatomy

1. Breadcrumb + JSON-LD (Product schema)
2. **Colourway-switching gallery** (garment renders in selected colour)
3. Title, family/gender, from-price, rating
4. **Colourway swatches** · **size selector**
5. **Bulk size-run matrix** — quantity per size (the core of the model)
6. **Live tiered price** — unit price, order total, "% saved", **next-tier nudge**
7. **Branding configurator** — method, placement, names & numbers toggle
8. MOQ validation + lead-time / production trust block
9. **Fabric & specs** accordion (GSM, composition, care, tech)
10. **Complete the kit** (cross-sell) · **Upgrade / matching set** (upsell) · **You may also like**

### Cross-sell / upsell placement
| Type | Where | Example |
|---|---|---|
| Cross-sell | Product + cart | Tank → matching shorts, leggings, cap |
| Upsell | Product | Standard tee → premium 240gsm, or matched set bundle |
| Alternatives | Product | Same family, other styles |
| **Bulk-tier nudge** | Cart | "Add 6 more to unlock the 50-pc price break" |
| Bundles / kits | Dedicated | "Full training set" at a kit price |
| Recently viewed | Global | localStorage |

---

## 6. Phased delivery (each phase gets a Cloudflare preview URL)

- **Phase 1 — Foundation + first product page** ← *this commit*
  - Design system (tokens, fonts, light/dark), new Navbar + Footer, new homepage.
  - Catalogue data model + ~12 seed products across families.
  - `/shop` listing + `/shop/[slug]` product page with variants, size-run matrix, live pricing, branding configurator, cross/upsell.
- **Phase 2 — Catalogue depth & filters:** full filtering/search, use-case landing pages, `/customise`, `/fabric`.
- **Phase 3 — Bulk order builder → cart:** size-run cart, tier nudges, saved kits, reorder.
- **Phase 4 — Checkout & quotes:** Stripe deposit / full-pay + PayPal, quote & sample-request flow, order emails.
- **Phase 5 — Scale content & assets:** grow to 100–200 products; wire Cloudflare Images / R2 real photography; retire legacy jersey pages with redirects.

### Phase 1 scope notes
- The product configurator computes and displays everything (size run, tier price, branding, totals). Wiring it into a **bulk cart is Phase 3** — for now "Add to order" confirms the built line locally.
- Products render as coloured **SVG garment silhouettes** until real photography is added in Phase 5.

---

## 7. Preview & release workflow

- All work on branch `claude/sports-site-rebrand-rebuild-jaqy18`; **`main` (live eriusports.com) stays untouched**.
- Preview via Cloudflare Workers preview deploy (`npm run preview` / versioned preview URL) — never the custom domain until promoted.
- Requires Cloudflare (+ Stripe for checkout) connectors authorised in an interactive session for live preview/deploy; building + committing does not.
- Promote by merging the branch / `npm run deploy`.
