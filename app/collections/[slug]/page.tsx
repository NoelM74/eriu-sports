import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShuffledGrid from '@/components/catalog/ShuffledGrid';
import ClubPicker from '@/components/catalog/ClubPicker';
import { COLLECTIONS, getCollectionBySlug, CATEGORIES, DELIVERY } from '@/lib/collections';
import { getProductsByCollectionSlug, groupKidsKits, toCard, type ClubSummary } from '@/lib/products';

const SITE = 'https://eriusports.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) return { title: 'Collection not found' };
  const image = getProductsByCollectionSlug(slug)[0]?.images[0];
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    keywords: c.keywords,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: {
      title: `${c.seoTitle} | Ériu Sports`,
      description: c.seoDescription,
      url: `/collections/${c.slug}`,
      type: 'website',
      images: image ? [{ url: `${SITE}${image}`, alt: c.h1 }] : undefined,
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const c = getCollectionBySlug(slug);
  if (!c) notFound();

  const items = getProductsByCollectionSlug(slug);
  const category = CATEGORIES.find((cat) => cat.key === c.category)!;
  const siblings = COLLECTIONS.filter((x) => x.slug !== c.slug);
  const sizes = [...new Set(items.flatMap((p) => p.sizes))];
  const clubMap = new Map<string, ClubSummary>();
  for (const p of items) {
    if (!p.club) continue;
    const found = clubMap.get(p.club.slug);
    if (found) found.count++;
    else clubMap.set(p.club.slug, { ...p.club, count: 1, category: p.category });
  }
  // Kids kits are split into Premier League, international and retro sections.
  const sections = c.slug === 'kids-football-kits' ? groupKidsKits(items) : null;
  const clubs = [...clubMap.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: c.h1,
      description: c.seoDescription,
      url: `${SITE}/collections/${c.slug}`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/products/${p.slug}`,
          name: p.title,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: category.label, item: `${SITE}/catalog?category=${c.category}` },
        { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE}/collections/${c.slug}` },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-[#0F2131] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pb-16">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-8">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href={`/catalog?category=${c.category}`} className="hover:text-white">{category.label}</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">{c.name}</li>
            </ol>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">{c.name}</p>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] max-w-3xl">
            {c.h1}
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">{c.intro}</p>
          <ul className="mt-7 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
            <li className="border border-white/20 px-3 py-2">From €{c.priceFrom.toFixed(c.priceFrom % 1 ? 2 : 0)}</li>
            <li className="border border-white/20 px-3 py-2">Delivered in {DELIVERY}</li>
            <li className="border border-white/20 px-3 py-2">Ireland &amp; UK</li>
            <li className="border border-white/20 px-3 py-2">Sizes {sizes[0]}–{sizes[sizes.length - 1]}</li>
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {clubs.length > 1 && (
          <ClubPicker clubs={clubs} label={c.category === 'gaa' ? 'Shop by county' : 'Shop by club'} />
        )}
        <p className="text-sm text-gray-500 mb-6">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
        {sections ? (
          <>
            <nav aria-label="Sections" className="flex flex-wrap gap-2 mb-10">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-4 py-2.5 text-sm font-semibold uppercase tracking-wider border border-gray-200 text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E] transition-colors"
                >
                  {s.label} <span className="text-gray-400 font-normal">({s.items.length})</span>
                </a>
              ))}
            </nav>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mb-14 last:mb-0 scroll-mt-28">
                <h2 id={`${s.id}-heading`} className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#0F2131] mb-6">
                  {s.label}
                </h2>
                <ShuffledGrid products={s.items.map(toCard)} priorityCount={i === 0 ? 4 : 0} />
              </section>
            ))}
          </>
        ) : (
          <ShuffledGrid products={items.map(toCard)} priorityCount={4} />
        )}
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-4">More to browse</h2>
          <ul className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/collections/${s.slug}`}
                  className="inline-block bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E] transition-colors"
                >
                  {s.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
