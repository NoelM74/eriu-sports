/**
 * Image loader for a static site with no image server.
 * Every photo under /images has a 640px copy under /images/w640 (made by scripts/make-thumbs.mjs before each build),
 * so product grids and gallery thumbnails load a third of the data. Anything wider gets the full photo.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }): string {
  if (width <= 640 && src.startsWith('/images/') && src.endsWith('.webp') && !src.startsWith('/images/w640/')) {
    return `/images/w640${src.slice('/images'.length)}`;
  }
  return src;
}
