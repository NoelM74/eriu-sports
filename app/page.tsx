import Hero from "@/components/marketing/Hero";
import RevealInit from "@/components/marketing/RevealInit";
import FAQ from "@/components/marketing/FAQ";
import {
  SpecStrip,
  RangeGrid,
  Customise,
  FabricTech,
  UseCases,
  Proof,
  FinalCTA,
} from "@/components/marketing/Sections";

export default function HomePage() {
  return (
    <div className="eriu">
      <RevealInit />
      <Hero />
      <SpecStrip />
      <RangeGrid />
      <Customise />
      <FabricTech />
      <UseCases />
      <Proof />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
