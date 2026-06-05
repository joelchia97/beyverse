import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { PageHeading } from "@/components/page-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Contact", description: "Contact BEYBUKU for corrections, guide ideas, and database suggestions." };

const contactEmail = "joelchia97@gmail.com";
const correctionMail = `mailto:${contactEmail}?subject=${encodeURIComponent("BEYBUKU Correction Request")}&body=${encodeURIComponent(
  "Page URL:\n\nBeyblade / part / guide name:\n\nWhat should be corrected:\n\nSource or notes:\n"
)}`;
const guideMail = `mailto:${contactEmail}?subject=${encodeURIComponent("BEYBUKU Guide Suggestion")}&body=${encodeURIComponent(
  "Guide idea:\n\nWhy it would help readers:\n\nNotes or sources:\n"
)}`;
const generalMail = `mailto:${contactEmail}?subject=${encodeURIComponent("BEYBUKU Contact")}&body=${encodeURIComponent("Message:\n")}`;

export default function ContactPage() {
  return (
    <main>
      <PageHeading title="Contact" description="Send corrections, new part suggestions, combo notes, or guide requests." />
      <section className="container-page grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-sky-300" />
              Message BEYBUKU
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="leading-7 text-slate-300">
              The fastest way to contact BEYBUKU is by email. Send corrections, missing release details, combo testing notes, image permission questions, or guide suggestions.
            </p>
            <div className="rounded-md border border-sky-400/25 bg-sky-400/10 p-4">
              <p className="text-sm font-semibold text-slate-400">Contact email</p>
              <Link href={`mailto:${contactEmail}`} className="mt-1 block text-lg font-black text-sky-100 hover:text-white">
                {contactEmail}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <ContactAction href={correctionMail} title="Submit Correction" text="Fix product data, page copy, or part details." />
              <ContactAction href={guideMail} title="Suggest Guide" text="Request strategy, combo, or beginner content." />
              <ContactAction href={generalMail} title="General Message" text="Ask a question or send other feedback." />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-sky-300" />
              What to Send
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-7 text-slate-300">
            <p>Useful messages include correction requests, missing product details, combo testing notes, guide ideas, and image permission questions.</p>
            <p>Please include the Beyblade name, part name, or page URL when reporting an issue. That makes it easier to review and update the encyclopedia accurately.</p>
            <p>BEYBUKU is a fan-made resource, so verified sources, release codes, and clear photos or references are especially helpful when suggesting updates.</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function ContactAction({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link href={href} className="rounded-md border bg-slate-950/55 p-4 transition hover:border-sky-400/60 hover:bg-slate-900">
      <MessageSquare className="h-5 w-5 text-sky-300" />
      <p className="mt-3 font-black text-white">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </Link>
  );
}
