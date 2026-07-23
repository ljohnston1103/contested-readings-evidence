import type { MetadataRoute } from "next";

import { displayedPassages } from "@/data/derived";

const baseUrl = "https://oldestandbest.com";
const lastModified = new Date("2026-07-23T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/passages",
    "/manuscripts",
    "/fathers",
    "/versions",
    "/timeline",
    "/methodology",
    "/research",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...displayedPassages.map((passage) => ({
      url: `${baseUrl}/passages/${passage.slug}`,
      lastModified: passage.lastVerified
        ? new Date(`${passage.lastVerified}T00:00:00.000Z`)
        : lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
