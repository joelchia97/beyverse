import { siteConfig } from "@/lib/seo";
import { sitemapIndexResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export function GET() {
  const lastModified = new Date("2026-06-19");
  const names = ["pages", "beyblades", "parts", "guides"];

  return sitemapIndexResponse(
    names.map((name) => ({
      url: `${siteConfig.url}/sitemaps/${name}.xml`,
      lastModified
    }))
  );
}
