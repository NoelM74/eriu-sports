import type { Product } from './products';

/** Fisher–Yates shuffle. Pass a seeded `random` for a stable order, or leave it for a fresh one. */
export function shuffle<T>(list: T[], random: () => number = Math.random): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Small repeatable random number generator, so a seed always gives the same order. */
export function seededRandom(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Shuffle, then take one shirt per club in turn so the list mixes clubs,
 * avoiding the same printed player twice where it can.
 */
export function mixByClub(list: Product[], random: () => number = Math.random): Product[] {
  const byClub = new Map<string, Product[]>();
  for (const p of shuffle(list, random)) {
    const key = p.club?.slug ?? p.slug;
    byClub.set(key, [...(byClub.get(key) ?? []), p]);
  }
  const queues = shuffle([...byClub.values()], random);
  const picked: Product[] = [];
  const players = new Set<string>();
  while (queues.some((q) => q.length)) {
    for (const q of queues) {
      if (!q.length) continue;
      const i = Math.max(0, q.findIndex((p) => !p.details.print || !players.has(p.details.print)));
      const [next] = q.splice(i, 1);
      if (next.details.print) players.add(next.details.print);
      picked.push(next);
    }
  }
  return picked;
}
