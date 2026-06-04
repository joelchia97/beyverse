import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";
import { homeTranslations } from "@/lib/home-translations";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "BEYBUKU Bahasa Melayu",
  description: "BEYBUKU Bahasa Melayu untuk data Beyblade X, parts database, combo builder, panduan strategi, nota meta dan lore anime.",
  alternates: {
    canonical: `${siteConfig.url}/ms`,
    languages: {
      en: siteConfig.url,
      zh: `${siteConfig.url}/zh`,
      ms: `${siteConfig.url}/ms`
    }
  }
};

export default function MalayHomePage() {
  return <HomePageContent copy={homeTranslations.ms} />;
}
