import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DELIVERY } from '@/lib/collections';
import { getPlayers } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Shop by Player | Retro Shirts with Name & Number',
  description: `Retro football shirts printed with the names of the greats: Ronaldo, Baggio, Henry, Bergkamp, Ronaldinho, Gerrard and more. €35 each, delivered to Ireland and the UK in ${DELIVERY}.`,
  alternates: { canonical: '/players' },
  openGraph: {
    title: 'Shop by Player | Ériu Sports',
    description: 'Retro football shirts printed with the names of the greats.',
    url: '/players',
  },
};

export default function PlayersPage() {
  const players = getPlayers();

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#0F2131] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1C7C83] mb-3">Name &amp; number shirts</p>
          <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight">Shop by Player</h1>
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl">
            Retro shirts printed with the names of the greats. €35 each, delivered to Ireland and the UK in {DELIVERY}.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {players.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/players/${p.slug}`} className="group block border border-gray-200 hover:border-[#1A533E] transition-colors">
                <div className="relative aspect-square bg-[#f3f5f4] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} retro shirt, name and number on the back`}
                    fill
                    priority={i < 5}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-[#0F2131] leading-tight">{p.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {p.count} shirts · {p.teams.join(', ')}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
