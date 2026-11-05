"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { isClientReady, markClientReady } from "@/lib/session-order";
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
 * The chosen club lives in the address (?club=liverpool), so the back button and the
 * breadcrumb on a kids kit page return to the filtered list.
 */
export default function KidsKitsBrowser({ sections, clubs }: Props) {
  const readClub = () => {
    const c = new URLSearchParams(window.location.search).get("club") ?? "";
    return clubs.some((x) => x.slug === c) ? c : "";
  };
  const [club, setClubState] = useState(() => (isClientReady() ? readClub() : ""));

  useEffect(() => {
    markClientReady();
    const c = readClub();
    if (c) setClubState(c);
    // Read the address once when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setClub = (c: string) => {
    setClubState(c);
    const url = new URL(window.location.href);
    if (c) url.searchParams.set("club", c);
    else url.searchParams.delete("club");
    url.hash = "";
    window.history.replaceState(window.history.state, "", url.toString());
  };
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
