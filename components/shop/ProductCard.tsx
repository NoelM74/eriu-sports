import Link from "next/link";
import Garment from "./Garment";
import { fromPrice, FAMILY_LABELS, GENDER_LABELS } from "@/lib/catalog";
import type { Product } from "@/lib/catalog/types";

export default function ProductCard({ product }: { product: Product }) {
  const cw = product.colourways[0];
  const price = fromPrice(product);
  return (
    <Link className="e-card" href={`/shop/${product.slug}`}>
      {product.badge && <span className="e-badge">{product.badge}</span>}
      <span className="e-gtag">{GENDER_LABELS[product.gender]}</span>
      <div className="art">
        <Garment family={product.family} body={cw.body} trim={cw.trim} title={product.name} />
      </div>
      <div className="meta">
        <div className="top">
          <h3>{product.name}</h3>
          <span className="price">from €{price.toFixed(2)}</span>
        </div>
        <span className="sub">{FAMILY_LABELS[product.family]} · MOQ {product.moq}</span>
        <div className="dots">
          {product.colourways.slice(0, 6).map((c) => (
            <i key={c.id} style={{ background: c.body }} title={c.name} />
          ))}
        </div>
      </div>
    </Link>
  );
}
