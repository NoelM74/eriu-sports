import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/catalog/ProductCard";

export default function Trending() {
  const targetIds = [
    "liverpool-96-98-home-shirt", // Liverpool (Red)
    "manchester-united-away-1993-95", // Man Utd (Black/Yellow/Green details)
    "man-city-98-99-home", // Man City (Light Blue)
    "arsenal-1991-93-bruised-banana", // Arsenal (Yellow)
  ];
  
  // Create an array mapping to exactly these IDs
  const trendingProducts = targetIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  if (trendingProducts.length === 0) return null;

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b border-gray-100 pb-4">
          <div>
             <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#0F2131] tracking-tight">
              Trending
            </h2>
            <p className="text-sm font-medium text-gray-500 mt-2 flex gap-1 items-center">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
              Fastest selling classics right now
            </p>
          </div>
          <Link
            href="/collections/premier-league-classics"
            className="text-xs font-bold uppercase tracking-widest text-[#1A533E] border-b border-[#1A533E] pb-0.5 hover:text-[#1C7C83] hover:border-[#1C7C83] transition-colors mt-4 md:mt-0"
          >
            View More Classics →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
