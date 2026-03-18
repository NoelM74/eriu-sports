"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products, getProductsByCategory } from "@/lib/products";
import FilterBar from "@/components/catalog/FilterBar";
import ProductCard from "@/components/catalog/ProductCard";
import { Suspense } from "react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    const cat = searchParams.get("category") || "All";
    setActiveCategory(cat);
  }, [searchParams]);

  const filtered = getProductsByCategory(activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#1C7C83] mb-1">
          All Products
        </p>
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold uppercase text-[#0F2131]">Shop</h1>
          <p className="text-sm text-[#757575]">{filtered.length} products</p>
        </div>
      </div>

      {/* Filters */}
      <FilterBar active={activeCategory} onChange={setActiveCategory} />

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-[#757575]">
          <p className="text-lg font-medium">No products in this category yet.</p>
          <p className="text-sm mt-2">Check back soon — more drops incoming.</p>
        </div>
      )}
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogContent />
    </Suspense>
  );
}
