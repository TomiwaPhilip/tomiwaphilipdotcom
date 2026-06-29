import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { missions, writing } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = site.url;

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/lab`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  for (const m of missions) {
    entries.push({
      url: `${base}/work/${m.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const w of writing) {
    entries.push({
      url: `${base}/writing/${w.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
