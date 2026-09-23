import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Renamed collection: keep any existing search ranking and links working.
      { source: "/collections/gaa-gear", destination: "/collections/gaa-jerseys", permanent: true },
      // Post-2010 shirts no longer stocked: send visitors to the club page.
      { source: "/products/manchester-united-2012-13-away-jersey", destination: "/clubs/manchester-united", permanent: true },
      { source: "/products/arsenal-2014-15-home-shirt", destination: "/clubs/arsenal", permanent: true },
      { source: "/products/liverpool-2010-12-home-shirt-gerrard-8", destination: "/clubs/liverpool", permanent: true },
      { source: "/products/liverpool-2010-12-home-shirt-suarez-7", destination: "/clubs/liverpool", permanent: true },
      { source: "/products/liverpool-2013-14-home-shirt-suarez-7", destination: "/clubs/liverpool", permanent: true },
      { source: "/products/liverpool-2010-12-home-shirt", destination: "/clubs/liverpool", permanent: true },
      { source: "/products/liverpool-2013-14-home-shirt", destination: "/clubs/liverpool", permanent: true },
    ];
  },
};

export default nextConfig;
