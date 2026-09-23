import productsData from '../data/products.json';
import { COLLECTIONS, getCollectionByName, type CategoryKey } from './collections';
import { mixByClub, seededRandom } from './shuffle';

export interface ProductDetails {
  team?: string;
  season?: string;
  kit?: string;
  sponsor?: string;
  colours?: string;
  fit?: string;
  condition?: string;
  /** Player name and number printed on the back, e.g. "Henry 14". */
  print?: string;
  /** Full name of the player on the back, e.g. "Thierry Henry". */
  player?: string;
}

export interface Player {
  name: string;
  slug: string;
}

export interface Club {
  name: string;
  slug: string;
}

/** Measurements for one sample size, used as a fit guide on the product page. */
export interface SizeGuide {
  size: string;
  rows: [string, string][];
}

export interface Product {
  id: string;
  originalId: string;
  name: string;
  title: string;
  /** Top-level category: football | gaa | afl */
  category: CategoryKey;
  collection: string;
  collectionSlug: string;
  price: number;
  images: string[];
  sizes: string[];
  badge: string | null;
  description: string;
  details: ProductDetails;
  sizeGuide?: SizeGuide;
  club: Club | null;
  player: Player | null;
  slug: string;
  currency: string;
}

interface RawProduct {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  collection: string;
  currency?: string;
  details?: ProductDetails;
  sizeGuide?: { size: string; rows: string[][] };
  sizes?: string[];
}

export const SIZES = ['S', 'M', 'L', 'XL'];

/** Only flag current-season kits. Most retro products need no badge. */
function deriveBadge(p: RawProduct): string | null {
  if (/\b(2025|2026)\b/.test(p.title)) return 'New Season';
  return null;
}

export function slugify(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    // Letters that don't split into a base letter plus an accent
    .replace(/[ðđ]/g, 'd')
    .replace(/þ/g, 'th')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/ß/g, 'ss')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** "Arsenal FC" -> { name: "Arsenal", slug: "arsenal" }. */
function toClub(team?: string): Club | null {
  if (!team) return null;
  const name = team.replace(/\s+FC$/, '').trim();
  return { name, slug: slugify(name) };
}

export const products: Product[] = (productsData as RawProduct[]).map((p) => {
  const coll = getCollectionByName(p.collection) ?? COLLECTIONS[0];
  return {
    id: p.slug,
    originalId: p.id,
    name: p.title,
    title: p.title,
    category: coll.category,
    collection: coll.name,
    collectionSlug: coll.slug,
    price: p.price,
    images: p.images,
    sizes: p.sizes ?? SIZES,
    badge: deriveBadge(p),
    description: p.description,
    details: p.details ?? {},
    sizeGuide: p.sizeGuide
      ? { size: p.sizeGuide.size, rows: p.sizeGuide.rows.map((r) => [r[0], r[1]] as [string, string]) }
      : undefined,
    club: toClub(p.details?.team),
    player: p.details?.player ? { name: p.details.player, slug: slugify(p.details.player) } : null,
    slug: p.slug,
    currency: p.currency || 'EUR',
  };
});

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Products in a collection, newest listings first. */
export function getProductsByCollection(collectionName: string): Product[] {
  return products.filter((p) => p.collection === collectionName).reverse();
}

export function getProductsByCollectionSlug(slug: string): Product[] {
  return products.filter((p) => p.collectionSlug === slug).reverse();
}

/** Products in a top-level category, newest first. `all` returns everything. */
export function getProductsByCategory(category: CategoryKey | 'all'): Product[] {
  const list = category === 'all' ? products : products.filter((p) => p.category === category);
  return [...list].reverse();
}

/** Most recently added products across the whole shop. */
export function getLatestProducts(limit = 8): Product[] {
  return [...products].reverse().slice(0, limit);
}

