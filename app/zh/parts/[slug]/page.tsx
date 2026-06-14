import type { Metadata } from "next";
import { LocalizedPartDetail } from "@/components/localized/localized-database-detail";
import { parts } from "@/lib/data";
import { getPartBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return parts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getPartBySlug((await params).slug); if (!item) return {};
  return { title: `${item.name} 中文资料`, description: item.description, alternates: { canonical: `${siteConfig.url}/zh/parts/${item.slug}`, languages: { en: `${siteConfig.url}/parts/${item.slug}`, zh: `${siteConfig.url}/zh/parts/${item.slug}`, ms: `${siteConfig.url}/ms/parts/${item.slug}` } } };
}
export default async function Page({ params }: Props) { return <LocalizedPartDetail locale="zh" slug={(await params).slug} />; }
