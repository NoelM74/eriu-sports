import type { CategoryKey } from './collections';
import type { ClubSummary, Product } from './products';

/**
 * Page heading for a club, e.g. "Retro Arsenal Shirts" or "Dublin GAA Jerseys".
 * Football clubs only get "Retro" when at least one shirt is from before 2015.
 */
export function clubHeading(club: { name: string; category: CategoryKey }, items: Product[] = []): string {
  if (club.category === 'gaa') return `${club.name} GAA Jerseys`;
  if (club.category === 'afl') return `${club.name} AFL Jerseys`;
  // Irish customers search for "jerseys" (CLAUDE.md section 2), and Ireland's page runs from 1988 to 2026, so no "Retro".
  if (club.name === 'Republic of Ireland') return 'Republic of Ireland Jerseys';
  const irish = items.length > 0 && items.every((p) => p.collection === 'Irish Classics');
  const retro = items.length === 0 || items.some((p) => (startYear(p.details.season) ?? 9999) < 2015);
  return `${retro ? 'Retro ' : ''}${club.name} ${irish ? 'Jerseys' : 'Shirts'}`;
}

const list = new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' });

/** "2026" when the county has a jersey for the 2026 season (2026 or 2025-26), as people search "louth jersey 2026". */
function gaaYear(items: Product[]): string {
  return items.some((p) => /2026/.test(p.details.season ?? '')) ? ' 2026' : '';
}

/** Kit types in stock, for a GAA title: "Home, Away & Goalkeeper". */
function gaaKits(items: Product[]): string {
  const order = ['Home', 'Away', 'Alternative', 'Goalkeeper', 'Training', 'Training Vest'];
  const kits = new Set(
    items.map((p) => {
      const k = p.details.kit ?? '';
      if (/vest/i.test(k)) return 'Training Vest';
      if (/goalkeeper/i.test(k)) return 'Goalkeeper';
      return k;
    }),
  );
  const names = order.filter((k) => kits.has(k));
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names[names.length - 1]}` : (names[0] ?? 'Home & Away');
}

/** Search title for a club page. GAA: "Louth GAA Jerseys 2026 | Home & Away". */
export function clubTitle(club: ClubSummary, items: Product[]): string {
  const heading = clubHeading(club, items);
  if (club.category === 'gaa') return `${heading}${gaaYear(items)} | ${gaaKits(items)}`;
  if (club.name === 'Republic of Ireland') return 'Republic of Ireland Jerseys | Retro, 2026 & Kids Kits';
  return `${heading} | Home & Away Kits`;
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
  if (club.category === 'gaa') {
    // Name each jersey, so the snippet answers "is the 2026 one here": "the 2026 home jersey and the away jersey".
    const names = items.map((p) => {
      const rest = p.title.replace(new RegExp(`^${club.name} GAA\\s*`), '').replace(/\s*\(.*\)$/, '').toLowerCase();
      // "Cork GAA Jersey" leaves just "jersey": say which one from the kit ("the away jersey").
      return `the ${rest === 'jersey' ? `${(p.details.kit ?? '').toLowerCase()} jersey`.trim() : rest}`;
    });
    // Jerseys first, newest first, then training vests.
    const year = (x: string) => Number(x.match(/\d{4}/)?.[0] ?? 0);
    const rank = (x: string) => ['home', 'away', 'alternative', 'goalkeeper'].findIndex((k) => x.includes(k)) >>> 0;
    const unique = [...new Set(names)].sort(
      (x, y) => Number(/vest/.test(x)) - Number(/vest/.test(y)) || year(y) - year(x) || rank(x) - rank(y),
    );
    const one = Math.min(...prices) === Math.max(...prices);
    return `${club.name} GAA jerseys: ${list.format(unique)}. Player fit, sizes S–2XL, ${one ? `${from} each` : `from ${from}`}. Worldwide delivery, free over €49.`;
  }
  const years = items.map((p) => startYear(p.details.season)).filter((y): y is number => y !== null);
  const range =
    years.length && Math.min(...years) !== Math.max(...years)
      ? ` from ${Math.min(...years)} to ${Math.max(...years)}`
      : '';
  const printed = items.some((p) => p.details.print) ? ' Some come printed with a player name and number.' : '';
  const irish = clubHeading(club, items).endsWith('Jerseys');
  const noun = club.category === 'football' && !irish ? 'shirts' : 'jerseys';
  const lead = `${items.length} ${club.name} ${items.length === 1 ? noun.slice(0, -1) : noun}${range}.${printed}`;
  const tail = `From ${from}. Worldwide delivery, free over €49, 30-day returns.`;
  return `${lead} ${tail}`;
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
