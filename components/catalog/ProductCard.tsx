"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useCurrency } from "@/lib/currency-context";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps): React.ReactElement {
  const { addItem } = useCart();
  const { convertPrice, formatPrice } = useCurrency();

  const convertedPrice = convertPrice(product.price);

  function getBadgeVariant(badge: string): "new" | "bestseller" | "selling" | "sale" | "official" | "limited" {
    if (badge === "New Arrival") return "new";
    if (badge === "Best Seller") return "bestseller";
    if (badge === "Selling Fast") return "selling";
    if (badge === "Official Spec") return "official";
    if (badge === "Limited Edition") return "limited";
    return "new";
  }

  return (
    <div className="group relative bg-white">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <Badge label={product.badge} variant={getBadgeVariant(product.badge)} />
          </div>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex w-full h-full">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product, size);
                }}
                className="flex-1 bg-[#1A533E]/95 text-white text-xs font-bold uppercase tracking-widest py-3 hover:bg-[#133d2d] transition-colors border-r border-[#133d2d] last:border-r-0"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-3 pb-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1C7C83] mb-0.5">
          {product.category}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-[#0F2131] hover:text-[#1A533E] transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-sm font-bold text-[#0F2131]">{formatPrice(convertedPrice)}</span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-xs text-[#757575]">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
