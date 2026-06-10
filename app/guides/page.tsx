import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { GuidesDatabaseClient } from "@/components/guides-database-client";
import { PageHeading } from "@/components/page-heading";
import { getGuides } from "@/lib/content";

export const metadata: Metadata = {
  title: "Strategy Guides",
  description: "Beyblade strategy guides for launch control, combo theory, matchup planning, and tournament prep."
};

export default async function GuidesPage() {
  const guides = await getGuides();
  return (
    <main>
      <PageHeading title="Strategy Guides" description="Learn launch patterns, combo construction, matchup planning, and meta preparation." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <GuidesDatabaseClient guides={guides} />
        <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
      </section>
    </main>
  );
}
