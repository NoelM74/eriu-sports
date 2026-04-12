import Hero from "@/components/home/Hero";
import FeatureBento from "@/components/home/FeatureBento";
import LatestArrivals from "@/components/home/LatestArrivals";
import TopGAAPicks from "@/components/home/TopGAAPicks";
import Trending from "@/components/home/Trending";
import JoinMovement from "@/components/home/JoinMovement";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBento />
      <LatestArrivals />
      <TopGAAPicks />
      <Trending />
      <JoinMovement />
    </>
  );
}
