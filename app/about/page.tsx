import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "About", description: "About BEYBUKU, a Beyblade encyclopedia for fans and competitive players." };

export default function AboutPage() {
  return (
    <main>
      <PageHeading title="About BEYBUKU" description="BEYBUKU is a fan-built encyclopedia for Beyblade data, strategy, lore, and long-term competitive notes." />
      <section className="container-page grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Our Purpose</CardTitle></CardHeader>
          <CardContent className="space-y-4 leading-8 text-slate-300">
            <p>BEYBUKU is built to help fans understand Beyblade releases, parts, combo ideas, anime context, and competitive testing notes in one organized place.</p>
            <p>The goal is to make each page useful on its own: clear data, practical strategy, and simple navigation without overwhelming visitors with ads or clutter.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Editorial Approach</CardTitle></CardHeader>
          <CardContent className="space-y-4 leading-8 text-slate-300">
            <p>Entries are written with a testing-first mindset. When a combo or tier placement is discussed, it should be treated as a starting point for your own battles, not an absolute rule.</p>
            <p>BEYBUKU is a fan-made project and is not affiliated with, sponsored by, or endorsed by the official Beyblade rights holders.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
