"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { EntityCard } from "@/components/entity-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Beyblade } from "@/types/database";

type ReleaseCategory = "All" | "Takara Tomy" | "Hasbro" | "Special / Collab";
type BattleType = "All" | Beyblade["type"];
type SortOption = "latest" | "name" | "weight";

const releaseCategories: ReleaseCategory[] = ["All", "Takara Tomy", "Hasbro", "Special / Collab"];
const battleTypes: BattleType[] = ["All", "Attack", "Defense", "Stamina", "Balance"];
const pageSize = 12;

export function BeybladeDatabaseClient({ beyblades }: { beyblades: Beyblade[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ReleaseCategory>("All");
  const [battleType, setBattleType] = useState<BattleType>("All");
  const [sort, setSort] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...beyblades]
      .filter((item) => {
        const matchesQuery =
          !normalizedQuery ||
          [
            item.name,
            item.product_code,
            item.series,
            item.type,
            item.description,
            ...item.recommended_combos
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory = category === "All" || releaseCategory(item) === category;
        const matchesType = battleType === "All" || item.type === battleType;
        return matchesQuery && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "weight") return b.weight - a.weight;
        return b.release_date.localeCompare(a.release_date);
      });
  }, [battleType, beyblades, category, query, sort]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasFilters = Boolean(query) || category !== "All" || battleType !== "All" || sort !== "latest";

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setBattleType("All");
    setSort("latest");
    setVisibleCount(pageSize);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-card p-4 md:p-5" aria-label="Beyblade database filters">
        <div className="flex items-center gap-2 text-sm font-black text-white">
          <SlidersHorizontal className="h-4 w-4 text-sky-300" />
          Find a Beyblade
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_190px_180px]">
          <label className="relative">
            <span className="sr-only">Search Beyblades</span>
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(pageSize);
              }}
              placeholder="Search name, code, series, or combo..."
              className="pl-9"
            />
          </label>
          <label>
            <span className="sr-only">Battle type</span>
            <select
              value={battleType}
              onChange={(event) => {
                setBattleType(event.target.value as BattleType);
                setVisibleCount(pageSize);
              }}
              className="h-10 w-full rounded-md border bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-ring"
            >
              {battleTypes.map((type) => <option key={type} value={type}>{type === "All" ? "All battle types" : type}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort results</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOption);
                setVisibleCount(pageSize);
              }}
              className="h-10 w-full rounded-md border bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="latest">Newest release</option>
              <option value="name">Name A-Z</option>
              <option value="weight">Highest weight</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {releaseCategories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setVisibleCount(pageSize);
              }}
              className={`rounded-md border px-3 py-2 text-xs font-semibold transition ${
                category === item
                  ? "border-sky-300 bg-sky-400 text-slate-950"
                  : "bg-slate-950/50 text-slate-300 hover:border-sky-400/60 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
          {hasFilters ? (
            <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
              Reset
            </button>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          Showing <strong className="text-white">{Math.min(visibleItems.length, filtered.length)}</strong> of{" "}
          <strong className="text-white">{filtered.length}</strong> entries
        </p>
        {category !== "All" ? <Badge>{category}</Badge> : null}
      </div>

      {visibleItems.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleItems.map((item) => (
            <EntityCard
              key={item.id}
              href={`/beyblades/${item.slug}`}
              title={item.name}
              badge={item.product_code || item.type}
              meta={`${cleanSeries(item.series)} / ${item.type} / ${item.weight}g / ${item.release_date}`}
              description={item.description}
              visualType={item.type}
              imageUrl={item.image_url}
              details={[
                `Release: ${releaseCategory(item)}`,
                `Best use: ${bestUseCase(item.type)}`,
                `Beginner ${beginnerRating(item.type)}/5 / Competitive ${competitiveRating(item)}/5`
              ]}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-black text-white">No matching Beyblades</p>
          <p className="mt-2 text-sm text-slate-400">Try a shorter name, product code, different type, or reset the filters.</p>
          <Button type="button" variant="outline" className="mt-4" onClick={resetFilters}>Reset filters</Button>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={() => setVisibleCount((count) => count + pageSize)}>
            Show more ({filtered.length - visibleCount} remaining)
          </Button>
        </div>
      ) : null}

      <section aria-labelledby="catalog-table-title" className="space-y-4">
        <div>
          <h2 id="catalog-table-title" className="text-2xl font-black text-white">Filtered Catalog Table</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">The table follows the filters above for quick code, region, type, weight, and date comparisons.</p>
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
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/70">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sky-200">{item.product_code || "TBA"}</td>
                  <td className="px-4 py-3">
                    <Link href={`/beyblades/${item.slug}`} className="font-semibold text-white hover:text-sky-200">
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{releaseCategory(item)}</td>
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
  );
}

function releaseCategory(item: Pick<Beyblade, "name" | "series">): Exclude<ReleaseCategory, "All"> {
  if (isSpecialRelease(item)) return "Special / Collab";
  if (item.series.includes("Hasbro Release")) return "Hasbro";
  return "Takara Tomy";
}

function isSpecialRelease(item: Pick<Beyblade, "name" | "series">) {
  const value = `${item.name} ${item.series}`.toLowerCase();
  return (
    item.series.includes("Event Release") ||
    item.series.includes("X-Over Project") ||
    [
      "spider-man",
      "venom",
      "iron man",
      "thanos",
      "optimus prime",
      "megatron",
      "luke skywalker",
      "darth vader",
      "mandalorian",
      "eva-"
    ].some((name) => value.includes(name))
  );
}

function cleanSeries(series: string) {
  return series.replace("Beyblade X ", "");
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

function competitiveRating(item: Pick<Beyblade, "name" | "type" | "series">) {
  const name = item.name.toLowerCase();
  if (["phoenix wing", "wizard rod", "impact drake", "silver wolf", "dran buster", "cobalt dragoon"].some((key) => name.includes(key))) return 5;
  if (["shark edge", "unicorn sting", "knight mail", "bahamut blitz", "dran strike"].some((key) => name.includes(key))) return 4;
  if (item.series.includes("Event Release")) return 2;
  return item.type === "Balance" ? 3 : 4;
}
