import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = { title: "Privacy Policy", description: "BEYBUKU privacy policy and advertising disclosure." };

export default function PrivacyPage() {
  return (
    <main>
      <PageHeading title="Privacy Policy" description="How BEYBUKU handles privacy, analytics, advertising, and contact messages." />
      <section className="container-page max-w-3xl space-y-6 leading-8 text-slate-300">
        <p>Last updated: June 6, 2026</p>
        <p>BEYBUKU is an independent fan-made encyclopedia. This policy explains what information may be processed when you visit the website, contact us, or interact with services used to operate the site.</p>
        <h2 className="text-2xl font-black text-white">Information We May Collect</h2>
        <p>If you contact us, we may receive your email address and the name, message, correction, or other information you choose to provide. Our hosting and security services may also process technical data such as IP address, browser type, device type, requested pages, timestamps, and diagnostic logs.</p>
        <h2 className="text-2xl font-black text-white">How Information Is Used</h2>
        <p>Information may be used to operate and secure BEYBUKU, respond to messages, correct encyclopedia data, understand site performance, prevent abuse, and improve content and usability. We do not sell personal information.</p>
        <h2 className="text-2xl font-black text-white">Cookies and Similar Technologies</h2>
        <p>Hosting, analytics, and advertising providers may use cookies, local storage, pixels, or similar technologies. You can block or delete cookies through your browser settings, although doing so may affect some third-party features.</p>
        <h2 className="text-2xl font-black text-white">Google AdSense and Advertising</h2>
        <p>If advertising is enabled, Google and its partners may use cookies, device identifiers, IP addresses, and browsing information to deliver, limit, personalize, and measure ads and to detect fraud. Google may receive the URL of the page you visit and technical information sent by your browser. Learn more from Google&apos;s <Link className="text-sky-300 underline underline-offset-4" href="https://policies.google.com/technologies/partner-sites">partner-sites privacy information</Link> and <Link className="text-sky-300 underline underline-offset-4" href="https://policies.google.com/technologies/ads">advertising policy</Link>.</p>
        <h2 className="text-2xl font-black text-white">Your Advertising Choices</h2>
        <p>You can manage personalized Google advertising through <Link className="text-sky-300 underline underline-offset-4" href="https://myadcenter.google.com/">My Ad Center</Link> and control cookies through your browser. Depending on your location, a consent notice may also be shown before optional advertising technologies are used.</p>
        <h2 className="text-2xl font-black text-white">Third-Party Services</h2>
        <p>BEYBUKU may rely on providers such as Vercel for hosting, Supabase for database services, and Google for search, analytics, or advertising features. These providers process information under their own privacy policies. We may also disclose information when required by law or when reasonably necessary to protect the site and its users.</p>
        <h2 className="text-2xl font-black text-white">Data Retention and Security</h2>
        <p>We retain contact messages and operational records only as long as reasonably needed for the purposes described above. We use reasonable safeguards, but no internet service can guarantee complete security.</p>
        <h2 className="text-2xl font-black text-white">Children&apos;s Privacy</h2>
        <p>BEYBUKU is a general-audience reference site and is not directed specifically to children under 13. We do not knowingly request personal information from children under 13. A parent or guardian may contact us to request review or deletion of information submitted by a child.</p>
        <h2 className="text-2xl font-black text-white">International Processing</h2>
        <p>Service providers may process information in countries other than your own. Their privacy protections may differ from those in your location.</p>
        <h2 className="text-2xl font-black text-white">Policy Changes</h2>
        <p>We may update this policy as BEYBUKU or its service providers change. The latest version and update date will remain available on this page.</p>
        <h2 className="text-2xl font-black text-white">Contact</h2>
        <p>For privacy questions or requests, email <Link className="text-sky-300 underline underline-offset-4" href="mailto:majorjdebeat@gmail.com">majorjdebeat@gmail.com</Link>.</p>
      </section>
    </main>
  );
}
