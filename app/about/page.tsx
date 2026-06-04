import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "About", description: "About BeyVerse, a Beyblade encyclopedia for fans and competitive players." };

export default function AboutPage() {
  return (
    <main>
      <PageHeading title="About BeyVerse" description="BeyVerse is a fan-built encyclopedia for Beyblade data, strategy, lore, and long-term competitive notes." />
      <section className="container-page">
        <Card><CardContent className="pt-5 leading-8 text-slate-300">The site is designed to stay content-focused: useful entries first, clean navigation, restrained ad placement, and fast pages that work well on mobile.</CardContent></Card>
      </section>
    </main>
  );
}
