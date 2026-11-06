/** Default share image for pages that set their own openGraph (which replaces the layout's image). */
export const OG_IMAGES = [
  { url: '/og-image.jpg', width: 1200, height: 630, alt: 'Ériu Sports: retro football shirts and GAA jerseys' },
];

const BRAND = ' | Ériu Sports';

/** Search results show about 60 characters of a title: drop the shop name when the page title is long. */
export function pageTitle(title: string): string | { absolute: string } {
  return `${title}${BRAND}`.length > 62 ? { absolute: title } : title;
}

/** Search results show about 160 characters of a description: cut at a word and add an ellipsis. */
export function clipDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[.,;:\s]+$/, '')}…`;
}
