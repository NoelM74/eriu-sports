import { MetadataRoute } from 'next';
import { products, getClubs, getPlayers } from '@/lib/products';
import { COLLECTIONS, CATEGORIES } from '@/lib/collections';
import { getPosts } from '@/lib/blog';

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
    page('/clubs', 0.8, 'weekly'),
    ...getClubs()
      .filter((c) => c.count >= 2)
      .map((c) => page(`/clubs/${c.slug}`, 0.8, 'weekly')),
    page('/players', 0.8, 'weekly'),
    ...getPlayers().map((p) => page(`/players/${p.slug}`, 0.8, 'weekly')),
    ...products.map((p) => ({
      ...page(`/products/${p.slug}`, 0.7, 'weekly'),
      images: p.images.slice(0, 3).map((img) => `${SITE}${img}`),
    })),
    page('/blog', 0.6, 'weekly'),
    ...getPosts().map((post) => ({
      ...page(`/blog/${post.slug}`, 0.6, 'monthly'),
      lastModified: new Date(post.dateModified ?? post.datePublished),
      images: [`${SITE}${post.heroImage}`],
    })),
    page('/shipping-returns', 0.5, 'monthly'),
    page('/size-guide', 0.5, 'monthly'),
    page('/faq', 0.5, 'monthly'),
    page('/contact', 0.4, 'yearly'),
    page('/privacy-policy', 0.2, 'yearly'),
    page('/terms-of-service', 0.2, 'yearly'),
  ];
}
