"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#0F2131]/10 shadow-sm">
      {/* Promo bar */}
      <div className="bg-[#0F2131] text-white text-center text-[10px] py-2 tracking-[0.25em] uppercase font-bold">
        FREE SHIPPING ON ORDERS OVER €50
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0 font-[family-name:var(--font-lexend)]">
          <span className="text-3xl font-bold tracking-tighter text-[#0A7A44]">ÉRIU</span>
          <span className="text-3xl font-extrabold tracking-tight text-[#000000]">SPORTS</span>
        </Link>
        
        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0F2131] uppercase tracking-wide">
          <Link href="/catalog" className="hover:text-[#1C7C83] transition-colors">
            Shop
          </Link>
          <div className="relative group py-6">
            <Link href="/catalog?category=Jerseys" className="hover:text-[#1C7C83] transition-colors flex items-center gap-1">
              Jerseys
              <svg className="w-3 h-3 text-[#0F2131]/50 group-hover:text-[#1C7C83] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
            </Link>
            <div className="absolute top-full left-0 w-56 bg-white border border-[#0F2131]/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="flex flex-col">
                <Link href="/catalog?category=Jerseys" className="px-5 py-3.5 border-b border-gray-50 hover:bg-[#F8F9FA] hover:text-[#1C7C83] transition-colors">
                  All Jerseys
                </Link>
                <Link href="/collections/ireland-classics" className="px-5 py-3.5 hover:bg-[#F8F9FA] hover:text-[#1C7C83] transition-colors">
                  Ireland Classics
                </Link>
                <Link href="/collections/premier-league-classics" className="px-5 py-3.5 hover:bg-[#F8F9FA] hover:text-[#1C7C83] transition-colors">
                  Premier League Classics
                </Link>
              </div>
            </div>
          </div>
          <Link href="/catalog?category=Footballs" className="hover:text-[#1C7C83] transition-colors">
            Footballs
          </Link>
          <Link href="/catalog?category=Socks" className="hover:text-[#1C7C83] transition-colors">
            Socks
          </Link>
          <Link href="/catalog?category=Accessories" className="hover:text-[#1C7C83] transition-colors">
            Accessories
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link href="/cart" className="relative p-1 text-[#0F2131] hover:text-[#1C7C83] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1A533E] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-1 text-[#0F2131]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-4 text-sm font-medium text-[#0F2131] uppercase tracking-wide">
          <Link href="/catalog" onClick={() => setMenuOpen(false)} className="pt-4 hover:text-[#1C7C83]">Shop All</Link>
          <div className="flex flex-col gap-4">
            <Link href="/catalog?category=Jerseys" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Jerseys</Link>
            <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-100 ml-1">
              <Link href="/catalog?category=Jerseys" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83] text-gray-500">All Jerseys</Link>
              <Link href="/collections/ireland-classics" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83] text-[#1C7C83]">Ireland Classics</Link>
              <Link href="/collections/premier-league-classics" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83] text-[#1C7C83]">Premier League Classics</Link>
            </div>
          </div>
          <Link href="/catalog?category=Footballs" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Footballs</Link>
          <Link href="/catalog?category=Socks" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Socks</Link>
          <Link href="/catalog?category=Accessories" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Accessories</Link>
        </div>
      )}
    </header>
  );
}
