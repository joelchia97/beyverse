import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
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
        <div className="grid gap-4 md:grid-cols-2">
          {guides.map((guide) => (
            <EntityCard key={guide.id} href={`/guides/${guide.slug}`} title={guide.title} badge={guide.category} meta={guide.published_at} description={guide.excerpt} />
          ))}
        </div>
        <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
      </section>
    </main>
  );
}
