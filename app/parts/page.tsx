import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
import { PageHeading } from "@/components/page-heading";
import { parts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Parts Database",
  description: "Browse Beyblade blades, ratchets, and bits with weights, advantages, disadvantages, and recommended uses."
};

export default function PartsDatabasePage() {
  return (
    <main>
      <PageHeading title="Parts Database" description="Compare blades, ratchets, and bits by role, weight, and competitive use case." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-4 md:grid-cols-2">
          {parts.map((item) => (
            <EntityCard key={item.id} href={`/parts/${item.slug}`} title={item.name} badge={item.category} meta={`${item.weight}g`} description={item.description} />
          ))}
        </div>
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </section>
    </main>
  );
}
