import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeatureBento from "@/components/home/FeatureBento";
import LatestArrivals from "@/components/home/LatestArrivals";
import TopGAAPicks from "@/components/home/TopGAAPicks";
import Trending from "@/components/home/Trending";
import JoinMovement from "@/components/home/JoinMovement";
import BuyerReviews from "@/components/home/BuyerReviews";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureBento />
      <LatestArrivals />
      <BuyerReviews />
      <TopGAAPicks />
      <Trending />
      <JoinMovement />
    </>
  );
}
