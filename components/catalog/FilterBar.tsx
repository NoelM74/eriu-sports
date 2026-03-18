"use client";

import { categories } from "@/lib/products";

interface FilterBarProps {
  active: string;
  onChange: (cat: string) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
            active === cat
              ? "bg-[#1A533E] text-white"
              : "bg-transparent border border-[#e5e7eb] text-[#404040] hover:border-[#1A533E] hover:text-[#1A533E]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
