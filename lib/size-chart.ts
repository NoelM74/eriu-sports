/**
 * Size charts, one per type of shirt. Inch, feet and pound values are worked out
 * from the cm/kg figures so both tables always match.
 */
import type { Product } from './products';

export type ChartKey = 'football' | 'football-kids' | 'gaa' | 'gaa-kids' | 'afl';

type Value = number | [number, number];

interface ChartDef {
  sizes: readonly string[];
  /** Column headings, when they differ from the size codes (e.g. "XXS (16)"). */
  headings?: readonly string[];
  rows: { label: string; unit: 'cm' | 'kg' | 'years'; kind?: 'height'; values: Value[] }[];
  /** Shown under the table. */
  note: string;
  /** One line telling people how to use the chart. */
  howTo: string;
}

const FLAT_NOTE = 'Measured with the jersey laid flat. A difference of 2–3 cm is normal.';
const FLAT_HOW_TO = 'Lay a jersey that fits you well flat, measure across the chest just under the arms and compare.';

/** Retro football shirts: the shirt's own measurements, plus a height and weight guide. */
const FOOTBALL: ChartDef = {
  sizes: ['S', 'M', 'L', 'XL', '2XL'],
  rows: [
    { label: 'Chest', unit: 'cm', values: [100, 106, 112, 118, 124] },
    { label: 'Waist', unit: 'cm', values: [96, 102, 108, 114, 120] },
    { label: 'Length', unit: 'cm', values: [72, 74, 76, 78, 80] },
    { label: 'Shoulder', unit: 'cm', values: [44, 46, 48, 50, 52] },
    { label: 'Height', unit: 'cm', kind: 'height', values: [[165, 175], [170, 175], [175, 180], [180, 190], [190, 195]] },
    { label: 'Weight', unit: 'kg', values: [60, 70, 80, 90, 100] },
  ],
  note: "Chest, waist, length and shoulder are the shirt's own measurements. Height and weight are a guide.",
  howTo: 'Match your height and weight, or compare with a shirt that fits you well.',
};

/** Kids football kits (shirt and shorts). Used for any football product with "Kids" in the title. */
const FOOTBALL_KIDS: ChartDef = {
  sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL'],
  headings: ['XXS (16)', 'XS (18)', 'S (20)', 'M (22)', 'L (24)', 'XL (26)', '2XL (28)'],
  rows: [
    { label: 'Age', unit: 'years', values: [[2, 3], [4, 5], [5, 6], [7, 8], [8, 9], [10, 11], [12, 13]] },
    { label: 'Height', unit: 'cm', kind: 'height', values: [[90, 100], [100, 110], [110, 120], [120, 130], [130, 140], [140, 150], [150, 160]] },
    { label: 'Shirt length', unit: 'cm', values: [44, 47, 50, 53, 56, 59, 62] },
    { label: 'Chest (flat)', unit: 'cm', values: [35, 37, 39, 41, 43, 45, 47] },
    { label: 'Weight', unit: 'kg', values: [[13, 18], [18, 23], [23, 28], [28, 33], [33, 38], [38, 43], [43, 48]] },
    { label: 'Shorts length', unit: 'cm', values: [32, 34, 36, 38, 39, 40, 43] },
  ],
  note: 'Age is a rough guide. Height and the measurements are more reliable. A difference of 2–3 cm is normal.',
  howTo: "Go by your child's height first, or compare with a kit that fits them well.",
};

/** Adult GAA jerseys, measured flat. */
const GAA: ChartDef = {
  sizes: ['S', 'M', 'L', 'XL'],
  rows: [
    { label: 'Chest', unit: 'cm', values: [52, 54, 56, 58] },
    { label: 'Waist', unit: 'cm', values: [49, 51, 53, 55] },
    { label: 'Hem', unit: 'cm', values: [52, 54, 56, 58] },
    { label: 'Length', unit: 'cm', values: [71, 73, 75, 77] },
    { label: 'Shoulder', unit: 'cm', values: [32, 32.5, 33, 33.5] },
  ],
  note: `${FLAT_NOTE} GAA jerseys are a player fit, so go up a size for a looser fit.`,
  howTo: FLAT_HOW_TO,
};

