import { Metadata } from 'next';
import { getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/catalog/ProductCard';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}): Promise<Metadata> {
  const { category: rawCategory } = await searchParams;
  const category = rawCategory || 'All';

  const title = category === 'All'
    ? 'Complete Collection | Ériu Sports'
    : `${category} | Ériu Sports`;

  const description = category === 'All'
    ? 'Browse our complete collection of premium retro football jerseys and GAA gear. Designed in Ireland, built for performance.'
    : `Shop our ${category} collection. Premium retro football jerseys and GAA gear. Designed in Ireland.`;

  return {
    title,
    description,
    keywords: [category === 'All' ? 'football jerseys' : category, 'retro shirts', 'Ériu Sports'],
    openGraph: {
      title,
      description,
      url: `/catalog${rawCategory ? `?category=${rawCategory}` : ''}`,
      type: 'website',
    },
    alternates: {
      canonical: `/catalog${rawCategory ? `?category=${rawCategory}` : ''}`,
    },
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: rawCategory } = await searchParams;
  const category = rawCategory || 'All';
  const displayProducts = getProductsByCategory(category === 'Jerseys' ? 'Jerseys' : 'All');

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-[#0F2131] py-16 px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-4">
            {category === 'All' ? 'Complete Collection' : category}
          </h1>
          <p className="text-lg md:text-xl font-light text-zinc-300 max-w-2xl px-4 leading-relaxed">
            Premium GAA sports merchandise and performance gear.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
