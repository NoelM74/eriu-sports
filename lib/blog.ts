/**
 * Blog posts. Facts are checked against published records; each post links
 * to the shirts it covers. Read time is worked out from the word count.
 */

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Search result title (the site template adds "| Ériu Sports"). */
  seoTitle: string;
  description: string;
  category: string;
  datePublished: string;
  dateModified?: string;
  heroImage: string;
  heroAlt: string;
  /** "cover" for photos, "contain" for product shots on a plain background. */
  heroFit: "cover" | "contain";
  intro: string;
  sections: BlogSection[];
  /** Product slugs featured at the end of the post. */
  products: string[];
  cta: { label: string; href: string };
}

export const POSTS: BlogPost[] = [
  {
    slug: "manchester-united-1998-99-treble-shirts",
    title: "Manchester United 1998/99: The Shirts of the Treble",
    seoTitle: "Man United 1998/99 Treble Shirts: Home, Away & Third",
    description:
      "League, FA Cup and Champions League in ten days. The home, away and black third shirts from Manchester United's 1998/99 Treble season, and the two Cork men at the heart of it.",
    category: "Premier League Classics",
    datePublished: "2026-09-23",
    heroImage: "/images/premier-league-classics/647601889-1.webp",
    heroAlt: "Manchester United 1998-99 home shirt with SHARP sponsor",
    heroFit: "contain",
    intro:
      "In ten days in May 1999, Manchester United won the Premier League, the FA Cup and the Champions League. No English club had done it before.",
    sections: [
      {
        heading: "Ten days in May",
        paragraphs: [
          "United beat Tottenham 2-1 at Old Trafford on the last day of the season to win the league.",
          "Six days later they beat Newcastle 2-0 in the FA Cup final, with goals from Teddy Sheringham and Paul Scholes.",
          "Then came Barcelona. Bayern Munich led through Mario Basler's early goal until injury time, when Sheringham and Ole Gunnar Solskjær scored within minutes of each other to win it 2-1.",
        ],
      },
      {
        heading: "The Cork connection",
        paragraphs: [
          "Roy Keane captained the side and drove them through the semi-final in Turin, where United came from 2-0 down to beat Juventus 3-2. A booking that night ruled him out of the final.",
          "Paul Scholes missed the final too. Denis Irwin, another Cork man, started at left-back in Barcelona.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "The home shirt is classic United red, with the SHARP sponsor and a quarter-zip collar.",
          "The white away shirt has black and red diamond taping on the shoulders.",
          "The black third shirt has red, white and black piping and the same quarter-zip neck. It is our pick of the three.",
        ],
      },
    ],
    products: [
      "manchester-united-98-99-treble-season",
      "man-utd-98-99-away",
      "manchester-united-1998-99-third-shirt",
      "bayern-munich-1997-99-away-shirt",
    ],
    cta: { label: "Shop Premier League classics", href: "/collections/premier-league-classics" },
  },
  {
    slug: "retro-european-football-shirts",
    title: "Beyond the Premier League: Five Classic European and World Shirts",
    seoTitle: "Retro European Football Shirts: Juventus, Roma, Bayern & More",
    description:
      "Juventus's Champions League season, Capello's first year at Roma, Bayern's run to Barcelona, Betis's cup final and Club América's flames. Five classic shirts from beyond England.",
    category: "European & World Classics",
    datePublished: "2026-09-23",
    heroImage: "/images/european-world-classics/juventus-1995-96-away-shirt-1.webp",
    heroAlt: "Juventus 1995-96 away shirt in blue with gold star panels",
    heroFit: "contain",
    intro:
      "The Premier League gets most of the attention, but some of the best shirts of the 90s came from Italy, Germany, Spain and Mexico. Here are five of our favourites, and the seasons behind them.",
    sections: [
      {
        heading: "Juventus 1995/96 away",
        paragraphs: [
          "Juventus won the Champions League in 1996, beating Ajax on penalties in the final in Rome.",
          "Their away shirt from that season is blue, with gold star panels on the shoulders and the Sony sponsor.",
        ],
      },
      {
        heading: "Roma 1999/00 away",
        paragraphs: [
          "This was Fabio Capello's first season in charge. Roma finished sixth, a year before they won the league.",
          "The grey and black away shirt, with its orange wolf print and INA Assitalia sponsor, has aged beautifully.",
        ],
      },
      {
        heading: "Bayern Munich 1997/99 away",
        paragraphs: [
          "Bayern won the Bundesliga in 1998/99 and reached the Champions League final, where Manchester United scored twice in injury time to beat them in Barcelona.",
          "The away shirt is navy and red, with the Opel sponsor.",
        ],
      },
      {
        heading: "Real Betis 1995/97 home",
        paragraphs: [
          "Green and white stripes and the KELIA sponsor. In 1997, Betis reached the Copa del Rey final, losing 3-2 to Barcelona at the Bernabéu.",
        ],
      },
      {
        heading: "Club América 1994 away",
        paragraphs: [
          "Royal blue with a jagged flame pattern in black, red and yellow, plus the Coca-Cola sponsor.",
          "It is one of the best-known Mexican shirts of the decade, and a favourite with collectors.",
        ],
      },
    ],
    products: [
      "juventus-1995-96-away-shirt",
      "as-roma-1999-00-away-shirt",
      "bayern-munich-1997-99-away-shirt",
      "real-betis-1995-97-home-shirt",
      "club-america-1994-away-shirt",
    ],
    cta: { label: "Shop European & World classics", href: "/collections/european-world-classics" },
  },
  {
    slug: "gaa-jersey-size-guide",
    title: "GAA Jersey Sizes: How Player Fit Works",
    seoTitle: "GAA Jersey Size Guide: Player Fit Explained",
    description:
      "Do GAA jerseys run small? What player fit means, chest measurements for S, M and L, and when to size up for a GAA jersey or training vest.",
    category: "GAA",
    datePublished: "2026-09-23",
    heroImage: "/images/gaa-gear/900000006-1.webp",
    heroAlt: "Dublin GAA home jersey in sky blue with navy pinstripes",
    heroFit: "contain",
    intro:
      "Buying a GAA jersey online? Fit is the thing to get right. Here is what player fit means, and how to pick your size.",
    sections: [
      {
        heading: "What is player fit?",
        paragraphs: [
          "County GAA jerseys and training vests are cut as a player fit. They sit close to the body, the way the players wear them on the pitch.",
          "If you like a bit of room through the chest and stomach, go up one size.",
        ],
      },
      {
        heading: "Chest sizes",
        paragraphs: ["These are the chest measurements from jerseys in our range. They vary a little from county to county."],
        bullets: [
          "Small: about 104 cm (41 in)",
          "Medium: 106 to 108 cm (42 in)",
          "Large: 108 to 110 cm (42 to 43 in)",
        ],
      },
      {
        heading: "How to check your size",
        paragraphs: [
          "Lay a jersey that fits you well flat. Measure straight across the chest, just below the arms, then double it.",
          "Compare that with the chest measurement on the product page. Every GAA product lists the size we measured.",
        ],
      },
      {
        heading: "Jerseys, vests and AFL",
        paragraphs: [
          "Training vests use the same player fit as the jerseys.",
          "AFL jerseys are different: they are sleeveless and a regular fit, so most people take their usual size.",
        ],
      },
      {
        heading: "Still not sure?",
        paragraphs: [
          "Email noel@eriusports.com with your chest measurement and the jersey you want, and we will tell you which size to go for. If it is not right, we can swap it.",
        ],
      },
    ],
    products: [
      "dublin-gaa-2026-home-jersey",
      "kerry-gaa-jersey",
      "mayo-gaa-training-vest",
      "galway-gaa-goalkeeper-jersey-white-and-maroon",
    ],
    cta: { label: "Shop GAA jerseys", href: "/collections/gaa-jerseys" },
  },
  {
    slug: "cork-city-1988-89",
    title: "Cork City 1988/89: Guinness, Derry and a First FAI Cup Final",
    seoTitle: "Cork City 1988/89 Jersey and the 1989 FAI Cup Final",
    description:
      "Cork City reached their first FAI Cup final in 1989, taking Derry City to a replay. The story of the white, green and red Guinness jersey from that season.",
    category: "Ireland Classics",
    datePublished: "2026-04-15",
    dateModified: "2026-09-23",
    heroImage: "/images/blog/cork-fai-cup-finalists-1989.webp",
    heroAlt: "Cork City, 1989 FAI Cup finalists",
    heroFit: "cover",
    intro:
      "Cork City were founded in 1984 and went straight into the League of Ireland. Five seasons later, they reached their first FAI Cup final. This is the jersey from that season.",
    sections: [
      {
        heading: "The 1988/89 season",
        paragraphs: [
          "Cork City finished eighth in the league, but the cup was a different story. They reached the 1989 FAI Cup final against Derry City.",
          "The first game finished 0-0. Derry won the replay 1-0 to complete a treble of league, FAI Cup and League Cup.",
          "Reaching the final still earned Cork a place in the following season's European Cup Winners' Cup.",
        ],
      },
      {
        heading: "The squad",
        paragraphs: [
          "The side included Phil Harrington, Brian Carey, Mick Conroy, Liam Murphy, Patsy Freyne, John Caulfield and Dave Barry.",
          "Barry had played in Cork City's first ever league game in 1984. In 1991 he scored against Bayern Munich at Musgrave Park in the UEFA Cup.",
        ],
      },
      {
        heading: "The jersey",
        paragraphs: [
          "White, with a band of green and red chevrons across the chest, a green collar and Guinness across the front.",
          "It is a simple, confident design, and one of the best-looking League of Ireland shirts of the late 80s.",
        ],
      },
    ],
    products: ["cork-city-1988-89-retro-jersey", "ireland-euro-88-home-jersey", "ireland-1990-italia-90-world"],
    cta: { label: "Shop retro Ireland jerseys", href: "/collections/ireland-classics" },
  },
  {
    slug: "ireland-1990-italia-90",
    title: "Ireland at Italia 90: The Green Jersey That Stopped a Nation",
    seoTitle: "Ireland Italia 90 Jersey: The Story of the Green Shirt",
    description:
      "Sheedy's equaliser against England, Bonner's save and O'Leary's penalty against Romania, and a quarter-final in Rome. The story of Ireland's Italia 90 jersey.",
    category: "Ireland Classics",
    datePublished: "2026-04-14",
    dateModified: "2026-09-23",
    heroImage: "/images/blog/ireland-england-italia-90-goal.webp",
    heroAlt: "Ireland against England at Italia 90",
    heroFit: "cover",
    intro:
      "The green jersey from Italia 90 is the best-known piece of Irish football kit. In the summer of 1990, Jack Charlton's side reached a World Cup quarter-final for the first time, and the country has never forgotten it.",
    sections: [
      {
        heading: "The tournament",
        paragraphs: [
          "Ireland opened against England in Cagliari on 11 June 1990. Kevin Sheedy equalised in the 73rd minute for a 1-1 draw, and the country came to a standstill.",
          "A 0-0 draw with Egypt and a 1-1 draw with the Netherlands took Ireland into the knockout rounds.",
          "Against Romania in the last 16, it finished 0-0 after extra time. Packie Bonner saved a penalty, and David O'Leary scored the winner in the shoot-out.",
          "Italy ended the run in Rome, where Salvatore Schillaci scored the only goal of the quarter-final. By then, something had already changed at home.",
        ],
      },
      {
        heading: "The jersey",
        paragraphs: [
          "Deep green with a tonal pattern, three white stripes on the sleeves and a white and orange V-neck. The FAI crest sits on the left of the chest.",
          "FIFA does not allow sponsors on World Cup match shirts, so the Opel version is the one fans wore.",
          "The squad that wore it included Paul McGrath, Ray Houghton, John Aldridge, Niall Quinn and Packie Bonner.",
        ],
      },
      {
        heading: "Why it still matters",
        paragraphs: [
          "For a generation, this jersey is a memory: pub screens, flags out of windows, the whole country watching together.",
          "It is not just a shirt. It is 1990.",
        ],
      },
    ],
    products: [
      "ireland-1990-italia-90-world",
      "ireland-1990-world-cup-away",
      "ireland-euro-88-home-jersey",
      "ireland-1994-world-cup-home",
    ],
    cta: { label: "Shop retro Ireland jerseys", href: "/collections/ireland-classics" },
  },
  {
    slug: "liverpool-95-96-carlsberg",
    title: "Liverpool 1995/96: The Green and White Quartered Away Shirt",
    seoTitle: "Liverpool 1995/96 Away Shirt: Green & White Quarters",
    description:
      "Liverpool's 1995/96 away shirt: green and white quarters with Carlsberg across the chest. A third-place finish and an FA Cup final, told in one shirt.",
    category: "Premier League Classics",
    datePublished: "2026-04-13",
    dateModified: "2026-09-23",
    heroImage: "/images/blog/liverpool-95-96-carlsberg-away-kit.webp",
    heroAlt: "Liverpool 1995-96 green and white quartered away shirt",
    heroFit: "cover",
    intro:
      "Liverpool finished third in the Premier League and reached the FA Cup final in 1995/96. This is the away shirt from that season: bold green and white quarters with Carlsberg across the chest.",
    sections: [
      {
        heading: "The kit",
        paragraphs: [
          "White and deep green quarters, black stripes over the shoulders and a buttoned grandad collar. Carlsberg sits in a white panel across the middle.",
          "It is one of the boldest Liverpool away shirts of the 90s, and one of the most wanted now.",
        ],
      },
      {
        heading: "The 1995/96 season",
        paragraphs: [
          "Roy Evans' side finished third. Robbie Fowler was scoring freely, Steve McManaman ran games from wide and Jamie Redknapp set the tempo in midfield.",
          "They reached the FA Cup final, losing 1-0 to Manchester United. Eric Cantona scored the winner late on.",
        ],
      },
      {
        heading: "Why it holds up",
        paragraphs: [
          "Mid-90s kits could go badly wrong. This one went bold and got it right, and the quarters look as good now as they did then.",
        ],
      },
    ],
    products: [
      "liverpool-away-1995-96-carlsberg",
      "liverpool-1995-96-home-shirt",
      "liverpool-1996-97-third-shirt",
      "liverpool-96-97-away-shirt",
    ],
    cta: { label: "Shop Premier League classics", href: "/collections/premier-league-classics" },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Newest first. */
export function getPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function readingMinutes(post: BlogPost): number {
  const text = [post.intro, ...post.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? [])])].join(" ");
  return Math.max(2, Math.round(text.split(/\s+/).length / 200));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
}
