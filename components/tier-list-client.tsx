"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Beyblade, TierListItem } from "@/types/database";

type TierFilter = "All" | TierListItem["tier"];

const tiers: TierListItem["tier"][] = ["S", "A", "B", "C"];
const tierFilters: TierFilter[] = ["All", ...tiers];

export function TierListClient({ tierList, beyblades }: { tierList: TierListItem[]; beyblades: Beyblade[] }) {
  const [activeTier, setActiveTier] = useState<TierFilter>("All");
  const visibleTiers = activeTier === "All" ? tiers : [activeTier];
  const profileMap = useMemo(() => {
    return new Map(
      tierList.map((item) => {
        const normalized = item.name.toLowerCase();
        const match = [...beyblades]
          .sort((a, b) => b.name.length - a.name.length)
          .find((beyblade) => normalized.startsWith(beyblade.name.toLowerCase()));
        return [item.id, match] as const;
      })
    );
  }, [beyblades, tierList]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-sky-300" />
              Filter Tier Results
            </CardTitle>
            <p className="text-sm text-slate-400">{tierList.length} tested combos</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {tierFilters.map((tier) => {
            const count = tier === "All" ? tierList.length : tierList.filter((item) => item.tier === tier).length;
            return (
              <button
                key={tier}
                type="button"
                aria-pressed={activeTier === tier}
                onClick={() => setActiveTier(tier)}
                className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                  activeTier === tier
                    ? "border-sky-300 bg-sky-400 text-slate-950"
                    : "bg-slate-950/50 text-slate-300 hover:border-sky-400/60 hover:text-white"
                }`}
              >
                {tier === "All" ? "All tiers" : `Tier ${tier}`} ({count})
              </button>
            );
          })}
          {activeTier !== "All" ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => setActiveTier("All")}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          ) : null}
        </CardContent>
      </Card>

      {visibleTiers.map((tier) => {
        const entries = tierList.filter((item) => item.tier === tier);
        return (
          <Card key={tier} className={tierCardClass(tier)}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-2xl">Tier {tier}</CardTitle>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{tierDescriptions[tier]}</p>
                </div>
                <Badge className={tierBadgeClass(tier)}>{entries.length} combos</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3">
              {entries.map((item, index) => {
                const profile = profileMap.get(item.id);
                return (
                  <article key={item.id} className="rounded-md border bg-slate-950/55 p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="flex min-w-0 gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-sky-400/25 bg-sky-400/10 text-sm font-black text-sky-100">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <h2 className="font-black text-white">{item.name}</h2>
                          <p className="mt-1 text-sm leading-6 text-slate-400">{item.notes}</p>
                        </div>
                      </div>
                      <Badge>{item.format}</Badge>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-3">
                      <p><span className="font-semibold text-sky-200">Why here:</span> {tierReason(tier)}</p>
                      <p><span className="font-semibold text-sky-200">Best test:</span> {testPlanFor(item.name)}</p>
                      <p><span className="font-semibold text-sky-200">Watch for:</span> {riskFor(tier)}</p>
                    </div>
                    {profile ? (
                      <Link
                        href={`/beyblades/${profile.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-300 hover:text-sky-100"
                      >
                        View {profile.name} profile
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <p className="mt-4 text-xs text-slate-500">A matching Beyblade profile is not yet linked for this combo.</p>
                    )}
                  </article>
                );
              })}
              {entries.length === 0 ? (
                <div className="rounded-md border border-dashed border-slate-700 p-6 text-center">
                  <p className="font-semibold text-slate-300">No current Tier {tier} entries</p>
                  <p className="mt-2 text-sm text-slate-500">This tier remains available for future testing notes.</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

const tierDescriptions = {
  S: "Top testing priorities with strong win conditions and high benchmark value.",
  A: "Strong practical choices that still benefit from matchup-aware tuning.",
  B: "Useful role players with more dependence on launch quality and matchup.",
  C: "Experimental or limited builds that need more repeated testing."
};

function tierReason(tier: TierListItem["tier"]) {
  return {
    S: "Clear win condition with high pressure or strong consistency.",
    A: "Reliable enough to test seriously, but not always universal.",
    B: "Can work, but matchup and launch quality matter heavily.",
    C: "Needs more proof before it becomes a stable recommendation."
  }[tier];
}

function riskFor(tier: TierListItem["tier"]) {
  return {
    S: "Overconfidence into counter-matchups.",
    A: "Losing value if tuned too generally.",
    B: "Poor results outside its preferred matchup.",
    C: "Inconsistent performance across repeated sets."
  }[tier];
}

function testPlanFor(name: string) {
  if (name.toLowerCase().includes("rod") || name.toLowerCase().includes("wolf") || name.toLowerCase().includes("arrow")) {
    return "Run stamina benchmark sets against heavy attack.";
  }
  if (name.toLowerCase().includes("phoenix") || name.toLowerCase().includes("shark") || name.toLowerCase().includes("drake")) {
    return "Track clean knockouts versus self-KO risk.";
  }
  return "Run mixed matchup sets and record win condition.";
}

function tierCardClass(tier: TierListItem["tier"]) {
  return {
    S: "border-amber-400/35",
    A: "border-sky-400/30",
    B: "border-emerald-400/25",
    C: "border-slate-600"
  }[tier];
}

function tierBadgeClass(tier: TierListItem["tier"]) {
  return {
    S: "border-amber-300/40 bg-amber-300/10 text-amber-100",
    A: "border-sky-300/40 bg-sky-300/10 text-sky-100",
    B: "border-emerald-300/40 bg-emerald-300/10 text-emerald-100",
    C: "border-slate-400/40 bg-slate-400/10 text-slate-200"
  }[tier];
}
