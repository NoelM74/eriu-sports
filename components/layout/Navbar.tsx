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
        FREE SHIPPING ON ORDERS OVER €50 · <span className="text-[#1C7C83]">OFFICIAL GAA SPEC</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Ériu Sports"
            width={180}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0F2131] uppercase tracking-wide">
          <Link href="/catalog" className="hover:text-[#1C7C83] transition-colors">
            Shop
          </Link>
          <Link href="/catalog?category=Jerseys" className="hover:text-[#1C7C83] transition-colors">
            Jerseys
          </Link>
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
          <Link href="/catalog?category=Jerseys" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Jerseys</Link>
          <Link href="/catalog?category=Footballs" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Footballs</Link>
          <Link href="/catalog?category=Socks" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Socks</Link>
          <Link href="/catalog?category=Accessories" onClick={() => setMenuOpen(false)} className="hover:text-[#1C7C83]">Accessories</Link>
        </div>
      )}
    </header>
  );
}
