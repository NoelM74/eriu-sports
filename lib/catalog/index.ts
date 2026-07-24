import { catalog } from "@/data/catalog/products";
import type { Product, Family, Gender, SizeRun } from "./types";

export type { Product, Family, Gender, SizeRun, Colourway } from "./types";

export const FAMILY_LABELS: Record<Family, string> = {
  tee: "Training Tees",
  tank: "Racer Tanks",
  compression: "Compression",
  shorts: "Training Shorts",
  leggings: "Leggings",
  yoga: "Yoga & Studio",
  layer: "Zip Layers",
  accessory: "Caps & Accessories",
};

export const GENDER_LABELS: Record<Gender, string> = {
  men: "Men",
  women: "Women",
  unisex: "Unisex",
};

// ---- Accessors --------------------------------------------------------------

export function allProducts(): Product[] {
  return catalog;
}

export function getProduct(slug: string): Product | undefined {
  return catalog.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[] = []): Product[] {
  return slugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => Boolean(p));
}

export function byFamily(family: Family): Product[] {
  return catalog.filter((p) => p.family === family);
}

export function byGender(gender: Gender): Product[] {
  return catalog.filter((p) => p.gender === gender || p.gender === "unisex");
}

export function familyCounts(): { family: Family; count: number }[] {
  const families: Family[] = ["tee", "tank", "compression", "shorts", "leggings", "yoga", "layer", "accessory"];
  return families.map((family) => ({ family, count: byFamily(family).length }));
}

// ---- Pricing ----------------------------------------------------------------

/** Resolve the unit price for a given quantity from the tier table. */
export function unitPriceFor(product: Product, qty: number): number {
  const tiers = [...product.pricing.tiers].sort((a, b) => a.minQty - b.minQty);
  let unit = product.pricing.base;
  for (const tier of tiers) {
    if (qty >= tier.minQty) unit = tier.unit;
  }
  return unit;
}

/** The full price shown "from" on cards — the highest (smallest-quantity) tier. */
export function fromPrice(product: Product): number {
  return unitPriceFor(product, product.moq);
}

/** The best (largest-volume) unit price. */
export function bestPrice(product: Product): number {
  return unitPriceFor(product, product.pricing.tiers[product.pricing.tiers.length - 1].minQty);
}

export function totalQty(run: SizeRun): number {
  return Object.values(run).reduce((sum, n) => sum + (n || 0), 0);
}

export interface OrderSummary {
  qty: number;
  unit: number;
  brandingPerUnit: number;
  subtotal: number;
  total: number;
  meetsMoq: boolean;
  savingsPct: number;
}

/** Compute a bulk-order line total from a size run + optional names/numbers. */
export function orderTotal(
  product: Product,
  run: SizeRun,
  namesAndNumbers = false
): OrderSummary {
  const qty = totalQty(run);
  const unit = unitPriceFor(product, qty);
  const brandingPerUnit = namesAndNumbers ? product.branding.namesAndNumbersPrice : 0;
  const subtotal = unit * qty;
  const total = (unit + brandingPerUnit) * qty;
  const base = product.pricing.base;
  const savingsPct = base > 0 ? Math.round((1 - unit / base) * 100) : 0;
  return {
    qty,
    unit,
    brandingPerUnit,
    subtotal,
    total,
    meetsMoq: qty >= product.moq,
    savingsPct: Math.max(0, savingsPct),
  };
}

/** Next volume break above the current quantity — powers the "add N more" nudge. */
export function nextTier(
  product: Product,
  qty: number
): { addUnits: number; newUnit: number } | null {
  const tiers = [...product.pricing.tiers].sort((a, b) => a.minQty - b.minQty);
  for (const tier of tiers) {
    if (qty < tier.minQty) {
      return { addUnits: tier.minQty - qty, newUnit: tier.unit };
    }
  }
  return null;
}

// ---- Merchandising relations ------------------------------------------------

/** Curated cross-sells, with family-complement fallbacks. */
export function crossSellsFor(product: Product, limit = 3): Product[] {
  const curated = getProducts(product.crossSells);
  if (curated.length >= limit) return curated.slice(0, limit);

  // Fallback: complementary families (top ↔ bottom, add an accessory)
  const complement: Record<Family, Family[]> = {
    tee: ["shorts", "layer", "accessory"],
    tank: ["shorts", "leggings", "accessory"],
    compression: ["shorts", "leggings"],
    shorts: ["tee", "tank", "layer"],
    leggings: ["yoga", "tank"],
    yoga: ["leggings", "tank"],
    layer: ["tee", "shorts"],
    accessory: ["tee", "tank"],
  };
  const seen = new Set([product.slug, ...curated.map((p) => p.slug)]);
  const extra = complement[product.family]
    .flatMap((f) => byFamily(f))
    .filter((p) => !seen.has(p.slug));
  return [...curated, ...extra].slice(0, limit);
}

/** Curated upsells, with same-family fallbacks. */
export function upsellsFor(product: Product, limit = 2): Product[] {
  const curated = getProducts(product.upsells);
  if (curated.length >= limit) return curated.slice(0, limit);
  const seen = new Set([product.slug, ...curated.map((p) => p.slug)]);
  const sameFamily = byFamily(product.family).filter((p) => !seen.has(p.slug));
  return [...curated, ...sameFamily].slice(0, limit);
}

/** "Complete the kit" — curated, falling back to cross-sells. */
export function completeTheKitFor(product: Product, limit = 3): Product[] {
  const curated = getProducts(product.completeTheKit);
  if (curated.length >= limit) return curated.slice(0, limit);
  const seen = new Set([product.slug, ...curated.map((p) => p.slug)]);
  const cross = crossSellsFor(product, limit).filter((p) => !seen.has(p.slug));
  return [...curated, ...cross].slice(0, limit);
}

/** "You may also like" — same family, then same gender. */
export function relatedFor(product: Product, limit = 4): Product[] {
  const seen = new Set([product.slug]);
  const sameFamily = byFamily(product.family).filter((p) => !seen.has(p.slug));
  sameFamily.forEach((p) => seen.add(p.slug));
  const sameGender = catalog.filter(
    (p) => !seen.has(p.slug) && (p.gender === product.gender || product.gender === "unisex")
  );
  return [...sameFamily, ...sameGender].slice(0, limit);
}
