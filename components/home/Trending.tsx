import Link from "next/link";
import { getProductBySlug, type Product } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";

const PICKS = [
  "ireland-1994-world-cup-home",
  "manchester-united-98-99-treble-season",
  "liverpool-2005-istanbul-champions",
  "arsenal-1991-93-bruised-banana",
];

export default function Trending() {
  const picks = PICKS.map(getProductBySlug).filter((p): p is Product => Boolean(p));
  if (picks.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0F2131] tracking-tight">
              Shirts With a Story
            </h2>
            <p className="text-sm font-medium text-gray-500 mt-2">
              USA 94, the Treble, Istanbul and the bruised banana.
            </p>
          </div>
          <Link
            href="/collections/premier-league-classics"
            className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors"
          >
            Premier League classics →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {picks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
