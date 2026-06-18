import { getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";
import { sitemapResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const parts = await getParts();
  const lastModified = new Date("2026-06-19");

  return sitemapResponse(
    parts.flatMap((item) => [
      {
        url: `${siteConfig.url}/parts/${item.slug}`,
        lastModified
      },
      {
        url: `${siteConfig.url}/zh/parts/${item.slug}`,
        lastModified
      },
      {
        url: `${siteConfig.url}/ms/parts/${item.slug}`,
        lastModified
      }
    ])
  );
}
