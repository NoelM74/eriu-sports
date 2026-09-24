import { DELIVERY, type CategoryKey } from './collections';
import type { ClubSummary, Product } from './products';

/**
 * Page heading for a club, e.g. "Retro Arsenal Shirts" or "Dublin GAA Jerseys".
 * Football clubs only get "Retro" when at least one shirt is from before 2015.
 */
export function clubHeading(club: { name: string; category: CategoryKey }, items: Product[] = []): string {
  if (club.category === 'gaa') return `${club.name} GAA Jerseys`;
  if (club.category === 'afl') return `${club.name} AFL Jerseys`;
  const retro = items.length === 0 || items.some((p) => (startYear(p.details.season) ?? 9999) < 2015);
  return `${retro ? 'Retro ' : ''}${club.name} Shirts`;
}

function startYear(season?: string): number | null {
  const m = season?.match(/\d{4}/);
  return m ? Number(m[0]) : null;
}

function formatPrice(p: number) {
  return `€${p % 1 ? p.toFixed(2) : p}`;
}

/** Short, plain-English intro built from what's actually in stock. */
export function clubIntro(club: ClubSummary, items: Product[]): string {
  const prices = items.map((p) => p.price);
  const from = formatPrice(Math.min(...prices));
  const years = items.map((p) => startYear(p.details.season)).filter((y): y is number => y !== null);
  const range =
    years.length && Math.min(...years) !== Math.max(...years)
      ? ` from ${Math.min(...years)} to ${Math.max(...years)}`
      : '';
  const printed = items.some((p) => p.details.print) ? ' Some come printed with a player name and number.' : '';
  const noun = club.category === 'football' ? 'shirts' : 'jerseys';
  return `${items.length} ${club.name} ${noun}${range}.${printed} From ${from}, delivered to Ireland and the UK in ${DELIVERY}.`;
}

/** Group a club's products by decade ("1990s") when there are enough to need it. */
export function groupByDecade(items: Product[]): { label: string; items: Product[] }[] {
  if (items.length < 9) return [{ label: '', items }];
  const groups = new Map<string, Product[]>();
  for (const p of items) {
    const y = startYear(p.details.season);
    const label = y ? `${Math.floor(y / 10) * 10}s` : 'Other';
    groups.set(label, [...(groups.get(label) ?? []), p]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, list]) => ({
      label,
      // Plain shirts first, then printed ones, oldest season first.
      items: [...list].sort(
        (a, b) =>
          (startYear(a.details.season) ?? 0) - (startYear(b.details.season) ?? 0) ||
          Number(Boolean(a.details.print)) - Number(Boolean(b.details.print)) ||
          a.title.localeCompare(b.title)
      ),
    }));
}
