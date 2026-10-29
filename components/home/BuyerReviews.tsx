import Image from 'next/image';
import Link from 'next/link';

/**
 * Real 5-star reviews from buyers on our Depop shop (@eriusports), shown with
 * their Depop handles and what they bought (user, 29 October 2026).
 * No link to Depop (user's choice). Where we stock the same jersey, the thumbnail
 * links to its product page; otherwise the photo comes from the Depop listing.
 * Shown on the page only, with no Review or AggregateRating markup, because Google
 * doesn't allow structured data for reviews collected on another site.
 * Add new ones as they come in, with their real rating; never edit or invent a review.
 */
const REVIEWS: { handle: string; text: string; bought: string; image: string; slug?: string }[] = [
  {
    handle: 'cillianw',
    text: 'Worth the wait… Brilliantly packaged and great bit of kit. Top marks.',
    bought: 'AFL jersey',
    image: '/images/reviews/afl-jersey-brown-gold.webp',
  },
  {
    handle: 'fibch_394',
    text: 'Very happy with the Jersey, good quality for the price',
    bought: 'Ireland Italia 90 home jersey',
    image: '/images/ireland-classics/678616545-1.webp',
    slug: 'ireland-1990-italia-90-world',
  },
  {
    handle: 'claudinekeenan',
    text: 'Great communication, good service package came as described, would recommend 💪🏼',
    bought: 'Donegal GAA training jersey',
    image: '/images/gaa-gear/592719090-1.webp',
    slug: 'donegal-training-jersey-perfect-e5d8',
  },
  {
    handle: 'tomasola',
    text: 'Good seller, very swift delivery, item as seen',
    bought: 'Tyrone GAA away jersey',
    image: '/images/gaa-gear/587252164-1.webp',
    slug: 'tyrone-away-jersey-perfect-b0a7',
  },
  {
    handle: 'c_finn1',
    text: 'Top quality 💯',
    bought: 'Kerry GAA training vest',
    image: '/images/gaa-training-vests/kerry-gaa-training-vest-1.webp',
    slug: 'kerry-gaa-training-vest',
  },
  {
    handle: 'oisinc_44',
    text: 'Great',
    bought: 'Ireland Italia 90 home jersey',
    image: '/images/ireland-classics/678616545-1.webp',
    slug: 'ireland-1990-italia-90-world',
  },
];

export default function BuyerReviews() {
  return (
    <section className="bg-white py-16 md:py-20 border-t border-gray-100" aria-labelledby="buyer-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">From our Depop shop</p>
        <h2 id="buyer-reviews" className="text-3xl sm:text-4xl font-bold uppercase text-[#0F2131] mb-8">
          What buyers say
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r) => {
            const thumb = (
              <Image
                src={r.image}
                alt={r.bought}
                width={72}
                height={72}
                className="w-[72px] h-[72px] object-cover bg-white border border-gray-200 shrink-0"
              />
            );
            return (
              <li key={r.handle} className="border border-gray-200 bg-gray-50 p-5 flex flex-col justify-between">
                <div>
                  <p className="text-[#1A533E] text-lg tracking-widest mb-3" aria-label="5 out of 5 stars on Depop">
                    <span aria-hidden>★★★★★</span>
                  </p>
                  <blockquote className="text-base text-gray-800 leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  {r.slug ? (
                    <Link href={`/products/${r.slug}`} aria-label={`See the ${r.bought}`}>
                      {thumb}
                    </Link>
                  ) : (
                    thumb
                  )}
                  <p className="text-sm leading-snug">
                    <span className="block font-semibold text-[#0F2131]">@{r.handle}</span>
                    {r.slug ? (
                      <Link href={`/products/${r.slug}`} className="text-gray-500 underline underline-offset-2 hover:text-[#1A533E]">
                        Bought: {r.bought}
                      </Link>
                    ) : (
                      <span className="text-gray-500">Bought: {r.bought}</span>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
