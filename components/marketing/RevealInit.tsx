"use client";

import { useEffect } from "react";

/** Adds `.in` to `[data-reveal]` elements as they scroll into view. */
export default function RevealInit() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return null;
}
