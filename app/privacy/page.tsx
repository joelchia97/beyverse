import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Privacy Policy", description: "BeyVerse privacy policy and advertising disclosure." };

export default function PrivacyPage() {
  return (
    <main>
      <PageHeading title="Privacy Policy" description="How BeyVerse handles privacy, analytics, advertising, and contact messages." />
      <section className="container-page max-w-3xl space-y-6 leading-8 text-slate-300">
        <p>Last updated: June 4, 2026</p>
        <p>BeyVerse is a fan encyclopedia. We aim to collect only the information needed to operate the website, improve content, respond to messages, and maintain a good user experience.</p>
        <h2 className="text-2xl font-black text-white">Information We May Collect</h2>
        <p>If you contact BeyVerse, we may receive the name, email address, and message content you choose to provide. We use that information only to review your request, respond to you, or improve site content.</p>
        <h2 className="text-2xl font-black text-white">Analytics and Advertising</h2>
        <p>BeyVerse may use analytics or advertising services to understand traffic and support the site. If Google AdSense is enabled, Google and its partners may use cookies or similar technologies to serve and measure ads according to their own policies.</p>
        <h2 className="text-2xl font-black text-white">Cookies</h2>
        <p>Cookies may be used by hosting, analytics, or advertising services. You can manage cookies through your browser settings. Disabling cookies may affect some third-party features.</p>
        <h2 className="text-2xl font-black text-white">Data Sharing</h2>
        <p>We do not sell personal information. Limited information may be processed by service providers such as hosting, analytics, database, or advertising platforms when needed to operate the website.</p>
        <h2 className="text-2xl font-black text-white">Contact</h2>
        <p>For privacy questions or correction requests, use the Contact page and include the page or topic related to your request.</p>
      </section>
    </main>
  );
}
