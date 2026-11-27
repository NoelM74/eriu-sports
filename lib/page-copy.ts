/**
 * Longer "about" copy shown under the grid on collection, club and player pages.
 * Facts here come from our fact-checked blog posts; link to the post they came from.
 * Short paragraphs, fan voice, same writing rules as everything else (CLAUDE.md section 2).
 */
export interface AboutCopy {
  heading: string;
  paragraphs: string[];
  links?: { href: string; label: string }[];
}

export const COLLECTION_ABOUT: Record<string, AboutCopy> = {
  'ireland-classics': {
    heading: 'Retro Ireland jerseys, from Stuttgart to New Jersey',
    paragraphs: [
      "Euro 88 was Ireland's first major tournament. In the opening game in Stuttgart, Ray Houghton looped a header over Peter Shilton and Ireland beat England 1-0.",
      "Two years later came Italia 90, the first World Cup. Packie Bonner saved from Daniel Timofte, David O'Leary scored the last penalty against Romania, and Italy ended the run 1-0 in the quarter-final in Rome.",
      "The 1992-94 jerseys took Ireland through qualifying for USA 94, which came down to Alan McLoughlin's equaliser at Windsor Park. At Giants Stadium, Houghton chipped Pagliuca and Ireland beat Italy 1-0, their first win at a World Cup finals.",
      "There are League of Ireland jerseys here too. Cork City's 1988-89 Guinness jersey is from their first FAI Cup final, and Bohemians' Fontaines D.C. jersey is in the colours of the band's album Romance. Every one is a fan replica, from €25.",
    ],
    links: [
      { href: '/blog/ireland-euro-88-shirt', label: 'Ireland at Euro 88' },
      { href: '/blog/ireland-1990-italia-90', label: 'Ireland at Italia 90' },
      { href: '/blog/ireland-usa-94-world-cup-shirts', label: 'Ireland 1992-94 and USA 94' },
      { href: '/blog/cork-city-1988-89', label: 'Cork City 1988/89' },
      { href: '/blog/bohemians-music-shirts-fontaines-dc-oasis-kneecap', label: "Bohemians' music shirts" },
    ],
  },
  'afl-jerseys': {
    heading: 'AFL jerseys with an Irish link',
    paragraphs: [
      'Irish footballers have been crossing to Australian rules for decades. Jim Stynes, from Dublin, won the Brownlow Medal with Melbourne in 1991. Kerry man Tadhg Kennelly won a premiership with the Sydney Swans in 2005.',
      "More recently, Laois man Zach Tuohy won the 2022 premiership with Geelong, so our Geelong Cats jersey has an Irish story of its own.",
      'We also stock home and away jerseys from Brisbane, Carlton, Collingwood, Gold Coast, GWS Giants, Richmond, St Kilda and Sydney, and Indigenous designs from Adelaide, Brisbane, Carlton, Collingwood, Essendon, Fremantle, Gold Coast, GWS Giants, Hawthorn, Melbourne, North Melbourne, Port Adelaide, St Kilda and the Western Bulldogs, and women\'s AFLW home, Indigenous and Pride jerseys, including Sydney, St Kilda and Port Adelaide, with their own size chart. All are sleeveless, €25 each.',
    ],
  },
};

export const CLUB_ABOUT: Record<string, AboutCopy> = {
  bohemians: {
    heading: "Bohemians, Dublin's Originals",
    paragraphs: [
      'Bohemians were founded in 1890 and play at Dalymount Park in Phibsborough. The club is owned by its members, and lately it has put more bands on its shirts than any club we know of.',
      'It started in 2022 with Bob Marley, who played Dalymount in July 1980. Since then there has been a Fontaines D.C. third jersey in the colours of their album Romance, and an Oasis cup jersey for the band\'s Croke Park gigs in 2025.',
      'Kneecap, the Belfast trio who rap in Irish, designed the 2026 away with the club. The Oasis, Kneecap and Guinness jerseys have sold out. The Fontaines D.C. jersey is still here, regular fit, in sizes S to 2XL.',
    ],
    links: [{ href: '/blog/bohemians-music-shirts-fontaines-dc-oasis-kneecap', label: "Bohemians' music shirts: the full story" }],
  },
};

export const PLAYER_ABOUT: Record<string, AboutCopy> = {
  ronaldinho: {
    heading: "Ronaldinho's numbers",
    paragraphs: [
      'Ronaldinho wore 21 and then 10 at PSG, 10 at Barcelona and 80 at AC Milan. Every name and number we stock for him matches what he wore that season.',
      "Barcelona signed him from PSG in 2003. He was FIFA World Player of the Year in 2004 and 2005 and won the Ballon d'Or in 2005, and Barcelona beat Arsenal 2-1 in the 2006 Champions League final in Paris.",
      'At Milan, Clarence Seedorf already had the 10, so he took 80 for 1980, the year he was born. Printed shirts are €35, in sizes S to 2XL.',
    ],
    links: [{ href: '/blog/ronaldinho-shirts-psg-barcelona-milan', label: "Ronaldinho's shirts: the full story" }],
  },
  'ronaldo-nazario': {
    heading: "Ronaldo's numbers",
    paragraphs: [
      'Ronaldo wore 9 at PSV and for Brazil, 10 and then 9 at Inter, 11 and then 9 at Real Madrid, and 99 at AC Milan. At the 1994 World Cup, aged 17, he was Brazil\'s 20.',
      "He came back from two years of knee injuries to win the 2002 World Cup, scoring eight goals, including both in the 2-0 final against Germany. That December he won his second Ballon d'Or.",
      'Most of our shirts carry the number he wore that season. Where he never wore that shirt, the listing says so. Adult shirts are €35 in sizes S to 2XL, and the Brazil 2002 kids kit is €35 for ages 2 to 13.',
    ],
    links: [{ href: '/blog/ronaldo-r9-career-in-shirts', label: 'Ronaldo R9: a career in shirts' }],
  },
  'thierry-henry': {
    heading: "Thierry Henry's 14",
    paragraphs: [
      "Thierry Henry joined Arsenal from Juventus in August 1999 and wore 14. He scored 228 goals in 377 games, more than anyone in the club's history.",
      "He passed Ian Wright's club record with two goals against Sparta Prague in October 2005. In the last game at Highbury, on 7 May 2006, he scored a hat-trick against Wigan.",
      'Our Henry 14 shirts run from the Invincibles season to Highbury\'s last. The 1998-99 home is from before he signed, so that print is fan-style. Printed shirts are €35, in sizes S to 2XL.',
    ],
  },
  'troy-parrott': {
    heading: "Troy Parrott's numbers",
    paragraphs: [
      'Troy Parrott wears 7 for Ireland and 19 for Real Betis, and our adult shirts and kids kits carry those numbers.',
      'His hat-trick in Budapest on 16 November 2025 beat Hungary 3-2 and sent Ireland into the World Cup play-offs. Betis signed him from AZ Alkmaar in August 2026.',
      'The adult shirts are €30, in sizes S to 2XL. The kids kits are €35 for ages 2 to 13; the Betis away kit comes with socks.',
    ],
  },
};
