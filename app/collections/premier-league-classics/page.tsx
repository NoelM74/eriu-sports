import { Metadata } from 'next';
import { getProductsByCollection } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';

export const metadata: Metadata = {
  title: 'Premier League Classics | Retro Football Jerseys',
  description: 'Iconic Premier League retro jerseys from the golden era. Liverpool, Man United, Arsenal, and more. Relive the 90s and early 2000s with classic football shirts.',
  keywords: ['Premier League retro jerseys', '90s football shirts', 'Liverpool retro', 'Man United classic', 'Arsenal bruised banana', 'vintage Premier League kits'],
  openGraph: {
    title: 'Premier League Classics | Ériu Sports',
    description: 'Iconic Premier League retro jerseys from the golden era.',
    url: '/collections/premier-league-classics',
    type: 'website',
  },
  alternates: {
    canonical: '/collections/premier-league-classics',
  },
};

export default function PremierLeagueClassicsCollection() {
  const products = getProductsByCollection('Premier League Classics');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[var(--color-navy)] py-20 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-purple-500 via-transparent to-[var(--color-teal)] mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-white mb-6">
            Premier League Classics
          </h1>
          <p className="text-xl md:text-2xl font-light text-zinc-300 max-w-2xl px-4 leading-relaxed">
            The golden era of English football. Iconic jerseys from the 90s and early 2000s.
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
