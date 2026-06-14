import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { BeybladeDatabaseClient } from "@/components/beyblade-database-client";
import { PageHeading } from "@/components/page-heading";
import { getBeyblades } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "陀螺数据库",
  description: "浏览 Beyblade X 陀螺型号、版本、类型、重量、发售日期、优缺点与推荐组合。",
  alternates: { canonical: `${siteConfig.url}/zh/beyblades`, languages: { en: `${siteConfig.url}/beyblades`, zh: `${siteConfig.url}/zh/beyblades`, ms: `${siteConfig.url}/ms/beyblades` } }
};

export default async function ChineseBeybladesPage() {
  return <main><PageHeading title="陀螺数据库" description="搜索并比较 Beyblade X 型号、官方产品线、战斗类型、重量和组合资料。" /><section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]"><BeybladeDatabaseClient beyblades={await getBeyblades()} locale="zh" /><aside><AdBanner slot="sidebar-ad" label="侧栏广告" className="sticky top-24" /></aside></section></main>;
}
