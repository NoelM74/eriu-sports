"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { mixByClub } from "@/lib/shuffle";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
  /** Show only this many after shuffling. */
  limit?: number;
  className?: string;
  /** Eager-load the first few images. */
  priorityCount?: number;
}

/**
 * Product grid that shows a fresh, club-mixed order on every visit.
 * The server renders the order it was given; the browser reshuffles after loading.
 */
export default function ShuffledGrid({
  products,
  limit,
  className = "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
  priorityCount = 0,
}: Props) {
  const [order, setOrder] = useState<Product[] | null>(null);

  useEffect(() => {
    setOrder(mixByClub(products));
  }, [products]);

  const shown = (order ?? products).slice(0, limit ?? products.length);

  return (
    <div className={className}>
      {shown.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
