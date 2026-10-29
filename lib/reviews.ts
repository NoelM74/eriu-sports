/**
 * Real 5-star reviews from buyers on our Depop shop (@eriusports), shown with
 * their Depop handles and what they bought (user, 29 October 2026).
 * Used on the homepage, product pages and checkout.
 * Rules: never link to Depop (user's choice: their selling fees). Never edit or
 * invent a review; add new ones with their real rating. Shown on the page only,
 * with no Review or AggregateRating markup, because Google doesn't allow
 * structured data for reviews collected on another site.
 */
export type ReviewGroup = 'ireland' | 'gaa' | 'afl';

export interface BuyerReview {
  handle: string;
  text: string;
  bought: string;
  /** Thumbnail of what they bought: our product photo where we stock it, otherwise the Depop listing photo. */
  image: string;
  /** Our product page for the same jersey, when we stock it. */
  slug?: string;
  group: ReviewGroup;
}

export const REVIEWS: BuyerReview[] = [
  {
    handle: 'cillianw',
    text: 'Worth the wait… Brilliantly packaged and great bit of kit. Top marks.',
    bought: 'AFL jersey',
    image: '/images/reviews/afl-jersey-brown-gold.webp',
    group: 'afl',
  },
  {
    handle: 'fibch_394',
    text: 'Very happy with the Jersey, good quality for the price',
    bought: 'Ireland Italia 90 home jersey',
    image: '/images/ireland-classics/678616545-1.webp',
    slug: 'ireland-1990-italia-90-world',
    group: 'ireland',
  },
  {
    handle: 'claudinekeenan',
    text: 'Great communication, good service package came as described, would recommend 💪🏼',
    bought: 'Donegal GAA training jersey',
    image: '/images/gaa-gear/592719090-1.webp',
    slug: 'donegal-training-jersey-perfect-e5d8',
    group: 'gaa',
  },
  {
    handle: 'tomasola',
    text: 'Good seller, very swift delivery, item as seen',
    bought: 'Tyrone GAA away jersey',
    image: '/images/gaa-gear/587252164-1.webp',
    slug: 'tyrone-away-jersey-perfect-b0a7',
    group: 'gaa',
  },
  {
    handle: 'c_finn1',
    text: 'Top quality 💯',
    bought: 'Kerry GAA training vest',
    image: '/images/gaa-training-vests/kerry-gaa-training-vest-1.webp',
    slug: 'kerry-gaa-training-vest',
    group: 'gaa',
  },
  {
    handle: 'oisinc_44',
    text: 'Great',
    bought: 'Ireland Italia 90 home jersey',
    image: '/images/ireland-classics/678616545-1.webp',
    slug: 'ireland-1990-italia-90-world',
    group: 'ireland',
  },
];

const byHandle = (h: string) => REVIEWS.find((r) => r.handle === h)!;

/** Reviews that say most about the shop itself, for pages with no closer match. */
const GENERAL = ['cillianw', 'fibch_394', 'tomasola'].map(byHandle);

/** Up to two reviews for a product page: the same jersey first, then the same kind of jersey, then general ones. */
export function reviewsFor(product: { slug: string; category: string; collectionSlug: string }, count = 2): BuyerReview[] {
  const group: ReviewGroup | null =
    product.category === 'gaa' ? 'gaa' : product.category === 'afl' ? 'afl' : product.collectionSlug === 'ireland-classics' ? 'ireland' : null;
  const ranked = [
    ...REVIEWS.filter((r) => r.slug === product.slug && r.text.length > 10),
    ...REVIEWS.filter((r) => group && r.group === group && r.text.length > 10),
    ...GENERAL,
  ];
  return [...new Map(ranked.map((r) => [r.handle, r])).values()].slice(0, count);
}

/** The short line shown above the payment buttons at checkout. */
export const CHECKOUT_REVIEW = byHandle('tomasola');
/** The quote in the homepage hero, under the buttons. */
export const HERO_REVIEW = byHandle('cillianw');
