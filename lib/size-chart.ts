/**
 * Body measurements for our football shirts (men's / unisex fit).
 * These are the wearer's measurements, not the shirt laid flat.
 * Inch, feet and pound values are worked out from the cm/kg figures so both tables always match.
 */
export const CHART_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'] as const;

type Range = [number, number];

const CM: { label: string; unit: 'cm' | 'kg'; values: Range[] }[] = [
  { label: 'Chest', unit: 'cm', values: [[96, 102], [104, 110], [112, 116], [118, 126], [128, 132], [134, 144]] },
  { label: 'Waist', unit: 'cm', values: [[92, 98], [100, 104], [106, 112], [114, 118], [118, 124], [126, 134]] },
  { label: 'Hip', unit: 'cm', values: [[96, 102], [104, 110], [112, 116], [118, 126], [128, 132], [134, 144]] },
  { label: 'Height', unit: 'cm', values: [[160, 170], [170, 175], [175, 180], [180, 185], [185, 188], [188, 192]] },
  { label: 'Weight', unit: 'kg', values: [[55, 60], [60, 70], [70, 88], [88, 96], [96, 110], [110, 130]] },
];

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

export function sizeChart(unit: ChartUnit): ChartRow[] {
  return CM.map((row) => {
    if (unit === 'cm') {
      return { label: `${row.label} (${row.unit})`, values: row.values.map(([a, b]) => `${a}–${b}`) };
    }
    if (row.label === 'Height') {
      return { label: 'Height (ft)', values: row.values.map(([a, b]) => `${feet(a)}–${feet(b)}`) };
    }
    if (row.unit === 'kg') {
      return { label: 'Weight (lb)', values: row.values.map(([a, b]) => `${pounds(a)}–${pounds(b)}`) };
    }
    return { label: `${row.label} (in)`, values: row.values.map(([a, b]) => `${inches(a)}–${inches(b)}`) };
  });
}
