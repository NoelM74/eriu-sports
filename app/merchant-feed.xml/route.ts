import { products, type Product } from '@/lib/products';
import { CATEGORIES, getCollectionBySlug } from '@/lib/collections';
import { chartFor } from '@/lib/size-chart';

/**
 * Google Merchant Center product feed (RSS 2.0 with the g: namespace).
 * One item per product and size, grouped by product, so sold-out sizes show as out of stock.
 * Built with the site, so every deploy refreshes it. Merchant Center fetches it by URL.
 */
export const dynamic = 'force-static';

const SITE = 'https://eriusports.com';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

/** Short, stable ID from the product URL. Merchant Center IDs are capped at 50 characters. */
function groupId(slug: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `es${h.toString(36)}`;
}

function items(p: Product): string[] {
  const collection = getCollectionBySlug(p.collectionSlug);
  const category = CATEGORIES.find((c) => c.key === p.category);
  const kids = chartFor(p).endsWith('kids');
  const colour = (p.details.colours ?? '').split(' / ').slice(0, 3).join('/');
  const group = groupId(p.slug);

  return p.sizes.map((size) => {
    const fields: [string, string | undefined][] = [
      ['g:id', `${group}-${size}`],
      ['g:item_group_id', group],
      ['g:title', p.title],
      ['g:description', p.description],
      ['g:link', `${SITE}/products/${p.slug}`],
      ['g:image_link', `${SITE}${p.images[0]}`],
      ['g:availability', p.soldOut.includes(size) ? 'out_of_stock' : 'in_stock'],
      ['g:price', `${p.price.toFixed(2)} EUR`],
      ['g:condition', 'new'],
      ['g:brand', 'Ériu Sports'],
      ['g:identifier_exists', 'no'],
      ['g:google_product_category', 'Apparel & Accessories > Clothing > Activewear'],
      ['g:product_type', [category?.label, collection?.h1].filter(Boolean).join(' > ')],
      ['g:gender', 'unisex'],
      ['g:age_group', kids ? 'kids' : 'adult'],
      ['g:color', colour || undefined],
      ['g:size', size],
      ['g:custom_label_0', p.collection],
      ['g:custom_label_1', p.details.season],
    ];
    const extra = p.images.slice(1, 11).map((img) => `      <g:additional_image_link>${escape(SITE + img)}</g:additional_image_link>`);
    const body = fields
      .filter(([, v]) => v)
      .map(([k, v]) => `      <${k}>${escape(v!)}</${k}>`)
      .concat(extra)
      .join('\n');
    return `    <item>\n${body}\n    </item>`;
  });
}

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Ériu Sports</title>
    <link>${SITE}</link>
    <description>Retro football shirts, GAA jerseys, AFL jerseys and kids football kits.</description>
${products.flatMap(items).join('\n')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
