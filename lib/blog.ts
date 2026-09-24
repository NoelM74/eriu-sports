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
  /** Short question-and-answer pairs, shown as "Quick answers" and marked up as FAQPage. */
  faqs?: { q: string; a: string }[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "bohemians-music-shirts-fontaines-dc-oasis-kneecap",
    title: "Bohemians' Music Shirts: Fontaines D.C., Oasis and Kneecap",
    seoTitle: "Bohemians Jerseys: Fontaines D.C., Oasis, Kneecap & Guinness",
    description:
      "Why Dublin's Bohemian FC keeps teaming up with bands. The stories behind the Fontaines D.C., Oasis, Kneecap and Guinness shirts, and how they fit.",
    category: "Ireland Classics",
    datePublished: "2026-09-24",
    heroImage: "/images/ireland-classics/bohemians-oasis-2025-fai-cup-jersey-1.webp",
    heroAlt: "Bohemians x Oasis 2025 FAI Cup jersey in sky blue with the Oasis logo",
    heroFit: "contain",
    intro:
      "Bohemian FC have made their shirts about more than football. The Dublin club, founded in 1890 and owned by its members, has teamed up with some of the best-known names in Irish and British music. Here are the shirts we stock, and the stories behind them.",
    sections: [
      {
        heading: "A football club with a music story",
        paragraphs: [
          "Bohs play at Dalymount Park in Phibsborough, north Dublin. The ground has hosted concerts as well as matches, including Bob Marley in 1980.",
          "The music shirts have found fans well beyond the League of Ireland, among people who follow the bands as much as the club.",
        ],
      },
      {
        heading: "Fontaines D.C., 2025 third",
        paragraphs: [
          "Fontaines D.C. are a Dublin band, and their name runs across a sky blue shirt that fades to pink, with neon yellow and pink stripes on the shoulders.",
          "'Romance', the title of their 2024 album, is printed inside the collar, and 'I thought it was love' is on the back.",
        ],
      },
      {
        heading: "Oasis, 2025 FAI Cup",
        paragraphs: [
          "Bohs released a special FAI Cup shirt with the Oasis logo across the front, in the same year the band's reunion tour came to Croke Park.",
          "Noel and Liam Gallagher were born in Manchester to Irish parents. The shirt uses the blue tones of Dublin City with a 90s-style chevron pattern.",
        ],
      },
      {
        heading: "Guinness, 2025 away",
        paragraphs: [
          "A cream shirt with thin red pinstripes, a 1980s Guinness logo and an old-style O'Neills logo from the same era. An embroidered Ha'penny Bridge tag sits on the hem.",
        ],
      },
      {
        heading: "Kneecap, 2026 away",
        paragraphs: [
          "Kneecap are an Irish-language rap trio from Belfast. The white away shirt has a keffiyeh-inspired pattern in the colours of the Irish and Palestinian flags, with Kneecap across a black chest band.",
          "There is also a black version with the band's balaclava face in red and a 'Dlúthpháirtíocht / Solidarity' patch on the hem.",
        ],
      },
      {
        heading: "How they fit",
        paragraphs: [
          "All of these shirts are a regular fit, in sizes S to 2XL. Each shirt page has a size chart with the chest, length and a height and weight guide.",
        ],
      },
    ],
    faqs: [
      { q: "Where do Bohemians play?", a: "Dalymount Park in Phibsborough, north Dublin." },
      { q: "Is Bohemian FC fan-owned?", a: "Yes. The club is owned by its members." },
      { q: "What sizes do the Bohemians shirts come in?", a: "S to 2XL, in a regular fit. Delivery to Ireland and the UK takes 8 to 14 days." },
    ],
    products: [
      "bohemians-oasis-2025-fai-cup-jersey",
      "bohemians-fontaines-dc-2025-third-jersey",
      "bohemians-2026-kneecap-away-jersey",
      "bohemians-2025-guinness-away-jersey",
      "bohemians-2026-kneecap-black-jersey",
    ],
    cta: { label: "Shop all Bohemians shirts", href: "/clubs/bohemians" },
  },
  {
    slug: "gaa-county-jerseys-2026",
    title: "GAA County Jerseys 2026: Dublin, Tyrone, Down, Antrim and Louth",
    seoTitle: "GAA Jerseys 2026: Dublin, Tyrone, Down, Antrim & Louth",
    description:
      "The new 2026 county jerseys from Dublin, Tyrone, Down, Antrim and Louth: the designs, the sponsors, what player fit means and how to pick your size.",
    category: "GAA",
    datePublished: "2026-09-24",
    heroImage: "/images/gaa-gear/900000016-1.webp",
    heroAlt: "Tyrone GAA 2026 home jersey in white and red with the McAleer & Rushe sponsor",
    heroFit: "contain",
    intro:
      "New county jerseys are one of the first signs of a new GAA season. Here are the 2026 jerseys in our range, what makes each one different, and how to get the right size.",
    sections: [
      {
        heading: "Dublin: sky blue and navy",
        paragraphs: [
          "Dublin's 2026 home jersey keeps the sky blue body, with a navy pinstripe and a navy yoke and sleeves. Staycity is the sponsor.",
        ],
      },
      {
        heading: "Tyrone: four stars on the sleeve",
        paragraphs: [
          "White with red side panels and sewn-on red stripes over the shoulders, inspired by Tyrone kits of the past.",
          "Four red stars on the right sleeve mark the county's All-Ireland football titles in 2003, 2005, 2008 and 2021. McAleer & Rushe is on the front and back.",
        ],
      },
      {
        heading: "Down: navy and mint",
        paragraphs: [
          "Down's 2026 alternative jersey is navy with mint and light blue chevron stripes, with 'An Dún' under the crest and EOS IT Solutions as the sponsor.",
          "Down have won five All-Ireland football titles, in 1960, 1961, 1968, 1991 and 1994.",
        ],
      },
      {
        heading: "Antrim: the Saffron County",
        paragraphs: [
          "Antrim's 2026 alternative jersey is a bold green pattern on a dark base, with amber trim for the county's saffron. Fibrus Broadband is on the front and Northern Property on the back.",
        ],
      },
      {
        heading: "Louth: red, with 'Lú Abú'",
        paragraphs: [
          "Louth's 2026 home jersey is red with a tonal pattern and black and white trim. StatSports is on the front, and 'Lú Abú' is stitched inside the collar.",
        ],
      },
      {
        heading: "What is player fit?",
        paragraphs: [
          "County jerseys are cut as a player fit. They sit close to the body, the way they are worn on the pitch. If you like room through the chest and stomach, go up a size.",
          "Chest sizes, measured flat across the jersey:",
        ],
        bullets: ["Small: 52 cm", "Medium: 54 cm", "Large: 56 cm", "XL: 58 cm"],
      },
    ],
    faqs: [
      { q: "Do GAA jerseys run small?", a: "They are a player fit, so they sit close to the body. Many people go up one size for a looser fit." },
      { q: "How many All-Irelands have Tyrone won?", a: "Four senior football titles: 2003, 2005, 2008 and 2021." },
      { q: "How long does delivery take?", a: "8 to 14 days to Ireland and the UK. Delivery is free on orders over €49." },
    ],
    products: [
      "dublin-gaa-2026-home-jersey",
      "tyrone-gaa-2026-home-jersey",
      "down-gaa-2026-alternative-jersey",
      "antrim-gaa-2026-alternative-jersey",
      "louth-gaa-2026-home-jersey",
    ],
    cta: { label: "Shop GAA jerseys", href: "/collections/gaa-jerseys" },
  },
  {
    slug: "serie-a-90s-shirts",
    title: "Serie A in the 90s: The Shirts of Calcio's Golden Era",
    seoTitle: "90s Serie A Shirts: Milan, Inter, Lazio, Parma & Napoli",
    description:
      "From Maradona's Napoli to Lazio's centenary title: the stories behind classic Serie A shirts from Milan, Inter, Parma, Lazio and Napoli, and the weekends of Football Italia.",
    category: "European & World Classics",
    datePublished: "2026-09-24",
    heroImage: "/images/european-world-classics/ac-milan-1991-92-home-shirt-1.webp",
    heroAlt: "AC Milan 1991-92 home shirt in red and black stripes with the Mediolanum sponsor",
    heroFit: "contain",
    intro:
      "For a decade, Serie A was where the best players in the world wanted to be. In Ireland and the UK, a generation watched it every weekend on Channel 4's Football Italia. These are the shirts from that era in our range.",
    sections: [
      {
        heading: "Football Italia",
        paragraphs: [
          "Channel 4 began showing live Serie A in 1992, the year Paul Gascoigne joined Lazio. It ran until 2002, and the Saturday morning show Gazzetta Football Italia, presented by James Richardson, became a cult favourite.",
        ],
      },
      {
        heading: "Napoli and Maradona",
        paragraphs: [
          "Diego Maradona led Napoli to their first league title in 1987 and a second in 1990, with the UEFA Cup in between in 1989.",
          "The sky blue 1986-87 shirt carries the Buitoni sponsor. By 1990-91 it was Mars, with the champions' shield on the chest.",
        ],
      },
      {
        heading: "Milan: unbeaten",
        paragraphs: [
          "Fabio Capello's Milan won Serie A in 1991-92 without losing a game. Two seasons later they beat Barcelona 4-0 in the Champions League final in Athens.",
        ],
      },
      {
        heading: "Parma's rise",
        paragraphs: [
          "Backed by Parmalat, Parma won the Cup Winners' Cup in 1993 and the UEFA Cup in 1995 and 1999. Their white home shirt with blue and yellow trim is from that first run.",
        ],
      },
      {
        heading: "Inter and Ronaldo",
        paragraphs: [
          "Inter signed Ronaldo in 1997, and in his first season they won the UEFA Cup, beating Lazio 3-0 in the final in Paris.",
        ],
      },
      {
        heading: "Lazio's centenary",
        paragraphs: [
          "Lazio won the Cup Winners' Cup in 1999 and Serie A in 2000, the club's 100th year, with Nedvěd, Nesta, Salas and Mancini in the side.",
        ],
      },
    ],
    faqs: [
      { q: "When was Football Italia on Channel 4?", a: "From 1992 to 2002." },
      {
        q: "Who won Serie A in the 90s?",
        a: "Between 1990 and 2000, Milan won it five times and Juventus three times, with Napoli, Sampdoria and Lazio winning it once each.",
      },
      { q: "Do 90s shirts fit differently?", a: "They are cut a little boxier than modern shirts. Each shirt page lists the fit and has a size chart." },
    ],
    products: [
      "napoli-1986-87-home-shirt",
      "ac-milan-1991-92-home-shirt",
      "ac-milan-1993-94-away-shirt",
      "parma-1993-95-home-shirt",
      "inter-milan-1997-98-home-shirt",
      "lazio-1998-2000-home-shirt",
      "napoli-1990-91-home-shirt",
      "lazio-1998-2000-away-shirt",
    ],
    cta: { label: "Shop European & World classics", href: "/collections/european-world-classics" },
  },
  {
    slug: "juventus-1997-98-pink-shirt-del-piero-zidane",
    title: "Juventus 1997/98: Del Piero, Zidane and the Pink Away Shirt",
    seoTitle: "Juventus 1997/98 Shirts: Del Piero, Zidane & the Pink Away",
    description:
      "Why Juventus wear pink, and the 1997/98 season behind the shirt: a Serie A title, a third Champions League final in a row, and Del Piero and Zidane at their best.",
    category: "European & World Classics",
    datePublished: "2026-09-23",
    heroImage: "/images/european-world-classics/juventus-1997-98-away-shirt-1.webp",
    heroAlt: "Juventus 1997-98 pink away shirt with Sony MiniDisc sponsor",
    heroFit: "contain",
    intro:
      "Juventus won Serie A in 1997/98 and reached their third Champions League final in a row. They had Alessandro Del Piero and Zinedine Zidane, and an away shirt in pink.",
    sections: [
      {
        heading: "Why do Juventus wear pink?",
        paragraphs: [
          "Pink was Juventus's first colour. When the club was founded in Turin in 1897, the players wore pink shirts with a black tie.",
          "In 1903 they switched to black and white stripes, using shirts sent over from Notts County in England. The stripes stuck, but pink keeps coming back as an away colour.",
        ],
      },
      {
        heading: "The 1997/98 season",
        paragraphs: [
          "Marcello Lippi's side won Serie A. Del Piero scored 21 league goals, with Filippo Inzaghi, signed from Atalanta that summer, alongside him.",
          "In Europe, Juve reached a third Champions League final in a row. They lost 1-0 to Real Madrid in Amsterdam, with Predrag Mijatović scoring.",
        ],
      },
      {
        heading: "Del Piero and Zidane",
        paragraphs: [
          "Del Piero wore 10 for Juventus from 1995 to 2012. He is the club's record scorer and has made more appearances than anyone else.",
          "Zidane joined from Bordeaux in 1996 and wore 21. A few weeks after the 1998 final, he scored twice in the World Cup final for France, and he won the Ballon d'Or that December.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "Both shirts are made by Kappa, with Sony MiniDisc across the front.",
          "The home shirt is black and white stripes with a polo collar. The away shirt is pink with a black collar and cuffs. We have both plain, or printed with DEL PIERO 10 or ZIDANE 21.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why are Juventus away shirts pink?",
        a: "Juventus wore pink when the club was founded in 1897, before switching to black and white stripes in 1903. Pink has come back as an away colour many times, including in 1997/98.",
      },
      { q: "What number did Zidane wear at Juventus?", a: "21, from 1996 to 2001." },
      { q: "Who sponsored Juventus in 1997/98?", a: "Sony MiniDisc. The kit was made by Kappa." },
    ],
    products: [
      "juventus-1997-98-away-shirt-del-piero-10",
      "juventus-1997-98-away-shirt-zidane-21",
      "juventus-1997-98-home-shirt-del-piero-10",
      "juventus-1997-98-home-shirt-zidane-21",
      "juventus-1997-98-away-shirt",
      "juventus-1997-98-home-shirt",
    ],
    cta: { label: "Shop Juventus shirts", href: "/clubs/juventus" },
  },
  {
    slug: "ronaldo-r9-career-in-shirts",
    title: "Ronaldo R9: A Career in Shirts",
    seoTitle: "Ronaldo R9 Shirts: PSV, Inter, Brazil, Real Madrid & Milan",
    description:
      "From PSV to AC Milan: the shirts Ronaldo Nazário wore, the numbers on the back and what he won in each. A quick guide to R9's career.",
    category: "Players",
    datePublished: "2026-09-23",
    heroImage: "/images/european-world-classics/brazil-2002-world-cup-home-shirt-ronaldo-9-1.webp",
    heroAlt: "Brazil 2002 World Cup home shirt printed RONALDO 9",
    heroFit: "contain",
    intro:
      "Ronaldo Nazário, known as R9, won two World Cups with Brazil and is one of the greatest strikers of all time. He played for five clubs in Europe and changed numbers more than once. Here is his career, shirt by shirt.",
    sections: [
      {
        heading: "PSV Eindhoven, 1994–96",
        paragraphs: [
          "Ronaldo joined PSV from Cruzeiro at 17, just after the 1994 World Cup. He was in Brazil's winning squad but did not play.",
          "He wore 9 and scored 30 league goals in his first season in Europe.",
        ],
      },
      {
        heading: "Barcelona, 1996–97",
        paragraphs: [
          "One season, 47 goals in all competitions. Barcelona won the Cup Winners' Cup and the Copa del Rey, and Ronaldo was named FIFA World Player of the Year at 20.",
        ],
      },
      {
        heading: "Inter, 1997–2002",
        paragraphs: [
          "Inter paid a world-record fee for him in 1997. He wore 10 in his first season, scored in the UEFA Cup final win over Lazio and won the Ballon d'Or.",
          "When Roberto Baggio arrived in 1998 and took 10, Ronaldo moved to 9. Serious knee injuries kept him out for most of the next two years.",
        ],
      },
      {
        heading: "Brazil, 2002",
        paragraphs: [
          "Ronaldo came back to score eight goals at the 2002 World Cup, including both in the 2-0 final against Germany. He won the Golden Boot and, that December, a second Ballon d'Or.",
        ],
      },
      {
        heading: "Real Madrid, 2002–07",
        paragraphs: [
          "He joined Real Madrid after the World Cup. He wore 11 in his first season, when Real won La Liga, then switched to 9 and was the league's top scorer in 2003/04.",
        ],
      },
      {
        heading: "AC Milan, 2007–08",
        paragraphs: [
          "Ronaldo joined Milan in January 2007. Filippo Inzaghi already had 9, so he took 99.",
          "He had played in the Champions League for Real Madrid earlier that season, so he was cup-tied when Milan won the final in May.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is Ronaldo Nazário called R9?",
        a: "To tell him apart from other players called Ronaldo, especially Cristiano Ronaldo (CR7). The 9 is the number he wore for Brazil and most of his clubs.",
      },
      { q: "What number did Ronaldo wear at Inter?", a: "10 in 1997/98, then 9 from 1998 onwards." },
      { q: "Why did Ronaldo wear 99 at AC Milan?", a: "Filippo Inzaghi already wore 9, so Ronaldo took 99." },
    ],
    products: [
      "psv-eindhoven-1994-95-home-shirt-number-9",
      "inter-milan-1997-98-uefa-cup-away-shirt-ronaldo-10",
      "inter-milan-1998-99-home-shirt-ronaldo-9",
      "brazil-2002-world-cup-home-shirt-ronaldo-9",
      "real-madrid-2002-03-centenary-home-shirt-ronaldo-11",
      "real-madrid-2003-04-home-shirt-ronaldo-9",
      "ac-milan-2006-07-home-shirt-ronaldo-99",
      "brazil-1998-world-cup-home-shirt-ronaldo-9",
    ],
    cta: { label: "Shop all Ronaldo R9 shirts", href: "/players/ronaldo-nazario" },
  },
  {
    slug: "arsenal-invincibles-2003-04-shirts",
    title: "Arsenal 2003/04: The Invincibles and Their Shirts",
    seoTitle: "Arsenal Invincibles Shirt 2003/04: Home & Away Kits",
    description:
      "38 games, 26 wins, 12 draws, no defeats. The home and away shirts Arsenal wore in the 2003/04 Invincibles season, and the players whose names went on the back.",
    category: "Premier League Classics",
    datePublished: "2026-09-23",
    heroImage: "/images/premier-league-classics/arsenal-2002-04-home-shirt-1.webp",
    heroAlt: "Arsenal 2002-04 home shirt, red with white sleeves and the O2 sponsor",
    heroFit: "contain",
    intro:
      "In 2003/04, Arsenal went through a whole Premier League season without losing. They won 26 and drew 12 of their 38 games and finished with 90 points. No team has done it in the Premier League since.",
    sections: [
      {
        heading: "The unbeaten season",
        paragraphs: [
          "Arsène Wenger's side won the title at White Hart Lane in April 2004, with a 2-2 draw against Tottenham. They finished 11 points clear of Chelsea.",
          "The last team to go a whole top-flight season unbeaten in England was Preston North End, in 1888/89.",
        ],
      },
      {
        heading: "The players",
        paragraphs: [
          "Thierry Henry scored 30 league goals and was the league's top scorer. Patrick Vieira was captain.",
          "Around them were Dennis Bergkamp, Robert Pires, Freddie Ljungberg, Sol Campbell, Ashley Cole, Lauren, Kolo Touré and Jens Lehmann. José Antonio Reyes joined from Sevilla in January.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "Nike made both, with O2 across the front.",
          "The home shirt has a red body and white sleeves. Arsenal first wore it in 2002/03 and kept it for the unbeaten season. The away shirt is yellow with a blue collar.",
          "We have both plain, or printed with HENRY 14, VIEIRA 4, BERGKAMP 10, LJUNGBERG 8 or REYES 9.",
        ],
      },
      {
        heading: "49 games",
        paragraphs: [
          "The run went on into the next season and reached 49 league games. Manchester United ended it at Old Trafford in October 2004.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many games were Arsenal's Invincibles unbeaten?",
        a: "All 38 league games in 2003/04 (26 wins, 12 draws), and 49 league games in a row in total, from May 2003 to October 2004.",
      },
      { q: "Who sponsored Arsenal in 2003/04?", a: "O2. The kit was made by Nike." },
      { q: "What number did Thierry Henry wear for Arsenal?", a: "14." },
    ],
    products: [
      "arsenal-2002-04-home-shirt-henry-14",
      "arsenal-2003-04-away-shirt-henry-14",
      "arsenal-2002-04-home-shirt-vieira-4",
      "arsenal-2003-04-away-shirt-bergkamp-10",
      "arsenal-2002-04-home-shirt",
      "arsenal-2003-04-away-shirt",
      "arsenal-2003-04-away-shirt-reyes-9",
      "arsenal-2002-04-home-shirt-ljungberg-8",
    ],
    cta: { label: "Shop Arsenal shirts", href: "/clubs/arsenal" },
  },
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
      "Do GAA jerseys run small? What player fit means, chest measurements for S to XL, and when to size up for a GAA jersey or training vest.",
    category: "GAA",
    datePublished: "2026-09-23",
    dateModified: "2026-09-24",
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
        paragraphs: [
          "Measured flat across the chest, just under the arms. Double it for the full chest. They vary a little from county to county.",
        ],
        bullets: [
          "Small: 52 cm flat (104 cm, 41 in all round)",
          "Medium: 54 cm flat (108 cm, 42.5 in all round)",
          "Large: 56 cm flat (112 cm, 44 in all round)",
          "XL: 58 cm flat (116 cm, 45.5 in all round)",
        ],
      },
      {
        heading: "How to check your size",
        paragraphs: [
          "Lay a jersey that fits you well flat. Measure straight across the chest, just below the arms, then double it.",
          "Compare that with the sizes above, or the full chart on our size guide page, which also gives length, waist and shoulder.",
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
