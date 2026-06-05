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
  return (
    <main>
      <PageHeading title="Beyblade Database" description="A searchable encyclopedia of Beyblade releases, competitive traits, recommended combos, and lore notes." />
      <section className="container-page grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-10">
          <div className="grid gap-4 md:grid-cols-2">
            {beyblades.map((item) => (
              <EntityCard
                key={item.id}
                href={`/beyblades/${item.slug}`}
                title={item.name}
                badge={item.product_code || item.type}
                meta={`${item.series} / ${item.type} / ${item.weight}g`}
                description={item.description}
                visualType={item.type}
                details={[
                  `Parts combo: ${item.name}`,
                  `Best use: ${bestUseCase(item.type)}`,
                  `Beginner ${beginnerRating(item.type)}/5 / Competitive ${competitiveRating(item)}/5`
                ]}
              />
            ))}
          </div>
          <section aria-labelledby="catalog-table-title" className="space-y-4">
            <div>
              <h2 id="catalog-table-title" className="text-2xl font-black text-white">Beyblade Catalog Table</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Reference product codes, release lines, types, weights, and release dates in one scan-friendly view.</p>
            </div>
            <div className="overflow-x-auto rounded-lg border bg-slate-950/70">
              <table className="min-w-[820px] w-full border-collapse text-left text-sm">
                <thead className="border-b bg-slate-900/80 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Code</th>
                    <th className="px-4 py-3 font-semibold">Beyblade</th>
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
                      <td className="px-4 py-3 text-slate-300">{item.series}</td>
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
