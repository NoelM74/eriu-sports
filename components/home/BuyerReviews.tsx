/**
 * Real reviews from buyers on our Depop shop, quoted word for word. All six were
 * 5-star reviews (user, 29 October 2026); only add a review with its real rating.
 * Shown on the page only, with no Review or AggregateRating markup, because Google
 * doesn't allow structured data for reviews collected on another site.
 * Add new ones as they come in; never edit or invent a review.
 */
const REVIEWS: string[] = [
  "Worth the wait… Brilliantly packaged and great bit of kit. Top marks.",
  "Very happy with the Jersey, good quality for the price",
  "Great communication, good service package came as described, would recommend 💪🏼",
  "Good seller, very swift delivery, item as seen",
  "Top quality 💯",
  "Great",
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
          {REVIEWS.map((text) => (
            <li key={text} className="border border-gray-200 bg-gray-50 p-6 flex flex-col justify-between">
              <div>
                <p className="text-[#1A533E] text-lg tracking-widest mb-3" aria-label="5 out of 5 stars on Depop">
                  <span aria-hidden>★★★★★</span>
                </p>
                <blockquote className="text-base text-gray-800 leading-relaxed">&ldquo;{text}&rdquo;</blockquote>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-500">Depop buyer</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-gray-500">
          Five-star reviews, quoted word for word, from people who bought from us on Depop.
        </p>
      </div>
    </section>
  );
}
