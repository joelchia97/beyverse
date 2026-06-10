import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { EntityCard } from "@/components/entity-card";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getBeyblades, getCombos, getGuides, getParts } from "@/lib/content";
import type { Beyblade, Combo, Guide, Part } from "@/types/database";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the BEYBUKU encyclopedia across Beyblades, parts, and strategy guides.",
  robots: {
    index: false,
    follow: true
  }
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const [beyblades, parts, guides, combos] = await Promise.all([getBeyblades(), getParts(), getGuides(), getCombos()]);
  const query = normalizeSearch(q);
  const beybladeResults = query ? beyblades.filter((item) => matchesBeyblade(item, query)) : beyblades.slice(0, 8);
  const partResults = query ? parts.filter((item) => matchesPart(item, query)) : parts.slice(0, 8);
  const guideResults = query ? guides.filter((item) => matchesGuide(item, query)) : guides.slice(0, 6);
  const comboResults = query ? combos.filter((item) => matchesCombo(item, query)) : combos.slice(0, 6);
  const resultCount = beybladeResults.length + partResults.length + guideResults.length + comboResults.length;

  return (
    <main>
      <PageHeading title="Search BEYBUKU" description="Find Beyblades, parts, guides, combo notes, and lore entries." />
      <section className="container-page">
        <form className="flex gap-3">
          <Input name="q" defaultValue={q} placeholder="Search by name, code, part, guide, or combo..." className="h-12" />
          <button className="inline-flex h-12 items-center gap-2 rounded-md bg-sky-400 px-5 font-bold text-slate-950">
            <Search className="h-4 w-4" />
            Search
          </button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <span>{q ? `${resultCount} results for "${q}"` : "Showing popular encyclopedia entries"}</span>
          <SearchHint label="UX-03" />
          <SearchHint label="Wizard Rod" />
          <SearchHint label="Flat" />
          <SearchHint label="Launch" />
        </div>
        {resultCount ? (
          <div className="mt-8 space-y-10">
            <SearchSection title="Beyblades" count={beybladeResults.length}>
              {beybladeResults.map((item) => (
                <EntityCard
                  key={item.id}
                  href={`/beyblades/${item.slug}`}
                  title={item.name}
                  badge={item.product_code || item.type}
                  meta={`${item.series} / ${item.type} / ${item.weight}g / ${item.release_date}`}
                  description={item.description}
                  visualType={item.type}
                />
              ))}
            </SearchSection>
            <SearchSection title="Parts" count={partResults.length}>
              {partResults.map((item) => (
                <EntityCard
                  key={item.id}
                  href={`/parts/${item.slug}`}
                  title={item.name}
                  badge={item.category}
                  meta={`${item.weight}g / A${item.attack} D${item.defense} S${item.stamina} B${item.balance}`}
                  description={item.description}
                />
              ))}
            </SearchSection>
            <SearchSection title="Guides" count={guideResults.length}>
              {guideResults.map((item) => (
                <EntityCard key={item.id} href={`/guides/${item.slug}`} title={item.title} badge={item.category} meta={item.published_at} description={item.excerpt} />
              ))}
            </SearchSection>
            <SearchSection title="Combos" count={comboResults.length}>
              {comboResults.map((item) => (
                <ComboResult key={item.id} combo={item} />
              ))}
            </SearchSection>
          </div>
        ) : (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>No results found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
              <p>Try searching a shorter name, a product code like UX-03, a part category like Bit, or a guide topic like launch control.</p>
              <div className="flex flex-wrap gap-2">
                <SearchHint label="BX-01" />
                <SearchHint label="Phoenix Wing" />
                <SearchHint label="Rush" />
                <SearchHint label="Stamina" />
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}

function SearchSection({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  if (!count) return null;

  return (
    <section aria-labelledby={`${title.toLowerCase()}-results`}>
      <div className="mb-4 flex items-center gap-3">
        <h2 id={`${title.toLowerCase()}-results`} className="text-2xl font-black text-white">{title}</h2>
        <Badge>{count}</Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function SearchHint({ label }: { label: string }) {
  return (
    <Link href={`/search?q=${encodeURIComponent(label)}`} className="rounded-sm border border-sky-400/25 bg-sky-400/10 px-2 py-1 text-xs font-semibold text-sky-100 hover:bg-sky-400/20">
      {label}
    </Link>
  );
}

function ComboResult({ combo }: { combo: Combo }) {
  return (
    <Card className="h-full transition hover:border-sky-400/60 hover:bg-slate-900">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{combo.name}</CardTitle>
          <Badge>{combo.rating}</Badge>
        </div>
        <p className="text-sm text-slate-400">{combo.play_style}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-300">{combo.blade} / {combo.ratchet} / {combo.bit}</p>
      </CardContent>
    </Card>
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

function searchText(values: Array<string | number | string[]>) {
  return values.flat().join(" ").toLowerCase();
}

function matchesBeyblade(item: Beyblade, query: string) {
  return searchText([
    item.name,
    item.product_code,
    item.series,
    item.type,
    item.weight,
    item.release_date,
    item.description,
    item.strengths,
    item.weaknesses,
    item.recommended_combos,
    item.anime_info
  ]).includes(query);
}

function matchesPart(item: Part, query: string) {
  return searchText([
    item.name,
    item.category,
    item.weight,
    item.description,
    item.advantages,
    item.disadvantages,
    item.recommended_uses,
    item.attack,
    item.defense,
    item.stamina,
    item.balance
  ]).includes(query);
}

function matchesGuide(item: Guide, query: string) {
  return searchText([item.title, item.category, item.excerpt, item.content, item.published_at]).includes(query);
}

function matchesCombo(item: Combo, query: string) {
  return searchText([item.name, item.blade, item.ratchet, item.bit, item.play_style, item.rating]).includes(query);
}
