import Link from "next/link";
import { getNewIn } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";

export default function LatestArrivals() {
  // One shirt per club in turn from the latest additions, reshuffled on each deploy.
  const latest = getNewIn(8);

  return (
    <section id="latest-arrivals" className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-1">Just added</p>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#0F2131]">New In</h2>
          </div>
          <Link
            href="/catalog?category=football"
            className="shrink-0 text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors"
          >
            All football shirts →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
