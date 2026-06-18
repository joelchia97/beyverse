import { getBeyblades } from "@/lib/content";
import { siteConfig } from "@/lib/seo";
import { sitemapResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const beyblades = await getBeyblades();
  const lastModified = new Date("2026-06-19");

  return sitemapResponse(
    beyblades.flatMap((item) => [
      {
        url: `${siteConfig.url}/beyblades/${item.slug}`,
        lastModified
      },
      {
        url: `${siteConfig.url}/zh/beyblades/${item.slug}`,
        lastModified
      },
      {
        url: `${siteConfig.url}/ms/beyblades/${item.slug}`,
        lastModified
      }
    ])
  );
}
