import { Metadata } from 'next';
import { getProductsByCollection } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';

export const metadata: Metadata = {
  title: 'Ireland Classics | Retro Irish Football Jerseys',
  description: 'Iconic Irish football heritage jerseys. From Italia 90 to USA 94, relive the golden era of Irish football with premium retro jerseys. Designed in Ireland.',
  keywords: ['Ireland football jerseys', 'retro Ireland shirts', 'Italia 90', 'USA 94', 'Irish football heritage', 'vintage Ireland kits'],
  openGraph: {
    title: 'Ireland Classics | Ériu Sports',
    description: 'Iconic Irish football heritage jerseys. From Italia 90 to USA 94.',
    url: '/collections/ireland-classics',
    type: 'website',
    images: [
      {
        url: '/images/ireland-classics/677983042-1.jpg',
        width: 800,
        height: 1000,
        alt: 'Ireland 1992-94 Home Retro Jersey',
      },
    ],
  },
  alternates: {
    canonical: '/collections/ireland-classics',
  },
};

export default function IrelandClassicsCollection() {
  const products = getProductsByCollection('Ireland Classics');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[var(--color-navy)] py-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[var(--color-emerald)] bg-gradient-to-r from-transparent to-[var(--color-emerald)] mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-[var(--color-teal)] mb-6">
            Ireland Classics
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-300 max-w-2xl px-4 leading-relaxed">
            The definitive collection of iconic Irish football heritage.
            DESIGNED IN IRELAND • BUILT FOR PERFORMANCE.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
