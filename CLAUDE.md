# Ériu Sports: working notes and writing rules

Read this first. It records how the site is run, how we write everything, and the rules we must follow.

## 1. The business

- **eriusports.com**: Irish-run reseller of retro football shirts, GAA jerseys and training vests, AFL jerseys and kids football kits. Based at Elevation Business Park, Ennis, Co. Clare.
- **Stack**: Next.js 16 (App Router, static generation), Tailwind v4, OpenNext on Cloudflare Workers. `main` auto-deploys.
- **Contact**: noel@eriusports.com (also sales@ and hello@, received through Cloudflare Email Routing). Open Monday to Saturday, 9am to 3pm Irish time.
- **Audience**: UK and Ireland first, plus worldwide. SEO, AI search and GEO all matter.
- **Stock**: shipped by Noel directly from China, sent DDP (duties paid). Not VAT registered.

## 2. Writing rules (apply to every listing, page, story and email)

**Voice**
- Irish-run, written by a fan. Warm and plain, never over the top. Personal but restrained.
- Short sentences, one idea each. Mobile first: 2–3 line paragraphs.
- Say it the way you'd tell a mate in the pub, not a brochure.
- UK English: colour, organise, "shirts" not "jerseys" for football. Exception (user approved 22 October 2026): Ireland and League of Ireland retro pages say "jersey", because that is how Irish customers search.

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
- Check every listing against the full-size photo, never a thumbnail (a contact sheet caused the USA 94 away error).
- Best sellers and pages that already get search impressions may carry two or three short paragraphs (separated by a blank line in `description`): visible details, a short fact-checked story, then fit and sizes. Reuse facts from our blog posts. Product pages link to any blog post that lists the product in its `products`.
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
- Size charts: football = retro chart (S–2XL); GAA = GAA flat chart (S–2XL; 2XL confirmed by the user on 22 October 2026: 60 cm chest); AFL = AFL chart; kids football = kids football chart (XXS–2XL, ages 2–13); kids GAA chart is ready for when kids GAA jerseys are added. Kids sizes show as ages on the site (e.g. "2–3"); orders carry both size and age.
- All adult products, in every category, come in S to 2XL (user, 22 October 2026). The default `SIZES` in `lib/products.ts` is S–2XL; set `soldOut` for gaps rather than removing sizes.
- Stock updates arrive as "X – size – SOLD OUT": set `soldOut` sizes on the product.

## 4. Customer-facing facts (keep identical everywhere)

- **Delivery**: tracked, worldwide, flat €5, free on orders of €49 or more. 8–14 days to Ireland and the UK. Other countries vary, so quote no time.
- **Customs**: every order is sent duties paid. Nothing to pay on delivery. If a courier asks for a charge, the customer should contact us.
- **Returns**: 30 days, unworn with tags on. The buyer pays return postage unless the item is faulty or not as described. Refund within 14 days of the return arriving. EU/UK 14-day cancellation right is unaffected.
- **Prices**: euro, no VAT added (not VAT registered).
- **Payment**: PayPal (cards switched off until Stripe is verified; code is ready). Phone is optional at checkout (user, 29 October 2026).
- **Not official**: the Terms say these are fan replicas, with no affiliation to any club, board, federation or brand.

## 5. Naming

