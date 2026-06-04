import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Privacy Policy", description: "BeyVerse privacy policy and advertising disclosure." };

export default function PrivacyPage() {
  return (
    <main>
      <PageHeading title="Privacy Policy" description="How BeyVerse handles privacy, analytics, advertising, and contact messages." />
      <section className="container-page max-w-3xl space-y-5 leading-8 text-slate-300">
        <p>BeyVerse is a fan encyclopedia. If analytics or advertising services are enabled, they may use cookies or similar technologies to measure traffic and serve ads.</p>
        <p>Google AdSense may collect data according to Google policies after ads are approved and enabled. Replace this placeholder policy with legal text reviewed for your region before launch.</p>
        <p>Contact form submissions should only be used to respond to messages, corrections, or collaboration requests.</p>
      </section>
    </main>
  );
}
