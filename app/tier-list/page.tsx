import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTierList } from "@/lib/content";

export const metadata: Metadata = {
  title: "Meta Tier List",
  description: "Current BeyVerse demo meta tier list for Beyblade X combos and testing priorities."
};

export default async function TierListPage() {
  const tierList = await getTierList();
  const tiers = ["S", "A", "B", "C"] as const;
  return (
    <main>
      <PageHeading title="Meta Tier List" description="A content-first tier list preview designed for ongoing testing notes and tournament updates." />
      <section className="container-page grid gap-4">
        {tiers.map((tier) => (
          <Card key={tier}>
            <CardHeader><CardTitle>Tier {tier}</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {tierList.filter((item) => item.tier === tier).map((item) => (
                <div key={item.id} className="flex flex-col gap-2 rounded-md bg-slate-950/55 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.notes}</p>
                  </div>
                  <Badge>{item.format}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
