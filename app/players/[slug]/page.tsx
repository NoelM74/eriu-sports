import { Metadata } from 'next';
import { clipDescription, pageTitle } from '@/lib/seo';
import Link from 'next/link';
import AboutSection from '@/components/catalog/AboutSection';
import { PLAYER_ABOUT } from '@/lib/page-copy';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/catalog/ProductCard';
import { getPlayers, getPlayerBySlug, getProductsByPlayer, toCard, type Product, type PlayerSummary } from '@/lib/products';
import { PLAYER_BIOS } from '@/lib/players';
import { ldJson } from '@/lib/jsonld';

const SITE = 'https://eriusports.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPlayers().map((p) => ({ slug: p.slug }));
}

const list = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

/** Short names searchers use, for titles where space is tight. */
const SHORT_TEAM: Record<string, string> = {
  'Paris Saint-Germain': 'PSG',
  'Arsenal FC': 'Arsenal',
  'Liverpool FC': 'Liverpool',
  'Chelsea FC': 'Chelsea',
  'Manchester United': 'Man United',
  'Inter Milan': 'Inter',
  'PSV Eindhoven': 'PSV',
  'Republic of Ireland': 'Ireland',
  'Tottenham Hotspur': 'Spurs',
};

/**
 * Hand-written titles where the automatic one misses how people search. Ronaldo has five clubs and
 * people type "ronaldo 9", "r9" and "ronaldo psv shirt", so name the clubs rather than the numbers.
 */
const TITLE_OVERRIDE: Record<string, string> = {
  'ronaldo-nazario': 'Ronaldo R9 Shirts | Brazil, Inter, Real Madrid & PSV',
};

function what(player: PlayerSummary) {
  return player.kids ? 'kids kits' : player.someKids ? 'shirts and kids kits' : player.retro ? 'retro shirts' : 'shirts';
}

/** "PSG 21 and 10, Barcelona 10 and AC Milan 80": the numbers on our shirts, in career order. */
function numberList(player: PlayerSummary) {
  return player.numbers.map((g) => `${g.team.replace(/ FC$/, '')} ${list.format(g.numbers)}`);
}

function intro(player: PlayerSummary) {
  const price = player.minPrice === player.maxPrice ? `€${player.minPrice} each` : `€${player.minPrice} to €${player.maxPrice}`;
  const numbers = numberList(player);
  const from = numbers.length ? list.format(numbers) : list.format(player.teams);
  return `${player.name} ${what(player)} with name and number: ${from}. ${player.count} in stock, ${price}. Worldwide delivery, free over €49.`;
}

/**
 * Search title that names the clubs and numbers people type ("ronaldinho psg shirt", "ronaldo psv shirt"):
 * "Ronaldinho Shirts | PSG 21, Barcelona 10 & AC Milan 80". Pairs are added in career order while they fit.
 */
function playerTitle(player: PlayerSummary) {
  const lead = `${player.name} ${player.kids ? 'Kids Kits' : player.someKids ? 'Shirts & Kids Kits' : 'Shirts'}`;
  if (TITLE_OVERRIDE[player.slug]) return TITLE_OVERRIDE[player.slug];
  const pairs = player.numbers.map((g) => `${SHORT_TEAM[g.team] ?? g.team} ${g.numbers[0]}`);
  const parts: string[] = [];
  for (const pair of pairs) {
    const next = [...parts, pair];
    const tail = next.length > 1 ? `${next.slice(0, -1).join(', ')} & ${next[next.length - 1]}` : next[0];
    if (`${lead} | ${tail}`.length > 60) break;
    parts.splice(0, parts.length, ...next);
  }
  if (!parts.length) return `${lead} | ${player.retro ? 'Retro ' : ''}Name & Number`;
  const tail = parts.length > 1 ? `${parts.slice(0, -1).join(', ')} & ${parts[parts.length - 1]}` : parts[0];
  // One club only: say "Retro" too, as in "Thierry Henry Shirts | Retro Arsenal 14".
  return `${lead} | ${parts.length === 1 && player.retro ? 'Retro ' : ''}${tail}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player) return { title: 'Player not found' };
  const description = clipDescription(intro(player));
  return {
    title: pageTitle(playerTitle(player)),
    description,
    alternates: { canonical: `/players/${player.slug}` },
    openGraph: {
      title: `${player.name} ${player.kids ? 'Kids Kits' : 'Shirts'} | Ériu Sports`,
      description,
      url: `/players/${player.slug}`,
      type: 'website',
      images: [{ url: `${SITE}${player.image}`, alt: `${player.name} shirt` }],
    },
  };
}

export default async function PlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);
  if (!player || player.count < 2) notFound();

  const items = getProductsByPlayer(slug);
  const bio = PLAYER_BIOS[slug];
  // Group by club or country, in the order the player played for them.
  const groups: { team: string; items: Product[] }[] = [];
  for (const p of items) {
    const team = p.club?.name ?? 'Other';
    const g = groups.find((x) => x.team === team);
    if (g) g.items.push(p);
    else groups.push({ team, items: [p] });
  }
  const others = getPlayers().filter((p) => p.slug !== slug);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${player.name} ${player.kids ? 'Kids Kits' : 'Shirts'}`,
      description: intro(player),
      url: `${SITE}/players/${player.slug}`,
      about: { '@type': 'Person', name: player.name },
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
        { '@type': 'ListItem', position: 2, name: 'Players', item: `${SITE}/players` },
        { '@type': 'ListItem', position: 3, name: player.name, item: `${SITE}/players/${player.slug}` },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(jsonLd) }} />

      <section className="bg-[#0F2131] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 md:pb-16">
          <nav aria-label="Breadcrumb" className="text-xs text-white/60 mb-8">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/players" className="hover:text-white">Players</Link></li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-white">{player.name}</li>
            </ol>
          </nav>
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">Name &amp; number shirts</p>
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] max-w-3xl">
            {player.name} {player.kids ? 'Kids Kits' : 'Shirts'}
          </h1>
          {bio && <p className="mt-5 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed">{bio}</p>}
          <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl">{intro(player)}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        {groups.map((g, gi) => (
          <section key={g.team} aria-label={g.team}>
            {groups.length > 1 && (
              <h2 className="text-2xl font-bold uppercase text-[#0F2131] mb-5">{g.team}</h2>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {g.items.map((product, i) => (
                <ProductCard key={product.id} product={toCard(product)} priority={gi === 0 && i < 4} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <AboutSection copy={PLAYER_ABOUT[player.slug]} />

      {others.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#0F2131] mb-4">More players</h2>
            <ul className="flex flex-wrap gap-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/players/${p.slug}`}
                    className="inline-block bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E] transition-colors"
                  >
                    {p.name} <span className="text-gray-400">({p.count})</span>
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
