import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { PageHeading } from "@/components/page-heading";
import { PartsDatabaseClient } from "@/components/parts-database-client";
import { getParts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Parts Database",
  description: "Browse Beyblade blades, ratchets, and bits with weights, advantages, disadvantages, and recommended uses."
};

export default async function PartsDatabasePage() {
  const parts = await getParts();
  return (
    <main>
      <PageHeading title="Parts Database" description="Compare blades, ratchets, and bits by role, weight, and competitive use case." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <PartsDatabaseClient parts={parts} />
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </section>
    </main>
  );
}
