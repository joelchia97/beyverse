import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTierList } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Best Beyblade X Tier List 2026",
  description: "Fan-made BEYBUKU Beyblade X tier list for 2026 combo testing, matchup planning, and competitive preparation."
};

export default async function TierListPage() {
  const tierList = await getTierList();
  const tiers = ["S", "A", "B", "C"] as const;
  const updatedAt = "2026-06-05";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BEYBUKU Beyblade X Meta Tier List",
    description: metadata.description,
    url: `${siteConfig.url}/tier-list`,
    dateModified: updatedAt,
    itemListElement: tierList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: `${item.tier} Tier - ${item.notes}`
    }))
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHeading title="Best Beyblade X Tier List 2026" description="A fan-made Beyblade X testing reference for combo strength, matchup planning, and tournament prep." />
      <section className="container-page grid gap-6">
        <Card className="border-amber-400/30 bg-amber-400/10">
          <CardContent className="pt-6 text-sm leading-7 text-amber-100">
            Tier rankings are fan-made testing references and may change depending on local rules, stadium conditions, launch style, part condition, and future releases.
          </CardContent>
        </Card>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader><CardTitle>How to Read This Tier List</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-slate-300">
              <p>This tier list is a BEYBUKU testing reference, not an official ranking. Use it as a starting point for comparing combo ideas, then confirm results with your own launcher, stadium, parts condition, and local rules.</p>
              <p className="text-slate-400">Last updated: {updatedAt}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Testing Priorities</CardTitle></CardHeader>
            <CardContent>
              <ul className="grid gap-2 text-sm leading-6 text-slate-300">
                <li>- Record win type: knockout, spin finish, burst, or self-KO.</li>
                <li>- Run repeated sets instead of judging from one match.</li>
                <li>- Change one part at a time when testing a combo.</li>
                <li>- Compare results against attack, defense, stamina, and balance benchmarks.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {tiers.map((tier) => (
            <Card key={`definition-${tier}`}>
              <CardHeader><CardTitle>Tier {tier}</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-6 text-slate-300">{tierDescriptions[tier]}</p></CardContent>
            </Card>
          ))}
        </div>
        {tiers.map((tier) => (
          <Card key={tier}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <CardTitle>Tier {tier}</CardTitle>
                <Badge>{tierList.filter((item) => item.tier === tier).length} combos</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3">
              {tierList.filter((item) => item.tier === tier).map((item) => (
                <div key={item.id} className="rounded-md border bg-slate-950/55 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.notes}</p>
                    </div>
                    <Badge>{item.format}</Badge>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300 md:grid-cols-3">
                    <p><span className="font-semibold text-sky-200">Why here:</span> {tierReason(tier)}</p>
                    <p><span className="font-semibold text-sky-200">Best test:</span> {testPlanFor(item.name)}</p>
                    <p><span className="font-semibold text-sky-200">Watch for:</span> {riskFor(tier)}</p>
                  </div>
                </div>
              ))}
              {tierList.filter((item) => item.tier === tier).length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-700 p-4 text-sm text-slate-500">No current entries. This tier is reserved for future testing notes.</p>
              ) : null}
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader><CardTitle>Related Reading</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <GuideLink href="/guides/how-to-test-beyblade-combos" title="How to Test Combos" />
            <GuideLink href="/guides/attack-defense-stamina-balance-types" title="Types Explained" />
            <GuideLink href="/guides/ratchet-height-guide" title="Ratchet Height Guide" />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

const tierDescriptions = {
  S: "Top testing priorities. These combos have strong win conditions and should be included when benchmarking new ideas.",
  A: "Strong and practical. These combos can perform well, but usually need cleaner tuning or matchup awareness.",
  B: "Useful but more matchup dependent. These are good references for specific roles or local testing.",
  C: "Experimental or limited. These entries need more testing before becoming reliable recommendations."
};

function tierReason(tier: "S" | "A" | "B" | "C") {
  return {
    S: "Clear win condition with high pressure or strong consistency.",
    A: "Reliable enough to test seriously, but not always universal.",
    B: "Can work, but matchup and launch quality matter heavily.",
    C: "Needs more proof before it becomes a stable recommendation."
  }[tier];
}

function riskFor(tier: "S" | "A" | "B" | "C") {
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

function GuideLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="rounded-md border bg-slate-950/45 p-4 font-semibold text-white transition hover:border-sky-400/60 hover:bg-slate-900">
      {title}
    </Link>
  );
}
