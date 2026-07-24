import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import RevealInit from "@/components/marketing/RevealInit";
import ProductCard from "@/components/shop/ProductCard";
import ProductConfigurator from "./ProductConfigurator";
import {
  allProducts,
  getProduct,
  fromPrice,
  bestPrice,
  completeTheKitFor,
  upsellsFor,
  relatedFor,
  FAMILY_LABELS,
} from "@/lib/catalog";
import type { Product } from "@/lib/catalog/types";

export function generateStaticParams() {
  return allProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} — Custom ${FAMILY_LABELS[product.family]}`,
    description: `${product.tagline}. Branded to order from €${fromPrice(product).toFixed(2)}/unit, MOQ ${product.moq}. ${product.fabric.composition}, ${product.fabric.gsm} GSM.`,
    openGraph: {
      title: `${product.name} | Ériu Performance Wear`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const kit = completeTheKitFor(product);
  const upsells = upsellsFor(product);
  const related = relatedFor(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Ériu Performance Wear" },
    category: FAMILY_LABELS[product.family],
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: bestPrice(product),
      highPrice: fromPrice(product),
      offerCount: product.pricing.tiers.length,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="eriu">
      <RevealInit />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="e-wrap">
        <nav className="e-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/shop">Shop</Link><span>/</span>
          <Link href={`/shop?family=${product.family}`}>{FAMILY_LABELS[product.family]}</Link><span>/</span>
          <span>{product.name}</span>
        </nav>

        <ProductConfigurator product={product} />

        {/* Specs */}
        <div className="e-specs">
          <details className="e-acc" open>
            <summary>Description <span className="plus">＋</span></summary>
            <div className="body">
              <p>{product.description}</p>
              <ul>
                {product.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </details>
          <details className="e-acc">
            <summary>Fabric &amp; specifications <span className="plus">＋</span></summary>
            <div className="body">
              <table className="e-spectable">
                <tbody>
                  <tr><td>Composition</td><td>{product.fabric.composition}</td></tr>
                  {product.fabric.gsm > 0 && <tr><td>Weight</td><td>{product.fabric.gsm} GSM</td></tr>}
                  <tr><td>Care</td><td>{product.fabric.care}</td></tr>
                  <tr><td>Sizes</td><td>{product.sizes.join(" · ")}</td></tr>
                  <tr><td>Minimum order</td><td>{product.moq} pieces</td></tr>
                </tbody>
              </table>
              <div className="e-chips">
                {product.fabric.tech.map((t) => <span className="e-chip" key={t}>{t}</span>)}
              </div>
            </div>
          </details>
          <details className="e-acc">
            <summary>Branding &amp; production <span className="plus">＋</span></summary>
            <div className="body">
              <table className="e-spectable">
                <tbody>
                  <tr><td>Methods</td><td>{product.branding.methods.join(" · ")}</td></tr>
                  <tr><td>Placements</td><td>{product.branding.placements.join(" · ")}</td></tr>
                  <tr><td>Names &amp; numbers</td><td>{product.branding.namesAndNumbers ? `Available (+€${product.branding.namesAndNumbersPrice.toFixed(2)}/unit)` : "—"}</td></tr>
                  <tr><td>Lead time</td><td>10–14 days after mock-up approval</td></tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </div>

      {/* Complete the kit (cross-sell) */}
      {kit.length > 0 && (
        <div className="e-rel-kit">
          <RelationRow title="Complete the kit" products={kit} />
        </div>
      )}

      {/* Upgrade (upsell) */}
      {upsells.length > 0 && <RelationRow title="Upgrade or match the set" products={upsells} />}

      {/* You may also like */}
      {related.length > 0 && <RelationRow title="You may also like" products={related} />}
    </div>
  );
}

function RelationRow({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="e-rel e-wrap" data-reveal>
      <h2>{title}</h2>
      <div className="e-grid-4">
        {products.map((p) => <ProductCard product={p} key={p.slug} />)}
      </div>
    </section>
  );
}
