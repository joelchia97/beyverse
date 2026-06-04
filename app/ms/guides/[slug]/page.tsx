import type { Metadata } from "next";
import { LocalizedGuidePage } from "@/components/localized/localized-guide-page";
import { getLocalizedGuide, localizedGuides } from "@/lib/localized-guides";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return localizedGuides.ms.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getLocalizedGuide("ms", slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default async function MalayGuidePage({ params }: Props) {
  const { slug } = await params;
  return <LocalizedGuidePage locale="ms" slug={slug} />;
}
