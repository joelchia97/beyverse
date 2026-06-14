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

type DatabaseLocale = "en" | "zh" | "ms";

const copy = {
  en: {
    find: "Find a Beyblade", search: "Search name, code, series, or combo...", allTypes: "All battle types",
    latest: "Newest release", name: "Name A-Z", weight: "Highest weight", reset: "Reset",
    showing: "Showing", of: "of", entries: "entries", none: "No matching Beyblades",
    noneHelp: "Try a shorter name, product code, different type, or reset the filters.", resetFilters: "Reset filters",
    showMore: "Show more", remaining: "remaining", table: "Filtered Catalog Table",
    tableHelp: "The table follows the filters above for quick code, region, type, weight, and date comparisons.",
    code: "Code", beyblade: "Beyblade", category: "Category", line: "Line", type: "Type", weightLabel: "Weight", release: "Release",
    releaseLabel: "Release", bestUse: "Best use", beginner: "Beginner", competitive: "Competitive",
    categories: { All: "All", "Takara Tomy": "Takara Tomy", Hasbro: "Hasbro", "Special / Collab": "Special / Collab" },
    types: { All: "All", Attack: "Attack", Defense: "Defense", Stamina: "Stamina", Balance: "Balance" }
  },
  zh: {
    find: "寻找陀螺", search: "搜索名称、型号、系列或组合……", allTypes: "所有战斗类型",
    latest: "最新发售", name: "名称 A-Z", weight: "重量最高", reset: "重置",
    showing: "显示", of: "/", entries: "款", none: "没有符合条件的陀螺",
    noneHelp: "尝试缩短名称、输入产品型号、更换类型或重置筛选。", resetFilters: "重置筛选",
    showMore: "显示更多", remaining: "款剩余", table: "筛选目录表",
    tableHelp: "此表会跟随上方筛选，方便比较型号、版本、类型、重量和发售日期。",
    code: "型号", beyblade: "陀螺", category: "版本", line: "产品线", type: "类型", weightLabel: "重量", release: "发售日期",
    releaseLabel: "版本", bestUse: "适合用途", beginner: "新手", competitive: "竞技",
    categories: { All: "全部", "Takara Tomy": "Takara Tomy", Hasbro: "Hasbro", "Special / Collab": "特别版 / 联名款" },
    types: { All: "全部", Attack: "攻击型", Defense: "防御型", Stamina: "持久型", Balance: "平衡型" }
  },
  ms: {
    find: "Cari Beyblade", search: "Cari nama, kod, siri atau kombo...", allTypes: "Semua jenis pertarungan",
    latest: "Keluaran terbaru", name: "Nama A-Z", weight: "Berat tertinggi", reset: "Tetapkan semula",
    showing: "Memaparkan", of: "daripada", entries: "entri", none: "Tiada Beyblade yang sepadan",
    noneHelp: "Cuba nama lebih pendek, kod produk, jenis lain atau tetapkan semula penapis.", resetFilters: "Tetapkan semula penapis",
    showMore: "Papar lagi", remaining: "baki", table: "Jadual Katalog Ditapis",
    tableHelp: "Jadual ini mengikut penapis di atas untuk perbandingan kod, pasaran, jenis, berat dan tarikh.",
    code: "Kod", beyblade: "Beyblade", category: "Kategori", line: "Barisan", type: "Jenis", weightLabel: "Berat", release: "Keluaran",
    releaseLabel: "Keluaran", bestUse: "Kegunaan terbaik", beginner: "Pemula", competitive: "Kompetitif",
    categories: { All: "Semua", "Takara Tomy": "Takara Tomy", Hasbro: "Hasbro", "Special / Collab": "Khas / Kolaborasi" },
    types: { All: "Semua", Attack: "Serangan", Defense: "Pertahanan", Stamina: "Stamina", Balance: "Seimbang" }
  }
} as const;

