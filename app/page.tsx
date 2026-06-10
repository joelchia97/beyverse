import type { Metadata } from "next";
import { HomePageContent } from "@/components/home-page-content";
import { homeTranslations } from "@/lib/home-translations";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: siteConfig.url,
      zh: `${siteConfig.url}/zh`,
      ms: `${siteConfig.url}/ms`
    }
  },
  openGraph: {
    url: siteConfig.url
  }
};

export default function HomePage() {
  return <HomePageContent copy={homeTranslations.en} />;
}
