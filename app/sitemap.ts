import type { MetadataRoute } from "next";
import { getBeyblades, getGuides, getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [beyblades, parts, guides] = await Promise.all([getBeyblades(), getParts(), getGuides()]);
  const staticRoutes = ["", "/beyblades", "/parts", "/combo-builder", "/tier-list", "/anime-lore", "/search", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date() })),
    ...beyblades.map((item) => ({ url: `${siteConfig.url}/beyblades/${item.slug}`, lastModified: new Date(item.release_date) })),
    ...parts.map((item) => ({ url: `${siteConfig.url}/parts/${item.slug}`, lastModified: new Date() })),
    ...guides.map((item) => ({ url: `${siteConfig.url}/guides/${item.slug}`, lastModified: new Date(item.published_at) }))
  ];
}
