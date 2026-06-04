import type { MetadataRoute } from "next";
import { beyblades, guides, parts } from "@/lib/data";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/beyblades", "/parts", "/combo-builder", "/tier-list", "/anime-lore", "/search", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })),
    ...beyblades.map((item) => ({ url: `${siteConfig.url}/beyblades/${item.slug}`, lastModified: new Date(item.release_date) })),
    ...parts.map((item) => ({ url: `${siteConfig.url}/parts/${item.slug}`, lastModified: new Date() })),
    ...guides.map((item) => ({ url: `${siteConfig.url}/guides/${item.slug}`, lastModified: new Date(item.published_at) }))
  ];
}
