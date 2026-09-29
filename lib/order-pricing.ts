/**
 * Server-side pricing. The browser only says what is in the basket; prices,
 * stock and delivery always come from the catalogue here, never from the browser.
 */
import { getProductBySlug } from './products';
import { calculateShipping } from './shipping';
import { orderSize } from './size-chart';

export interface BasketLine {
  slug: string;
  size: string;
  quantity: number;
}

export interface PricedLine {
  slug: string;
  title: string;
  size: string;
  /** Size as written on the order, e.g. "XXS, age 2–3" for kids kits. */
  sizeLabel: string;
  quantity: number;
  unitPrice: number;
}

export interface PricedOrder {
  lines: PricedLine[];
  itemTotal: number;
  shipping: number;
  total: number;
}

const MAX_QTY = 10;
const round = (n: number) => Math.round(n * 100) / 100;

/** Prices a basket. Throws a customer-readable error if anything is unavailable. */
export function priceBasket(raw: unknown): PricedOrder {
  if (!Array.isArray(raw) || raw.length === 0) throw new Error('Your bag is empty.');
  if (raw.length > 50) throw new Error('Too many items in one order. Please email us.');

  const lines: PricedLine[] = raw.map((r) => {
    const line = (r ?? {}) as Record<string, unknown>;
    const slug = String(line.slug ?? '');
    const size = String(line.size ?? '');
    const quantity = Math.floor(Number(line.quantity));
    const product = getProductBySlug(slug);

    if (!product) throw new Error('An item in your bag is no longer available. Please remove it and try again.');
    if (!product.sizes.includes(size)) throw new Error(`${product.title} doesn't come in size ${size}.`);
    if (product.soldOut.includes(size)) {
      throw new Error(`${product.title} in size ${size} has just sold out. Please remove it and try again.`);
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) {
      throw new Error(`Please choose a quantity between 1 and ${MAX_QTY}.`);
    }
    return {
      slug,
      title: product.title,
      size,
      sizeLabel: orderSize(product, size),
      quantity,
      unitPrice: product.price,
    };
  });

  const itemTotal = round(lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0));
  const testOnly = lines.every((l) => getProductBySlug(l.slug)?.test);
  const shipping = calculateShipping(itemTotal, undefined, testOnly).cost;
  return { lines, itemTotal, shipping, total: round(itemTotal + shipping) };
}

export { REGION_REQUIRED } from './regions';
