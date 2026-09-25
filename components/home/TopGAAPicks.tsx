import Link from "next/link";
import { getProductsByCollectionSlug, toCard } from "@/lib/products";
import ShuffledGrid from "@/components/catalog/ShuffledGrid";

export default function TopGAAPicks() {
  // All county jerseys; the grid shows a random 4, mixed by county, on each visit.
  const picks = getProductsByCollectionSlug("gaa-jerseys");
  if (picks.length === 0) return null;

  return (
    <section id="gaa-jerseys" className="bg-[#f7f7f5] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-gray-200 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1A533E] mb-1">County colours</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0F2131] tracking-tight">GAA Jerseys</h2>
            <p className="text-sm font-medium text-gray-500 mt-2">Home, away and goalkeeper jerseys. €29.95 each.</p>
          </div>
          <div className="flex gap-5">
            <Link
              href="/collections/gaa-jerseys"
              className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors"
            >
              All GAA jerseys →
            </Link>
            <Link
              href="/collections/gaa-training-vests"
              className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors"
            >
              Training vests →
            </Link>
          </div>
        </div>
        <ShuffledGrid products={picks.map(toCard)} limit={4} className="grid grid-cols-2 lg:grid-cols-4 gap-4" />
      </div>
    </section>
  );
}
