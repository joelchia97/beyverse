import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { BeybladeDatabaseClient } from "@/components/beyblade-database-client";
import { PageHeading } from "@/components/page-heading";
import { getBeyblades } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pangkalan Data Beyblade",
  description: "Semak model, keluaran, jenis, berat, tarikh, kekuatan, kelemahan dan kombo Beyblade X.",
  alternates: { canonical: `${siteConfig.url}/ms/beyblades`, languages: { en: `${siteConfig.url}/beyblades`, zh: `${siteConfig.url}/zh/beyblades`, ms: `${siteConfig.url}/ms/beyblades` } }
};

export default async function MalayBeybladesPage() {
  return <main><PageHeading title="Pangkalan Data Beyblade" description="Cari dan bandingkan model, barisan produk, jenis pertarungan, berat dan kombo Beyblade X." /><section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]"><BeybladeDatabaseClient beyblades={await getBeyblades()} locale="ms" /><aside><AdBanner slot="sidebar-ad" label="Iklan sisi" className="sticky top-24" /></aside></section></main>;
}
