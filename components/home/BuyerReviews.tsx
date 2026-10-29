/**
 * Real 5-star reviews from buyers on our Depop shop (@eriusports), shown with
 * their Depop handles and what they bought, as listed on Depop (user, 29 October 2026).
 * Shown on the page only, with no Review or AggregateRating markup, because Google
 * doesn't allow structured data for reviews collected on another site.
 * Add new ones as they come in, with their real rating; never edit or invent a review.
 */
const DEPOP_URL = 'https://www.depop.com/eriusports/';

const REVIEWS: { handle: string; text: string; bought?: string }[] = [
  { handle: 'cillianw', text: 'Worth the wait… Brilliantly packaged and great bit of kit. Top marks.', bought: 'AFL jersey' },
  { handle: 'fibch_394', text: 'Very happy with the Jersey, good quality for the price', bought: 'Ireland Italia 90 home jersey' },
  {
    handle: 'claudinekeenan',
    text: 'Great communication, good service package came as described, would recommend 💪🏼',
    bought: 'Donegal GAA jersey',
  },
  { handle: 'tomasola', text: 'Good seller, very swift delivery, item as seen', bought: 'Tyrone GAA jersey' },
  { handle: 'c_finn1', text: 'Top quality 💯', bought: 'Kerry GAA training vest' },
  { handle: 'oisinc_44', text: 'Great', bought: 'Ireland Italia 90 home jersey' },
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
          {REVIEWS.map((r) => (
            <li key={r.handle} className="border border-gray-200 bg-gray-50 p-6 flex flex-col justify-between">
              <div>
                <p className="text-[#1A533E] text-lg tracking-widest mb-3" aria-label="5 out of 5 stars on Depop">
                  <span aria-hidden>★★★★★</span>
                </p>
                <blockquote className="text-base text-gray-800 leading-relaxed">&ldquo;{r.text}&rdquo;</blockquote>
              </div>
              <p className="mt-4 text-sm">
                <span className="font-semibold text-[#0F2131]">@{r.handle}</span>
                {r.bought && <span className="block text-gray-500">Bought: {r.bought}</span>}
              </p>
            </li>
          ))}
        </ul>
        <a
          href={DEPOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-[var(--color-teal)] underline underline-offset-4"
        >
          See all our reviews on Depop →
        </a>
      </div>
    </section>
  );
}
