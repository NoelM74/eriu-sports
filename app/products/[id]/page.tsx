"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductById, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/catalog/ProductCard";
import { notFound } from "next/navigation";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) return notFound();

  return <ProductDetail id={id} />;
}

function ProductDetail({ id }: { id: string }) {
  const product = getProductById(id)!;
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs">("description");

  const related = products.filter((p) => p.id !== id).slice(0, 4);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-2 text-xs text-[#757575] uppercase tracking-wide">
          <Link href="/" className="hover:text-[#1A533E]">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[#1A533E]">Shop</Link>
          <span>/</span>
          <span className="text-[#0F2131] font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#0F2131] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(product.rating) ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-sm text-[#757575]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-[#0F2131] mb-6">
              €{product.price.toFixed(2)}
            </p>

            {/* Size picker */}
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-[#404040] mb-3">
                  Size: <span className="text-[#0F2131]">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-semibold border transition-colors ${
                        selectedSize === size
                          ? "bg-[#0F2131] text-white border-[#0F2131]"
                          : "bg-white text-[#0F2131] border-gray-300 hover:border-[#0F2131]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[#404040] mb-3">Quantity</p>
              <div className="flex items-center border border-gray-300 w-fit">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#0F2131] hover:bg-gray-50 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold text-[#0F2131]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#0F2131] hover:bg-gray-50 transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                  added
                    ? "bg-[#1C7C83] text-white"
                    : "bg-[#1A533E] text-white hover:bg-[#133d2d]"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
              <Link
                href="/cart"
                className="flex-1 py-4 text-sm font-bold uppercase tracking-widest border border-[#0F2131] text-[#0F2131] text-center hover:bg-[#0F2131] hover:text-white transition-colors"
              >
                View Cart
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 text-xs font-medium text-[#757575] uppercase tracking-wide border-t border-gray-100 pt-6">
              <span>✓ Free returns</span>
              <span>✓ Secure checkout</span>
              <span>✓ Shipped from Ireland</span>
            </div>
          </div>
        </div>

        {/* Description / Specs tabs */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <div className="flex gap-8 border-b border-gray-100 mb-8">
            {(["description", "specs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeTab === tab
                    ? "text-[#1A533E] border-b-2 border-[#1A533E] -mb-px"
                    : "text-[#757575] hover:text-[#0F2131]"
                }`}
              >
                {tab === "description" ? "Description" : "Specifications"}
              </button>
            ))}
          </div>

          {activeTab === "description" ? (
            <p className="text-[#404040] leading-relaxed max-w-2xl">{product.description}</p>
          ) : (
            <ul className="space-y-3 max-w-lg">
              {product.specs.map((spec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#404040]">
                  <span className="text-[#1A533E] font-bold mt-0.5">✓</span>
                  {spec}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Related products */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <h2 className="text-2xl font-bold uppercase text-[#0F2131] mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