/** Kids GAA jerseys and shorts, measured flat. Used for any GAA product with "Kids" in the title. */
const GAA_KIDS: ChartDef = {
  sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
  headings: ['XXS (16)', 'XS (18)', 'S (20)', 'M (22)', 'L (24)', 'XL (26)'],
  rows: [
    { label: 'Age', unit: 'years', values: [[3, 4], [4, 5], [6, 7], [8, 9], [10, 11], [12, 13]] },
    { label: 'Height', unit: 'cm', kind: 'height', values: [[105, 115], [115, 125], [125, 135], [135, 145], [145, 155], [155, 160]] },
    { label: 'Jersey chest', unit: 'cm', values: [36, 38, 40, 43, 45, 48] },
    { label: 'Jersey length', unit: 'cm', values: [51, 54, 57, 60, 63, 66] },
    { label: 'Shorts waist', unit: 'cm', values: [[21, 40], [22, 41], [23, 42], [24, 44], [25, 47], [26, 50]] },
    { label: 'Shorts length', unit: 'cm', values: [34, 36, 38, 39, 40, 43] },
  ],
  note: `${FLAT_NOTE} Shorts waists stretch, so they show a range.`,
  howTo: "Go by your child's age and height, or compare with a jersey that fits them well.",
};

/** AFL jerseys, measured flat. */
const AFL: ChartDef = {
  sizes: ['S', 'M', 'L', 'XL', '2XL'],
  rows: [
    { label: 'Chest', unit: 'cm', values: [52, 54, 56, 59, 61] },
    { label: 'Length', unit: 'cm', values: [71, 76, 76, 79, 79] },
  ],
  note: `${FLAT_NOTE} AFL jerseys are sleeveless and a regular fit, so most people take their usual size.`,
  howTo: FLAT_HOW_TO,
};

export const CHARTS: Record<ChartKey, ChartDef> = { football: FOOTBALL, 'football-kids': FOOTBALL_KIDS, gaa: GAA, 'gaa-kids': GAA_KIDS, afl: AFL };

/** The chart that fits a product. */
export function chartFor(product: Pick<Product, 'category' | 'title'>): ChartKey {
  const kids = /\bkids?\b/i.test(product.title);
  if (kids && product.category === 'football') return 'football-kids';
  if (kids && product.category === 'gaa') return 'gaa-kids';
  return product.category;
}

const inches = (cm: number) => (cm / 2.54).toFixed(1).replace(/\.0$/, '');
const feet = (cm: number) => {
  const total = Math.round(cm / 2.54);
  return `${Math.floor(total / 12)}'${total % 12}"`;
};
const pounds = (kg: number) => String(Math.round(kg * 2.20462));

export interface ChartRow {
  label: string;
  values: string[];
}

export type ChartUnit = 'cm' | 'in';

const show = (v: Value, fn: (n: number) => string) => (Array.isArray(v) ? `${fn(v[0])}–${fn(v[1])}` : fn(v));

export function sizeChart(key: ChartKey, unit: ChartUnit): ChartRow[] {
  return CHARTS[key].rows.map((row) => {
    if (row.unit === 'years') return { label: 'Age (years)', values: row.values.map((v) => show(v, String)) };
    if (unit === 'cm') return { label: `${row.label} (${row.unit})`, values: row.values.map((v) => show(v, String)) };
    if (row.kind === 'height') return { label: 'Height (ft)', values: row.values.map((v) => show(v, feet)) };
    if (row.unit === 'kg') return { label: 'Weight (lb)', values: row.values.map((v) => show(v, pounds)) };
    return { label: `${row.label} (in)`, values: row.values.map((v) => show(v, inches)) };
  });
}
