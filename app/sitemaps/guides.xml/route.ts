import { getGuides } from "@/lib/content";
import { localizedGuides } from "@/lib/localized-guides";
import { siteConfig } from "@/lib/seo";
import { sitemapResponse } from "@/lib/sitemap-xml";

export const revalidate = 3600;

export async function GET() {
  const guides = await getGuides();
  const lastModified = new Date("2026-06-19");

  return sitemapResponse([
    ...guides.map((item) => ({
      url: `${siteConfig.url}/guides/${item.slug}`,
      lastModified
    })),
    ...localizedGuides.zh.map((item) => ({
      url: `${siteConfig.url}/zh/guides/${item.slug}`,
      lastModified
    })),
    ...localizedGuides.ms.map((item) => ({
      url: `${siteConfig.url}/ms/guides/${item.slug}`,
      lastModified
    }))
  ]);
}
