import type { MetadataRoute } from "next";
import { getBeyblades, getGuides, getParts } from "@/lib/content";
import { localizedGuides } from "@/lib/localized-guides";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [beyblades, parts, guides] = await Promise.all([getBeyblades(), getParts(), getGuides()]);
  const contentUpdatedAt = new Date("2026-06-11");
  const staticRoutes = [
    "",
    "/zh",
    "/ms",
    "/zh/about",
    "/zh/beyblades",
    "/zh/contact",
    "/zh/guides",
    "/zh/parts",
    "/zh/privacy",
    "/zh/terms",
    "/ms/about",
    "/ms/beyblades",
    "/ms/contact",
    "/ms/guides",
    "/ms/parts",
    "/ms/privacy",
    "/ms/terms",
    "/beyblades",
    "/parts",
    "/combo-builder",
    "/tier-list",
    "/anime-lore",
    "/about",
    "/contact",
    "/privacy",
    "/terms"
  ];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: contentUpdatedAt })),
    ...beyblades.map((item) => ({ url: `${siteConfig.url}/beyblades/${item.slug}`, lastModified: new Date(item.release_date) })),
    ...beyblades.flatMap((item) => [
      { url: `${siteConfig.url}/zh/beyblades/${item.slug}`, lastModified: new Date(item.release_date) },
      { url: `${siteConfig.url}/ms/beyblades/${item.slug}`, lastModified: new Date(item.release_date) }
    ]),
    ...parts.map((item) => ({ url: `${siteConfig.url}/parts/${item.slug}`, lastModified: contentUpdatedAt })),
    ...parts.flatMap((item) => [
      { url: `${siteConfig.url}/zh/parts/${item.slug}`, lastModified: contentUpdatedAt },
      { url: `${siteConfig.url}/ms/parts/${item.slug}`, lastModified: contentUpdatedAt }
    ]),
    ...guides.map((item) => ({ url: `${siteConfig.url}/guides/${item.slug}`, lastModified: new Date(item.published_at) })),
    ...localizedGuides.zh.map((guide) => ({
      url: `${siteConfig.url}/zh/guides/${guide.slug}`,
      lastModified: new Date(guide.published_at)
    })),
    ...localizedGuides.ms.map((guide) => ({
      url: `${siteConfig.url}/ms/guides/${guide.slug}`,
      lastModified: new Date(guide.published_at)
    }))
  ];
}
