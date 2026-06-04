import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Terms of Service", description: "BEYBUKU terms of service and fan-site disclaimer." };

export default function TermsPage() {
  return (
    <main>
      <PageHeading title="Terms of Service" description="Rules and disclaimers for using BEYBUKU." />
      <section className="container-page max-w-3xl space-y-6 leading-8 text-slate-300">
        <p>Last updated: June 4, 2026</p>
        <p>By using BEYBUKU, you agree to use the site for informational, educational, and entertainment purposes. If you do not agree with these terms, please do not use the website.</p>
        <h2 className="text-2xl font-black text-white">Fan-Site Disclaimer</h2>
        <p>BEYBUKU is an independent fan-made encyclopedia. Beyblade names, trademarks, characters, product names, and related media belong to their respective owners. BEYBUKU is not affiliated with, sponsored by, or endorsed by those owners.</p>
        <h2 className="text-2xl font-black text-white">Content Accuracy</h2>
        <p>We try to keep product data, strategy notes, tier lists, and lore references useful and accurate. However, competitive performance can vary by stadium, launch style, local rules, part condition, and matchup. Always verify important information with your own testing.</p>
        <h2 className="text-2xl font-black text-white">User Submissions</h2>
        <p>If you send corrections, combo notes, or suggestions, you allow BEYBUKU to review, edit, and use that information to improve the site. Please do not submit content you do not have permission to share.</p>
        <h2 className="text-2xl font-black text-white">Advertising</h2>
        <p>BEYBUKU may display advertising in selected areas. Ads should not replace core content, and the site is designed to keep navigation and reading experience clear.</p>
        <h2 className="text-2xl font-black text-white">Changes</h2>
        <p>These terms may be updated as the site grows. Continued use of BEYBUKU after updates means you accept the revised terms.</p>
      </section>
    </main>
  );
}