- Collections: "Retro Irish Jerseys" (slug `ireland-classics`, name "Irish Classics", includes League of Ireland), Premier League Classics, European & World Classics, Kids Football Kits, GAA Jerseys, GAA Training Vests, AFL Jerseys.
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
- **Manual IDs**: `9000000xx`. Last used 900000076 (Ireland USA 94 home, Keane 6). The hidden €1 payment test product (900000099) was deleted after a full PayPal test passed on 11 October 2026; the `test: true` flag still works in the code (hidden from lists, sitemap and feed, free delivery) if a new one is needed. Its old data is in git (commit e220023).
- **Images**: convert to WebP (max 1200px, quality 80, flattened on white) with `sharp`. Product photos must be clean: no supplier logos (Boru Sportswear, Camisetas), size badges or supplier size charts (60 charts were removed and 82 photos cleaned on 29 October 2026; paint the plain backdrop over a corner logo, or crop it off a close-up). Check new imports for these before adding. Kids kits live in `public/images/kids-kits/<id>-1.webp`; GAA in `gaa-gear`, AFL in `afl-jerseys`.
- **Kids kits**: collection "Kids Football Kits", price 30, `sizes` XXS–2XL, fit text "Kids sizes, ages 2 to 13. Go by height rather than age". A title containing "Kids" selects the kids size chart.
- **Story covers**: every post's `heroImage` is either an openly licensed Commons photo with `heroCredit` (shown under the header and in the structured data) or a designed cover `public/images/blog/cover-<slug>.webp` (the jersey cut out on club colours with the season in outline). Never use press or agency photos (Getty, Sportsfile, Inpho). The Cork City, Italia 90 and Liverpool 95-96 hero photos came with the original site and have no recorded licence.
- **Blog photos**: only openly licensed images (Wikimedia Commons CC BY or CC BY-SA, or public domain), saved to `public/images/blog/` as WebP, set as `image` on a section in `lib/blog.ts` with author, licence, licence URL and file page. The post shows the credit under the photo and adds it to the structured data. Check that the shirt in the photo matches the caption.
- **Logo and icons**: the header and footer wordmark are SVGs (`public/logo.svg`, `public/logo-white.svg`), drawn from the Lexend font as outlines so they look the same on every device. Icons: `app/favicon.ico` (16, 32, 48 px), `public/icon.svg`, `public/apple-touch-icon.png`, `public/icon-192.png` and `public/icon-512.png` (also the logo in the store's structured data), plus `app/manifest.ts`. All are a white É on brand green #0A7A44. (Until 29 October 2026 the favicon was still the Next.js starter icon.)
- **Cookies**: `components/layout/CookieConsent.tsx` loads Google Analytics (G-NEML64KY0M) only after the visitor accepts; Reject is equal in weight; the footer "Cookie settings" link reopens the banner; the Privacy Policy has a Cookies section. Don't add other tracking scripts outside this component.
- **Security and quality**: security headers are set in `next.config.ts` (HSTS with includeSubDomains; no full script CSP, because PayPal, Stripe and Analytics need inline scripts). `wrangler.jsonc` sets `workers_dev` and `preview_urls` to false so the Worker is only reachable on eriusports.com, behind the Cloudflare rules; keep them. `public/.well-known/security.txt` expires 2027-10-01: renew the date before then. The contact form posts to `/api/contact` (emails the shop through Resend, honeypot field). The homepage newsletter box posts to `/api/subscribe`, which emails each signup to sales@ the same way (user keeps the mailing list). Buyer reviews (real 5-star Depop reviews, data and rules in `lib/reviews.ts`) appear in three places: a line in the homepage hero, the full "What buyers say" section after Latest Arrivals (`components/home/BuyerReviews.tsx`; a swipeable row on phones, a grid from tablet up), two matched reviews under Add to bag on every product page (`reviewsFor`: same jersey, then same kind, then general), and one line above the payment buttons at checkout. Each shows the @handle, what they bought and a thumbnail (linked to our product page where we stock it). Never link to Depop (user: their selling fees); no review markup. The checkout "Email me about new shirts" box signs the customer up through `/api/subscribe` after a successful order. `npx eslint .` and `npx tsc --noEmit` should both pass before a push. Run `npm audit --omit=dev` now and then; the only open items are build-time tools. `public/llms.txt` summarises the shop for AI search and must match section 4 facts. Shared share image: `lib/seo.ts`. JSON-LD goes through `lib/jsonld.ts`.
- **Do not upgrade Next.js or @opennextjs/cloudflare without testing the Worker.** Next 16.4.0 with OpenNext 1.20.10 built fine but crashed on Cloudflare (error 1101, `Unexpected loadManifest(preview-props.json)`) on every server-rendered route; it was rolled back once (commit b099584). Next 16.3.8 with OpenNext 1.20.10 passes. Test any upgrade with `npx opennextjs-cloudflare build`, then `npx wrangler dev --port 8799` and check `/catalog`, an unknown URL and a POST to `/api/contact` (and the whole sitemap) before going live. Don't use `pkill -f` with those words, it kills your own shell.
- **Best sellers (user, 22 October 2026)**: Ireland Italia 90 home, Manchester United 1998-99 Treble home, Ireland 1992-94 home.
- **Search Console (3 months to October 2026)**: Ireland is the core market (116 of ~207 clicks). Strong or close: AFL collection, Euro 88 jersey, GAA 2026 county jerseys (positions 5-12), the Bohemians music shirts post, Ronaldinho. Man United retro searches sit at positions 45-65, so they are not a priority. Filtered `/catalog?category=` views are noindex and out of the sitemap so they don't compete with `/collections`.
- **About copy**: longer copy under the grid on collection, club and player pages lives in `lib/page-copy.ts` (`COLLECTION_ABOUT`, `CLUB_ABOUT`, `PLAYER_ABOUT`), with links to the blog posts the facts come from.
- **Collections copy** in `lib/collections.ts` (intro, SEO title, description, keywords) should mention new clubs as they are added.
- **Feed**: Google Merchant Center feed at `/merchant-feed.xml` (one item per size). Counterfeit-policy risk was explained to the user.
- **Page cache**: `open-next.config.ts` uses the static assets incremental cache with cache interception, and product cards get only card fields (`toCard`). Do not remove them (Error 1102).
- **Payments**: prices and delivery are always set on the server (`lib/order-pricing.ts`). Every PayPal order the site creates is signed in `reference_id` (HMAC with `PAYPAL_CLIENT_SECRET` over reference, total and line prices, `signOrder` in `lib/paypal-orders.ts`); capture and the webhook only capture orders whose signature matches, because anyone can create a PayPal order in the browser with our public client ID. Don't remove this. PayPal and Stripe routes under `app/api`. Webhooks at `/api/paypal/webhook` and `/api/stripe/webhook`. Settings live in Cloudflare (`RESEND_API_KEY`, `ORDER_TO_EMAIL` = sales@, `ORDER_FROM_EMAIL` = hello@, `PAYPAL_CLIENT_SECRET`, `PAYPAL_WEBHOOK_ID`, `STRIPE_*`). Order emails come from Resend (eriusports.com verified).
- **Cloudflare dashboard (checked 12 October 2026)**: domain registered with Cloudflare (renews 18 March 2027), transfer lock on. Always Use HTTPS on, www redirects to eriusports.com. Rate limit rule "Limit order and contact requests" (10 requests per 10 seconds per IP, block 10 seconds) on `/api/paypal/create-order`, `/api/contact`, `/api/stripe/create-payment-intent`, `/api/subscribe` (added by the user on 29 October 2026), all joined with Or; never add the webhook paths to it. Email: Cloudflare Email Routing (MX, SPF, DKIM), Resend sending (`resend._domainkey`, `send` and `rsend`), DMARC `p=none` with reports to Cloudflare DMARC Management (Email → DMARC Management). On 12 October 2026 the user set Minimum TLS to 1.2 (SSL Labs A+, TLS 1.2 and 1.3 only) and enabled DNSSEC (DS record at the registry, fully active). Keep DMARC at `p=none` until reports show every sender passes (Gmail "send as" may not).
- **Payments status (11 October 2026)**: PayPal account verified, bank confirmed, PayPal webhook added and `PAYPAL_WEBHOOK_ID` saved in Cloudflare, full €1 test passed. Nothing pending for PayPal. Stripe is not in use (cards off); when the user wants cards, they verify Stripe, add the Stripe webhook and `STRIPE_WEBHOOK_SECRET`, then we set `CARD_PAYMENTS_ENABLED` to true in `lib/payments.ts` (the checkout page and the card payment route both read it).
- **Scratchpad** (`/tmp/claude-0/.../scratchpad`) and the user's attached images (`.../images/N.webp`) can be lost when the container resets.

## Compact Instructions

When the conversation is compacted, the summary must always keep:

- **Where the site stands**: which version is live, the latest commit, and anything half-done.
- **The user's decisions, word for word**: prices, shipping, returns, legal and VAT position, product facts and copy approvals. Never paraphrase numbers or policies.
- **Open questions and steps waiting on the user** (e.g. PayPal and Stripe verification, webhooks, "go live" approvals).
- **Actions the safety rules blocked** (writing secrets, bulk deletes), so they are not retried.
- **Errors and their fixes**, so the same dead ends are not repeated.
- **The hard rules**: never commit private files, how secrets go in (Cloudflare settings, never the repo), no invented claims, never push to `main` without "go live", the writing rules in section 2.

The summary should drop long file contents, test logs that passed and step-by-step accounts of finished work. Keep file paths and commit numbers instead.
