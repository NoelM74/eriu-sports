"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ClubOption {
  name: string;
  slug: string;
  count: number;
}

interface Props {
  clubs: ClubOption[];
  label: string;
  /**
   * Filter mode: pass these to filter the current page instead of linking to club pages.
   * An empty `selected` means all clubs.
   */
  selected?: string;
  onSelect?: (slug: string) => void;
}

const buttonClass = (active: boolean) =>
  `inline-block border px-4 py-2 text-sm font-medium transition-colors ${
    active ? "border-[#1A533E] bg-[#1A533E] text-white" : "border-gray-200 text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E]"
  }`;

/** Club links: a dropdown on phones so every club is visible, a row of buttons on larger screens. */
export default function ClubPicker({ clubs, label, selected, onSelect }: Props) {
  const router = useRouter();
  const noun = label.endsWith("county") ? "counties" : "clubs";

  if (onSelect) {
    return (
      <nav aria-label={label} className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F2131] mb-3">{label}</h2>
        <div className="sm:hidden relative">
          <label htmlFor="club-filter" className="sr-only">{label}</label>
          <select
            id="club-filter"
            value={selected ?? ""}
            onChange={(e) => onSelect(e.target.value)}
            className="w-full h-12 appearance-none border border-gray-300 bg-white pl-4 pr-10 text-base font-medium text-[#0F2131] focus:outline-none focus:border-[#1A533E]"
          >
            <option value="">All {noun}</option>
            {clubs.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.count})
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F2131]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <ul className="hidden sm:flex flex-wrap gap-2">
          <li>
            <button type="button" aria-pressed={!selected} onClick={() => onSelect("")} className={buttonClass(!selected)}>
              All {noun}
            </button>
          </li>
          {clubs.map((c) => (
            <li key={c.slug}>
              <button type="button" aria-pressed={selected === c.slug} onClick={() => onSelect(c.slug)} className={buttonClass(selected === c.slug)}>
                {c.name} <span className={selected === c.slug ? "text-white/70" : "text-gray-400"}>({c.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={label} className="mb-8">
      <h2 className="text-xs font-bold uppercase tracking-widest text-[#0F2131] mb-3">{label}</h2>

      <div className="sm:hidden relative">
        <label htmlFor="club-picker" className="sr-only">{label}</label>
        <select
          id="club-picker"
          defaultValue=""
          onChange={(e) => e.target.value && router.push(`/clubs/${e.target.value}`)}
          className="w-full h-12 appearance-none border border-gray-300 bg-white pl-4 pr-10 text-base font-medium text-[#0F2131] focus:outline-none focus:border-[#1A533E]"
        >
          <option value="" disabled>
            Choose from {clubs.length} {noun}
          </option>
          {clubs.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name} ({c.count})
            </option>
          ))}
        </select>
        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0F2131]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <ul className="hidden sm:flex flex-wrap gap-2">
        {clubs.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/clubs/${c.slug}`}
              className="inline-block border border-gray-200 px-4 py-2 text-sm font-medium text-[#0F2131] hover:border-[#1A533E] hover:text-[#1A533E] transition-colors"
            >
              {c.name} <span className="text-gray-400">({c.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
