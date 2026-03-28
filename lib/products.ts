import productsData from '../data/products.json';

export type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  collection: string;
  currency: string;
};

export const products = productsData as Product[];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter(p => p.collection === collection);
}
