# Ériu Sports: working notes and writing rules

Read this first. It records how the site is run, how we write everything, and the rules we must follow.

## 1. The business

- **eriusports.com**: Irish-run reseller of retro football shirts, GAA jerseys and training vests, AFL jerseys and kids football kits. Based at Elevation Business Park, Ennis, Co. Clare.
- **Stack**: Next.js 16 (App Router, static generation), Tailwind v4, OpenNext on Cloudflare Workers. `main` auto-deploys.
- **Contact**: noel@eriusports.com (also sales@ and hello@, received through Cloudflare Email Routing).
- **Audience**: UK and Ireland first, plus worldwide. SEO, AI search and GEO all matter.
- **Stock**: shipped by Noel directly from China, sent DDP (duties paid). Not VAT registered.

## 2. Writing rules (apply to every listing, page, story and email)

**Voice**
- Irish-run, written by a fan. Warm and plain, never over the top. Personal but restrained.
- Short sentences, one idea each. Mobile first: 2–3 line paragraphs.
- Say it the way you'd tell a mate in the pub, not a brochure.
- UK English: colour, organise, "shirts" not "jerseys" for football.

**Honesty (non-negotiable)**
- Never say "official" or "authentic". Say "replica" or "fan replica" where it matters.
- Never claim a link to any club, county board, federation or kit brand.
- Flag fan-style prints: say so if the player never wore that number on that shirt.
- Never claim charity money from our sales. A shirt may mention a charity event; we don't.
- No false superlatives ("best", "perfect", "highest quality", "number one"). Be specific instead.
- Don't invent history. If a fact can't be confirmed, leave it out. Check every date, score and name against a source.
- Describe only what's visible in the photo. Don't guess sponsors we can't read (ask the user, or say what is legible).
- Leave sensitive subjects out of a shop listing (e.g. Hillsborough).
- Don't name kit makers or their logos (adidas, Nike, Umbro, Reebok, trefoil, swoosh and so on) in listings. Sponsors on the shirt (Emirates, Spotify, Carlsberg) are fine. Retro adult shirts from the supplier import still carry some maker names; clean up when asked.

**Never use**
- Words: "elevate", "unleash", "game-changer", "iconic" (more than once), "timeless", "must-have", "world-class", "passion", "journey".
- Phrases: "Whether you're a die-hard fan or…", "Look no further", "in today's world".
- Rhetorical-question openers, dramatic one-word sentences, triple lists, em dashes (use a full stop or comma), exclamation marks (except a thank-you).
- Use the stop-slop skill when drafting longer prose.

**Product listings (2–4 sentences)**
- Order: what makes it that shirt (season, kit, a visible detail) → colours and trim → sponsor → crest or print → one line of fan context.
- Kids kits end with: "Shirt and shorts; socks aren't included."
- GAA: player fit, "go up a size for a looser fit".
- Keep new listings consistent with the existing ones in the same collection (look at neighbouring entries first).
- Fan context for current kits comes from the club's or maker's own kit launch plus a trusted kit site. Cite sources in the reply to the user.

**Shirt stories (blog)**
- A fan telling a story, not a list of facts. Lead with the moment, end on the shirt.
- Researched and fact-checked. No slop. Aimed at the Irish and UK core market.
- Each post has `dateModified` when updated, and FAQs where useful.

**Before publishing, check**
1. Could a fan verify every claim? If not, cut it.
2. Does it read well on a phone?
3. Is anything from the "never use" list in it?
4. Is it shorter than the first draft?

## 3. Prices, sizes and rules for stock

| Product | Price |
|---|---|
| Retro football shirt (plain) | €25 |
| Retro football shirt (named/numbered) | €35 |
| GAA jerseys | €29.95 |
| GAA training vests | €25 |
| AFL jerseys | €25 |
| Kids football kits | €30 |
| Kids GAA jerseys (when added) | €25 |

- Supplier imports: no long sleeves, no seasons starting 2010 or later, no photos showing a person wearing the shirt. Don't duplicate existing products (plain and named versions of the same shirt are allowed).
- The user's own photos may be current-season (e.g. 2025/26, 2026/27).
- "New Season" badge only when the title contains 2026 or 2027 (current season is 2026-27).
- Size charts: football = retro chart (S–2XL); GAA = GAA flat chart (S–XL); AFL = AFL chart; kids football = kids football chart (XXS–2XL, ages 2–13); kids GAA chart is ready for when kids GAA jerseys are added. Kids sizes show as ages on the site (e.g. "2–3"); orders carry both size and age.
- Stock updates arrive as "X – size – SOLD OUT": set `soldOut` sizes on the product.

## 4. Customer-facing facts (keep identical everywhere)

