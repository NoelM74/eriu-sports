import { Metadata } from 'next';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/collections';
import { getClubs } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Shop by Club | Retro Football Shirts & GAA Jerseys',
  description: `Find retro shirts by club: Arsenal, Liverpool, Manchester United, Ireland and more, plus GAA jerseys by county. Worldwide delivery, free over €49.`,
  alternates: { canonical: '/clubs' },
  openGraph: {
    title: 'Shop by Club | Ériu Sports',
    description: 'Retro football shirts by club and GAA jerseys by county.',
    url: '/clubs',
  },
};

const HEADINGS: Record<string, string> = {
  football: 'Football clubs & countries',
  gaa: 'GAA counties',
  afl: 'AFL clubs',
};

export default function ClubsPage() {
  const groups = CATEGORIES.map((c) => ({ ...c, clubs: getClubs(c.key) })).filter((g) => g.clubs.length);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#0F2131] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Shop by Club</h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">
            Pick your team to see every shirt we have. Looking for something specific?{' '}
            <Link href="/catalog#search" className="underline underline-offset-4 hover:text-white">Search the shop</Link>.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        {groups.map((g) => (
          <section key={g.key} id={g.key} className="scroll-mt-28" aria-labelledby={`h-${g.key}`}>
            <h2 id={`h-${g.key}`} className="text-2xl font-bold uppercase text-[#0F2131] mb-5">{HEADINGS[g.key]}</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {g.clubs.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/clubs/${c.slug}`}
                    className="flex items-center justify-between gap-2 border border-gray-200 px-4 py-4 hover:border-[#1A533E] hover:bg-[#f7f9f8] transition-colors"
                  >
                    <span className="font-semibold text-[#0F2131]">{c.name}</span>
                    <span className="text-sm text-gray-500 shrink-0">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
