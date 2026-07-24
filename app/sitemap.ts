import { MetadataRoute } from "next";
import { allProducts, FAMILY_LABELS } from "@/lib/catalog";
import type { Family } from "@/lib/catalog/types";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eriusports.com";
  const now = new Date();

  // Core rebuild pages
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/customise`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/fabric`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/for/teams`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/for/gyms`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/for/events`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/for/business`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Family filter pages
  const families = Object.keys(FAMILY_LABELS) as Family[];
  const familyPages: MetadataRoute.Sitemap = families.map((family) => ({
    url: `${baseUrl}/shop?family=${family}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Product pages
  const productPages: MetadataRoute.Sitemap = allProducts().map((product) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Support / legal
  const supportPages: MetadataRoute.Sitemap = [
    "/contact",
    "/faq",
    "/shipping-returns",
    "/size-guide",
    "/privacy-policy",
    "/terms-of-service",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...corePages, ...familyPages, ...productPages, ...supportPages];
}
