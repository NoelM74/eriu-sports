import productsData from '../data/products.json';

export interface Product {
  id: string;
  originalId: string;
  name: string;
  title: string;
  category: string;
  collection: string;
  price: number;
  images: string[];
  sizes: string[];
  badge: string | null;
  description: string;
  specs: string[];
  rating: number;
  reviewCount: number;
  slug: string;
  currency: string;
}

/**
 * Derive a category from the collection name.
 * This allows filtering by broader categories while keeping collection-specific data.
 */
function deriveCategory(collection: string): string {
  if (collection === 'Ireland Classics') return 'Jerseys';
  if (collection === 'Premier League Classics') return 'Jerseys';
  if (collection === 'GAA Gear') return 'GAA';
  return 'Jerseys';
}

/**
 * Derive badge from product attributes.
 * Conservative: only badge explicitly new or limited products.
 * Most products should have no badge.
 */
function deriveBadge(p: any): string | null {
  const title = (p.title || '').toLowerCase();
  const desc = (p.description || '').toLowerCase();

  // Only mark as Limited Edition if explicitly stated
  if (desc.includes('limited edition') || title.includes('limited edition')) return 'Limited Edition';

  // Only mark as New Arrival if it's a recent year release
  if (title.includes('2026') || title.includes('2025')) return 'New Arrival';
  if (desc.includes('new arrival') || desc.includes('new release')) return 'New Arrival';

  // No badge for classic/retro products — they speak for themselves
  return null;
}

export const products: Product[] = (productsData as any[]).map((p, index) => {
  const collection = p.collection || "Ireland Classics";

  return {
    id: p.slug, // Used for routing
    originalId: p.id,
    name: p.title,
    title: p.title,
    category: deriveCategory(collection),
    collection: collection,
    price: p.price,
    images: p.images,
    sizes: ["S", "M", "L", "XL"],
    badge: deriveBadge(p),
    description: p.description,
    specs: [
      "Classic retro design",
      "Premium breathable material",
      "Embroidered crest",
      "Designed in Ireland"
    ],
    rating: Math.round((4.8 + (index % 10) * 0.02) * 10) / 10,
    reviewCount: 42 + index * 17,
    slug: p.slug,
    currency: p.currency || "EUR",
  };
});

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCollection(collection: string): Product[] {
  if (collection === 'All') return products;
  // Newest listings (added at the end of products.json) appear first
  return products.filter(p => p.collection === collection).reverse();
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}

export const categories = [
  "All",
  "Jerseys",
  "GAA",
  "Accessories",
];

export const collections = [
  "All",
  "Ireland Classics",
  "Premier League Classics",
  "GAA Gear",
];
