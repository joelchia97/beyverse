import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Terms of Service", description: "BEYBUKU terms of service and fan-site disclaimer." };

export default function TermsPage() {
  return (
    <main>
      <PageHeading title="Terms of Service" description="Rules and disclaimers for using BEYBUKU." />
      <section className="container-page max-w-3xl space-y-6 leading-8 text-slate-300">
        <p>Last updated: June 6, 2026</p>
        <p>By using BEYBUKU, you agree to use the site for informational, educational, and entertainment purposes. If you do not agree with these terms, please do not use the website.</p>
        <h2 className="text-2xl font-black text-white">Fan-Site Disclaimer</h2>
        <p>BEYBUKU is an independent fan-made encyclopedia and is not affiliated with, sponsored by, or endorsed by Takara Tomy, Hasbro, or other Beyblade rights holders. Beyblade names, logos, trademarks, characters, product designs, and related media belong to their respective owners.</p>
        <h2 className="text-2xl font-black text-white">Acceptable Use</h2>
        <p>You may browse and share links to BEYBUKU for personal, non-commercial reference. You must not disrupt the site, bypass security, upload malicious material, impersonate others, misuse contact channels, or use automated systems to copy substantial portions of the website without permission.</p>
        <h2 className="text-2xl font-black text-white">BEYBUKU Content</h2>
        <p>Original writing, organization, rankings, testing notes, interface design, and BEYBUKU branding are protected by applicable intellectual-property laws. You may quote short excerpts with clear attribution and a link, but you may not republish or commercially exploit substantial site content without written permission.</p>
        <h2 className="text-2xl font-black text-white">Accuracy and No Warranty</h2>
        <p>We try to keep product data, strategy notes, tier lists, and lore references useful and accurate, but we do not guarantee that all information is complete, current, or error-free. Competitive performance varies by stadium, launch style, rules, part condition, and matchup. The site is provided on an “as is” and “as available” basis.</p>
        <h2 className="text-2xl font-black text-white">User Submissions</h2>
        <p>If you send corrections, combo notes, suggestions, or other material, you confirm that you have permission to share it and grant BEYBUKU a non-exclusive, worldwide, royalty-free permission to review, edit, reproduce, and publish it for operating and improving the encyclopedia. Do not submit confidential, unlawful, or infringing material.</p>
        <h2 className="text-2xl font-black text-white">External Links, Services, and Advertising</h2>
        <p>BEYBUKU may link to third-party websites or use third-party hosting, database, analytics, and advertising services. We do not control and are not responsible for their content, availability, products, or privacy practices. Advertising does not necessarily represent an endorsement by BEYBUKU.</p>
        <h2 className="text-2xl font-black text-white">Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, BEYBUKU and its operators will not be liable for indirect, incidental, special, consequential, or other losses resulting from use of, reliance on, or inability to use the site. Nothing in these terms excludes rights or liabilities that cannot legally be excluded.</p>
        <h2 className="text-2xl font-black text-white">Suspension and Availability</h2>
        <p>We may modify, suspend, restrict, or discontinue any part of the site when reasonably necessary for maintenance, security, legal compliance, or content management.</p>
        <h2 className="text-2xl font-black text-white">Changes</h2>
        <p>These terms may be updated as the site grows. The revised terms apply from the date shown above. Continued use of BEYBUKU after an update means you accept the revised terms.</p>
        <h2 className="text-2xl font-black text-white">Contact</h2>
        <p>Questions about these terms can be sent to <Link className="text-sky-300 underline underline-offset-4" href="mailto:majorjdebeat@gmail.com">majorjdebeat@gmail.com</Link>.</p>
      </section>
    </main>
  );
}
