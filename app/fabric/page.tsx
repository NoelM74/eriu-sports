import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/marketing/RevealInit";
import { FabricTech, FinalCTA } from "@/components/marketing/Sections";

export const metadata: Metadata = {
  title: "Fabric Technology — Engineered to Perform",
  description:
    "The performance fabrics behind Ériu activewear: quick-dry, moisture-wicking, 4-way stretch, anti-microbial, squat-proof and UPF-rated knits, spec-rated batch after batch.",
};

export default function FabricPage() {
  return (
    <div className="eriu">
      <RevealInit />
      <section className="e-hero">
        <div className="e-wrap" style={{ paddingBlock: "clamp(3rem,7vw,5.5rem)" }} data-reveal>
          <p className="e-eyebrow">Fabric technology</p>
          <h1 style={{ fontSize: "clamp(2.6rem,7vw,5rem)", textTransform: "uppercase", lineHeight: ".92", margin: ".8rem 0 0", color: "var(--e-hero-ink)" }}>
            Base layers with<br />a spec sheet.
          </h1>
          <p className="e-hero-sub" style={{ maxWidth: "46ch" }}>
            Every garment is knit from performance yarn and rated — so what you order is what you get,
            batch after batch.
          </p>
          <div className="e-hero-cta">
            <Link className="e-btn e-btn-teal" href="/shop">Shop the range →</Link>
          </div>
        </div>
      </section>
      <FabricTech />
      <FinalCTA />
    </div>
  );
}
