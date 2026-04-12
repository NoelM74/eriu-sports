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

export const products: Product[] = (productsData as any[]).map((p, index) => {
  let badge: string | null = null;
  if (index === 0) badge = "New Arrival";
  if (index === 1) badge = "Selling Fast";
  if (index === 3) badge = "Classic";
  
  return {
    id: p.slug, // GitHub's UI uses product.id for routing
    originalId: p.id,
    name: p.title, // GitHub's UI expects name
    title: p.title,
    category: "Jerseys",
    collection: p.collection || "ireland-classics",
    price: p.price,
    images: p.images,
    sizes: ["S", "M", "L", "XL"],
    badge,
    description: p.description,
    specs: [
      "Classic retro design",
      "Premium breathable material",
      "Embroidered crest",
      "Designed in Ireland"
    ],
    rating: 5.0,
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
];
