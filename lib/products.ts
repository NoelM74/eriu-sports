import productsData from '../data/products.json';
import { COLLECTIONS, getCollectionByName, type CategoryKey } from './collections';

export interface ProductDetails {
  team?: string;
  season?: string;
  kit?: string;
  sponsor?: string;
  colours?: string;
  fit?: string;
  condition?: string;
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
}

export const SIZES = ['S', 'M', 'L', 'XL'];

/** Only flag current-season kits. Most retro products need no badge. */
function deriveBadge(p: RawProduct): string | null {
  if (/\b(2025|2026)\b/.test(p.title)) return 'New Season';
  return null;
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
    sizes: SIZES,
    badge: deriveBadge(p),
    description: p.description,
    details: p.details ?? {},
    sizeGuide: p.sizeGuide
      ? { size: p.sizeGuide.size, rows: p.sizeGuide.rows.map((r) => [r[0], r[1]] as [string, string]) }
      : undefined,
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