export function BeybladeDatabaseClient({ beyblades, locale = "en" }: { beyblades: Beyblade[]; locale?: DatabaseLocale }) {
  const text = copy[locale];
  const hrefPrefix = locale === "en" ? "" : `/${locale}`;
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
          {text.find}
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
              placeholder={text.search}
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
              {battleTypes.map((type) => <option key={type} value={type}>{type === "All" ? text.allTypes : text.types[type]}</option>)}
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
              <option value="latest">{text.latest}</option>
              <option value="name">{text.name}</option>
              <option value="weight">{text.weight}</option>
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
              {text.categories[item]}
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
          {text.showing} <strong className="text-white">{Math.min(visibleItems.length, filtered.length)}</strong> {text.of}{" "}
          <strong className="text-white">{filtered.length}</strong> {text.entries}
        </p>
        {category !== "All" ? <Badge>{text.categories[category]}</Badge> : null}
      </div>

      {visibleItems.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleItems.map((item) => (
            <EntityCard
              key={item.id}
              href={`${hrefPrefix}/beyblades/${item.slug}`}
              title={item.name}
              badge={item.product_code || item.type}
              meta={`${cleanSeries(item.series)} / ${text.types[item.type]} / ${item.weight}g / ${item.release_date}`}
              description={item.description}
              visualType={item.type}
              imageUrl={item.image_url}
              details={[
                `${text.releaseLabel}: ${text.categories[releaseCategory(item)]}`,
                `${text.bestUse}: ${bestUseCase(item.type, locale)}`,
                `${text.beginner} ${beginnerRating(item.type)}/5 / ${text.competitive} ${competitiveRating(item)}/5`
              ]}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-black text-white">{text.none}</p>
          <p className="mt-2 text-sm text-slate-400">{text.noneHelp}</p>
          <Button type="button" variant="outline" className="mt-4" onClick={resetFilters}>{text.resetFilters}</Button>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <div className="flex justify-center">
          <Button type="button" variant="outline" onClick={() => setVisibleCount((count) => count + pageSize)}>
            {text.showMore} ({filtered.length - visibleCount} {text.remaining})
          </Button>
        </div>
      ) : null}

      <section aria-labelledby="catalog-table-title" className="space-y-4">
        <div>
          <h2 id="catalog-table-title" className="text-2xl font-black text-white">{text.table}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{text.tableHelp}</p>
        </div>
        <div className="overflow-x-auto rounded-lg border bg-slate-950/70">
          <table className="min-w-[820px] w-full border-collapse text-left text-sm">
            <thead className="border-b bg-slate-900/80 text-xs uppercase text-slate-400">
              <tr>
                <th className="px-4 py-3 font-semibold">{text.code}</th>
                <th className="px-4 py-3 font-semibold">{text.beyblade}</th>
                <th className="px-4 py-3 font-semibold">{text.category}</th>
                <th className="px-4 py-3 font-semibold">{text.line}</th>
                <th className="px-4 py-3 font-semibold">{text.type}</th>
                <th className="px-4 py-3 font-semibold">{text.weightLabel}</th>
                <th className="px-4 py-3 font-semibold">{text.release}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/70">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sky-200">{item.product_code || "TBA"}</td>
                  <td className="px-4 py-3">
                    <Link href={`${hrefPrefix}/beyblades/${item.slug}`} className="font-semibold text-white hover:text-sky-200">
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{text.categories[releaseCategory(item)]}</td>
                  <td className="px-4 py-3 text-slate-300">{cleanSeries(item.series)}</td>
                  <td className="px-4 py-3"><Badge>{text.types[item.type]}</Badge></td>
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

function bestUseCase(type: string, locale: DatabaseLocale) {
  const values = {
    en: {
    Attack: "early knockout pressure",
    Defense: "survive contact and counter overextension",
    Stamina: "spin-finish testing and late-game control",
    Balance: "mixed matchup tuning"
    },
    zh: { Attack: "前期击飞压制", Defense: "承受撞击并反制", Stamina: "持久战与后期控制", Balance: "混合对战调整" },
    ms: { Attack: "tekanan kalah mati awal", Defense: "menahan hentaman dan serangan balas", Stamina: "ujian putaran dan kawalan akhir", Balance: "pelarasan padanan campuran" }
  };
  return values[locale][type as Beyblade["type"]] ?? "general testing";
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
