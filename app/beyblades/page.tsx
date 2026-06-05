import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { getBeyblades } from "@/lib/content";

export const metadata: Metadata = {
  title: "Beyblade Database",
  description: "Browse Beyblade profiles with type, weight, release details, strengths, weaknesses, combos, and anime context."
};

export default async function BeybladeDatabasePage() {
  const beyblades = await getBeyblades();
  const groups = [
    {
      title: "Takara Tomy Releases",
      description: "Main Japanese Beyblade X releases, including BX, UX, CX, and X-Over catalog entries.",
      items: beyblades.filter((item) => isTakaraTomyRelease(item.series))
    },
    {
      title: "Hasbro Releases",
      description: "Western-market Hasbro releases with localized names, product codes, boosters, dual packs, and store-facing names.",
      items: beyblades.filter((item) => item.series.includes("Hasbro Release"))
    },
    {
      title: "Special, Event, and Collaboration Releases",
      description: "Limited, event, collaboration, and themed releases that are useful for collectors and search reference.",
      items: beyblades.filter((item) => isSpecialRelease(item.series))
    }
  ].filter((group) => group.items.length > 0);

  return (
    <main>
      <PageHeading title="Beyblade Database" description="A searchable encyclopedia of Beyblade releases, competitive traits, recommended combos, and lore notes." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          <div className="grid gap-4 md:grid-cols-3">
            {groups.map((group) => (
              <a key={group.title} href={`#${sectionId(group.title)}`} className="rounded-lg border bg-card p-4 transition hover:border-sky-400/60 hover:bg-slate-900">
                <p className="text-lg font-black text-white">{group.title}</p>
                <p className="mt-2 text-sm text-slate-400">{group.items.length} entries</p>
              </a>
            ))}
          </div>

          {groups.map((group) => (
            <section key={group.title} id={sectionId(group.title)} className="scroll-mt-24 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-black text-white">{group.title}</h2>
                  <Badge>{group.items.length} entries</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-400">{group.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {group.items.map((item) => (
                  <EntityCard
                    key={item.id}
                    href={`/beyblades/${item.slug}`}
                    title={item.name}
                    badge={item.product_code || item.type}
                    meta={`${cleanSeries(item.series)} / ${item.type} / ${item.weight}g`}
                    description={item.description}
                    visualType={item.type}
                    imageUrl={item.image_url}
                    details={[
                      `Parts combo: ${item.name}`,
                      `Best use: ${bestUseCase(item.type)}`,
                      `Beginner ${beginnerRating(item.type)}/5 / Competitive ${competitiveRating(item)}/5`
                    ]}
                  />
                ))}
              </div>
            </section>
          ))}
          <section aria-labelledby="catalog-table-title" className="space-y-4">
            <div>
              <h2 id="catalog-table-title" className="text-2xl font-black text-white">Beyblade Catalog Table</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Reference product codes, release lines, regions, types, weights, and release dates in one scan-friendly view.</p>
            </div>
            <div className="overflow-x-auto rounded-lg border bg-slate-950/70">
              <table className="min-w-[820px] w-full border-collapse text-left text-sm">
                <thead className="border-b bg-slate-900/80 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Code</th>
                    <th className="px-4 py-3 font-semibold">Beyblade</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Line</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Weight</th>
                    <th className="px-4 py-3 font-semibold">Release</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {beyblades.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/70">
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-sky-200">{item.product_code || "TBA"}</td>
                      <td className="px-4 py-3">
                        <Link href={`/beyblades/${item.slug}`} className="font-semibold text-white hover:text-sky-200">
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-slate-300">{catalogCategory(item.series)}</td>
                      <td className="px-4 py-3 text-slate-300">{cleanSeries(item.series)}</td>
                      <td className="px-4 py-3"><Badge>{item.type}</Badge></td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">{item.weight}g</td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">{item.release_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </section>
    </main>
  );
}

function bestUseCase(type: string) {
  return {
    Attack: "early knockout pressure",
    Defense: "survive contact and counter overextension",
    Stamina: "spin-finish testing and late-game control",
    Balance: "mixed matchup tuning"
  }[type] ?? "general testing";
}

function beginnerRating(type: string) {
  return { Attack: 3, Defense: 4, Stamina: 5, Balance: 4 }[type] ?? 3;
}

function competitiveRating(item: { name: string; type: string; series: string }) {
  const name = item.name.toLowerCase();
  if (["phoenix wing", "wizard rod", "impact drake", "silver wolf", "dran buster", "cobalt dragoon"].some((key) => name.includes(key))) return 5;
  if (["shark edge", "unicorn sting", "knight mail", "bahamut blitz", "dran strike"].some((key) => name.includes(key))) return 4;
  if (item.series.includes("Event Release")) return 2;
  return item.type === "Balance" ? 3 : 4;
}

function isTakaraTomyRelease(series: string) {
  return !series.includes("Hasbro Release") && !isSpecialRelease(series);
}

function isSpecialRelease(series: string) {
  return series.includes("Event Release") || series.includes("X-Over Project");
}

function cleanSeries(series: string) {
  return series.replace("Beyblade X ", "");
}

function catalogCategory(series: string) {
  if (series.includes("Hasbro Release")) return "Hasbro";
  if (isSpecialRelease(series)) return "Special / Collab";
  return "Takara Tomy";
}

function sectionId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
