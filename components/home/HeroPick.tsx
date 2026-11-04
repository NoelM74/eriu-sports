"use client";

import { useEffect } from "react";

export interface HeroPickItem {
  src: string;
  href: string;
  alt: string;
  tag: string;
  name: string;
}

/**
 * Picks the hero shirt when the home page is reached by an in-site link. On a full page
 * load the inline script in Hero has already set the photo, so this does nothing.
 */
export default function HeroPick({ picks }: { picks: HeroPickItem[] }) {
  useEffect(() => {
    const img = document.getElementById("hero-img") as HTMLImageElement | null;
    if (!img || img.getAttribute("src")) return;
    let last = -1;
    try {
      last = parseInt(localStorage.getItem("eriu-hero") || "-1", 10);
    } catch {}
    let i = Math.floor(Math.random() * picks.length);
    if (picks.length > 1 && i === last) i = (i + 1) % picks.length;
    try {
      localStorage.setItem("eriu-hero", String(i));
    } catch {}
    const p = picks[i];
    img.alt = p.alt;
    img.src = p.src;
    const link = document.getElementById("hero-link") as HTMLAnchorElement | null;
    if (link) link.href = p.href;
    const tag = document.getElementById("hero-tag");
    if (tag) tag.textContent = p.tag;
    const name = document.getElementById("hero-name");
    if (name) name.textContent = p.name;
  }, [picks]);
  return null;
}
