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
      "There are League of Ireland jerseys here too. Cork City's 1988-89 Guinness jersey is from their first FAI Cup final, and the Bohemians jerseys carry Fontaines D.C., Oasis and Kneecap. Every one is a fan replica, €25 each.",
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
      'We also stock St Kilda and Carlton, and Indigenous designs from Fremantle, Collingwood and Port Adelaide. All are sleeveless and regular fit, €25 each.',
    ],
  },
};

export const CLUB_ABOUT: Record<string, AboutCopy> = {
  bohemians: {
    heading: "Bohemians, Dublin's Originals",
    paragraphs: [
      'Bohemians were founded in 1890 and play at Dalymount Park in Phibsborough. The club is owned by its members, and lately it has put more bands on its shirts than any club we know of.',
      'It started in 2022 with Bob Marley, who played Dalymount in July 1980. Since then there has been a Fontaines D.C. third jersey in the colours of their album Romance, and an Oasis cup jersey for the band\'s Croke Park gigs in 2025.',
      'Kneecap, the Belfast trio who rap in Irish, designed the 2026 away with the club, and there is a black version too. The 2025 Guinness away looks back to the 80s, with a cream body and thin red pinstripes. All are regular fit, in sizes S to 2XL.',
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
};
