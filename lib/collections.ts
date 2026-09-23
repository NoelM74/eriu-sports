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

export const DELIVERY = "8–14 days";

export const COLLECTIONS: CollectionDef[] = [
  {
    slug: "ireland-classics",
    name: "Ireland Classics",
    category: "football",
    h1: "Retro Ireland Jerseys",
    intro:
      "The Ireland jerseys everyone remembers: Euro 88, Italia 90, USA 94 and the famous orange away kit. €25 each, delivered in 8–14 days.",
    seoTitle: "Retro Ireland Jerseys | Italia 90 & USA 94",
    seoDescription:
      "Retro Republic of Ireland jerseys from Euro 88, Italia 90 and USA 94. €25 each, delivered to Ireland and the UK in 8–14 days.",
    keywords: ["retro Ireland jersey", "Italia 90 jersey", "USA 94 Ireland jersey", "Euro 88 Ireland shirt", "Ireland football jersey"],
    priceFrom: 25,
    featured: "ireland-1990-italia-90-world",
  },
  {
    slug: "premier-league-classics",
    name: "Premier League Classics",
    category: "football",
    h1: "Retro Premier League Shirts",
    intro:
      "Classic shirts from the 80s, 90s and 2000s: Liverpool, Manchester United, Arsenal, Chelsea, Newcastle, West Ham and Man City. €25 each, delivered in 8–14 days.",
    seoTitle: "Retro Premier League Shirts | 90s Classics",
    seoDescription:
      "Retro football shirts from Liverpool, Man United, Arsenal, Chelsea, Newcastle, West Ham and more. €25 each, delivered to Ireland and the UK in 8–14 days.",
    keywords: ["retro football shirts", "90s football shirts", "retro Liverpool shirt", "retro Man United shirt", "retro Arsenal shirt"],
    priceFrom: 25,
  },
  {
    slug: "european-world-classics",
    name: "European & World Classics",
    category: "football",
    h1: "Retro European & World Shirts",
    intro:
      "Great shirts from beyond the Premier League: Serie A, the Bundesliga, La Liga and Liga MX. €25 each, delivered in 8–14 days.",
    seoTitle: "Retro Serie A, Bundesliga & La Liga Shirts",
    seoDescription:
      "Retro football shirts from Juventus, Roma, Bayern Munich, Real Betis and Club América. €25 each, delivered to Ireland and the UK in 8–14 days.",
    keywords: ["retro Serie A shirts", "retro Juventus shirt", "retro Roma shirt", "retro Bayern Munich shirt", "retro European football shirts"],
    priceFrom: 25,
  },
  {
    slug: "gaa-jerseys",
    name: "GAA Jerseys",
    category: "gaa",
    h1: "GAA County Jerseys",
    intro:
      "Home, away and goalkeeper jerseys from across the counties. Player fit, so go up a size if you like it looser. €29.95 each, delivered in 8–14 days.",
    seoTitle: "GAA Jerseys | Dublin, Kerry, Mayo & More",
    seoDescription:
      "County GAA jerseys including Dublin, Kerry, Mayo, Galway, Cork, Donegal and Limerick. €29.95 each, delivered to Ireland and the UK in 8–14 days.",
    keywords: ["GAA jerseys", "county GAA jersey", "Dublin GAA jersey", "Kerry GAA jersey", "Mayo GAA jersey", "GAA goalkeeper jersey"],
    priceFrom: 29.95,
  },
  {
    slug: "gaa-training-vests",
    name: "GAA Training Vests",
    category: "gaa",
    h1: "GAA Training Vests",
    intro:
      "County training vests for the pitch, the gym or match day. Player fit. €25 each, delivered in 8–14 days.",
    seoTitle: "GAA Training Vests | Dublin, Kerry & More",
    seoDescription:
      "County GAA training vests for Dublin, Kerry, Mayo, Tyrone, Galway, Cavan, Offaly, Derry and Tipperary. €25 each, delivered to Ireland and the UK in 8–14 days.",
    keywords: ["GAA training vest", "GAA vest", "Dublin GAA vest", "Kerry GAA vest", "county training vest"],
    priceFrom: 25,
  },
  {
    slug: "afl-jerseys",
    name: "AFL Jerseys",
    category: "afl",
    h1: "AFL Jerseys",
    intro:
      "Aussie Rules jerseys, including Indigenous designs from Fremantle, Collingwood and Port Adelaide. Sleeveless, regular fit. €25 each, delivered in 8–14 days.",
    seoTitle: "AFL Jerseys | Delivered to Ireland & the UK",
    seoDescription:
      "AFL jerseys from Collingwood, Carlton, Geelong, St Kilda, Fremantle and Port Adelaide. €25 each, delivered to Ireland and the UK in 8–14 days.",
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
      "Retro football shirts and jerseys from Ireland, the Premier League and Europe. €25 each, delivered to Ireland and the UK in 8–14 days.",
  },
  {
    key: "gaa",
    label: "GAA",
    h1: "GAA Jerseys & Training Vests",
    description:
      "County GAA jerseys and training vests from Dublin, Kerry, Mayo, Galway and more. Delivered to Ireland and the UK in 8–14 days.",
  },
  {
    key: "afl",
    label: "AFL",
    h1: "AFL Jerseys",
    description: "Aussie Rules AFL jerseys, including Indigenous designs. Delivered to Ireland and the UK in 8–14 days.",
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
