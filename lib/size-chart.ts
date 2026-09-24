/**
 * Size charts, one per type of shirt. Inch, feet and pound values are worked out
 * from the cm/kg figures so both tables always match.
 */

export type ChartKey = 'football' | 'gaa' | 'afl';

type Value = number | [number, number];

interface ChartDef {
  sizes: readonly string[];
  rows: { label: string; unit: 'cm' | 'kg'; kind?: 'height'; values: Value[] }[];
  /** Shown under the table. */
  note: string;
  /** One line telling people how to use the chart. */
  howTo: string;
}

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

/** Body measurements. Used for GAA and AFL until their own charts are added. */
const BODY: ChartDef = {
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
  rows: [
    { label: 'Chest', unit: 'cm', values: [[96, 102], [104, 110], [112, 116], [118, 126], [128, 132], [134, 144]] },
    { label: 'Waist', unit: 'cm', values: [[92, 98], [100, 104], [106, 112], [114, 118], [118, 124], [126, 134]] },
    { label: 'Hip', unit: 'cm', values: [[96, 102], [104, 110], [112, 116], [118, 126], [128, 132], [134, 144]] },
    { label: 'Height', unit: 'cm', kind: 'height', values: [[160, 170], [170, 175], [175, 180], [180, 185], [185, 188], [188, 192]] },
    { label: 'Weight', unit: 'kg', values: [[55, 60], [60, 70], [70, 88], [88, 96], [96, 110], [110, 130]] },
  ],
  note: 'These are body measurements. A difference of 2–3 cm is normal when measuring by hand.',
  howTo: 'Measure your chest at the widest point and match it to the chart.',
};

export const CHARTS: Record<ChartKey, ChartDef> = { football: FOOTBALL, gaa: BODY, afl: BODY };

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
    if (unit === 'cm') return { label: `${row.label} (${row.unit})`, values: row.values.map((v) => show(v, String)) };
    if (row.kind === 'height') return { label: 'Height (ft)', values: row.values.map((v) => show(v, feet)) };
    if (row.unit === 'kg') return { label: 'Weight (lb)', values: row.values.map((v) => show(v, pounds)) };
    return { label: `${row.label} (in)`, values: row.values.map((v) => show(v, inches)) };
  });
}
