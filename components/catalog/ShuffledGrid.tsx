"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { mixByClub, seededRandom } from "@/lib/shuffle";
import { isClientReady, markClientReady, sessionSeed } from "@/lib/session-order";
import ProductCard from "./ProductCard";

const mix = (products: Product[]) => mixByClub(products, seededRandom(sessionSeed()));

interface Props {
  products: Product[];
  /** Show only this many after shuffling. */
  limit?: number;
  className?: string;
  /** Eager-load the first few images. */
  priorityCount?: number;
  /** Render this many at first, with a button for the next batch. Keeps big grids cheap to render. */
  pageSize?: number;
}

/**
 * Product grid that shows a fresh, club-mixed order on every visit.
 * The server renders the order it was given; the browser reshuffles after loading.
 * The order is seeded once per tab session, so going back to a grid shows the same order
 * (and the browser can return to the same spot).
 */
export default function ShuffledGrid({
  products,
  limit,
  className = "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
  priorityCount = 0,
  pageSize,
}: Props) {
  // After the first page load, in-site navigations render the session order straight away.
  const [order, setOrder] = useState<Product[] | null>(() => (isClientReady() ? mix(products) : null));
  const [visible, setVisible] = useState(pageSize ?? Infinity);

  useEffect(() => {
    markClientReady();
    setOrder(mix(products));
  }, [products]);

  const all = (order ?? products).slice(0, limit ?? products.length);
  const shown = all.slice(0, visible);

  return (
    <>
      <div className={className}>
        {shown.map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < priorityCount} />
        ))}
      </div>
      {shown.length < all.length && (
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Showing {shown.length} of {all.length}
          </p>
          <button
            type="button"
            onClick={() => setVisible((v) => v + (pageSize ?? all.length))}
            className="px-8 py-3 bg-[#1A533E] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#133d2d] transition-colors"
          >
            Show more
          </button>
        </div>
      )}
    </>
  );
}
