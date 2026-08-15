import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${site.siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((p) => ({
      url: `${site.siteUrl}/projects/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
