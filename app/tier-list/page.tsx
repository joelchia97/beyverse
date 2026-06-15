import type { Metadata } from "next";
import Link from "next/link";
import { TierListClient } from "@/components/tier-list-client";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBeyblades, getTierList } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Best Beyblade X Tier List 2026",
  description: "Fan-made BEYBUKU Beyblade X tier list for 2026 combo testing, matchup planning, and competitive preparation.",
  alternates: { canonical: `${siteConfig.url}/tier-list` }
};

export default async function TierListPage() {
  const [tierList, beyblades] = await Promise.all([getTierList(), getBeyblades()]);
  const updatedAt = "2026-06-11";
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
        <TierListClient tierList={tierList} beyblades={beyblades} />
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

function GuideLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="rounded-md border bg-slate-950/45 p-4 font-semibold text-white transition hover:border-sky-400/60 hover:bg-slate-900">
      {title}
    </Link>
  );
}
