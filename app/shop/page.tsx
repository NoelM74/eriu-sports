import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/marketing/RevealInit";
import ProductCard from "@/components/shop/ProductCard";
import { allProducts, FAMILY_LABELS } from "@/lib/catalog";
import type { Family, Gender } from "@/lib/catalog/types";

export const metadata: Metadata = {
  title: "Shop the Range — Custom Blank Activewear",
  description:
    "Browse Ériu's range of premium blank activewear, built to be branded — tanks, tees, compression, shorts, leggings and yoga wear for men and women. From 10 pieces.",
};

const FAMILIES: Family[] = ["tee", "tank", "compression", "shorts", "leggings", "yoga", "layer", "accessory"];
const GENDERS: { key: Gender; label: string }[] = [
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "unisex", label: "Unisex" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ family?: string; gender?: string }>;
}) {
  const { family, gender } = await searchParams;

  let products = allProducts();
  if (family && FAMILIES.includes(family as Family)) {
    products = products.filter((p) => p.family === family);
  }
  if (gender && ["men", "women", "unisex"].includes(gender)) {
    products = products.filter((p) => p.gender === gender || p.gender === "unisex");
  }

  const title = family ? FAMILY_LABELS[family as Family] : gender ? `${gender[0].toUpperCase()}${gender.slice(1)}` : "The Full Range";

  return (
    <div className="eriu">
      <RevealInit />
      <section className="e-section e-wrap">
        <div className="e-breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Shop</span>
        </div>
        <div className="e-sec-head" data-reveal>
          <div>
            <p className="e-eyebrow">The Range · {products.length} products · Blanks built to be branded</p>
            <h2>{title}</h2>
          </div>
          <p className="lead">Every piece is made to order and priced by volume — set your size run and branding on any product.</p>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2rem" }} data-reveal>
          <FilterChip label="All" href="/shop" active={!family && !gender} />
          {GENDERS.map((g) => (
            <FilterChip key={g.key} label={g.label} href={`/shop?gender=${g.key}`} active={gender === g.key} />
          ))}
          <span style={{ width: 1, background: "var(--e-line)", margin: "0 .3rem" }} />
          {FAMILIES.map((f) => (
            <FilterChip key={f} label={FAMILY_LABELS[f]} href={`/shop?family=${f}`} active={family === f} />
          ))}
        </div>

        <div className="e-grid-4">
          {products.map((p) => (
            <div data-reveal key={p.slug}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p style={{ color: "var(--e-muted)", fontFamily: "var(--font-mono)" }}>
            No products in this filter yet. <Link href="/shop" style={{ color: "var(--e-teal)" }}>View all →</Link>
          </p>
        )}
      </section>
    </div>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: ".72rem",
        letterSpacing: ".04em",
        textTransform: "uppercase",
        padding: ".55em 1em",
        borderRadius: 6,
        border: "1px solid var(--e-line)",
        background: active ? "var(--e-emerald)" : "var(--e-surface)",
        color: active ? "#fff" : "var(--e-ink-soft)",
      }}
    >
      {label}
    </Link>
  );
}
