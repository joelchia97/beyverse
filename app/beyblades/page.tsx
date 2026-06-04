import type { Metadata } from "next";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
import { PageHeading } from "@/components/page-heading";
import { beyblades } from "@/lib/data";

export const metadata: Metadata = {
  title: "Beyblade Database",
  description: "Browse Beyblade profiles with type, weight, release details, strengths, weaknesses, combos, and anime context."
};

export default function BeybladeDatabasePage() {
  return (
    <main>
      <PageHeading title="Beyblade Database" description="A searchable encyclopedia of Beyblade releases, competitive traits, recommended combos, and lore notes." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="grid gap-4 md:grid-cols-2">
          {beyblades.map((item) => (
            <EntityCard key={item.id} href={`/beyblades/${item.slug}`} title={item.name} badge={item.type} meta={`${item.series} / ${item.weight}g`} description={item.description} />
          ))}
        </div>
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </section>
    </main>
  );
}
