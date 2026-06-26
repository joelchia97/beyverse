import { getBeyblades, getGuides, getParts } from "@/lib/content";
import { localizedGuides } from "@/lib/localized-guides";
import { siteConfig } from "@/lib/seo";
import { sitemapResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

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
  "/guides",
  "/tier-list",
  "/anime-lore",
  "/about",
  "/contact",
  "/privacy",
  "/terms"
];

export async function GET() {
  const lastModified = new Date("2026-06-19");
  const [beyblades, parts, guides] = await Promise.all([getBeyblades(), getParts(), getGuides()]);

  const urls = [
    ...staticRoutes.map((route) => `${siteConfig.url}${route}`),
    ...beyblades.flatMap((item) => [
      `${siteConfig.url}/beyblades/${item.slug}`,
      `${siteConfig.url}/zh/beyblades/${item.slug}`,
      `${siteConfig.url}/ms/beyblades/${item.slug}`
    ]),
    ...parts.flatMap((item) => [
      `${siteConfig.url}/parts/${item.slug}`,
      `${siteConfig.url}/zh/parts/${item.slug}`,
      `${siteConfig.url}/ms/parts/${item.slug}`
    ]),
    ...guides.map((item) => `${siteConfig.url}/guides/${item.slug}`),
    ...localizedGuides.zh.map((item) => `${siteConfig.url}/zh/guides/${item.slug}`),
    ...localizedGuides.ms.map((item) => `${siteConfig.url}/ms/guides/${item.slug}`)
  ];

  return sitemapResponse(
    Array.from(new Set(urls)).map((url) => ({
      url,
      lastModified
    }))
  );
}
