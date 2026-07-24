// New commerce data model for the custom-leisurewear rebuild.
// Replaces the flat single-price model in lib/products.ts (kept during migration).

export type Family =
  | "tee"
  | "tank"
  | "compression"
  | "shorts"
  | "leggings"
  | "yoga"
  | "layer"
  | "accessory";

export type Gender = "men" | "women" | "unisex";

export type BrandingMethod = "print" | "embroidery" | "sublimation";

export interface Colourway {
  id: string;
  name: string;
  /** Garment body fill (hex). */
  body: string;
  /** Contrast trim fill (hex). */
  trim: string;
}

export interface PriceTier {
  /** Minimum quantity for this unit price to apply. */
  minQty: number;
  /** Unit price in EUR. */
  unit: number;
}

export interface Fabric {
  composition: string;
  gsm: number;
  care: string;
  /** Short technology tags, e.g. "Quick-dry", "4-way stretch". */
  tech: string[];
}

export interface Branding {
  methods: BrandingMethod[];
  placements: string[];
  /** Per-unit personalisation (names & numbers) available. */
  namesAndNumbers: boolean;
  /** Flat surcharge per unit for adding names/numbers (EUR). */
  namesAndNumbersPrice: number;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  family: Family;
  gender: Gender;
  description: string;
  features: string[];
  fabric: Fabric;
  moq: number;
  pricing: {
    base: number;
    tiers: PriceTier[];
  };
  colourways: Colourway[];
  sizes: string[];
  branding: Branding;
  /** Curated merchandising relations (slugs). Family fallbacks fill gaps. */
  upsells?: string[];
  crossSells?: string[];
  completeTheKit?: string[];
  badge?: string | null;
  rating?: number;
  reviewCount?: number;
}

/** A quantity-per-size entry for the bulk size-run matrix. */
export type SizeRun = Record<string, number>;
