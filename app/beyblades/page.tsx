import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { BeybladeDatabaseClient } from "@/components/beyblade-database-client";
import { PageHeading } from "@/components/page-heading";
import { getBeyblades } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Beyblade Database",
  description: "Browse Beyblade profiles with type, weight, release details, strengths, weaknesses, combos, and anime context.",
  alternates: { canonical: `${siteConfig.url}/beyblades`, languages: { en: `${siteConfig.url}/beyblades`, zh: `${siteConfig.url}/zh/beyblades`, ms: `${siteConfig.url}/ms/beyblades` } }
};

export default async function BeybladeDatabasePage() {
  const beyblades = await getBeyblades();

  return (
    <main>
      <PageHeading title="Beyblade Database" description="A searchable encyclopedia of Beyblade releases, competitive traits, recommended combos, and lore notes." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <BeybladeDatabaseClient beyblades={beyblades} />
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </section>
    </main>
  );
}
