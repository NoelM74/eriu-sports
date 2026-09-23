import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory } from '@/lib/products';
import { CATEGORIES, COLLECTIONS, DELIVERY, type CategoryKey } from '@/lib/collections';
import ProductCard from '@/components/catalog/ProductCard';

type SearchParams = Promise<{ category?: string }>;

/** Map the query string to a category. Older links used ?category=Jerseys / GAA. */
function resolveCategory(raw?: string): CategoryKey | 'all' {
  const v = (raw || '').toLowerCase();
  if (v === 'football' || v === 'jerseys') return 'football';
  if (v === 'gaa') return 'gaa';
  if (v === 'afl') return 'afl';
  return 'all';
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const key = resolveCategory((await searchParams).category);
  const cat = CATEGORIES.find((c) => c.key === key);
  const title = cat ? `${cat.h1} | Shop` : 'Shop Retro Football Shirts, GAA & AFL Jerseys';
  const description =
    cat?.description ??
    `Retro football shirts, GAA county jerseys, GAA training vests and AFL jerseys. Delivered to Ireland and the UK in ${DELIVERY}.`;
  const url = key === 'all' ? '/catalog' : `/catalog?category=${key}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Ériu Sports`, description, url, type: 'website' },
  };
}

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const key = resolveCategory((await searchParams).category);
  const cat = CATEGORIES.find((c) => c.key === key);
  const products = getProductsByCategory(key);
  const collections = COLLECTIONS.filter((c) => key === 'all' || c.category === key);

  const tabs: { key: CategoryKey | 'all'; label: string; href: string }[] = [
    { key: 'all', label: 'All', href: '/catalog' },
    ...CATEGORIES.map((c) => ({ key: c.key, label: c.label, href: `/catalog?category=${c.key}` })),
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#0F2131] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
            {cat ? cat.h1 : 'Shop All'}
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">
            {cat
              ? cat.description
              : `Retro football shirts, GAA jerseys, training vests and AFL jerseys. Delivered to Ireland and the UK in ${DELIVERY}.`}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav aria-label="Categories" className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              aria-current={t.key === key ? 'page' : undefined}
              className={`px-4 py-2.5 text-sm font-semibold uppercase tracking-wider border transition-colors ${
                t.key === key
                  ? 'bg-[#1A533E] border-[#1A533E] text-white'
                  : 'bg-white border-gray-200 text-[#0F2131] hover:border-[#1A533E]'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {collections.map((c) => (
            <li key={c.slug}>
              <Link href={`/collections/${c.slug}`} className="text-[#1C7C83] hover:text-[#1A533E] underline-offset-4 hover:underline">
                {c.h1} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-500 mb-6">{products.length} items</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </section>
    </div>
  );
}