- **Delivery**: tracked, worldwide, flat €5, free on orders of €49 or more. 8–14 days to Ireland and the UK. Other countries vary, so quote no time.
- **Customs**: every order is sent duties paid. Nothing to pay on delivery. If a courier asks for a charge, the customer should contact us.
- **Returns**: 30 days, unworn with tags on. The buyer pays return postage unless the item is faulty or not as described. Refund within 14 days of the return arriving. EU/UK 14-day cancellation right is unaffected.
- **Prices**: euro, no VAT added (not VAT registered).
- **Payment**: PayPal (cards switched off until Stripe is verified; code is ready).
- **Not official**: the Terms say these are fan replicas, with no affiliation to any club, board, federation or brand.

## 5. Naming

- Collections: "Retro Irish Shirts" (slug `ireland-classics`, name "Irish Classics", includes League of Ireland), Premier League Classics, European & World Classics, Kids Football Kits, GAA Jerseys, GAA Training Vests, AFL Jerseys.
- Titles: "Team Season Kit [Kids Kit]" e.g. "Arsenal 2026-27 Home Kids Kit". Named shirts add "– Player Number".
- Team names in data: "Arsenal FC", "Chelsea FC", "Liverpool FC", "Manchester United", "Barcelona", "Republic of Ireland". Don't change them.
- Kids kit sections (auto): Premier League, International, European & World Clubs, Retro Classics (anything before 2015).

## 6. How we work (workflow rules)

1. The user sends supplier links or photos with text. Import or add, then **build and verify**: `npm run build`, start with `npx next start -p 3457`, check every sitemap URL returns 200, take a screenshot, kill the server.
2. **Commit and push to the branch `claude/jersey-seo-uk-ie`**. Never push to `main` until the user says "go live". Then fast-forward main (`git checkout main && git pull && git merge --ff-only claude/jersey-seo-uk-ie && git push origin main`), switch back to the branch, and tell the user how to check the deploy.
3. Don't create pull requests unless asked.
4. Commit messages end with the attribution lines the session gives (Co-Authored-By and Claude-Session). No model names elsewhere in code or commits.
5. Reply format: what was added, the key facts used, anything to check, and sources (as links) when research was used. Be short and plain.
6. Never use the user's email for anything except identification.
7. If the project folder is on another branch, or `node_modules` is missing, run `git checkout -B claude/jersey-seo-uk-ie origin/claude/jersey-seo-uk-ie` and `npm ci` first. Another branch (`claude/sports-site-rebrand-rebuild-jaqy18`) exists; it lacks the page cache that stops Error 1102, so don't make it live without keeping that.

## 7. Technical reference

- **Data**: `data/products.json` is the source of truth. Fields: `id`, `title`, `slug`, `description`, `price`, `images`, `collection`, `currency`, `details {team, season, kit, sponsor, colours, fit, condition, print?, player?}`, `sizes?`, `soldOut?`, `sizeGuide?`, `test?`.
- **Manual IDs**: `9000000xx`. Last used 900000071 (Real Betis third kids kit). The hidden €1 payment test product (900000099) was deleted; the `test: true` flag still works in the code (hidden from lists, sitemap and feed, free delivery) if a new one is needed.
- **Images**: convert to WebP (max 1200px, quality 80, flattened on white) with `sharp`. Kids kits live in `public/images/kids-kits/<id>-1.webp`; GAA in `gaa-gear`, AFL in `afl-jerseys`.
- **Kids kits**: collection "Kids Football Kits", price 30, `sizes` XXS–2XL, fit text "Kids sizes, ages 2 to 13. Go by height rather than age". A title containing "Kids" selects the kids size chart.
- **Collections copy** in `lib/collections.ts` (intro, SEO title, description, keywords) should mention new clubs as they are added.
- **Feed**: Google Merchant Center feed at `/merchant-feed.xml` (one item per size). Counterfeit-policy risk was explained to the user.
- **Page cache**: `open-next.config.ts` uses the static assets incremental cache with cache interception, and product cards get only card fields (`toCard`). Do not remove them (Error 1102).
- **Payments**: prices and delivery are always set on the server (`lib/order-pricing.ts`). PayPal and Stripe routes under `app/api`. Webhooks at `/api/paypal/webhook` and `/api/stripe/webhook`. Settings live in Cloudflare (`RESEND_API_KEY`, `ORDER_TO_EMAIL` = sales@, `ORDER_FROM_EMAIL` = hello@, `PAYPAL_CLIENT_SECRET`, `PAYPAL_WEBHOOK_ID`, `STRIPE_*`). Order emails come from Resend (eriusports.com verified).
- **Pending on the user's side**: verify PayPal and Stripe bank accounts; add the PayPal webhook; possibly switch PayPal account (then update client ID, secret, webhook, and rerun the €1 test).
- **Scratchpad** (`/tmp/claude-0/.../scratchpad`) and the user's attached images (`.../images/N.webp`) can be lost when the container resets.
