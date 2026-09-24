"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  /** Load eagerly (use for the first row above the fold). */
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps): React.ReactElement {
  const { addItem } = useCart();
  const soldOutAll = product.sizes.every((size) => product.soldOut.includes(size));
  const { convertPrice, formatPrice } = useCurrency();

  const convertedPrice = convertPrice(product.price);
  const { colours } = product.details;
  const alt = colours ? `${product.title} in ${colours.replace(/ \/ /g, ", ").toLowerCase()}` : product.title;

  return (
    <div className="group relative bg-white">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={alt}
          fill
          priority={priority}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge label={product.badge} variant="new" />
          </div>
        )}
        {/* Quick add (hover devices) */}
        {soldOutAll ? (
          <div className="absolute inset-x-0 bottom-0 bg-[#0F2131]/90 text-white text-xs font-bold uppercase tracking-widest py-3 text-center">
            Sold out
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex w-full h-full">
              {product.sizes.map((size) => {
                const soldOut = product.soldOut.includes(size);
                return (
                  <button
                    key={size}
                    disabled={soldOut}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!soldOut) addItem(product, size);
                    }}
                    aria-label={soldOut ? `Size ${size} sold out` : `Add ${product.title}, size ${size}, to bag`}
                    title={soldOut ? 'Sold out' : undefined}
                    className={`flex-1 text-xs font-bold uppercase tracking-widest py-3 transition-colors border-r border-[#133d2d] last:border-r-0 ${
                      soldOut
                        ? 'bg-[#1A533E]/70 text-white/40 line-through cursor-not-allowed'
                        : 'bg-[#1A533E]/95 text-white hover:bg-[#133d2d]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Link>

      <div className="pt-3 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1C7C83] mb-0.5">
          {product.collection}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#0F2131] hover:text-[#1A533E] transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 text-sm font-bold text-[#0F2131]">{formatPrice(convertedPrice)}</p>
      </div>
    </div>
  );
}
