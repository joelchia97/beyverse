import type { Metadata } from "next";
import { LocalizedGuidePage } from "@/components/localized/localized-guide-page";
import { getLocalizedGuide, localizedGuides } from "@/lib/localized-guides";
import { siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return localizedGuides.ms.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLocalizedGuide("ms", slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/ms/guides/${guide.slug}`,
      languages: {
        en: `${siteConfig.url}/guides/${guide.slug}`,
        ms: `${siteConfig.url}/ms/guides/${guide.slug}`
      }
    },
    openGraph: {
      title: `${guide.title} - BEYBUKU`,
      description: guide.excerpt,
      url: `${siteConfig.url}/ms/guides/${guide.slug}`,
      locale: "ms_MY",
      type: "article"
    }
  };
}

export default async function MalayGuidePage({ params }: Props) {
  const { slug } = await params;
  return <LocalizedGuidePage locale="ms" slug={slug} />;
}
