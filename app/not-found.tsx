import Link from 'next/link';
import { Metadata } from 'next';
import { getClubs } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'That page does not exist. Search the shop or browse retro football shirts, GAA jerseys and kids kits.',
  robots: { index: false, follow: true },
};

const COLLECTION_LINKS = [
  { href: '/collections/ireland-classics', label: 'Retro Irish Shirts' },
  { href: '/collections/premier-league-classics', label: 'Premier League Classics' },
  { href: '/collections/european-world-classics', label: 'European & World Classics' },
  { href: '/collections/kids-football-kits', label: 'Kids Football Kits' },
  { href: '/collections/gaa-jerseys', label: 'GAA Jerseys' },
  { href: '/blog', label: 'Shirt Stories' },
];

export default function NotFound() {
  const clubs = getClubs('football').slice(0, 6);
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-white">
      <div className="relative mb-6" aria-hidden>
        <span className="block text-[9rem] sm:text-[12rem] font-extrabold text-[var(--color-navy)] leading-none tracking-tighter opacity-10">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[6rem] sm:text-[8rem] font-extrabold text-[var(--color-emerald)] leading-none tracking-tighter">
          404
        </span>
      </div>

      <h1 className="text-3xl font-bold text-[var(--color-navy)] mb-4 uppercase tracking-wider text-center">
        Page not found
      </h1>
      <p className="text-gray-600 mb-8 max-w-md text-center text-lg">
        This page has been substituted out of the squad. Search for the shirt you wanted, or try one of the links below.
      </p>

      <form action="/catalog" method="get" role="search" className="flex w-full max-w-md mb-8">
        <label htmlFor="nf-search" className="sr-only">Search shirts</label>
        <input
          id="nf-search"
          name="q"
          type="search"
          placeholder="Search a club, season or player"
          className="flex-1 min-w-0 border border-gray-300 px-4 py-3 text-base focus:outline-none focus:border-[var(--color-emerald)]"
        />
        <button
          type="submit"
          className="bg-[var(--color-emerald)] text-white px-6 py-3 uppercase font-bold tracking-widest text-sm hover:bg-[var(--color-emerald-dark)] transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="bg-[var(--color-emerald)] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-emerald-dark)] transition-colors text-center"
        >
          Back to home
        </Link>
        <Link
          href="/catalog"
          className="bg-[var(--color-navy)] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[var(--color-teal)] transition-colors text-center"
        >
          Shop all shirts
        </Link>
      </div>

      <nav aria-label="Popular pages" className="mt-12 text-center max-w-2xl">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Popular collections</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {COLLECTION_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-[var(--color-teal)] hover:text-[var(--color-emerald)] transition-colors underline">
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-8 mb-4">Popular clubs</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {clubs.map((c) => (
            <Link key={c.slug} href={`/clubs/${c.slug}`} className="text-sm text-[var(--color-teal)] hover:text-[var(--color-emerald)] transition-colors underline">
              {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
