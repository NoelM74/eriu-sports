import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealInit from "@/components/marketing/RevealInit";
import ProductCard from "@/components/shop/ProductCard";
import { FinalCTA } from "@/components/marketing/Sections";
import { allProducts } from "@/lib/catalog";

const SEGMENTS = {
  teams: {
    eyebrow: "Clubs & Teams",
    h1: "Match-day to training kit.",
    sub: "Full squad kits with names, numbers and sponsor logos — consistent across every player, and replaceable one unit at a time. Mix men's and women's fits in a single order.",
    picks: ["vela-racer-tank", "apex-training-tee", "base-training-shorts", "terrain-zip-layer"],
  },
  gyms: {
    eyebrow: "Gyms & Studios",
    h1: "Retail-ready branded lines.",
    sub: "Your own-brand activewear to sell at the front desk — tanks, leggings and bras your members actually want to wear out of the studio.",
    picks: ["charge-seamless-tank", "flow-high-waist-leggings", "studio-seamless-bra", "contour-compression-leggings"],
  },
  business: {
    eyebrow: "Corporate & Brands",
    h1: "Merch that gets worn.",
    sub: "Conference drops and staff kits people keep — premium leisurewear branded to your identity, not landfill tees.",
    picks: ["apex-training-tee", "pulse-long-sleeve", "terrain-zip-layer", "field-cap"],
  },
  events: {
    eyebrow: "Events & Races",
    h1: "The full race-day kit.",
    sub: "Finisher tees, event tanks and hoodies, caps and beanies — plus medals, lanyards and promo bags to complete the pack. Branded to your event and delivered on time for the big day. High volumes, sharp pricing.",
    picks: ["stride-performance-tee", "apex-training-tee", "summit-hoodie", "field-cap"],
  },
} as const;

type SegmentKey = keyof typeof SEGMENTS;

export function generateStaticParams() {
  return Object.keys(SEGMENTS).map((segment) => ({ segment }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;
  const s = SEGMENTS[segment as SegmentKey];
  if (!s) return { title: "Not found" };
  return { title: `${s.eyebrow} — Custom Kit`, description: s.sub };
}

export default async function SegmentPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;
  const s = SEGMENTS[segment as SegmentKey];
  if (!s) notFound();

  const products = s.picks
    .map((slug) => allProducts().find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="eriu">
      <RevealInit />
      <section className="e-hero">
        <div className="e-wrap" style={{ paddingBlock: "clamp(3rem,7vw,5.5rem)" }} data-reveal>
          <p className="e-eyebrow">{s.eyebrow}</p>
          <h1 style={{ fontSize: "clamp(2.6rem,7vw,5rem)", textTransform: "uppercase", lineHeight: ".92", margin: ".8rem 0 0", color: "var(--e-hero-ink)" }}>
            {s.h1}
          </h1>
          <p className="e-hero-sub" style={{ maxWidth: "48ch" }}>{s.sub}</p>
          <div className="e-hero-cta">
            <Link className="e-btn e-btn-teal" href="/shop">Shop the range →</Link>
            <Link className="e-btn e-btn-ghost" href="/customise">Request a quote</Link>
          </div>
        </div>
      </section>

      <section className="e-section e-wrap">
        <div className="e-sec-head" data-reveal>
          <div>
            <p className="e-eyebrow">Popular with {s.eyebrow.toLowerCase()}</p>
            <h2>Kit picks to start from.</h2>
          </div>
        </div>
        <div className="e-grid-4">
          {products.map((p) => <ProductCard product={p} key={p.slug} />)}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
