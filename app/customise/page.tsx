import type { Metadata } from "next";
import Link from "next/link";
import RevealInit from "@/components/marketing/RevealInit";
import { Customise, FinalCTA } from "@/components/marketing/Sections";

export const metadata: Metadata = {
  title: "Customise — Your Logo, Your Colours, Your Kit",
  description:
    "How custom branding works at Ériu: pick your blanks, add your logo and colours, and we manufacture and ship in 10–14 days. Print, embroidery and sublimation from 10 pieces.",
};

export default function CustomisePage() {
  return (
    <div className="eriu">
      <RevealInit />
      <section className="e-hero">
        <div className="e-wrap" style={{ paddingBlock: "clamp(3rem,7vw,5.5rem)" }} data-reveal>
          <p className="e-eyebrow">Customise</p>
          <h1 style={{ fontSize: "clamp(2.6rem,7vw,5rem)", textTransform: "uppercase", lineHeight: ".92", margin: ".8rem 0 0", color: "var(--e-hero-ink)" }}>
            Your brand,<br />on gear worth wearing.
          </h1>
          <p className="e-hero-sub" style={{ maxWidth: "46ch" }}>
            Send us your logo and roughly what you need. We&apos;ll return a free digital mock-up and a
            locked-in unit price within one working day. This flow becomes the full self-serve order
            builder in the next phase of the build.
          </p>
          <div className="e-hero-cta">
            <Link className="e-btn e-btn-teal" href="/shop">Browse the range →</Link>
            <a className="e-btn e-btn-ghost" href="/contact">Talk to us</a>
          </div>
        </div>
      </section>
      <Customise />
      <FinalCTA />
    </div>
  );
}
