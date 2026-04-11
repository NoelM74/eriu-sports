import { getProductsByCollection } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';

export default function GAAGearCollection() {
  const products = getProductsByCollection('GAA Gear');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-emerald-900 py-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-green-500 via-transparent to-amber-500 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-[#FFB81C] mb-6">
            GAA Gear
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-100 max-w-2xl px-4 leading-relaxed">
            The heart and soul of Irish sports. GAA gear crafted for the fans and players alike.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="text-center py-20">
             <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
             <p className="text-gray-500">We are currently sourcing the best vintage and authentic GAA gear for this collection. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
