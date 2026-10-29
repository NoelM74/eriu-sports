import Image from 'next/image';
import Link from 'next/link';
import type { BuyerReview } from '@/lib/reviews';

export function Stars() {
  return (
    <span className="text-[#1A533E] tracking-widest" aria-label="5 out of 5 stars on Depop">
      <span aria-hidden>★★★★★</span>
    </span>
  );
}

/** One review in compact form: stars, quote, @handle and a thumbnail of what they bought. */
export default function ReviewQuote({ review, linkProduct = true }: { review: BuyerReview; linkProduct?: boolean }) {
  const href = linkProduct && review.slug ? `/products/${review.slug}` : null;
  const thumb = (
    <Image
      src={review.image}
      alt={review.bought}
      width={48}
      height={48}
      className="w-12 h-12 object-cover bg-white border border-gray-200 shrink-0"
    />
  );
  return (
    <figure className="flex gap-3 items-start">
      {href ? (
        <Link href={href} aria-label={`See the ${review.bought}`} className="shrink-0">
          {thumb}
        </Link>
      ) : (
        thumb
      )}
      <div className="text-sm leading-snug">
        <p className="text-xs">
          <Stars />
        </p>
        <blockquote className="mt-1 text-gray-800">&ldquo;{review.text}&rdquo;</blockquote>
        <figcaption className="mt-1 text-gray-500">
          <span className="font-semibold text-[#0F2131]">@{review.handle}</span> · Bought: {review.bought}
        </figcaption>
      </div>
    </figure>
  );
}
