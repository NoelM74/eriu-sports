import type { NextConfig } from "next";

// Safe, site-wide security headers. The CSP covers framing, plugins, <base> and form
// targets only; a full script-src policy would need nonces to keep PayPal, Stripe and
// Google Analytics working.
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
