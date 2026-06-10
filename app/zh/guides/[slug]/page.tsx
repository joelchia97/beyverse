import type { Metadata } from "next";
import { LocalizedGuidePage } from "@/components/localized/localized-guide-page";
import { getLocalizedGuide, localizedGuides } from "@/lib/localized-guides";
import { siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return localizedGuides.zh.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLocalizedGuide("zh", slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/zh/guides/${guide.slug}`,
      languages: {
        en: `${siteConfig.url}/guides/${guide.slug}`,
        zh: `${siteConfig.url}/zh/guides/${guide.slug}`
      }
    },
    openGraph: {
      title: `${guide.title} - BEYBUKU`,
      description: guide.excerpt,
      url: `${siteConfig.url}/zh/guides/${guide.slug}`,
      locale: "zh_CN",
      type: "article"
    }
  };
}

export default async function ChineseGuidePage({ params }: Props) {
  const { slug } = await params;
  return <LocalizedGuidePage locale="zh" slug={slug} />;
}
