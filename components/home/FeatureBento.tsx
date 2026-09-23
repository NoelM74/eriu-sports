import Link from "next/link";
import Image from "next/image";
import { COLLECTIONS } from "@/lib/collections";
import { getProductsByCollectionSlug } from "@/lib/products";

/** Shop-by-collection grid: one tile per collection, with a real product photo. */
export default function FeatureBento() {
  const tiles = COLLECTIONS.map((c) => {
    const items = getProductsByCollectionSlug(c.slug);
    return { ...c, count: items.length, image: items[0]?.images[0] };
  });

  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="shop-by-collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-1">Shop by collection</p>
        <h2 id="shop-by-collection" className="text-3xl sm:text-4xl font-bold uppercase text-[#0F2131] mb-8">
          Find your shirt
        </h2>

        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {tiles.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/collections/${t.slug}`}
                className="group relative block aspect-[4/5] sm:aspect-[4/3] overflow-hidden bg-[#0F2131]"
              >
                {t.image && (
                  <Image
                    src={t.image}
                    alt={`${t.h1}, shop the collection`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2131] via-[#0F2131]/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-white">
                  <h3 className="text-lg md:text-2xl font-bold uppercase tracking-tight leading-tight">{t.h1}</h3>
                  <p className="mt-1 text-xs md:text-sm text-white/75">
                    {t.count} styles · from €{t.priceFrom.toFixed(t.priceFrom % 1 ? 2 : 0)}
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
