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
 * Derive badge from product attributes instead of array index.
 */
function deriveBadge(p: any, index: number): string | null {
  // Check title/description for hints
  const title = (p.title || '').toLowerCase();
  const desc = (p.description || '').toLowerCase();

  if (title.includes('new') || desc.includes('new release')) return "New Arrival";
  if (title.includes('limited') || desc.includes('limited edition')) return "Limited Edition";
  if (desc.includes('iconic') || desc.includes('legendary')) return "Classic";

  // Fallback: assign based on position for demo purposes
  if (index % 5 === 0) return "New Arrival";
  if (index % 7 === 0) return "Selling Fast";
  if (index % 11 === 0) return "Classic";

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
    badge: deriveBadge(p, index),
    description: p.description,
    specs: [
      "Classic retro design",
      "Premium breathable material",
      "Embroidered crest",
      "Designed in Ireland"
    ],
    rating: 4.8 + (index % 10) * 0.02,
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
