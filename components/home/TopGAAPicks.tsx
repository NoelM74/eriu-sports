import Link from "next/link";
import { getProductsByCollection } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";

export default function TopGAAPicks() {
  const picks = getProductsByCollection("GAA Gear").slice(0, 4);

  if (picks.length === 0) return null;

  return (
    <section id="top-gaa-picks" className="bg-[#f7f7f5] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-gray-200 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A533E] mb-1">
              County Colours
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0F2131] tracking-tight">
              Top GAA Picks
            </h2>
            <p className="text-sm font-medium text-gray-500 mt-2">
              Fresh county jerseys, straight from the parish.
            </p>
          </div>
          <Link
            href="/collections/gaa-gear"
            className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors mt-4 md:mt-0"
          >
            View All GAA Gear →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {picks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
