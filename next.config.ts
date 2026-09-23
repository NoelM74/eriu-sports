import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Renamed collection: keep any existing search ranking and links working.
      { source: "/collections/gaa-gear", destination: "/collections/gaa-jerseys", permanent: true },
    ];
  },
};

export default nextConfig;
