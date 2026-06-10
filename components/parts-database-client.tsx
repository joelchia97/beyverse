"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { EntityCard } from "@/components/entity-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Part } from "@/types/database";

type PartCategory = "All" | Part["category"];
type SortOption = "name" | "weight" | "attack" | "defense" | "stamina" | "balance";

const categories: PartCategory[] = ["All", "Blade", "Ratchet", "Bit"];
const pageSize = 16;

export function PartsDatabaseClient({ parts }: { parts: Part[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PartCategory>("All");
  const [sort, setSort] = useState<SortOption>("name");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...parts]
      .filter((item) => {
        const matchesQuery =
          !normalizedQuery ||
          [
            item.name,
            item.category,
            item.description,
            ...item.advantages,
            ...item.disadvantages,
            ...item.recommended_uses
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);
        return matchesQuery && (category === "All" || item.category === category);
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        return b[sort] - a[sort] || a.name.localeCompare(b.name);
      });
  }, [category, parts, query, sort]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasFilters = Boolean(query) || category !== "All" || sort !== "name";

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSort("name");
    setVisibleCount(pageSize);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-card p-4 md:p-5" aria-label="Parts database filters">
        <div className="flex items-center gap-2 text-sm font-black text-white">
          <SlidersHorizontal className="h-4 w-4 text-sky-300" />
          Find and compare parts
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative">
            <span className="sr-only">Search parts</span>
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(pageSize);
              }}
              placeholder="Search part name, role, advantage, or use..."
              className="pl-9"
            />
          </label>
          <label>
            <span className="sr-only">Sort parts</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOption);
                setVisibleCount(pageSize);
              }}
              className="h-10 w-full rounded-md border bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="name">Name A-Z</option>
              <option value="weight">Highest weight</option>
              <option value="attack">Highest attack</option>
              <option value="defense">Highest defense</option>
              <option value="stamina">Highest stamina</option>
              <option value="balance">Highest balance</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((item) => (
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
              {item === "All" ? "All parts" : item}
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
          Showing <strong className="text-white">{visibleItems.length}</strong> of{" "}
          <strong className="text-white">{filtered.length}</strong> parts
        </p>
        {category !== "All" ? <Badge>{category}</Badge> : null}
      </div>

      {visibleItems.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleItems.map((item) => (
            <EntityCard
              key={item.id}
              href={`/parts/${item.slug}`}
              title={item.name}
              badge={item.category}
              meta={`${item.weight}g / A${item.attack} D${item.defense} S${item.stamina} B${item.balance}`}
              description={item.description}
              details={[
                `Function: ${partFunction(item.category)}`,
                `Best use: ${item.recommended_uses[0] || "general combo testing"}`,
                `Beginner ${beginnerValue(item.category)}/5 / Competitive ${competitiveValue(item)}/5`
              ]}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-black text-white">No matching parts</p>
          <p className="mt-2 text-sm text-slate-400">Try another name, role, category, or reset the filters.</p>
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

      <section aria-labelledby="parts-table-title" className="space-y-4">
        <div>
          <h2 id="parts-table-title" className="text-2xl font-black text-white">Filtered Parts Table</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">The comparison table follows the filters above for faster combo planning.</p>
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
              {filtered.map((item) => (
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

function competitiveValue(item: Pick<Part, "category" | "attack" | "defense" | "stamina" | "balance">) {
  const highest = Math.max(item.attack, item.defense, item.stamina, item.balance);
  if (highest >= 9) return 5;
  if (highest >= 7) return 4;
  return item.category === "Ratchet" ? 3 : 2;
}
