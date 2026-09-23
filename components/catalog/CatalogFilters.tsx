"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ClubOption {
  name: string;
  slug: string;
  count: number;
}

interface Props {
  category: string;
  clubs: ClubOption[];
  club: string;
  query: string;
}

/** Search box and club picker for the shop page. Works without JS as a plain GET form. */
export default function CatalogFilters({ category, clubs, club, query }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(query);

  function go(next: { club?: string; q?: string }) {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    const c = next.club ?? club;
    const text = (next.q ?? q).trim();
    if (c) params.set("club", c);
    if (text) params.set("q", text);
    const qs = params.toString();
    router.push(qs ? `/catalog?${qs}` : "/catalog", { scroll: false });
  }

  return (
    <form
      action="/catalog"
      method="get"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        go({});
      }}
      className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
    >
      {category !== "all" && <input type="hidden" name="category" value={category} />}
      <div className="relative">
        <label htmlFor="search" className="sr-only">Search shirts</label>
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <input
          id="search"
          name="q"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search club, player or season, e.g. Henry 2004"
          className="scroll-mt-40 w-full h-12 pl-10 pr-24 border border-gray-300 text-base focus:outline-none focus:border-[#1A533E] focus:ring-1 focus:ring-[#1A533E]"
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 px-4 bg-[#1A533E] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#133d2d]"
        >
          Search
        </button>
      </div>
      <div>
        <label htmlFor="club" className="sr-only">Filter by club</label>
        <select
          id="club"
          name="club"
          value={club}
          onChange={(e) => go({ club: e.target.value })}
          className="w-full sm:w-64 h-12 px-3 border border-gray-300 bg-white text-base focus:outline-none focus:border-[#1A533E]"
        >
          <option value="">All clubs &amp; counties</option>
          {clubs.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} ({c.count})
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
