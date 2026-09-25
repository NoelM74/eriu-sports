import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/catalog/ProductCard';
import { CATEGORIES } from '@/lib/collections';
import { getClubs, getClubBySlug, getProductsByClub, toCard } from '@/lib/products';
import { clubHeading, clubIntro, groupByDecade } from '@/lib/clubs';

const SITE = 'https://eriusports.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getClubs().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) return { title: 'Club not found' };
  const items = getProductsByClub(slug);
  const heading = clubHeading(club, items);
  const description = clubIntro(club, items);
  const image = items[0]?.images[0];
  return {
    title: `${heading} | Home & Away Kits`,
    description,
    alternates: { canonical: `/clubs/${club.slug}` },
    // A single-shirt page is too thin to be worth indexing yet.
    ...(club.count < 2 ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${heading} | Ériu Sports`,
      description,
      url: `/clubs/${club.slug}`,
      type: 'website',
      images: image ? [{ url: `${SITE}${image}`, alt: heading }] : undefined,
    },
  };
}

export default async function ClubPage({ params }: Props) {
  const { slug } = await params;
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const items = getProductsByClub(slug);
  const heading = clubHeading(club, items);
  const category = CATEGORIES.find((c) => c.key === club.category)!;
  const groups = groupByDecade(items);
  const others = getClubs(club.category).filter((c) => c.slug !== club.slug);
  const sizes = [...new Set(items.flatMap((p) => p.sizes))];
  const minPrice = Math.min(...items.map((p) => p.price));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: heading,
      description: clubIntro(club, items),
      url: `${SITE}/clubs/${club.slug}`,
      about: { '@type': 'SportsTeam', name: club.name },
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
        { '@type': 'ListItem', position: 2, name: 'Shop by Club', item: `${SITE}/clubs` },
        { '@type': 'ListItem', position: 3, name: club.name, item: `${SITE}/clubs/${club.slug}` },
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
              <li><Link href="/clubs" className="hover:text-white">Shop by Club</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">{club.name}</li>
            </ol>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">{category.label}</p>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] max-w-3xl">{heading}</h1>
          <p className="mt-5 text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">{clubIntro(club, items)}</p>
          <ul className="mt-7 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
            <li className="border border-white/20 px-3 py-2">From €{minPrice % 1 ? minPrice.toFixed(2) : minPrice}</li>
            <li className="border border-white/20 px-3 py-2">Worldwide delivery</li>
            <li className="border border-white/20 px-3 py-2">Free over €49</li>
            <li className="border border-white/20 px-3 py-2">Sizes {sizes[0]}–{sizes[sizes.length - 1]}</li>
          </ul>
        </div>
      </section>

      {groups.length > 1 && (
        <nav aria-label="Jump to decade" className="border-b border-gray-100 bg-white">
          <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 overflow-x-auto py-3">
            {groups.map((g) => (
              <li key={g.label} className="shrink-0">
                <a href={`#${g.label}`} className="inline-block border border-gray-200 px-4 py-2 text-sm font-semibold text-[#0F2131] hover:border-[#1A533E]">
                  {g.label} <span className="text-gray-400 font-normal">({g.items.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        {groups.map((g) => (
          <section key={g.label || 'all'} id={g.label || undefined} className="scroll-mt-32" aria-label={g.label || heading}>
            {g.label && (
              <h2 className="text-2xl font-bold uppercase text-[#0F2131] mb-5">
                {club.name} shirts from the {g.label}
              </h2>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {g.items.map((product, i) => (
                <ProductCard key={product.id} product={toCard(product)} priority={i < 4 && g === groups[0]} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {others.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-4">
              {club.category === 'gaa' ? 'Other counties' : 'Other clubs'}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/clubs/${c.slug}`}
                    className="inline-block bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E] transition-colors"
                  >
                    {c.name} <span className="text-gray-400">({c.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
