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

type DatabaseLocale = "en" | "zh" | "ms";
const copy = {
  en: { find: "Find and compare parts", search: "Search part name, role, advantage, or use...", name: "Name A-Z", weight: "Highest weight", weightLabel: "Weight", attack: "Highest attack", attackLabel: "Attack", defense: "Highest defense", defenseLabel: "Defense", stamina: "Highest stamina", staminaLabel: "Stamina", balance: "Highest balance", balanceLabel: "Balance", partLabel: "Part", reset: "Reset", showing: "Showing", of: "of", parts: "parts", none: "No matching parts", help: "Try another name, role, category, or reset the filters.", resetFilters: "Reset filters", more: "Show more", remaining: "remaining", table: "Filtered Parts Table", tableHelp: "The comparison table follows the filters above for faster combo planning.", category: "Category", recommended: "Recommended Uses", all: "All parts", labels: { Blade: "Blade", Ratchet: "Ratchet", Bit: "Bit" }, function: "Function", best: "Best use", beginner: "Beginner", competitive: "Competitive" },
  zh: { find: "寻找及比较零件", search: "搜索零件名称、定位、优点或用途……", name: "名称 A-Z", weight: "重量最高", weightLabel: "重量", attack: "攻击最高", attackLabel: "攻击", defense: "防御最高", defenseLabel: "防御", stamina: "持久最高", staminaLabel: "持久", balance: "平衡最高", balanceLabel: "平衡", partLabel: "零件", reset: "重置", showing: "显示", of: "/", parts: "个零件", none: "没有符合条件的零件", help: "尝试其他名称、定位、类别或重置筛选。", resetFilters: "重置筛选", more: "显示更多", remaining: "个剩余", table: "筛选零件表", tableHelp: "比较表会跟随上方筛选，方便规划组合。", category: "类别", recommended: "推荐用途", all: "全部零件", labels: { Blade: "刃片", Ratchet: "棘轮", Bit: "轴心" }, function: "功能", best: "适合用途", beginner: "新手", competitive: "竞技" },
  ms: { find: "Cari dan bandingkan parts", search: "Cari nama, peranan, kelebihan atau kegunaan...", name: "Nama A-Z", weight: "Berat tertinggi", weightLabel: "Berat", attack: "Serangan tertinggi", attackLabel: "Serangan", defense: "Pertahanan tertinggi", defenseLabel: "Pertahanan", stamina: "Stamina tertinggi", staminaLabel: "Stamina", balance: "Keseimbangan tertinggi", balanceLabel: "Keseimbangan", partLabel: "Part", reset: "Tetapkan semula", showing: "Memaparkan", of: "daripada", parts: "parts", none: "Tiada parts yang sepadan", help: "Cuba nama, peranan atau kategori lain, atau tetapkan semula penapis.", resetFilters: "Tetapkan semula penapis", more: "Papar lagi", remaining: "baki", table: "Jadual Parts Ditapis", tableHelp: "Jadual perbandingan mengikut penapis di atas untuk perancangan kombo yang lebih pantas.", category: "Kategori", recommended: "Kegunaan Disyorkan", all: "Semua parts", labels: { Blade: "Blade", Ratchet: "Ratchet", Bit: "Bit" }, function: "Fungsi", best: "Kegunaan terbaik", beginner: "Pemula", competitive: "Kompetitif" }
} as const;

export function PartsDatabaseClient({ parts, locale = "en" }: { parts: Part[]; locale?: DatabaseLocale }) {
  const text = copy[locale];
  const hrefPrefix = locale === "en" ? "" : `/${locale}`;
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
          {text.find}
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
              placeholder={text.search}
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
              <option value="name">{text.name}</option>
              <option value="weight">{text.weight}</option>
              <option value="attack">{text.attack}</option>
              <option value="defense">{text.defense}</option>
              <option value="stamina">{text.stamina}</option>
              <option value="balance">{text.balance}</option>
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
              {item === "All" ? text.all : text.labels[item]}
            </button>
          ))}
          {hasFilters ? (
            <button type="button" onClick={resetFilters} className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
              {text.reset}
            </button>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          {text.showing} <strong className="text-white">{visibleItems.length}</strong> {text.of}{" "}
          <strong className="text-white">{filtered.length}</strong> {text.parts}
        </p>
        {category !== "All" ? <Badge>{text.labels[category]}</Badge> : null}
      </div>

      {visibleItems.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleItems.map((item) => (
            <EntityCard
              key={item.id}
              href={`${hrefPrefix}/parts/${item.slug}`}
              title={item.name}
              badge={text.labels[item.category]}
              meta={`${item.weight}g / A${item.attack} D${item.defense} S${item.stamina} B${item.balance}`}
              description={item.description}
              details={[
                `${text.function}: ${partFunction(item.category, locale)}`,
                `${text.best}: ${item.recommended_uses[0] || "general combo testing"}`,
                `${text.beginner} ${beginnerValue(item.category)}/5 / ${text.competitive} ${competitiveValue(item)}/5`
              ]}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-black text-white">{text.none}</p>
          <p className="mt-2 text-sm text-slate-400">{text.help}</p>
          <Button type="button" variant="outline" className="mt-4" onClick={resetFilters}>{text.resetFilters}</Button>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={() => setVisibleCount((count) => count + pageSize)}>
            {text.more} ({filtered.length - visibleCount} {text.remaining})
          </Button>
        </div>
      ) : null}

      <section aria-labelledby="parts-table-title" className="space-y-4">
        <div>
          <h2 id="parts-table-title" className="text-2xl font-black text-white">{text.table}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text.tableHelp}</p>
        </div>
        <div className="overflow-x-auto rounded-lg border bg-slate-950/70">
          <table className="min-w-[920px] w-full border-collapse text-left text-sm">
            <thead className="border-b bg-slate-900/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">{text.partLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.category}</th>
                <th className="px-4 py-3 font-semibold">{text.weightLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.attackLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.defenseLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.staminaLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.balanceLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.recommended}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/70">
                  <td className="px-4 py-3">
                    <Link href={`${hrefPrefix}/parts/${item.slug}`} className="font-semibold text-white hover:text-sky-200">
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3"><Badge>{text.labels[item.category]}</Badge></td>
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

function partFunction(category: string, locale: DatabaseLocale) {
  const values = {
    en: { Blade: "main contact shape and battle identity", Ratchet: "height, exposure, and burst-risk tuning", Bit: "movement, stamina behavior, and launch feel" },
    zh: { Blade: "主要撞击形状与战斗定位", Ratchet: "高度、暴露程度与爆裂风险调整", Bit: "移动、持久表现与发射手感" },
    ms: { Blade: "bentuk sentuhan utama dan identiti pertarungan", Ratchet: "pelarasan tinggi, pendedahan dan risiko burst", Bit: "pergerakan, stamina dan rasa pelancaran" }
  };
  return values[locale][category as Part["category"]] ?? "combo tuning";
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
