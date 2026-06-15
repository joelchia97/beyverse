import type { Metadata } from "next";
import { ComboBuilderClient } from "@/components/combo-builder-client";
import { PageHeading } from "@/components/page-heading";
import { getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Beyblade X Combo Builder",
  description: "Build Beyblade X combos by choosing a Blade, Ratchet, and Bit, then compare attack, defense, stamina, control, and launch style notes.",
  alternates: { canonical: `${siteConfig.url}/combo-builder` }
};

export default async function ComboBuilderPage() {
  const parts = await getParts();
  return (
    <main>
      <PageHeading title="Combo Builder" description="Select a blade, ratchet, and bit to estimate battle scores and recommended play style." />
      <ComboBuilderClient parts={parts} />
    </main>
  );
}
