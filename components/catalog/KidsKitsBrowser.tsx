"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import ClubPicker from "./ClubPicker";
import ShuffledGrid from "./ShuffledGrid";

interface Section {
  id: string;
  label: string;
  items: Product[];
}

interface Props {
  sections: Section[];
  clubs: { name: string; slug: string; count: number }[];
}

/**
 * Kids kits grouped into sections, with a club filter that stays on this page.
 * Linking to the club page instead mixed the kids kits in with every adult shirt.
 */
export default function KidsKitsBrowser({ sections, clubs }: Props) {
  const [club, setClub] = useState("");
  const shown = sections
    .map((s) => ({ ...s, items: club ? s.items.filter((p) => p.club?.slug === club) : s.items }))
    .filter((s) => s.items.length > 0);
  const total = shown.reduce((n, s) => n + s.items.length, 0);

  return (
    <>
      {clubs.length > 1 && <ClubPicker clubs={clubs} label="Shop by club" selected={club} onSelect={setClub} />}
      <p className="text-sm text-gray-500 mb-6" aria-live="polite">
        {total} {total === 1 ? "kit" : "kits"}
      </p>
      {shown.length > 1 && (
        <nav aria-label="Sections" className="flex flex-wrap gap-2 mb-10">
          {shown.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-4 py-2.5 text-sm font-semibold uppercase tracking-wider border border-gray-200 text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E] transition-colors"
            >
              {s.label} <span className="text-gray-400 font-normal">({s.items.length})</span>
            </a>
          ))}
        </nav>
      )}
      {shown.map((s, i) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="mb-14 last:mb-0 scroll-mt-28">
          <h2 id={`${s.id}-heading`} className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#0F2131] mb-6">
            {s.label}
          </h2>
          <ShuffledGrid key={`${s.id}-${club}`} products={s.items} priorityCount={i === 0 ? 4 : 0} />
        </section>
      ))}
    </>
  );
}
