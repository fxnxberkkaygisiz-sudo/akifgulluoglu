import type { MetadataRoute } from "next";
import { getPerson, siteUrl } from "@/lib/person";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();
  return getPerson().sitemap.map((page) => ({
    url: `${base}${page.path === "/" ? "" : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
