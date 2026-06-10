"use client";

import { useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import { EntityCard } from "@/components/entity-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Guide } from "@/types/database";

type SortOption = "latest" | "oldest" | "name";

const pageSize = 12;

export function GuidesDatabaseClient({ guides }: { guides: Guide[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(guides.map((guide) => guide.category))).sort()], [guides]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...guides]
      .filter((guide) => {
        const matchesQuery =
          !normalizedQuery ||
          [guide.title, guide.category, guide.excerpt, guide.content].join(" ").toLowerCase().includes(normalizedQuery);
        return matchesQuery && (category === "All" || guide.category === category);
      })
      .sort((a, b) => {
        if (sort === "name") return a.title.localeCompare(b.title);
        if (sort === "oldest") return a.published_at.localeCompare(b.published_at);
        return b.published_at.localeCompare(a.published_at);
      });
  }, [category, guides, query, sort]);

  const visibleGuides = filtered.slice(0, visibleCount);
  const hasFilters = Boolean(query) || category !== "All" || sort !== "latest";

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setSort("latest");
    setVisibleCount(pageSize);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border bg-card p-4 md:p-5" aria-label="Strategy guide filters">
        <div className="flex items-center gap-2 text-sm font-black text-white">
          <BookOpen className="h-4 w-4 text-sky-300" />
          Find a strategy guide
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_210px_170px]">
          <label className="relative">
            <span className="sr-only">Search strategy guides</span>
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(pageSize);
              }}
              placeholder="Search launch, combo, beginner, meta..."
              className="pl-9"
            />
          </label>
          <label>
            <span className="sr-only">Guide category</span>
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setVisibleCount(pageSize);
              }}
              className="h-10 w-full rounded-md border bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((item) => <option key={item} value={item}>{item === "All" ? "All categories" : item}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Sort guides</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SortOption);
                setVisibleCount(pageSize);
              }}
              className="h-10 w-full rounded-md border bg-slate-950/60 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="latest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Title A-Z</option>
            </select>
          </label>
        </div>
        {hasFilters ? (
          <button type="button" onClick={resetFilters} className="mt-3 inline-flex items-center gap-1 rounded-md py-2 text-xs font-semibold text-slate-400 hover:text-white">
            <X className="h-3.5 w-3.5" />
            Reset filters
          </button>
        ) : null}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          Showing <strong className="text-white">{visibleGuides.length}</strong> of{" "}
          <strong className="text-white">{filtered.length}</strong> guides
        </p>
        {category !== "All" ? <Badge>{category}</Badge> : null}
      </div>

      {visibleGuides.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {visibleGuides.map((guide) => (
            <EntityCard
              key={guide.id}
              href={`/guides/${guide.slug}`}
              title={guide.title}
              badge={guide.category}
              meta={formatDate(guide.published_at)}
              description={guide.excerpt}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-black text-white">No matching guides</p>
          <p className="mt-2 text-sm text-slate-400">Try a broader topic, another category, or reset the filters.</p>
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
    </div>
  );
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric" }).format(date);
}
