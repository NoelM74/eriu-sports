import { MetadataRoute } from 'next';
import { products } from '@/lib/products';
import { COLLECTIONS, CATEGORIES } from '@/lib/collections';

const SITE = 'https://eriusports.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly') => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page('', 1, 'daily'),
    page('/catalog', 0.8, 'daily'),
    ...CATEGORIES.map((c) => page(`/catalog?category=${c.key}`, 0.8, 'weekly')),
    ...COLLECTIONS.map((c) => page(`/collections/${c.slug}`, 0.9, 'weekly')),
    ...products.map((p) => ({
      ...page(`/products/${p.slug}`, 0.7, 'weekly'),
      images: p.images.slice(0, 3).map((img) => `${SITE}${img}`),
    })),
    page('/blog', 0.6, 'weekly'),
    page('/blog/ireland-1990-italia-90', 0.6, 'monthly'),
    page('/blog/cork-city-1988-89', 0.6, 'monthly'),
    page('/blog/liverpool-95-96-carlsberg', 0.6, 'monthly'),
    page('/shipping-returns', 0.5, 'monthly'),
    page('/size-guide', 0.5, 'monthly'),
    page('/faq', 0.5, 'monthly'),
    page('/contact', 0.4, 'yearly'),
    page('/privacy-policy', 0.2, 'yearly'),
    page('/terms-of-service', 0.2, 'yearly'),
  ];
}
