import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS } from "@/lib/collections";
import { getProductsByCollectionSlug } from "@/lib/products";
import { getPosts } from "@/lib/blog";

/** Shop-by-collection grid: one tile per collection, with a real product photo, plus the stories. */
export default function FeatureBento() {
  const tiles = COLLECTIONS.map((c) => {
    const items = getProductsByCollectionSlug(c.slug);
    const featured = items.find((p) => p.slug === c.featured) ?? items[0];
    return {
      href: `/collections/${c.slug}`,
      title: c.h1,
      alt: `${c.h1}, shop the collection`,
      sub: `${items.length} styles · from €${c.priceFrom.toFixed(c.priceFrom % 1 ? 2 : 0)}`,
      image: featured?.images[0],
    };
  });
  // An eighth tile keeps the grid even (4 across on desktop, 2 on phones).
  tiles.push({
    href: "/blog",
    title: "Shirt Stories",
    alt: "Liverpool's Champions League parade in 2005, read our shirt stories",
    sub: `${getPosts().length} stories behind the shirts`,
    image: "/images/blog/liverpool-champions-league-parade-2005.webp",
  });

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="shop-by-collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-1">Shop by collection</p>
        <h2 id="shop-by-collection" className="text-3xl sm:text-4xl font-bold uppercase text-[#0F2131] mb-8">
          Find your shirt
        </h2>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {tiles.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="group relative block aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] overflow-hidden bg-[#0F2131]"
              >
                {t.image && (
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2131] via-[#0F2131]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight">{t.title}</h3>
                  <p className="mt-1 text-xs md:text-sm text-white/75">
                    {t.sub}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
