"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import CurrencySelector from "./CurrencySelector";

const MENU: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Shop All", href: "/catalog" },
  {
    label: "Football Shirts",
    href: "/catalog?category=football",
    children: [
      { label: "Shop by Club", href: "/clubs" },
      { label: "Retro Irish Shirts", href: "/collections/ireland-classics" },
      { label: "Premier League Classics", href: "/collections/premier-league-classics" },
      { label: "European & World Classics", href: "/collections/european-world-classics" },
      { label: "Kids Football Kits", href: "/collections/kids-football-kits" },
      { label: "All Football Shirts", href: "/catalog?category=football" },
    ],
  },
  {
    label: "GAA",
    href: "/catalog?category=gaa",
    children: [
      { label: "GAA County Jerseys", href: "/collections/gaa-jerseys" },
      { label: "GAA Training Vests", href: "/collections/gaa-training-vests" },
      { label: "Shop by County", href: "/clubs#gaa" },
    ],
  },
  { label: "AFL", href: "/collections/afl-jerseys" },
  {
    label: "Players",
    href: "/players",
    children: [
      { label: "Ronaldo (R9)", href: "/players/ronaldo-nazario" },
      { label: "Roberto Baggio", href: "/players/roberto-baggio" },
      { label: "Thierry Henry", href: "/players/thierry-henry" },
      { label: "Ronaldinho", href: "/players/ronaldinho" },
      { label: "Dennis Bergkamp", href: "/players/dennis-bergkamp" },
      { label: "All Players", href: "/players" },
    ],
  },
  { label: "Stories", href: "/blog" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#0F2131]/10 shadow-sm">
      <div className="bg-[#0F2131] text-white text-center text-[10px] sm:text-[11px] py-2 px-2 tracking-[0.18em] uppercase font-bold">
        <span className="whitespace-nowrap">Free delivery over €49</span> <span className="text-[#1C7C83] px-1">·</span>{" "}
        <span className="whitespace-nowrap">Delivered in 8–14 days</span>
        <span className="hidden sm:inline"><span className="text-[#1C7C83] px-1">·</span> Ireland &amp; UK</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 h-16 md:h-20" aria-label="Main">
        <Link href="/" className="flex items-center gap-1 shrink-0" aria-label="Ériu Sports home" onClick={close}>
          <span className="text-[22px] sm:text-2xl md:text-3xl font-bold tracking-tighter text-[#0A7A44]">ÉRIU</span>
          <span className="text-[22px] sm:text-2xl md:text-3xl font-extrabold tracking-tight text-black">SPORTS</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#0F2131] uppercase tracking-wide">
          {MENU.map((item) =>
            item.children ? (
              <li key={item.label} className="relative group py-6">
                <Link href={item.href} className="hover:text-[#1C7C83] transition-colors flex items-center gap-1">
                  {item.label}
                  <svg className="w-3 h-3 text-[#0F2131]/50 group-hover:text-[#1C7C83]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <ul className="absolute top-full left-0 w-64 bg-white border border-[#0F2131]/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 normal-case tracking-normal">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className="block px-5 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-[#F8F9FA] hover:text-[#1C7C83] transition-colors">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[#1C7C83] transition-colors">
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <CurrencySelector />
          <Link href="/catalog#search" className="p-1 text-[#0F2131] hover:text-[#1C7C83] transition-colors" aria-label="Search shirts">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
          <Link href="/cart" className="relative p-1 text-[#0F2131] hover:text-[#1C7C83] transition-colors" aria-label={`Bag, ${cartCount} items`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A533E] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="lg:hidden p-1 text-[#0F2131]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-5 text-sm font-medium text-[#0F2131] max-h-[75vh] overflow-y-auto">
          {MENU.map((item) => (
            <div key={item.label} className="border-b border-gray-100 py-3">
              <Link href={item.href} onClick={close} className="block uppercase tracking-wide font-semibold hover:text-[#1C7C83]">
                {item.label}
              </Link>
              {item.children && (
                <ul className="mt-2 pl-3 border-l-2 border-gray-100 space-y-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} onClick={close} className="block py-1 text-[#1C7C83]">
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
