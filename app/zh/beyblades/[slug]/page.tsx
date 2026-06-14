import type { Metadata } from "next";
import { LocalizedBeybladeDetail } from "@/components/localized/localized-database-detail";
import { beyblades } from "@/lib/data";
import { getBeybladeBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return beyblades.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getBeybladeBySlug((await params).slug); if (!item) return {};
  return { title: `${item.name} 中文资料`, description: item.description, alternates: { canonical: `${siteConfig.url}/zh/beyblades/${item.slug}`, languages: { en: `${siteConfig.url}/beyblades/${item.slug}`, zh: `${siteConfig.url}/zh/beyblades/${item.slug}`, ms: `${siteConfig.url}/ms/beyblades/${item.slug}` } } };
}
export default async function Page({ params }: Props) { return <LocalizedBeybladeDetail locale="zh" slug={(await params).slug} />; }
