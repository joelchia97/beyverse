import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
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
        <div className="space-y-10">
          <div className="grid gap-4 md:grid-cols-2">
            {parts.map((item) => (
              <EntityCard
                key={item.id}
                href={`/parts/${item.slug}`}
                title={item.name}
                badge={item.category}
                meta={`${item.weight}g / A${item.attack} D${item.defense} S${item.stamina} C${item.balance}`}
                description={item.description}
                details={[
                  `Function: ${partFunction(item.category)}`,
                  `Best use: ${item.recommended_uses[0]}`,
                  `Beginner ${beginnerValue(item.category)}/5 / Competitive ${competitiveValue(item)}/5`
                ]}
              />
            ))}
          </div>
          <section aria-labelledby="parts-table-title" className="space-y-4">
            <div>
              <h2 id="parts-table-title" className="text-2xl font-black text-white">Parts Catalog Table</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Compare Blade, Ratchet, and Bit stats in one reference table for faster combo planning.</p>
            </div>
            <div className="overflow-x-auto rounded-lg border bg-slate-950/70">
              <table className="min-w-[920px] w-full border-collapse text-left text-sm">
                <thead className="border-b bg-slate-900/80 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Part</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Weight</th>
                    <th className="px-4 py-3 font-semibold">Attack</th>
                    <th className="px-4 py-3 font-semibold">Defense</th>
                    <th className="px-4 py-3 font-semibold">Stamina</th>
                    <th className="px-4 py-3 font-semibold">Balance</th>
                    <th className="px-4 py-3 font-semibold">Recommended Uses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {parts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/70">
                      <td className="px-4 py-3">
                        <Link href={`/parts/${item.slug}`} className="font-semibold text-white hover:text-sky-200">
                          {item.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3"><Badge>{item.category}</Badge></td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-300">{item.weight}g</td>
                      <td className="px-4 py-3 font-mono text-sky-200">{item.attack}</td>
                      <td className="px-4 py-3 font-mono text-sky-200">{item.defense}</td>
                      <td className="px-4 py-3 font-mono text-sky-200">{item.stamina}</td>
                      <td className="px-4 py-3 font-mono text-sky-200">{item.balance}</td>
                      <td className="px-4 py-3 text-slate-300">{item.recommended_uses.slice(0, 3).join(", ")}</td>
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

function partFunction(category: string) {
  return {
    Blade: "main contact shape and battle identity",
    Ratchet: "height, exposure, and burst-risk tuning",
    Bit: "movement, stamina behavior, and launch feel"
  }[category] ?? "combo tuning";
}

function beginnerValue(category: string) {
  return { Blade: 4, Ratchet: 3, Bit: 5 }[category] ?? 3;
}

function competitiveValue(item: { category: string; attack: number; defense: number; stamina: number; balance: number }) {
  const highest = Math.max(item.attack, item.defense, item.stamina, item.balance);
  if (highest >= 9) return 5;
  if (highest >= 7) return 4;
  return item.category === "Ratchet" ? 3 : 2;
}