/** Other products from the same team, then the same collection. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const team = product.details.team;
  const sameTeam = team ? products.filter((p) => p.slug !== product.slug && p.details.team === team) : [];
  const sameCollection = products.filter(
    (p) => p.slug !== product.slug && p.collection === product.collection && !sameTeam.includes(p)
  );
  return [...sameTeam, ...sameCollection].slice(0, limit);
}

export interface ClubSummary extends Club {
  count: number;
  category: CategoryKey;
}

/** Every club or county with stock, most products first. */
export function getClubs(category?: CategoryKey): ClubSummary[] {
  const map = new Map<string, ClubSummary>();
  for (const p of products) {
    if (!p.club || (category && p.category !== category)) continue;
    const c = map.get(p.club.slug);
    if (c) c.count++;
    else map.set(p.club.slug, { ...p.club, count: 1, category: p.category });
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getClubBySlug(slug: string): ClubSummary | undefined {
  return getClubs().find((c) => c.slug === slug);
}

/** A club's products, newest first. */
export function getProductsByClub(slug: string): Product[] {
  return products.filter((p) => p.club?.slug === slug).reverse();
}

/** "2002-04" -> "2002 2003 2004", so a search for 2004 finds that shirt. */
function seasonYears(season?: string): string {
  const m = season?.match(/^(\d{4})(?:[-/](\d{2,4}))?/);
  if (!m) return '';
  const start = Number(m[1]);
  let end = m[2] ? Number(m[2].length === 2 ? m[1].slice(0, 2) + m[2] : m[2]) : start;
  if (end < start) end += 100;
  const years: number[] = [];
  for (let y = start; y <= Math.min(end, start + 5); y++) years.push(y);
  return years.join(' ');
}

/** Common short forms people type. */
const ALIASES: Record<string, string> = {
  utd: 'united', spurs: 'tottenham', gunners: 'arsenal', reds: 'liverpool', roi: 'ireland',
  r9: 'nazario', cr7: 'cristiano', barca: 'barcelona',
};

/** Simple keyword search across title, team, season, kit, sponsor and printed name. */
export function searchProducts(query: string, list: Product[] = products): Product[] {
  const words = slugify(query).split('-').filter(Boolean).map((w) => ALIASES[w] ?? w);
  if (!words.length) return list;
  return list.filter((p) => {
    const d = p.details;
    const hay = slugify(
      [p.title, d.team, d.season, seasonYears(d.season), d.kit, d.sponsor, d.colours, d.print, d.player, p.collection].filter(Boolean).join(' ')
    );
    return words.every((w) => hay.includes(w));
  });
}

/**
 * A club-mixed selection of recently added football shirts for the homepage.
 * The server order changes daily; ShuffledGrid reshuffles it on every visit.
 */
export function getNewIn(limit = 8, pool = 100): Product[] {
  const recent = getProductsByCategory('football').slice(0, pool);
  return mixByClub(recent, seededRandom(Math.floor(Date.now() / 86_400_000))).slice(0, limit);
}

export interface PlayerSummary extends Player {
  count: number;
  /** Clubs and countries the player's shirts come from, earliest first. */
  teams: string[];
  image: string;
}

function seasonStart(p: Product): number {
  const m = p.details.season?.match(/\d{4}/);
  return m ? Number(m[0]) : 0;
}

/** Players with at least `min` shirts, most shirts first. */
export function getPlayers(min = 2): PlayerSummary[] {
  const map = new Map<string, Product[]>();
  for (const p of products) {
    if (!p.player) continue;
    map.set(p.player.slug, [...(map.get(p.player.slug) ?? []), p]);
  }
  return [...map.values()]
    .filter((list) => list.length >= min)
    .map((list) => {
      const sorted = [...list].sort((a, b) => seasonStart(a) - seasonStart(b));
      return {
        ...list[0].player!,
        count: list.length,
        teams: [...new Set(sorted.map((p) => p.club?.name).filter((t): t is string => Boolean(t)))],
        // First photo is the back of the shirt, showing the name.
        image: sorted[sorted.length - 1].images[0],
      };
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPlayerBySlug(slug: string): PlayerSummary | undefined {
  return getPlayers(1).find((p) => p.slug === slug);
}

/** A player's shirts, oldest season first. */
export function getProductsByPlayer(slug: string): Product[] {
  return products.filter((p) => p.player?.slug === slug).sort((a, b) => seasonStart(a) - seasonStart(b));
}
