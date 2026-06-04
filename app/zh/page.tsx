import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";
import { homeTranslations } from "@/lib/home-translations";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BeyVerse 中文",
  description: "BeyVerse 中文版，提供 Beyblade X 陀螺资料、零件数据库、组合构建器、攻略文章、Meta 笔记和动画设定。",
  alternates: {
    canonical: `${siteConfig.url}/zh`,
    languages: {
      en: siteConfig.url,
      zh: `${siteConfig.url}/zh`,
      ms: `${siteConfig.url}/ms`
    }
  }
};

export default function ChineseHomePage() {
  return <HomePageContent copy={homeTranslations.zh} />;
}
