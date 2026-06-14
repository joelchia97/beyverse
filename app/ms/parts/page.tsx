import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { PageHeading } from "@/components/page-heading";
import { PartsDatabaseClient } from "@/components/parts-database-client";
import { getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pangkalan Data Parts",
  description: "Bandingkan berat, statistik, kelebihan, kekurangan dan kegunaan Blade, Ratchet dan Bit Beyblade X.",
  alternates: { canonical: `${siteConfig.url}/ms/parts`, languages: { en: `${siteConfig.url}/parts`, zh: `${siteConfig.url}/zh/parts`, ms: `${siteConfig.url}/ms/parts` } }
};

export default async function MalayPartsPage() {
  return <main><PageHeading title="Pangkalan Data Parts" description="Bandingkan Blade, Ratchet dan Bit mengikut kategori, berat, statistik dan kegunaan kompetitif." /><section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]"><PartsDatabaseClient parts={await getParts()} locale="ms" /><aside><AdBanner slot="sidebar-ad" label="Iklan sisi" className="sticky top-24" /></aside></section></main>;
}
