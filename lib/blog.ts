/**
 * Blog posts. Facts are checked against published records; each post links
 * to the shirts it covers. Read time is worked out from the word count.
 */

/** An openly licensed photo shown inside a section, with the credit its licence requires. */
export interface BlogImage {
  src: string;
  alt: string;
  caption: string;
  credit: {
    author: string;
    license: string;
    licenseUrl: string;
    /** Page the photo came from (e.g. its Wikimedia Commons file page). */
    sourceUrl: string;
  };
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  image?: BlogImage;
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
    slug: "ireland-usa-94-world-cup-shirts",
    title: "Ireland 1992–94 and USA 94: The Shirts That Beat Italy",
    seoTitle: "Ireland USA 94 Jersey & 1992-94 Shirts: Houghton v Italy",
    description:
      "Houghton's goal against Italy at Giants Stadium, McLoughlin's equaliser at Windsor Park and a last-16 exit. The story behind Ireland's 1992-94 and USA 94 jerseys.",
    category: "Irish Classics",
    datePublished: "2026-10-08",
    dateModified: "2026-10-22",
    heroImage: "/images/ireland-classics/692734038-1.webp",
    heroAlt: "Ireland USA 94 World Cup home jersey in emerald green with a black geometric pattern",
    heroFit: "contain",
    intro:
      "Ireland qualified for USA 94 with a draw in Belfast, then beat Italy 1-0 in New Jersey with a goal from Ray Houghton. Two jerseys cover that run: the 1992-94 shirts from the qualifying campaign, and the USA 94 shirts from the tournament itself.",
    sections: [
      {
        heading: "Windsor Park, November 1993",
        paragraphs: [
          "Ireland needed a result in Belfast. Northern Ireland went ahead on 71 minutes through a Jimmy Quinn volley, and five minutes later Alan McLoughlin hit a shot from the edge of the box into the corner. It finished 1-1.",
          "With Denmark losing to Spain in the other game, the draw was enough. Ireland went to the World Cup as runners-up in the group.",
        ],
      },
      {
        heading: "The 1992–94 shirts",
        paragraphs: [
          "The 1992-94 home is the green jersey with Opel across the chest, worn through that qualifying campaign. The away is white with green detailing.",
          "These are the shirts from the road to America. We stock both.",
        ],
      },
      {
        heading: "Giants Stadium, 18 June 1994",
        paragraphs: [
          "Ireland's first game was against Italy at Giants Stadium. After 11 minutes Ray Houghton took a ball on the edge of the box and chipped it over Gianluigi Pagliuca. It stayed 1-0.",
          "It was Ireland's first win in a World Cup finals match.",
        ],
      },
      {
        heading: "Orlando and the last 16",
        paragraphs: [
          "Mexico won the next game 2-1 in Orlando, after leading 2-0 with 65 minutes gone. Ireland then drew 0-0 with Norway at Giants Stadium, and that point was enough to reach the last 16.",
          "The Netherlands knocked them out 2-0 in Orlando.",
        ],
      },
      {
        heading: "The USA 94 shirts",
        paragraphs: [
          "The home is emerald green with a bold black geometric pattern and tricolour trim at the collar. The away is white with three broad green stripes, the FAI crest and the Opel sponsor.",
          "Sizes run S to 2XL, and the size guide has measurements.",
        ],
      },
    ],
    faqs: [
      { q: "Who scored for Ireland against Italy at USA 94?", a: "Ray Houghton, after 11 minutes at Giants Stadium on 18 June 1994. It finished 1-0." },
      {
        q: "How did Ireland qualify for USA 94?",
        a: "A 1-1 draw with Northern Ireland at Windsor Park in November 1993. Alan McLoughlin scored the equaliser, and Ireland went through as group runners-up.",
      },
      { q: "Who knocked Ireland out of USA 94?", a: "The Netherlands, 2-0 in Orlando in the last 16." },
      { q: "Was Ireland's USA 94 away shirt sponsored?", a: "The version we sell has the Opel sponsor, with the FAI crest and three green stripes." },
    ],
    products: [
      "ireland-1994-world-cup-home",
      "ireland-1994-world-cup-away",
      "ireland-1992-94-home-retro-jersey",
      "ireland-1992-94-away-retro-jersey",
    ],
    cta: { label: "Shop retro Irish shirts", href: "/collections/ireland-classics" },
  },
  {
    slug: "ireland-euro-88-shirt",
    title: "Ireland at Euro 88: The Shirt From Stuttgart",
    seoTitle: "Ireland Euro 88 Jersey: Houghton's Header v England",
    description:
      "Houghton's header against England in Stuttgart, Whelan's volley against the USSR and a late Dutch goal. The story behind Ireland's Euro 88 jersey.",
    category: "Irish Classics",
    datePublished: "2026-10-08",
    dateModified: "2026-10-22",
    heroImage: "/images/ireland-classics/679941594-1.webp",
    heroAlt: "Ireland Euro 88 home jersey in emerald green with white and orange trim",
    heroFit: "contain",
    intro:
      "Ireland's first major tournament was Euro 88 in West Germany. They beat England 1-0 in the opening game, drew with the USSR and lost to the Netherlands to a goal nine minutes from the end. The green jersey from that summer is where it all started.",
    sections: [
      {
        heading: "Stuttgart, 12 June 1988",
        paragraphs: [
          "Ireland opened against England. After six minutes a cross wasn't cleared and Ray Houghton looped a header over Peter Shilton. It finished 1-0.",
          "England were one of the favourites. Ireland had never played at a major finals before.",
        ],
      },
      {
        heading: "Hanover and Gelsenkirchen",
        paragraphs: [
          "Against the USSR in Hanover, Ronnie Whelan volleyed Ireland ahead, and Oleh Protasov equalised for a 1-1 draw.",
          "The last game was against the Netherlands in Gelsenkirchen. Paul McGrath hit a Dutch post at one end. At the other, Wim Kieft headed in after 82 minutes.",
        ],
      },
      {
        heading: "The shirt",
        paragraphs: [
          "Emerald green with white and orange trim. It was Jack Charlton's first major tournament as manager, and it set up everything that followed, from Italia 90 to USA 94.",
          "We stock the home, in sizes S to 2XL.",
        ],
      },
    ],
    faqs: [
      { q: "Who scored Ireland's winner against England at Euro 88?", a: "Ray Houghton, with a header after six minutes in Stuttgart on 12 June 1988." },
      { q: "Who scored for Ireland against the USSR at Euro 88?", a: "Ronnie Whelan. The game finished 1-1." },
      { q: "Who knocked Ireland out of Euro 88?", a: "The Netherlands, 1-0 in Gelsenkirchen, with Wim Kieft scoring after 82 minutes." },
    ],
    products: [
      "ireland-euro-88-home-jersey",
      "ireland-1990-italia-90-world",
      "ireland-1994-world-cup-home",
      "ireland-1992-94-home-retro-jersey",
    ],
    cta: { label: "Shop retro Irish shirts", href: "/collections/ireland-classics" },
  },
  {
    slug: "ronaldinho-shirts-psg-barcelona-milan",
    title: "Ronaldinho's Shirts: PSG, Barcelona and AC Milan",
    seoTitle: "Ronaldinho Shirts: PSG, Barcelona & AC Milan Jerseys",
    description:
      "The numbers Ronaldinho wore at PSG, Barcelona and AC Milan, and the story behind each shirt: 21 and 10 in Paris, 10 in Catalonia, and why he took 80 at Milan.",
    category: "Players",
    datePublished: "2026-10-08",
    heroImage: "/images/european-world-classics/barcelona-2005-06-away-shirt-ronaldinho-10-1.webp",
    heroAlt: "Barcelona 2005-06 yellow away shirt printed RONALDINHO 10",
    heroFit: "contain",
    intro:
      "Ronaldinho wore three numbers at three clubs. He was 21 and then 10 at Paris Saint-Germain, 10 at Barcelona and 80 at AC Milan. Most people remember the Barcelona years, from 2003 to 2008, but every one of those shirts has a story.",
    sections: [
      {
        heading: "PSG, 2001–03: 21, then 10",
        paragraphs: [
          "Ronaldinho joined Paris Saint-Germain from Grêmio in 2001 on a five-year deal, for about €5 million. He wore 21 in his first season, in the navy home shirt with the red stripe and Opel across the chest.",
          "In 2002 he won the World Cup with Brazil. He came back to Paris as the 10 for 2002-03, with Thomson on the front. It was his last season at the club.",
        ],
      },
      {
        heading: "Barcelona, 2003–08: the 10",
        paragraphs: [
          "Barcelona signed him in 2003 for €30 million, ahead of Manchester United, and gave him the 10. Two seasons later he was collecting awards. He was FIFA World Player of the Year in 2004 and 2005, and he won the Ballon d'Or in 2005.",
          "Barcelona won La Liga in 2004-05 and 2005-06. The 2005-06 season gave us the bright yellow away shirt and the home shirt from the Champions League final.",
        ],
        image: {
          src: "/images/blog/ronaldinho-barcelona-goal-celebration-2006.webp",
          alt: "Ronaldinho in the red and blue Barcelona shirt, number 10, celebrating a goal with two team-mates",
          caption: "Ronaldinho celebrates a goal against Real Sociedad with Belletti and Giuly, 9 December 2006.",
          credit: {
            author: "Darz Mol",
            license: "CC BY-SA 3.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Ronaldinho_Belletti_and_Giuly_9dec2006.jpg",
          },
        },
      },
      {
        heading: "Two nights in a Barcelona shirt",
        paragraphs: [
          "On 19 November 2005, Barcelona won 3-0 at Real Madrid. Ronaldinho scored twice, and the Bernabéu stood to applaud him.",
          "On 17 May 2006, Barcelona beat Arsenal 2-1 in the Champions League final in Paris. We stock the home shirt from that season with the final's details embroidered on the front.",
        ],
      },
      {
        heading: "AC Milan, 2008–11: number 80",
        paragraphs: [
          "Ronaldinho joined Milan in July 2008 on a three-year deal. Clarence Seedorf already had the 10, so he chose 80, for the year he was born, 1980.",
          "He left for Flamengo in January 2011. Our 2009-10 shirt is the white away, with red and black trim on the sleeves and bwin across the chest, printed RONALDINHO 80.",
        ],
        image: {
          src: "/images/blog/ronaldinho-ac-milan-penalty-2010.webp",
          alt: "Ronaldinho in a red and black striped AC Milan shirt, number 80, about to take a penalty",
          caption: "Ronaldinho takes a penalty for AC Milan in a friendly against Montreal Impact, 2 June 2010.",
          credit: {
            author: "abdallahh",
            license: "CC BY 2.0",
            licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Penalty_Ronaldinho_Montreal_Impact-AC_Milan.jpg",
          },
        },
      },
      {
        heading: "Which Ronaldinho shirt?",
        paragraphs: [
          "Every name and number we stock for him matches what he wore that season. Our football shirts run from S to 2XL, and the size guide has measurements.",
        ],
        bullets: [
          "PSG 2001-02, number 21: his first season in Europe.",
          "PSG 2002-03, number 10: the year after the World Cup.",
          "Barcelona 2003-04, number 10: his first season in Catalonia.",
          "Barcelona 2005-06, number 10: the Ballon d'Or year, in yellow away or the Champions League final home.",
          "AC Milan 2009-10, number 80: the Milan shirt.",
        ],
      },
    ],
    faqs: [
      { q: "What number did Ronaldinho wear at Barcelona?", a: "10, from 2003 to 2008." },
      { q: "What number did Ronaldinho wear at PSG?", a: "21 in 2001-02, then 10 in 2002-03." },
      {
        q: "Why did Ronaldinho wear 80 at AC Milan?",
        a: "Clarence Seedorf had the 10, so Ronaldinho chose 80 for the year he was born, 1980.",
      },
      { q: "When did Ronaldinho win the Ballon d'Or?", a: "In 2005. It is his only one." },
      {
        q: "How much did Barcelona pay for Ronaldinho?",
        a: "€30 million in 2003. Paris Saint-Germain had signed him from Grêmio for €5 million in 2001.",
      },
    ],
    products: [
      "psg-2001-02-home-shirt-ronaldinho-21",
      "psg-2002-03-home-shirt-ronaldinho-10",
      "barcelona-2003-04-home-shirt-ronaldinho-10",
      "barcelona-2005-06-away-shirt-ronaldinho-10",
      "barcelona-2006-champions-league-final-shirt-ronaldinho-10",
      "barcelona-2007-08-camp-nou-50th-anniversary-home-shirt-ronaldinho-10",
      "psg-2001-02-away-shirt-ronaldinho-21",
      "ac-milan-2009-10-away-shirt-ronaldinho-80",
    ],
    cta: { label: "Shop all Ronaldinho shirts", href: "/players/ronaldinho" },
  },
  {
    slug: "inter-milan-2009-10-treble-shirt",
    title: "Inter Milan 2009/10: The Treble Shirt",
    seoTitle: "Inter Milan 2010 Champions League Final Shirt",
    description:
      "Inter's 2009/10 black and blue stripes with Pirelli: the shirt worn to win Serie A, the Coppa Italia and the Champions League, with Milito's two goals in Madrid.",
    category: "European & World Classics",
    datePublished: "2026-10-08",
    heroImage: "/images/european-world-classics/inter-milan-2010-champions-league-final-home-shirt-1.webp",
    heroAlt: "Inter Milan 2009-10 black and blue striped home shirt with the Champions League final details",
    heroFit: "contain",
    intro:
      "In 2009/10 Inter won Serie A, the Coppa Italia and the Champions League. No Italian club had won the treble before. The black and blue stripes with Pirelli across the chest are the shirt they wore in Madrid on 22 May 2010.",
    sections: [
      {
        heading: "The shirt",
        paragraphs: [
          "Black and blue stripes, with Pirelli in white across the chest. It's the home shirt Inter wore all season, and the final version has the match's details stitched on the front.",
        ],
      },
      {
        heading: "The side Mourinho built",
        paragraphs: [
          "José Mourinho's second season came after a busy summer. Diego Milito and Thiago Motta arrived from Genoa, Wesley Sneijder from Real Madrid and Lúcio from Bayern Munich. Samuel Eto'o came in a swap that sent Zlatan Ibrahimović to Barcelona.",
          "Javier Zanetti stayed on as the captain and the heart of the side.",
        ],
        image: {
          src: "/images/blog/inter-milan-2009-10-squad-photo.webp",
          alt: "Inter Milan players posing for a team photo in black and blue striped shirts with Pirelli on the front",
          caption: "Inter in their 2009-10 home shirts before a pre-season friendly in Kapfenberg, Austria, 16 August 2009.",
          credit: {
            author: "Steindy",
            license: "CC BY-SA 3.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Inter_Mailand_(2009-08-16).jpg",
          },
        },
      },
      {
        heading: "Three trophies",
        paragraphs: [
          "Inter won Serie A on the final matchday, ahead of Roma. A few weeks earlier Milito scored the only goal of the Coppa Italia final against Roma at the Stadio Olimpico.",
          "In Europe they beat Barcelona in the semi-final, 3-1 at the San Siro and then losing 1-0 at the Camp Nou with Thiago Motta sent off. They went through 3-2 on aggregate.",
        ],
      },
      {
        heading: "Madrid, 22 May 2010",
        paragraphs: [
          "Inter beat Bayern Munich 2-0 at the Santiago Bernabéu. Milito scored both, in the 35th and 70th minutes. It was their first European Cup since 1965.",
          "It was also Zanetti's 700th appearance for the club. Esteban Cambiasso lifted the trophy wearing Giacinto Facchetti's number 3 shirt. Mourinho left for Real Madrid within the week.",
        ],
      },
      {
        heading: "Which Inter shirt?",
        paragraphs: [
          "The Champions League final shirt is the one to get if you want the night itself. The standard 2009-10 home is the same shirt without the match details, and we have the away too.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who scored in the 2010 Champions League final?",
        a: "Diego Milito, twice, in the 35th and 70th minutes, as Inter beat Bayern Munich 2-0 at the Santiago Bernabéu.",
      },
      {
        q: "Was Inter's 2009/10 side the first Italian club to win the treble?",
        a: "Yes. They won Serie A, the Coppa Italia and the Champions League, and no Italian club had done that before.",
      },
      { q: "When did Inter last win the European Cup before 2010?", a: "In 1965." },
      { q: "Who sponsored Inter in 2009/10?", a: "Pirelli." },
    ],
    products: [
      "inter-milan-2010-champions-league-final-home-shirt",
      "inter-milan-2009-10-home-shirt",
      "inter-milan-2009-10-away-shirt",
      "inter-milan-2005-06-away-shirt",
    ],
    cta: { label: "Shop European and world classics", href: "/collections/european-world-classics" },
  },
  {
    slug: "bohemians-music-shirts-fontaines-dc-oasis-kneecap",
    title: "Bohemians' Music Shirts: Fontaines D.C., Oasis and Kneecap",
    seoTitle: "Bohemians Jerseys: Fontaines D.C., Oasis & Kneecap",
    description:
      "How a Phibsborough club ended up with Fontaines D.C., Oasis and Kneecap on its shirts. The story behind each Bohemians jersey, from Bob Marley to Guinness.",
    category: "Irish Classics",
    datePublished: "2026-09-24",
    heroImage: "/images/ireland-classics/bohemians-oasis-2025-fai-cup-jersey-1.webp",
    heroAlt: "Bohemians x Oasis 2025 FAI Cup jersey in sky blue with the Oasis logo",
    heroFit: "contain",
    intro:
      "Bohemians call themselves Dublin's Originals. The club was founded in 1890, it's owned by its members, and in the last few years it has put more bands on its shirts than any club we know of. The shirts turn up at gigs as well as at Dalymount.",
    sections: [
      {
        heading: "It started with Bob Marley",
        paragraphs: [
          "In July 1980, Bob Marley played Dalymount Park. More than forty years later, in 2022, Bohs put his face on their away shirt, made with the Marley family's blessing and with a copy of the concert ticket stitched on the hem.",
          "That shirt sold well beyond Dublin, and the club kept going. Most releases since have paired Bohs with an artist, a brand or a cause.",
        ],
      },
      {
        heading: "Fontaines D.C., 2025 third",
        paragraphs: [
          "Fontaines D.C. formed in Dublin, and guitarist Carlos O'Connell worked on this one with the club's designers. The colours come from their 2024 album Romance: sky blue fading into pink, with neon yellow and pink stripes on the shoulders.",
          "A line from the record, 'I thought it was love', runs across the upper back, and 'Romance' repeats inside the collar. On the hem you'll find a Palestinian flag patch with 'Saoirse don Phalaistín'. Of the five, it's the loudest and the easiest to wear with jeans.",
        ],
      },
      {
        heading: "Oasis, 2025 FAI Cup",
        paragraphs: [
          "Oasis played two nights at Croke Park in August 2025, less than a mile from Dalymount. Bohs marked it with a cup shirt: the Oasis logo in its black box across the chest, a 90s chevron pattern in the blues of Dublin City, and a striped collar that could have come out of 1995.",
          "Noel and Liam grew up in Manchester, but their parents, Peggy and Tommy, came from Ireland. Noel has said the Irish influence runs heavy through what the band did, because they were all of Irish descent.",
        ],
      },
      {
        heading: "Guinness, 2025 away",
        paragraphs: [
          "The Guinness shirt looks back to the 1980s. It has a cream body with thin red pinstripes, the old Guinness lettering and an O'Neills logo from the same era. The hem tag shows the Ha'penny Bridge with its name in Irish and English.",
          "The club sold it at the Guinness Storehouse at St James's Gate as well as its own shop, which tells you who it had in mind.",
        ],
      },
      {
        heading: "Kneecap, 2026 away and black",
        paragraphs: [
          "Kneecap, the Belfast trio who rap in Irish, designed the 2026 away shirt with the club. The white body carries a keffiyeh pattern woven with the colours of the Irish and Palestinian flags. The crest is in Irish, and the collar tape spells out CEARTA, 'rights', from one of the band's tracks.",
          "The black version swaps the chest band for Kneecap's balaclava face in red, with thin red pinstripes and a 'Dlúthpháirtíocht / Solidarity' patch on the hem.",
        ],
      },
      {
        heading: "Sizing",
        paragraphs: [
          "All five are a regular fit, in S to 2XL. Each shirt page has a chart with the chest, length and a height and weight guide. Between sizes? Email us your height and weight and we'll tell you which to order.",
        ],
      },
    ],
    faqs: [
      { q: "Where do Bohemians play?", a: "Dalymount Park in Phibsborough, north Dublin, less than a mile from Croke Park." },
      { q: "Is Bohemian FC fan-owned?", a: "Yes. The club is owned by its members." },
      { q: "Who designed the Fontaines D.C. shirt?", a: "Guitarist Carlos O'Connell, working with the club's own designers." },
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
      "The 2026 county jerseys from Dublin, Tyrone, Down, Antrim and Louth: what's on each one, the history behind the details, and how player fit sizing works.",
    category: "GAA",
    datePublished: "2026-09-24",
    heroImage: "/images/gaa-gear/900000016-1.webp",
    heroAlt: "Tyrone GAA 2026 home jersey in white and red with the McAleer & Rushe sponsor",
    heroFit: "contain",
    intro:
      "The new county jersey turns up around the start of the League, and for a lot of us it's the first sign the season is on its way. These are the five 2026 jerseys in our range, and the stories stitched into them.",
    sections: [
      {
        heading: "Dublin: the sky blue",
        paragraphs: [
          "Dublin kept it familiar: a sky blue body with a navy pinstripe, and a navy yoke and sleeves. Staycity is the sponsor.",
          "It's the look that won six All-Irelands in a row between 2015 and 2020, and the county hasn't strayed far from it since.",
        ],
      },
      {
        heading: "Tyrone: four stars on the sleeve",
        paragraphs: [
          "Tyrone went back to their older kits for 2026. The jersey is white with red side panels and red stripes sewn over the shoulders, with McAleer & Rushe on the front and back.",
          "Look at the right sleeve. Four red stars sit above 'Tír Eoghain', one for each All-Ireland: 2003, 2005, 2008 and 2021, when they beat Mayo in the final.",
        ],
      },
      {
        heading: "Down: navy and mint",
        paragraphs: [
          "Down's alternative jersey is navy with mint and light blue chevron stripes, and 'An Dún' under the crest. EOS IT Solutions sponsors it, with Murdock Builders Merchants on the sleeves.",
          "In 1960, Down became the first team to take Sam Maguire across the border into the North. They won it again in 1961, 1968, 1991 and 1994.",
        ],
      },
      {
        heading: "Antrim: the Saffron County",
        paragraphs: [
          "Antrim's alternative jersey swaps the saffron body for a dark base covered in a bold green pattern. The amber stays, on the collar, cuffs and hem stripes, so nobody mistakes whose it is. Fibrus Broadband is on the front and Northern Property on the back.",
        ],
      },
      {
        heading: "Louth: red, with 'Lú Abú'",
        paragraphs: [
          "Louth's home jersey is red with a tonal pattern, black and white trim, and StatSports across the chest. 'Lú Abú' is stitched inside the collar.",
          "It arrives after the best year the Wee County has had in generations. In May 2025, Louth beat Meath 3-14 to 1-18 at Croke Park to win Leinster for the first time since 1957, with captain Sam Mulroy scoring 1-7.",
        ],
      },
      {
        heading: "Getting the size right",
        paragraphs: [
          "County jerseys are cut as a player fit. They sit close to the body, the way the players wear them. If you like a bit of room through the chest and stomach, go up a size.",
          "Measured flat across the chest, just under the arms:",
        ],
        bullets: ["Small: 52 cm", "Medium: 54 cm", "Large: 56 cm", "XL: 58 cm"],
      },
    ],
    faqs: [
      { q: "Do GAA jerseys run small?", a: "They're a player fit, so they sit close to the body. Many people go up one size for a looser fit." },
      { q: "How many All-Irelands have Tyrone won?", a: "Four senior football titles: 2003, 2005, 2008 and 2021." },
      { q: "When did Louth last win Leinster?", a: "2025, beating Meath 3-14 to 1-18. Before that, their last Leinster title came in 1957." },
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
      "Football Italia, Gazzetta on a Saturday morning, and the Serie A shirts we grew up watching: Maradona's Napoli, Capello's Milan, Parma, Inter and Lazio.",
    category: "European & World Classics",
    datePublished: "2026-09-24",
    heroImage: "/images/european-world-classics/ac-milan-1991-92-home-shirt-1.webp",
    heroAlt: "AC Milan 1991-92 home shirt in red and black stripes with the Mediolanum sponsor",
    heroFit: "contain",
    intro:
      "If you grew up in Ireland or Britain in the 90s, Serie A came into your house every weekend. For ten years, the best players in the world played in Italy, and Channel 4 showed us all of it. These are the shirts from that era in our range.",
    sections: [
      {
        heading: "Sunday afternoons with Football Italia",
        paragraphs: [
          "Channel 4 showed its first live Serie A match on 6 September 1992. Three million people watched Sampdoria and Lazio draw 3-3, with Signori scoring twice, and a lot of them never went back to thinking Italian football was dull.",
          "Paul Gascoigne had joined Lazio that summer, which helped. So did Gazzetta Football Italia on a Saturday morning, with James Richardson at a café table working through the pink papers. It ran until 2002, and it's the reason so many of us can still name Parma's back three.",
        ],
      },
      {
        heading: "Napoli: Maradona's shirts",
        paragraphs: [
          "Napoli had never won the league before Diego Maradona arrived. He led them to the title in 1987 and again in 1990, with the UEFA Cup in between in 1989.",
          "The sky blue 1986-87 shirt carries Buitoni across the chest. By 1990-91 the sponsor was Mars, and the champions' shield sat on the chest. We'd call the 86-87 one of the best-looking shirts of the whole decade.",
        ],
      },
      {
        heading: "Milan: unbeaten",
        paragraphs: [
          "Fabio Capello's Milan went through the 1991-92 league season without losing a game. Baresi and Maldini kept it tight at the back, and Van Basten scored the goals.",
          "Two years later, Milan beat Cruyff's Barcelona 4-0 in the Champions League final in Athens. They wore white that night, with Motta across the front.",
        ],
      },
      {
        heading: "Parma: the club that came from nowhere",
        paragraphs: [
          "Parma only reached Serie A in 1990. With money from Parmalat, they won the Cup Winners' Cup at Wembley in 1993, the UEFA Cup in 1995 and again in 1999.",
          "Their white home shirt with blue and yellow trim is from that first run, when Tomas Brolin and Gianfranco Zola wore it.",
        ],
      },
      {
        heading: "Inter and Lazio",
        paragraphs: [
          "Inter paid a world-record fee for Ronaldo in 1997, and in his first season they won the UEFA Cup, beating Lazio 3-0 in Paris.",
          "Lazio had the last word on the decade. They won the Cup Winners' Cup in 1999 and Serie A in 2000, the club's hundredth year, with Nedvěd, Nesta and Mancini in the team.",
        ],
      },
    ],
    faqs: [
      { q: "When was Football Italia on Channel 4?", a: "From September 1992 to 2002. The first live game was Sampdoria 3-3 Lazio." },
      {
        q: "Who won Serie A in the 90s?",
        a: "Between 1990 and 2000, Milan won it five times and Juventus three times, with Napoli, Sampdoria and Lazio winning it once each.",
      },
      { q: "Do 90s shirts fit differently?", a: "They're cut a little boxier than modern shirts. Each shirt page lists the fit and has a size chart." },
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
      "Why Juventus wear pink, and the 1997/98 season behind the shirt: Del Piero's 21 goals, Zidane in the number 21, the Iuliano game and a third Champions League final in a row.",
    category: "European & World Classics",
    datePublished: "2026-09-23",
    dateModified: "2026-09-24",
    heroImage: "/images/european-world-classics/juventus-1997-98-away-shirt-1.webp",
    heroAlt: "Juventus 1997-98 pink away shirt with Sony MiniDisc sponsor",
    heroFit: "contain",
    intro:
      "Lippi's Juventus of 1997/98 had Zidane pulling the strings, Del Piero scoring for fun and Inzaghi fresh from Atalanta. They won the league and reached a third Champions League final in a row. They also had the best away shirt in Italy, and it was pink.",
    sections: [
      {
        heading: "Why Juventus wear pink",
        paragraphs: [
          "Pink was Juventus's first colour. The students who founded the club in Turin in 1897 played in pink shirts with black ties.",
          "In 1903, an English member called John Savage asked a friend in Nottingham to send replacements. The friend supported Notts County and sent black and white stripes. Juve kept them, and pink has come back as an away colour ever since.",
        ],
      },
      {
        heading: "The 1997/98 season",
        paragraphs: [
          "Del Piero scored 21 league goals, wearing the 10 he'd taken over from Roberto Baggio. Zidane, in his second season after arriving from Bordeaux, wore 21 and ran the midfield.",
          "The title came down to Juventus and Ronaldo's Inter. They met in Turin in April, and Juve won 1-0 after the referee waved away Inter's penalty claim when Mark Iuliano ran into Ronaldo. Italians still argue about it.",
        ],
      },
      {
        heading: "Amsterdam",
        paragraphs: [
          "Juventus had won the Champions League in 1996 and lost the 1997 final to Dortmund. In May 1998 they lost again, 1-0 to Real Madrid in Amsterdam, with Predrag Mijatović scoring.",
          "Zidane got his revenge that summer. He headed twice in the World Cup final for France and won the Ballon d'Or in December.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "Kappa made both, with Sony MiniDisc across the front. The home shirt is black and white stripes with a buttoned collar. The away is pink with a black collar and cuffs, and it looks better now than it did then.",
          "We have both plain, or printed with DEL PIERO 10 or ZIDANE 21.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why are Juventus away shirts pink?",
        a: "Juventus wore pink when the club was founded in 1897, before switching to black and white stripes in 1903. Pink has come back as an away colour many times, including in 1997/98.",
      },
      { q: "Why do Juventus wear black and white?", a: "In 1903 a friend in Nottingham sent the club a set of Notts County shirts, and Juve kept the stripes." },
      { q: "What number did Zidane wear at Juventus?", a: "21, from 1996 to 2001." },
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
      "From PSV to AC Milan, the shirts Ronaldo Nazário wore, the numbers on his back and the moments that went with them, including the night Old Trafford stood for him.",
    category: "Players",
    datePublished: "2026-09-23",
    dateModified: "2026-09-24",
    heroImage: "/images/european-world-classics/brazil-2002-world-cup-home-shirt-ronaldo-9-1.webp",
    heroAlt: "Brazil 2002 World Cup home shirt printed RONALDO 9",
    heroFit: "contain",
    intro:
      "Ask anyone who watched football in the late 90s who the best player in the world was, and most will say Ronaldo. The Brazilian one. He played for five clubs in Europe, changed his number more than once and wrecked both knees, and he still won two World Cups.",
    sections: [
      {
        heading: "PSV, 1994–96",
        paragraphs: [
          "Ronaldo was 17 when he joined PSV from Cruzeiro, straight after the 1994 World Cup. He'd been in Brazil's squad in America but never got on the pitch.",
          "He wore 9 in Eindhoven and scored 30 league goals in his first season.",
        ],
      },
      {
        heading: "Barcelona, 1996–97",
        paragraphs: [
          "He spent one season at the Camp Nou and scored 47 goals. The one people remember came against Compostela, when he ran from his own half through most of their team.",
          "Barcelona won the Cup Winners' Cup and the Copa del Rey, and at 20 he was named FIFA World Player of the Year.",
        ],
      },
      {
        heading: "Inter, 1997–2002",
        paragraphs: [
          "Inter paid a world-record fee for him in 1997. He wore 10 in his first season, scored in the UEFA Cup final win over Lazio and won the Ballon d'Or. When Roberto Baggio arrived in 1998 and took the 10, Ronaldo moved to 9.",
          "Then his knee went, in November 1999. He came back in the Coppa Italia final the following April, lasted six minutes and the tendon went. He barely played for two years.",
        ],
      },
      {
        heading: "Brazil, 2002",
        paragraphs: [
          "He came back for the 2002 World Cup with that haircut and scored eight goals, including both in the 2-0 final against Germany. He won the Golden Boot and, that December, his second Ballon d'Or.",
        ],
      },
      {
        heading: "Real Madrid, 2002–07",
        paragraphs: [
          "Real signed him that summer. He wore 11 in his first season because Morientes had the 9, and Real won La Liga.",
          "In April 2003 he scored a hat-trick against Manchester United at Old Trafford in the Champions League. When he went off, the United fans stood and applauded him. He moved to 9 the next season and finished as the league's top scorer.",
        ],
      },
      {
        heading: "AC Milan, 2007–08",
        paragraphs: [
          "He joined Milan in January 2007. Filippo Inzaghi had the 9, so he took 99. He'd played in the Champions League for Real earlier that season, so he watched from the stands when Milan won the final in May.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is Ronaldo Nazário called R9?",
        a: "To tell him apart from other players called Ronaldo, especially Cristiano Ronaldo (CR7). The 9 is the number he wore for Brazil and most of his clubs.",
      },
      { q: "What number did Ronaldo wear at Inter?", a: "10 in 1997/98, then 9 from 1998 onwards." },
      { q: "Why did Ronaldo wear 11 at Real Madrid?", a: "Fernando Morientes had the 9 in 2002/03. Ronaldo took it the following season." },
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
      "38 games, 26 wins, 12 draws, no defeats. The home and away shirts Arsenal wore in the 2003/04 Invincibles season, the games that nearly broke the run, and the names on the back.",
    category: "Premier League Classics",
    datePublished: "2026-09-23",
    dateModified: "2026-09-24",
    heroImage: "/images/premier-league-classics/arsenal-2002-04-home-shirt-1.webp",
    heroAlt: "Arsenal 2002-04 home shirt, red with white sleeves and the O2 sponsor",
    heroFit: "contain",
    intro:
      "Arsenal went through the 2003/04 Premier League season without losing. They won 26, drew 12 and finished on 90 points. Twenty-odd years on, nobody else has done it in the Premier League, and you can still start an argument in any pub by asking whether they were the best side the league has seen.",
    sections: [
      {
        heading: "The one that nearly ended it",
        paragraphs: [
          "The run almost stopped in September, at Old Trafford. In the last minute, Ruud van Nistelrooy stepped up for a United penalty and hit the bar. It finished 0-0, and the scenes at the final whistle earned a pile of fines.",
          "After that, Arsenal kept finding ways. They clinched the title at White Hart Lane in April with a 2-2 draw, which Spurs fans have never enjoyed hearing about.",
        ],
      },
      {
        heading: "The team",
        paragraphs: [
          "Thierry Henry scored 30 league goals and was the division's top scorer. Patrick Vieira captained a side with Bergkamp, Pires, Ljungberg, Campbell, Ashley Cole, Lauren, Kolo Touré and Jens Lehmann in goal. José Antonio Reyes arrived from Sevilla in January.",
          "On the last day they beat Leicester 2-1 at Highbury, with Henry scoring a penalty and Vieira the winner. The Premier League gave them a specially made gold trophy.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "Nike made both, with O2 across the front. The home shirt has the red body and white sleeves Arsenal have worn since Herbert Chapman's day. They first wore this version in 2002/03 and kept it for the unbeaten season.",
          "The away shirt is yellow with a blue collar. We have both plain, or printed with HENRY 14, VIEIRA 4, BERGKAMP 10, LJUNGBERG 8 or REYES 9.",
        ],
      },
      {
        heading: "Forty-nine",
        paragraphs: [
          "The run carried on into the next season and reached 49 league games. It ended where it nearly ended the year before, at Old Trafford, in October 2004. United won 2-0, and afterwards somebody threw a slice of pizza at Alex Ferguson in the tunnel.",
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
      "League, FA Cup and Champions League in eleven days. The home, away and black third shirts from Manchester United's 1998/99 Treble season, and the two Cork men at the heart of it.",
    category: "Premier League Classics",
    datePublished: "2026-09-23",
    dateModified: "2026-09-24",
    heroImage: "/images/premier-league-classics/647601889-1.webp",
    heroAlt: "Manchester United 1998-99 home shirt with SHARP sponsor",
    heroFit: "contain",
    intro:
      "Between 16 and 26 May 1999, Manchester United won the Premier League, the FA Cup and the Champions League. No English club had done it before. For Irish United fans the season had an extra pull, because two Cork men played a big part in it.",
    sections: [
      {
        heading: "Eleven days in May",
        paragraphs: [
          "United beat Tottenham 2-1 at Old Trafford on the last day to win the league. Six days later they beat Newcastle 2-0 in the FA Cup final, with goals from Teddy Sheringham and Paul Scholes.",
          "Then came Barcelona. Bayern Munich led through Mario Basler's early free kick, and the game was into stoppage time when Sheringham equalised. Ole Gunnar Solskjær won it two minutes later. Alex Ferguson summed it up on television afterwards: 'Football. Bloody hell.'",
        ],
      },
      {
        heading: "The Cork connection",
        paragraphs: [
          "Roy Keane dragged United through the semi-final in Turin. They were 2-0 down to Juventus inside eleven minutes, and Keane started the comeback with a header from Beckham's corner. Nine minutes later he was booked, which ruled him out of the final, and he played the rest of the game as if it didn't matter. United won 3-2.",
          "With Keane and Scholes both suspended, Peter Schmeichel captained the side in Barcelona in his last game for the club. Denis Irwin, from Togher, started at left-back.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "Umbro made all three, with SHARP across the front. The home is classic United red with a quarter-zip collar. The white away has black and red diamond taping on the shoulders.",
          "The black third has red and white piping and the same quarter-zip neck. It's our favourite of the three, and it's the one you see least often.",
        ],
      },
    ],
    faqs: [
      { q: "When did Manchester United win the Treble?", a: "In May 1999: the Premier League on 16 May, the FA Cup on 22 May and the Champions League on 26 May." },
      { q: "Who scored in the 1999 Champions League final?", a: "Mario Basler for Bayern Munich, then Teddy Sheringham and Ole Gunnar Solskjær in stoppage time for United." },
      { q: "Who sponsored Manchester United in 1998/99?", a: "SHARP. The kit was made by Umbro." },
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
    seoTitle: "Retro European Football Shirts: Juventus, Roma & More",
    description:
      "Juventus, Roma, Bayern, Betis and Club América: five retro shirts from beyond England, and the stories behind each one.",
    category: "European & World Classics",
    datePublished: "2026-09-23",
    dateModified: "2026-09-24",
    heroImage: "/images/european-world-classics/juventus-1995-96-away-shirt-1.webp",
    heroAlt: "Juventus 1995-96 away shirt in blue with gold star panels",
    heroFit: "contain",
    intro:
      "The Premier League gets most of the attention, but some of the best shirts of the 90s came from Italy, Germany, Spain and Mexico. These five are our favourites from outside England, and each one comes with a season worth remembering.",
    sections: [
      {
        heading: "Juventus 1995/96 away",
        paragraphs: [
          "Juventus won the Champions League in 1996, beating Ajax on penalties in Rome after Fabrizio Ravanelli scored in a 1-1 draw. Gianluca Vialli lifted the cup in his last game for the club before he moved to Chelsea.",
          "Their away shirt that season is blue, with gold star panels on the shoulders and Sony across the chest.",
        ],
      },
      {
        heading: "Roma 1999/00 away",
        paragraphs: [
          "This was Fabio Capello's first season in charge, with a young Francesco Totti wearing the armband. Roma finished sixth, and won the league the following year.",
          "The grey and black away shirt has an orange wolf print across the shoulders and the INA Assitalia sponsor. It looks better now than it did in 1999.",
        ],
      },
      {
        heading: "Bayern Munich 1997/99 away",
        paragraphs: [
          "In March 1998, Giovanni Trapattoni gave a press conference in broken German, thumping the desk and shouting 'Was erlauben Strunz?' about one of his own players. Bayern fans still quote it.",
          "A year later Bayern won the Bundesliga and were a minute away from the Champions League, until United scored twice in stoppage time in Barcelona. The navy and red away shirt carries the Opel sponsor.",
        ],
      },
      {
        heading: "Real Betis 1995/97 home",
        paragraphs: [
          "Green and white stripes and the KELIA sponsor. Betis had Alfonso and Finidi George in attack, and in 1997 they reached the Copa del Rey final, losing 3-2 to Barcelona after extra time at the Bernabéu.",
        ],
      },
      {
        heading: "Club América 1994 away",
        paragraphs: [
          "Royal blue with a jagged flame pattern in black, red and yellow, plus the Coca-Cola sponsor. It came out the year the World Cup went to the USA, and it's still one of the most wanted Mexican shirts of the decade.",
        ],
      },
    ],
    faqs: [
      { q: "When did Juventus last win the Champions League?", a: "1996, beating Ajax on penalties in Rome." },
      { q: "Who sponsored Bayern Munich in the late 90s?", a: "Opel. The kit was made by adidas." },
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
      "Do GAA jerseys run small? What player fit means, chest measurements for S to 2XL, and when to size up for a GAA jersey or training vest.",
    category: "GAA",
    datePublished: "2026-09-23",
    dateModified: "2026-10-22",
    heroImage: "/images/gaa-gear/900000006-1.webp",
    heroAlt: "Dublin GAA home jersey in sky blue with navy pinstripes",
    heroFit: "contain",
    intro:
      "Buying a county jersey online, the size is the thing people get wrong. GAA jerseys fit tighter than a football shirt, and plenty of us have ordered our usual size and ended up with something closer to a base layer. A couple of minutes with a tape measure fixes that.",
    sections: [
      {
        heading: "What player fit means",
        paragraphs: [
          "County jerseys and training vests are cut as a player fit. They sit close to the body, the way the players wear them in Croke Park.",
          "If you want to wear it to a match over a t-shirt, or you like a bit of room through the chest and stomach, go up a size.",
        ],
      },
      {
        heading: "Chest sizes",
        paragraphs: [
          "Measured flat across the chest, just under the arms. Double it for the full chest. Jerseys vary a little from county to county.",
        ],
        bullets: [
          "Small: 52 cm flat (104 cm, 41 in all round)",
          "Medium: 54 cm flat (108 cm, 42.5 in all round)",
          "Large: 56 cm flat (112 cm, 44 in all round)",
          "XL: 58 cm flat (116 cm, 45.5 in all round)",
          "2XL: 60 cm flat (120 cm, 47 in all round)",
        ],
      },
      {
        heading: "How to check your size",
        paragraphs: [
          "Take a jersey or t-shirt that fits you the way you like, and lay it flat. Measure straight across the chest, just under the arms.",
          "Compare that with the sizes above, or the full chart on our size guide page, which also gives length, waist and shoulder.",
        ],
      },
      {
        heading: "Vests and AFL jerseys",
        paragraphs: [
          "Training vests use the same player fit as the jerseys.",
          "AFL jerseys work differently. They're sleeveless and a regular fit, so most people take their usual size.",
        ],
      },
      {
        heading: "Still not sure?",
        paragraphs: [
          "Email noel@eriusports.com with your chest measurement, or your height and weight, and the jersey you want. We'll tell you which size to go for, and if it's still wrong when it arrives, we'll swap it.",
        ],
      },
    ],
    faqs: [
      { q: "Do GAA jerseys run small?", a: "They're a player fit, so they sit close to the body. Go up one size for a looser fit." },
      { q: "Is a GAA training vest the same size as a jersey?", a: "Yes. Vests use the same player fit." },
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
      "Cork City reached their first FAI Cup final in 1989 and took Derry City to a replay. The story of the white, green and red Guinness jersey.",
    category: "Irish Classics",
    datePublished: "2026-04-15",
    dateModified: "2026-09-24",
    heroImage: "/images/blog/cork-fai-cup-finalists-1989.webp",
    heroAlt: "Cork City, 1989 FAI Cup finalists",
    heroFit: "cover",
    intro:
      "Cork City were only five years old in 1989. The club had been founded in 1984, gone straight into the League of Ireland, and spent most of those years finding its feet. Then came a cup run nobody on Leeside expected, and a jersey that still turns heads.",
    sections: [
      {
        heading: "The 1988/89 season",
        paragraphs: [
          "City finished eighth in the league, but the FAI Cup was a different story. They reached the final against Derry City, who were chasing a treble.",
          "The first game finished 0-0. In the replay, Felix Healy scored the only goal, and Derry had their league, cup and League Cup treble. Cork went home with a place in the following season's Cup Winners' Cup, and the start of something.",
        ],
      },
      {
        heading: "The squad",
        paragraphs: [
          "The side included Phil Harrington in goal, Brian Carey, Liam Murphy, Patsy Freyne, John Caulfield and Dave Barry.",
          "Barry had played in Cork City's first ever league game in 1984. In 1991 he scored against Bayern Munich at Musgrave Park in the UEFA Cup, a 1-1 draw people in Cork still bring up.",
        ],
      },
      {
        heading: "What came next",
        paragraphs: [
          "Four years after that final, Cork City won the league in 1993. Their first FAI Cup followed in 1998. The 1989 side got there first, though, and anyone who followed City then will tell you about that run before either of those.",
        ],
      },
      {
        heading: "The jersey",
        paragraphs: [
          "White, with a band of green and red chevrons across the chest, a green collar and Guinness across the front. It's a simple design, and it sums up the League of Ireland in the late 80s better than most.",
        ],
      },
    ],
    faqs: [
      { q: "When was Cork City founded?", a: "1984. They joined the League of Ireland that season." },
      { q: "Who won the 1989 FAI Cup final?", a: "Derry City, 1-0 in a replay against Cork City, with Felix Healy scoring. The first game ended 0-0." },
    ],
    products: ["cork-city-1988-89-retro-jersey", "ireland-euro-88-home-jersey", "ireland-1990-italia-90-world"],
    cta: { label: "Shop retro Irish shirts", href: "/collections/ireland-classics" },
  },
  {
    slug: "ireland-1990-italia-90",
    title: "Ireland at Italia 90: The Green Jersey That Stopped a Nation",
    seoTitle: "Ireland Italia 90 Jersey: The Story of the Green Shirt",
    description:
      "Sheedy's equaliser against England, Bonner's save and O'Leary's penalty against Romania, a meeting with the Pope and a quarter-final in Rome. The story of Ireland's Italia 90 jersey.",
    category: "Irish Classics",
    datePublished: "2026-04-14",
    dateModified: "2026-09-24",
    heroImage: "/images/blog/ireland-england-italia-90-goal.webp",
    heroAlt: "Ireland against England at Italia 90",
    heroFit: "cover",
    intro:
      "Ask anyone in Ireland over forty where they watched the Romania penalties and they'll tell you. In the summer of 1990, Jack Charlton's side reached a World Cup quarter-final at the country's first attempt, and the green jersey from that tournament has meant something ever since.",
    sections: [
      {
        heading: "The group",
        paragraphs: [
          "Ireland opened against England in Cagliari on 11 June 1990. Gary Lineker put England ahead, and Kevin Sheedy equalised in the 73rd minute to make it 1-1. Pubs from Donegal to Kerry lost the run of themselves.",
          "Draws with Egypt and the Netherlands followed, both scrappy, and Ireland went through without winning a game. Nobody at home cared.",
        ],
      },
      {
        heading: "Romania, Genoa",
        paragraphs: [
          "The last-16 game against Romania finished 0-0 after extra time. In the shoot-out, Packie Bonner saved from Daniel Timofte.",
          "David O'Leary, who'd barely featured under Charlton, walked up to take the last penalty. He scored, and George Hamilton's 'The nation holds its breath' is still one of the best-known lines in Irish commentary.",
        ],
      },
      {
        heading: "Rome",
        paragraphs: [
          "Before the quarter-final, the squad met Pope John Paul II in Rome. Italy were next, in front of their own crowd, and Salvatore Schillaci scored the only goal.",
          "The team flew home to a welcome that filled the streets from the airport into the city centre. 'Put 'Em Under Pressure' was number one in the charts, and half the country could sing it.",
        ],
      },
      {
        heading: "The jersey",
        paragraphs: [
          "Deep green with a tonal pattern, three white stripes on the sleeves and a white and orange V-neck, with the FAI crest on the chest. FIFA doesn't allow sponsors on World Cup match shirts, so the version with Opel across the front is the one fans bought and wore.",
          "The squad that wore it included Paul McGrath, Ray Houghton, John Aldridge, Niall Quinn and Packie Bonner. We have the home and the white away.",
        ],
      },
    ],
    faqs: [
      { q: "Who scored Ireland's goal against England at Italia 90?", a: "Kevin Sheedy, in the 73rd minute. It finished 1-1." },
      { q: "Who scored the winning penalty against Romania?", a: "David O'Leary, after Packie Bonner saved from Daniel Timofte." },
      { q: "Who knocked Ireland out of Italia 90?", a: "Italy, 1-0 in the quarter-final in Rome, with Salvatore Schillaci scoring." },
    ],
    products: [
      "ireland-1990-italia-90-world",
      "ireland-1990-world-cup-away",
      "ireland-euro-88-home-jersey",
      "ireland-1994-world-cup-home",
    ],
    cta: { label: "Shop retro Irish shirts", href: "/collections/ireland-classics" },
  },
  {
    slug: "liverpool-95-96-carlsberg",
    title: "Liverpool 1995/96: The Green and White Quartered Away Shirt",
    seoTitle: "Liverpool 1995/96 Away Shirt: Green & White Quarters",
    description:
      "Liverpool's 1995/96 away shirt: green and white quarters with Carlsberg across the chest. Fowler, McManaman, the 4-3 against Newcastle and the cream suits at Wembley, told in one shirt.",
    category: "Premier League Classics",
    datePublished: "2026-04-13",
    dateModified: "2026-09-24",
    heroImage: "/images/blog/liverpool-95-96-carlsberg-away-kit.webp",
    heroAlt: "Liverpool 1995-96 green and white quartered away shirt",
    heroFit: "cover",
    intro:
      "Mid-90s Liverpool were the most entertaining side in the country, with only the 1995 League Cup to show for it. The away shirt from 1995/96 sums them up: bold, a bit mad, and better looking than the grey kit Manchester United ditched at half-time at Southampton that April.",
    sections: [
      {
        heading: "The shirt",
        paragraphs: [
          "Green and white quarters, black stripes over the shoulders and a buttoned grandad collar, with Carlsberg in a white panel across the middle. Adidas made it.",
          "Plenty of mid-90s kits went wrong. This one took a risk and got it right.",
        ],
      },
      {
        heading: "The season",
        paragraphs: [
          "Roy Evans' side finished third. Robbie Fowler scored freely, Steve McManaman ran games from wide and Stan Collymore arrived from Nottingham Forest for a British record fee.",
          "In April 1996 they beat Newcastle 4-3 at Anfield, with Collymore scoring the winner in stoppage time. Kevin Keegan slumped over the advertising boards, and people still call it the best game the Premier League has had.",
        ],
      },
      {
        heading: "Wembley and the suits",
        paragraphs: [
          "They reached the FA Cup final against Manchester United and walked out at Wembley in cream Armani suits, picked by David James. Eric Cantona scored late and United won 1-0.",
          "The suits stuck. Liverpool's away shirt the following season was cream, and we stock that one too.",
        ],
      },
    ],
    faqs: [
      { q: "Who made Liverpool's kit in 1995/96?", a: "Adidas, with Carlsberg as the sponsor." },
      { q: "Who won the 1996 FA Cup final?", a: "Manchester United, 1-0 against Liverpool, with Eric Cantona scoring." },
    ],
    products: [
      "liverpool-away-1995-96-carlsberg",
      "liverpool-1995-96-home-shirt",
      "liverpool-96-97-away-shirt",
      "liverpool-1996-97-third-shirt",
    ],
    cta: { label: "Shop Premier League classics", href: "/collections/premier-league-classics" },
  },
  {
    slug: "fiorentina-batistuta-rui-costa-shirts",
    title: "Fiorentina's Purple Shirts: Batistuta, Rui Costa and the Late 90s",
    seoTitle: "Retro Fiorentina Shirts: Batistuta & Rui Costa Jerseys",
    description:
      "Batistuta stayed when Fiorentina went down, Rui Costa arrived from Benfica, and for a few seasons Florence had a side to fear. The story behind the Nintendo and Toyota shirts.",
    category: "European & World Classics",
    datePublished: "2026-10-22",
    heroImage: "/images/european-world-classics/fiorentina-1998-99-home-shirt-1.webp",
    heroAlt: "Fiorentina 1998-99 purple home shirt with the Nintendo sponsor",
    heroFit: "contain",
    intro:
      "Fiorentina fans put up a bronze statue of Gabriel Batistuta in 1996, while he was still playing for them. That tells you most of what you need to know about Florence in the 90s, and about the purple shirt he wore.",
    sections: [
      {
        heading: "Batigol stays",
        paragraphs: [
          "Fiorentina signed Batistuta from Boca Juniors in 1991, after a club vice-president watched him at that summer's Copa América. Two years later Fiorentina went down to Serie B.",
          "He stayed. He scored 16 league goals, and Fiorentina won Serie B at the first attempt. In 1994-95 he was Serie A's top scorer with 26, and in 1996 he scored in both legs of the Coppa Italia final against Atalanta.",
        ],
      },
      {
        heading: "Rui Costa and the 10",
        paragraphs: [
          "Rui Costa came from Benfica in 1994 and played behind Batistuta for seven seasons, wearing 10. He won the Coppa Italia twice with the club, in 1996 and 2001, and left for AC Milan in 2001.",
        ],
      },
      {
        heading: "1998-99: top at Christmas",
        paragraphs: [
          "Under Giovanni Trapattoni, Fiorentina led Serie A for much of the first half of 1998-99 and were top at the winter break. The challenge faded. They finished third and lost the Coppa Italia final to Parma on away goals.",
          "That season's home shirt is the one with Nintendo across the chest, a button collar and white blocks across the shoulders.",
        ],
      },
      {
        heading: "1999-2000: Wembley",
        paragraphs: [
          "Third place meant the Champions League. On 27 October 1999 Fiorentina played Arsenal at Wembley, and Batistuta scored the only goal from a tight angle with 15 minutes left. In the second group stage they beat Manchester United 2-0 in Florence, with goals from Batistuta and Abel Balbo.",
          "A 3-3 draw at home to Bordeaux in the last game meant they still went out. Batistuta joined Roma that summer and won the league there in 2001. The shirt from his last Fiorentina season has Toyota across the front.",
        ],
        image: {
          src: "/images/blog/batistuta-fiorentina-9-shirt.webp",
          alt: "Gabriel Batistuta holding up a purple and white Fiorentina shirt printed BATISTUTA 9",
          caption: "Gabriel Batistuta holds up one of his old Fiorentina shirts, printed BATISTUTA 9.",
          credit: {
            author: "Roberto Vicario",
            license: "CC BY-SA 3.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:Omar_Batistuta.jpg",
          },
        },
      },
      {
        heading: "Which shirt?",
        paragraphs: [
          "We stock the 1998-99 Nintendo home and the 1999-2000 Toyota home, plain for €25 or printed BATISTUTA 9 or RUI COSTA 10 for €35. Both wore those numbers in those seasons.",
          "There's also the 1992-93 home with 7UP, and two Sammontana shirts from the mid-90s. Sizes run S to 2XL.",
        ],
      },
    ],
    faqs: [
      { q: "Did Batistuta play for Fiorentina in Serie B?", a: "Yes. He stayed after relegation in 1993, scored 16 league goals in 1993-94, and Fiorentina won Serie B." },
      { q: "Who scored when Fiorentina beat Arsenal at Wembley?", a: "Gabriel Batistuta, on 27 October 1999. Fiorentina won 1-0 in the Champions League group stage." },
      { q: "What number did Rui Costa wear at Fiorentina?", a: "10, behind Batistuta's 9." },
    ],
    products: [
      "fiorentina-1998-99-home-shirt",
      "fiorentina-1999-00-home-shirt-batistuta-9",
      "fiorentina-1998-99-home-shirt-rui-costa-10",
      "fiorentina-1999-00-home-shirt",
    ],
    cta: { label: "Shop retro Fiorentina shirts", href: "/clubs/fiorentina" },
  },
  {
    slug: "manchester-united-1993-95-black-away-shirt",
    title: "Manchester United's Black Away Shirt, 1993-95",
    seoTitle: "Man United 1993-95 Black Away Shirt: Cantona & Keane",
    description:
      "Roy Keane's first season, a Double, and Cantona at his best. The story of United's all-black away shirt from 1993-95, with Sharp Viewcam across the chest in gold.",
    category: "Premier League Classics",
    datePublished: "2026-10-22",
    heroImage: "/images/premier-league-classics/671313157-1.webp",
    heroAlt: "Manchester United 1993-95 black away shirt with gold Sharp Viewcam lettering",
    heroFit: "contain",
    intro:
      "In the summer of 1993 United had just won their first league title in 26 years. They signed a 21-year-old from Cork, and they brought out a black away shirt. Both worked out.",
    sections: [
      {
        heading: "The shirt",
        paragraphs: [
          "All black, with gold trim on the collar and sleeves, blue patterned cuffs and SHARP VIEWCAM across the chest in gold. The crest sits in a shield-shaped patch.",
          "Black wasn't a usual colour for an English club then, and this one stood out. It stayed as the away shirt for two seasons, 1993-94 and 1994-95.",
        ],
      },
      {
        heading: "Keane arrives",
        paragraphs: [
          "Roy Keane signed from Nottingham Forest on 19 July 1993 for £3.75 million, a British record at the time. Denis Irwin was already at left-back, so the side had two Cork men in it.",
        ],
      },
      {
        heading: "The Double",
        paragraphs: [
          "United won the league by eight points from Blackburn, with 92 points. Eric Cantona scored 25 goals in all competitions and was named PFA Player of the Year.",
          "In the FA Cup final at Wembley on 14 May 1994, Cantona scored two penalties in a 4-0 win over Chelsea, and Mark Hughes and Brian McClair got the others. It was the club's first Double.",
        ],
      },
      {
        heading: "Plain or Cantona 7",
        paragraphs: [
          "We stock the shirt plain for €25, or printed CANTONA 7, his number at United, for €35. Sizes run S to 2XL. If you want the Treble shirt from five years later, that's on the site too.",
        ],
      },
    ],
    faqs: [
      { q: "Who sponsored United's black away shirt?", a: "Sharp. The shirt carries SHARP VIEWCAM in gold across the chest." },
      { q: "When did Roy Keane join Manchester United?", a: "On 19 July 1993, from Nottingham Forest, for £3.75 million." },
      { q: "Who did United beat in the 1994 FA Cup final?", a: "Chelsea, 4-0 at Wembley. Cantona scored two penalties." },
    ],
    products: [
      "manchester-united-away-1993-95",
      "manchester-united-1993-95-away-shirt-cantona-7",
      "manchester-united-98-99-treble-season",
    ],
    cta: { label: "Shop retro Man United shirts", href: "/clubs/manchester-united" },
  },
  {
    slug: "arsenal-bruised-banana-shirt-1991-93",
    title: "Arsenal's Bruised Banana Shirt, 1991-93",
    seoTitle: "Arsenal Bruised Banana Shirt 1991-93: The Story",
    description:
      "Yellow with black zigzags, JVC in red, and a nickname that stuck. How Arsenal's 1991-93 away shirt went from a joke to a shirt fans hunt for.",
    category: "Premier League Classics",
    datePublished: "2026-10-22",
    heroImage: "/images/premier-league-classics/670532150-1.webp",
    heroAlt: "Arsenal 1991-93 yellow and black zigzag away shirt with the JVC sponsor",
    heroFit: "contain",
    intro:
      "Arsenal fans called it the bruised banana almost as soon as they saw it. More than thirty years on, people still search for it by its nickname, and the club has brought the pattern back.",
    sections: [
      {
        heading: "The shirt",
        paragraphs: [
          "Yellow, covered in bands of black zigzags, with red trim on the V-neck and sleeves, the old cannon crest and JVC in red across the chest. Arsenal wore it as their away shirt from 1991 to 1993.",
          "The nickname explains itself. Yellow with dark marks all over it, like fruit left too long in the bowl.",
        ],
      },
      {
        heading: "Ian Wright",
        paragraphs: [
          "Ian Wright joined from Crystal Palace in September 1991 for £2.5 million, a club record, and scored a hat-trick on his league debut at Southampton.",
          "He finished 1991-92 with 29 league goals, 24 of them for Arsenal, and won the First Division Golden Boot.",
        ],
      },
      {
        heading: "1992-93: two cups",
        paragraphs: [
          "In the first Premier League season Arsenal finished tenth, but they won both domestic cups. They beat Sheffield Wednesday in the League Cup final, then beat them again in the FA Cup final after a replay. Wright scored in the final and in the replay.",
        ],
      },
      {
        heading: "From joke to classic",
        paragraphs: [
          "For years it was the shirt people laughed about. Then fans started wearing it again, and in 2019 Arsenal brought the pattern back on a new away shirt. That tells you how much opinion had changed.",
        ],
      },
      {
        heading: "Sizes",
        paragraphs: [
          "The adult shirt is €25, in sizes S to 2XL. There's a kids kit too, shirt and shorts for €30, and the red and white 1992-94 home from the cup double season.",
        ],
      },
    ],
    faqs: [
      { q: "Why is it called the bruised banana?", a: "It's yellow with dark zigzag marks all over, like a bruised banana. Fans gave it the name when it came out." },
      { q: "When did Arsenal wear the bruised banana?", a: "It was their away shirt from 1991 to 1993." },
      { q: "Did Arsenal bring the bruised banana back?", a: "Yes. The 2019-20 away shirt brought back the zigzag pattern." },
    ],
    products: ["arsenal-1991-93-bruised-banana", "arsenal-1991-93-bruised-banana-away-kids-kit", "arsenal-1992-94-home-jersey"],
    cta: { label: "Shop retro Arsenal shirts", href: "/clubs/arsenal" },
  },
  {
    slug: "ireland-jerseys-1990-1994-2002",
    title: "Ireland's World Cup Jerseys: 1990, 1994 and 2002 Compared",
    seoTitle: "Retro Ireland Jerseys: Italia 90 vs USA 94 vs 2002",
    description:
      "Three World Cups, three green jerseys. What each one looks like, what happened in it, and how to choose between Italia 90, USA 94 and Japan and Korea 2002.",
    category: "Irish Classics",
    datePublished: "2026-10-22",
    heroImage: "/images/ireland-classics/692734038-1.webp",
    heroAlt: "Ireland USA 94 World Cup home jersey in emerald green with a black geometric pattern",
    heroFit: "contain",
    intro:
      "Ireland have been to three World Cups, and each one has its own green jersey. If you can only have one, here's how they compare.",
    sections: [
      {
        heading: "Where it started: Euro 88",
        paragraphs: [
          "Before the World Cups came Euro 88, Jack Charlton's first tournament. Ray Houghton's header beat England in Stuttgart, and the Netherlands only got past Ireland with Wim Kieft's header eight minutes from the end.",
        ],
        image: {
          src: "/images/blog/ireland-netherlands-euro-88-kieft-goal.webp",
          alt: "Black and white photo of Wim Kieft's goal for the Netherlands against Ireland at Euro 88, with a packed stand behind the goal",
          caption: "Wim Kieft's header goes in for the Netherlands against Ireland in Gelsenkirchen, 18 June 1988. Ireland are in the darker shirts.",
          credit: {
            author: "Rob Bogaerts / Anefo, Nationaal Archief",
            license: "CC0 1.0",
            licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
            sourceUrl:
              "https://commons.wikimedia.org/wiki/File:EK_voetbal_in_West_Duitsland_Nederland_tegen_Ierland_1_Kieft_scoort_(van_overk,_Bestanddeelnr_934-2696.jpg",
          },
        },
      },
      {
        heading: "Italia 90",
        paragraphs: [
          "Deep green with a tonal chevron pattern, white stripes on the shoulders and a white V-neck with orange trim, with Opel across the front.",
          "Ireland drew all three group games, beat Romania on penalties in Genoa after Packie Bonner's save and David O'Leary's kick, and went out 1-0 to Italy in the quarter-final in Rome. Pick this one if you want the jersey from the summer everyone remembers.",
        ],
      },
      {
        heading: "USA 94",
        paragraphs: [
          "Two jerseys cover this one. The 1992-94 home, with the big white bars over one shoulder, took Ireland through qualifying, which came down to Alan McLoughlin's equaliser at Windsor Park. The USA 94 home is emerald green with a bold black geometric pattern and tricolour trim on the collar.",
          "At Giants Stadium, Houghton chipped Gianluca Pagliuca and Ireland beat Italy 1-0, their first win at a World Cup finals. The Netherlands knocked them out in Orlando. Pick this one if you want the boldest design of the three.",
        ],
      },
      {
        heading: "Japan and Korea 2002",
        paragraphs: [
          "Bright green with white contrast stitching down the seams, a green and white ribbed collar and eircom across the chest.",
          "Mick McCarthy's side drew 1-1 with Cameroon, Matt Holland scoring. Against Germany in Ibaraki, Robbie Keane equalised in the second minute of stoppage time. Keane, Gary Breen and Damien Duff scored in a 3-0 win over Saudi Arabia.",
          "In the last 16 in Suwon, Ian Harte missed a penalty and Keane scored one in the 90th minute to make it 1-1. Spain won the shoot-out 3-2. Pick this one if you grew up with Keane and Duff.",
        ],
      },
      {
        heading: "Side by side",
        paragraphs: ["All four are €25, in sizes S to 2XL."],
        bullets: [
          "Italia 90 home: deep green, white V-neck, Opel.",
          "1992-94 home: white shoulder bars, Opel, the road to America.",
          "USA 94 home: emerald green with a black geometric pattern.",
          "2002 home: bright green with white stitching, eircom.",
        ],
      },
    ],
    faqs: [
      { q: "How many World Cups have Ireland played in?", a: "Three: Italia 90, USA 94 and Japan and Korea 2002." },
      { q: "Who scored Ireland's late equaliser against Germany in 2002?", a: "Robbie Keane, in the second minute of stoppage time in Ibaraki. It finished 1-1." },
      { q: "Which Ireland jersey has the eircom sponsor?", a: "The 2002 World Cup era home jersey. The Italia 90 and 1992-94 jerseys carry Opel." },
    ],
    products: [
      "ireland-1990-italia-90-world",
      "ireland-1994-world-cup-home",
      "ireland-2002-world-cup-home-jersey",
      "ireland-1992-94-home-retro-jersey",
    ],
    cta: { label: "Shop retro Ireland jerseys", href: "/collections/ireland-classics" },
  },
  {
    slug: "lazio-1998-2000-shirts-nedved-salas-nesta",
    title: "Lazio 1998-2000: Cirio, Eriksson and a Centenary Title",
    seoTitle: "Retro Lazio Shirts 1998-2000: Nedved, Salas & Nesta",
    description:
      "A Cup Winners' Cup at Villa Park, a Super Cup win over the Treble winners, and the title on the last day of the club's 100th season. The story behind Lazio's sky blue Cirio shirts.",
    category: "European & World Classics",
    datePublished: "2026-10-22",
    heroImage: "/images/european-world-classics/lazio-1998-2000-home-shirt-1.webp",
    heroAlt: "Lazio 1998-2000 sky blue home shirt with a black chest band and the Cirio sponsor",
    heroFit: "contain",
    intro:
      "Lazio were founded in 1900, and in their 100th season they won Serie A on the last afternoon. The shirts from those two years, sky blue with Cirio across the chest, carry one of the best spells in the club's history.",
    sections: [
      {
        heading: "Villa Park, May 1999",
        paragraphs: [
          "Sven-Göran Eriksson's side reached the last ever Cup Winners' Cup final, against Mallorca at Villa Park on 19 May 1999. Christian Vieri scored early, Mallorca equalised four minutes later, and Pavel Nedvěd won it nine minutes from time.",
          "It was Lazio's first European trophy.",
        ],
      },
      {
        heading: "Monaco, August 1999",
        paragraphs: [
          "Manchester United had just won the Treble. Three months later Lazio beat them 1-0 in the Super Cup in Monaco, and Marcelo Salas scored the goal.",
        ],
      },
      {
        heading: "The last afternoon",
        paragraphs: [
          "In March 2000 Juventus led Lazio by nine points with eight games left. On the last day, 14 May 2000, Lazio beat Reggina 3-0 at the Olimpico, while Juventus lost 1-0 at Perugia on an almost flooded pitch.",
          "Lazio finished a point clear, and added the Coppa Italia for a double in the club's centenary season.",
        ],
      },
      {
        heading: "The shirts",
        paragraphs: [
          "The home is sky blue with a black band across the chest, edged in white, a black and white collar and Cirio in black, with the club eagle on the band. The away is black with sky blue panels.",
          "Alessandro Nesta was at the back, Nedvěd in midfield, Roberto Mancini in the 10 and Salas up front. We stock the home plain for €25, or printed NESTA 13, NEDVED 18, MANCINI 10 or SALAS 9 for €35. Sizes run S to 2XL.",
        ],
      },
    ],
    faqs: [
      { q: "Who scored in the 1999 Cup Winners' Cup final?", a: "Christian Vieri and Pavel Nedvěd for Lazio, and Dani for Mallorca. Lazio won 2-1 at Villa Park." },
      { q: "When did Lazio win Serie A in 2000?", a: "On the last day, 14 May 2000. Lazio beat Reggina 3-0 and Juventus lost 1-0 at Perugia." },
      { q: "Who scored when Lazio beat Manchester United in the 1999 Super Cup?", a: "Marcelo Salas, in a 1-0 win in Monaco on 27 August 1999." },
    ],
    products: [
      "lazio-1998-2000-home-shirt",
      "lazio-1998-2000-home-shirt-nedved-18",
      "lazio-1998-2000-home-shirt-salas-9",
      "lazio-1998-2000-home-shirt-nesta-13",
    ],
    cta: { label: "Shop retro Lazio shirts", href: "/clubs/lazio" },
  },
  {
    slug: "liverpool-istanbul-2005-shirt",
    title: "Liverpool in Istanbul, 2005: The Shirt From the Comeback",
    seoTitle: "Liverpool 2005 Istanbul Shirt: The Champions League Final",
    description:
      "Three down at half-time against Milan, level within six minutes, and Dudek in the shoot-out. The story of Liverpool's 2005 Champions League final shirt, and the Limerick man who started that night.",
    category: "Premier League Classics",
    datePublished: "2026-10-22",
    heroImage: "/images/premier-league-classics/669914307-1.webp",
    heroAlt: "Liverpool 2005 Champions League final home shirt with the Carlsberg sponsor",
    heroFit: "contain",
    intro:
      "At half-time in Istanbul on 25 May 2005, Liverpool were 3-0 down to AC Milan. By the end of the night they were champions of Europe, and fans still want the red shirt they wore.",
    sections: [
      {
        heading: "First half",
        paragraphs: [
          "Paolo Maldini scored in the first minute. Hernán Crespo added two before the break, and it looked over.",
          "Steve Finnan, from Limerick, started at right-back, but a thigh injury forced him off at half-time and Dietmar Hamann came on.",
        ],
      },
      {
        heading: "Six minutes",
        paragraphs: [
          "Steven Gerrard headed in on 54 minutes. Two minutes later Vladimír Šmicer scored from distance. On the hour Xabi Alonso's penalty was saved, and he put the rebound in. 3-3.",
        ],
      },
      {
        heading: "Dudek",
        paragraphs: [
          "In the 117th minute Jerzy Dudek saved twice from Andriy Shevchenko at close range. In the shoot-out Serginho shot over, Dudek saved from Andrea Pirlo, and then from Shevchenko to win it.",
          "Rafa Benítez had won the Champions League in his first season at the club.",
        ],
        image: {
          src: "/images/blog/liverpool-champions-league-parade-2005.webp",
          alt: "Liverpool players on an open-top bus with a Champions of Europe banner, surrounded by fans in the city centre",
          caption: "The Liverpool team on their open-top bus in the city centre the day after the final, 26 May 2005.",
          credit: {
            author: "Jprw",
            license: "CC BY-SA 3.0",
            licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
            sourceUrl: "https://commons.wikimedia.org/wiki/File:CL_parade_Lpool.jpg",
          },
        },
      },
      {
        heading: "The shirt",
        paragraphs: [
          "Red with white side panels, Carlsberg across the chest and gold 'Istanbul 2005' final embroidery. We have it plain for €25 or printed GERRARD 8 for €35, in sizes S to 2XL.",
          "From the same season there's the yellow away, and there's the 2005-06 home, Liverpool's first shirt as European champions.",
        ],
      },
    ],
    faqs: [
      { q: "What was the score at half-time in Istanbul?", a: "AC Milan 3-0 Liverpool. It finished 3-3 and Liverpool won 3-2 on penalties." },
      { q: "Who scored Liverpool's goals in the 2005 final?", a: "Steven Gerrard, Vladimír Šmicer and Xabi Alonso, all within six minutes of the second half." },
      { q: "Which Irish player started the 2005 Champions League final?", a: "Steve Finnan, from Limerick, at right-back. He went off injured at half-time." },
    ],
    products: [
      "liverpool-2005-istanbul-champions",
      "liverpool-2005-istanbul-champions-league-final-shirt-gerrard-8",
      "liverpool-2004-05-away-shirt",
      "liverpool-2005-06-home-shirt",
    ],
    cta: { label: "Shop retro Liverpool shirts", href: "/clubs/liverpool" },
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
