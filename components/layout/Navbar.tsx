"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/shop", label: "The Range" },
  { href: "/shop?gender=women", label: "Women" },
  { href: "/shop?gender=men", label: "Men" },
  { href: "/customise", label: "Customise" },
  { href: "/for/teams", label: "For Teams" },
  { href: "/fabric", label: "Fabric Tech" },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="eriu e-nav">
      <div className="e-util">
        <div className="track">
          <span><b>MOQ 10 pcs</b> · print · embroidery · sublimation</span>
          <span>Men &amp; Women · 40+ colourways</span>
          <span><b>10–14 day</b> production lead</span>
        </div>
      </div>

      <nav className="e-wrap e-nav-in" aria-label="Primary">
        <Link href="/" className="e-brand" aria-label="Ériu home" onClick={() => setOpen(false)}>
          <span className="mk">ÉRIU</span><span className="reg">®</span>
          <span className="sm">Performance&nbsp;Wear</span>
        </Link>

        <div className="e-nav-links">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href}>{n.label}</Link>
          ))}
        </div>

        <div className="e-nav-right">
          <ThemeToggle />
          <Link href="/cart" className="e-icon" aria-label={`Cart, ${cartCount} items`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 3h1.4a1.1 1.1 0 0 1 1.1.9L7 14.2a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.5-1.1l1.8-6.4H6" />
              <circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" />
            </svg>
            {cartCount > 0 && <span className="e-cart-count">{cartCount}</span>}
          </Link>
          <Link className="e-btn e-btn-solid e-nav-cta" href="/customise">Start a bulk order</Link>
          <button
            className="e-icon e-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3.5 7h17M3.5 12h17M3.5 17h17" /></svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="e-mobile">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</Link>
          ))}
          <Link href="/customise" onClick={() => setOpen(false)} className="e-btn e-btn-solid e-btn-block" style={{ marginTop: ".8rem" }}>
            Start a bulk order
          </Link>
        </div>
      )}
    </header>
  );
}
