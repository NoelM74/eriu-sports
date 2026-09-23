import { Metadata } from 'next';
import Link from 'next/link';
import { getProductsByCategory, getClubs, searchProducts } from '@/lib/products';
import { CATEGORIES, COLLECTIONS, DELIVERY, type CategoryKey } from '@/lib/collections';
import ProductCard from '@/components/catalog/ProductCard';
import CatalogFilters from '@/components/catalog/CatalogFilters';

type SearchParams = Promise<{ category?: string; club?: string; q?: string }>;

/** Map the query string to a category. Older links used ?category=Jerseys / GAA. */
function resolveCategory(raw?: string): CategoryKey | 'all' {
  const v = (raw || '').toLowerCase();
  if (v === 'football' || v === 'jerseys') return 'football';
  if (v === 'gaa') return 'gaa';
  if (v === 'afl') return 'afl';
  return 'all';
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const sp = await searchParams;
  const key = resolveCategory(sp.category);
  const filtered = Boolean(sp.q || sp.club);
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
    // Search and club-filter results point search engines at /clubs pages instead.
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: `${title} | Ériu Sports`, description, url, type: 'website' },
  };
}

export default async function CatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const key = resolveCategory(sp.category);
  const cat = CATEGORIES.find((c) => c.key === key);
  const clubs = getClubs(key === 'all' ? undefined : key);
  const club = clubs.find((c) => c.slug === sp.club);
  const query = (sp.q ?? '').slice(0, 80);
  const inCategory = getProductsByCategory(key);
  const products = searchProducts(query, club ? inCategory.filter((p) => p.club?.slug === club.slug) : inCategory);
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
        <div className="mt-6 scroll-mt-28" id="search-panel">
          <CatalogFilters category={key} clubs={clubs} club={club?.slug ?? ''} query={query} />
        </div>
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
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
          <p className="text-sm text-gray-500" aria-live="polite">
            {products.length} {products.length === 1 ? 'item' : 'items'}
            {club && <> from <strong className="text-[#0F2131]">{club.name}</strong></>}
            {query && <> matching <strong className="text-[#0F2131]">&ldquo;{query}&rdquo;</strong></>}
          </p>
          {club && (
            <Link href={`/clubs/${club.slug}`} className="text-sm text-[#1C7C83] hover:underline underline-offset-4">
              All {club.name} shirts →
            </Link>
          )}
        </div>
        {products.length === 0 && (
          <div className="border border-dashed border-gray-300 p-8 text-center text-gray-600">
            <p>No shirts match that search yet.</p>
            <p className="mt-2 text-sm">
              Try a club name or season, or{' '}
              <Link href="/contact" className="text-[#1C7C83] underline underline-offset-4">ask us to find one</Link>.
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </section>
    </div>
  );
}
