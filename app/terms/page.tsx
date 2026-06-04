import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Terms of Service", description: "BeyVerse terms of service and fan-site disclaimer." };

export default function TermsPage() {
  return (
    <main>
      <PageHeading title="Terms of Service" description="Rules and disclaimers for using BeyVerse." />
      <section className="container-page max-w-3xl space-y-5 leading-8 text-slate-300">
        <p>BeyVerse provides fan-made informational content for entertainment and educational purposes.</p>
        <p>Beyblade names, trademarks, characters, and related media belong to their respective owners. BeyVerse is not affiliated with or endorsed by those owners.</p>
        <p>Competitive notes and tier placements are opinions based on testing and should be verified in your own local format.</p>
      </section>
    </main>
  );
}
