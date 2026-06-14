import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { PageHeading } from "@/components/page-heading";
import { PartsDatabaseClient } from "@/components/parts-database-client";
import { getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "零件数据库",
  description: "比较 Beyblade X 刃片、棘轮和轴心的重量、能力、优势、劣势与推荐用途。",
  alternates: { canonical: `${siteConfig.url}/zh/parts`, languages: { en: `${siteConfig.url}/parts`, zh: `${siteConfig.url}/zh/parts`, ms: `${siteConfig.url}/ms/parts` } }
};

export default async function ChinesePartsPage() {
  return <main><PageHeading title="零件数据库" description="按类别、重量和能力比较刃片、棘轮及轴心，帮助规划组合。" /><section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]"><PartsDatabaseClient parts={await getParts()} locale="zh" /><aside><AdBanner slot="sidebar-ad" label="侧栏广告" className="sticky top-24" /></aside></section></main>;
}
