import { siteConfig } from "@/lib/seo";
import { sitemapResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

const routes = [
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

export function GET() {
  const lastModified = new Date("2026-06-19");

  return sitemapResponse(
    routes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified
    }))
  );
}
