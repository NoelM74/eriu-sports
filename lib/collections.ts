/**
 * Every shop collection, with its page copy and search metadata.
 * Product JSON stores the collection `name`; URLs use `slug`.
 */

export type CategoryKey = "football" | "gaa" | "afl";

export interface CollectionDef {
  slug: string;
  name: string;
  category: CategoryKey;
  /** Visible page heading (keyword-led). */
  h1: string;
  /** Short intro under the heading. Plain English, no walls of text. */
  intro: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  priceFrom: number;
  /** Product slug whose photo is used on the homepage tile. Defaults to the first product. */
  featured?: string;
}

/** Delivery time to Ireland and the UK. Times to other countries vary, so we don't quote one. */
export const DELIVERY = "8–14 days";
/** Flat delivery fee in euro, anywhere in the world. */
export const SHIPPING_FEE = 5;
/** Orders at or over this total (in euro) ship free. */
export const FREE_DELIVERY_OVER = 49;

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: "ireland-classics",
    name: "Irish Classics",
    category: "football",
    h1: "Retro Irish Shirts",
    intro:
      "Ireland shirts everyone remembers from Euro 88, Italia 90 and USA 94, plus League of Ireland shirts from Bohemians and Cork City. €25 each, delivered worldwide.",
    seoTitle: "Retro Irish Shirts | Ireland & League of Ireland",
    seoDescription:
      "Retro Ireland jerseys from Euro 88, Italia 90 and USA 94, plus League of Ireland shirts from Bohemians and Cork City. €25 each. Worldwide delivery, free over €49.",
    keywords: ["retro Irish shirts", "retro Ireland jersey", "Italia 90 jersey", "USA 94 Ireland jersey", "Euro 88 Ireland shirt", "League of Ireland jersey", "Bohemians jersey", "Cork City jersey"],
    priceFrom: 25,
    featured: "ireland-1990-italia-90-world",
  },
  {
    slug: "premier-league-classics",
    name: "Premier League Classics",
    category: "football",
    h1: "Retro Premier League Shirts",
    intro:
      "Classic shirts from the 80s, 90s and 2000s: Arsenal, Liverpool, Manchester United, Chelsea, Spurs, Man City, Leeds, Newcastle and West Ham. €25, or €35 with a player name and number. Delivered worldwide.",
    seoTitle: "Retro Premier League Shirts | 90s Classics",
    seoDescription:
      "Retro football shirts from Arsenal, Liverpool, Man United, Chelsea, Spurs, Man City and more. From €25. Worldwide delivery, free over €49.",
    keywords: ["retro football shirts", "90s football shirts", "retro Liverpool shirt", "retro Man United shirt", "retro Arsenal shirt", "retro Chelsea shirt", "retro Spurs shirt", "retro Man City shirt", "retro Leeds shirt", "Klinsmann Spurs shirt", "Robbie Keane Spurs shirt"],
    priceFrom: 25,
    featured: "manchester-united-1994-96-third-shirt",
  },
  {
    slug: "european-world-classics",
    name: "European & World Classics",
    category: "football",
    h1: "Retro European & World Shirts",
    intro:
      "Great shirts from beyond the Premier League: Barcelona, Real Madrid, Juventus, the Milan clubs, Lazio, Roma, Parma, Bayern, Ajax, PSG, Marseille and more. €25, or €35 with a player name and number. Delivered worldwide.",
    seoTitle: "Retro Barcelona, Real Madrid & Serie A Shirts",
    seoDescription:
      "Retro football shirts from Barcelona, Real Madrid, Inter, AC Milan, Juventus, Brazil and Italy. From €25. Worldwide delivery, free over €49.",
    keywords: ["retro Fiorentina shirt", "Batistuta shirt", "retro Barcelona shirt", "Ronaldinho Barcelona shirt", "Ronaldo R9 shirt", "Baggio shirt", "retro Brazil shirt", "retro Inter Milan shirt", "retro AC Milan shirt", "Maldini shirt", "retro Napoli shirt", "Maradona Napoli shirt", "retro Serie A shirts", "retro Juventus shirt", "Del Piero shirt", "Zidane Juventus shirt", "retro Roma shirt", "retro Lazio shirt", "retro Parma shirt", "retro Bayern Munich shirt", "retro Dortmund shirt", "retro Ajax shirt", "retro PSG shirt", "Ronaldinho PSG shirt", "retro Marseille shirt", "retro Chivas shirt", "retro European football shirts"],
    priceFrom: 25,
  },
  {
    slug: "kids-football-kits",
    name: "Kids Football Kits",
    category: "football",
    h1: "Kids Football Kits",
    intro:
      "Shirt and shorts sets for kids aged 2 to 13: Ireland's 2026 kits, Arsenal, Liverpool and Man United 2026-27 kits, and retro classics from Arsenal's Bruised Banana to United's Treble kit. €30 a kit, delivered worldwide.",
    seoTitle: "Kids Football Kits | Ireland, Arsenal, Liverpool & Man United",
    seoDescription:
      "Kids football kits with shirt and shorts: Ireland 2026, Arsenal, Liverpool and Man United 2026-27, and retro kids kits including United's Treble kit. Ages 2–13. €30 a kit. Worldwide delivery, free over €49.",
    keywords: ["kids football kit", "Ireland kids kit", "Ireland kids jersey", "kids Ireland football kit 2026", "Ireland goalkeeper kids kit", "children's football kit Ireland", "Arsenal kids kit", "Arsenal kids kit 2026-27", "Bruised Banana kids kit", "retro Arsenal kids kit", "Liverpool kids kit", "Liverpool kids kit 2026-27", "retro Liverpool kids kit", "Liverpool Candy kids kit", "kids goalkeeper kit", "Man United kids goalkeeper kit", "Man United kids kit", "Man United kids kit 2026-27", "Man United Treble kids kit", "retro Man United kids kit"],
    priceFrom: 30,
    featured: "ireland-2026-home-kids-kit",
  },
  {
    slug: "gaa-jerseys",
    name: "GAA Jerseys",
    category: "gaa",
    h1: "GAA County Jerseys",
    intro:
      "Home, away and goalkeeper jerseys from across the counties. Player fit, so go up a size if you like it looser. €29.95 each, delivered worldwide.",
    seoTitle: "GAA Jerseys | Dublin, Kerry, Mayo & More",
    seoDescription:
      "County GAA jerseys including Dublin, Kerry, Mayo, Galway, Cork, Donegal and Limerick. €29.95 each. Worldwide delivery, free over €49.",
    keywords: ["GAA jerseys", "county GAA jersey", "Dublin GAA jersey", "Kerry GAA jersey", "Mayo GAA jersey", "GAA goalkeeper jersey"],
    priceFrom: 29.95,
  },
  {
    slug: "gaa-training-vests",
    name: "GAA Training Vests",
    category: "gaa",
    h1: "GAA Training Vests",
    intro:
      "County training vests for the pitch, the gym or match day. Player fit. €25 each, delivered worldwide.",
    seoTitle: "GAA Training Vests | Dublin, Kerry & More",
    seoDescription:
      "County GAA training vests for Dublin, Kerry, Mayo, Tyrone, Galway, Cavan, Offaly, Derry and Tipperary. €25 each. Worldwide delivery, free over €49.",
    keywords: ["GAA training vest", "GAA vest", "Dublin GAA vest", "Kerry GAA vest", "county training vest"],
    priceFrom: 25,
  },
  {
    slug: "afl-jerseys",
    name: "AFL Jerseys",
    category: "afl",
    h1: "AFL Jerseys",
    intro:
      "Aussie Rules jerseys, including Indigenous designs from Fremantle, Collingwood and Port Adelaide. Sleeveless, regular fit. €25 each, delivered worldwide.",
    seoTitle: "AFL Jerseys | Ireland, UK & Worldwide Delivery",
    seoDescription:
      "AFL jerseys from Collingwood, Carlton, Geelong, St Kilda, Fremantle and Port Adelaide. €25 each. Worldwide delivery, free over €49.",
    keywords: ["AFL jersey", "AFL jerseys Ireland", "Aussie Rules jersey", "AFL Indigenous jersey", "Collingwood jersey"],
    priceFrom: 25,
  },
];

export const CATEGORIES: { key: CategoryKey; label: string; h1: string; description: string }[] = [
  {
    key: "football",
    label: "Football Shirts",
    h1: "Retro Football Shirts",
    description:
      "Retro football shirts and jerseys from Ireland, the Premier League and Europe, plus kids football kits. From €25. Worldwide delivery, free over €49.",
  },
  {
    key: "gaa",
    label: "GAA",
    h1: "GAA Jerseys & Training Vests",
    description:
      "County GAA jerseys and training vests from Dublin, Kerry, Mayo, Galway and more. Worldwide delivery, free over €49.",
  },
  {
    key: "afl",
    label: "AFL",
    h1: "AFL Jerseys",
    description: "Aussie Rules AFL jerseys, including Indigenous designs. Worldwide delivery, free over €49.",
  },
];

export function getCollectionBySlug(slug: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getCollectionByName(name: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.name === name);
}

export function getCategory(key: string) {
  return CATEGORIES.find((c) => c.key === key);
}
