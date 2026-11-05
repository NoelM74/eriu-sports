/**
 * Helpers that keep shuffled grids and filters steady while someone browses, so the back
 * button returns them to the same list in the same order.
 */

let ready = false;
let fallbackSeed = 0;

/** True once the first page has hydrated: later in-site navigations may read browser state while rendering. */
export const isClientReady = () => ready;
export const markClientReady = () => {
  ready = true;
};

/** One random seed per browser tab session: a new visit gets a new order, a back step keeps it. */
export function sessionSeed(): number {
  try {
    let s = sessionStorage.getItem('eriu-seed');
    if (!s) {
      s = String(Math.floor(Math.random() * 2 ** 31) + 1);
      sessionStorage.setItem('eriu-seed', s);
    }
    return Number(s);
  } catch {
    if (!fallbackSeed) fallbackSeed = Math.floor(Math.random() * 2 ** 31) + 1;
    return fallbackSeed;
  }
}
