import { products } from '@/lib/products';

/**
 * Current price and stock for every product. Baskets are saved in the browser, so
 * the cart reloads this to pick up price changes and sold-out sizes.
 * Built with the site, so it always matches the catalogue.
 */
export const dynamic = 'force-static';

export function GET() {
  const data = Object.fromEntries(
    products.map((p) => [p.slug, { price: p.price, sizes: p.sizes, soldOut: p.soldOut, title: p.title }])
  );
  return Response.json(data);
}
