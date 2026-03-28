import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";

export default function LatestArrivals() {
  const latest = products.slice(0, 4);

  return (
    <section id="latest-arrivals" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-1">
              Fresh Drop
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#0F2131]">
              Latest Arrivals
            </h2>
          </div>
          <Link
            href="/collections/ireland-classics"
            className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
