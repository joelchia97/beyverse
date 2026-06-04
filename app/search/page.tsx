import type { Metadata } from "next";
import { Search } from "lucide-react";
import { EntityCard } from "@/components/entity-card";
import { PageHeading } from "@/components/page-heading";
import { Input } from "@/components/ui/input";
import { beyblades, guides, parts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the BeyVerse encyclopedia across Beyblades, parts, and strategy guides."
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase();
  const results = [
    ...beyblades.map((item) => ({ href: `/beyblades/${item.slug}`, title: item.name, badge: "Beyblade", description: item.description })),
    ...parts.map((item) => ({ href: `/parts/${item.slug}`, title: item.name, badge: item.category, description: item.description })),
    ...guides.map((item) => ({ href: `/guides/${item.slug}`, title: item.title, badge: "Guide", description: item.excerpt }))
  ].filter((item) => !query || `${item.title} ${item.badge} ${item.description}`.toLowerCase().includes(query));

  return (
    <main>
      <PageHeading title="Search BeyVerse" description="Find Beyblades, parts, guides, combo notes, and lore entries." />
      <section className="container-page">
        <form className="flex gap-3">
          <Input name="q" defaultValue={q} placeholder="Search BeyVerse..." className="h-12" />
          <button className="inline-flex h-12 items-center gap-2 rounded-md bg-sky-400 px-5 font-bold text-slate-950">
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {results.map((item) => <EntityCard key={item.href} {...item} />)}
        </div>
      </section>
    </main>
  );
}
