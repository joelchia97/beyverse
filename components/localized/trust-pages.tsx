import Link from "next/link";
import { Mail, MessageSquare, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeading } from "@/components/page-heading";

type AboutCopy = {
  heading: string;
  description: string;
  purposeTitle: string;
  purpose: string[];
  editorialTitle: string;
  editorial: string[];
};

type ContactCopy = {
  heading: string;
  description: string;
  formTitle: string;
  intro: string;
  emailLabel: string;
  correctionTitle: string;
  correctionText: string;
  guideTitle: string;
  guideText: string;
  generalTitle: string;
  generalText: string;
  sideTitle: string;
  side: string[];
};

type PolicyCopy = {
  heading: string;
  description: string;
  sections: { title?: string; body: string }[];
};

export function LocalizedAboutPage({ copy }: { copy: AboutCopy }) {
  return (
    <main>
      <PageHeading title={copy.heading} description={copy.description} />
      <section className="container-page grid gap-4 md:grid-cols-2">
        <TextCard title={copy.purposeTitle} paragraphs={copy.purpose} />
        <TextCard title={copy.editorialTitle} paragraphs={copy.editorial} />
      </section>
    </main>
  );
}

export function LocalizedContactPage({ copy }: { copy: ContactCopy }) {
  const contactEmail = "majorjdebeat@gmail.com";
  const actions = [
    {
      title: copy.correctionTitle,
      text: copy.correctionText,
      href: `mailto:${contactEmail}?subject=${encodeURIComponent("BEYBUKU Correction Request")}`
    },
    {
      title: copy.guideTitle,
      text: copy.guideText,
      href: `mailto:${contactEmail}?subject=${encodeURIComponent("BEYBUKU Guide Suggestion")}`
    },
    {
      title: copy.generalTitle,
      text: copy.generalText,
      href: `mailto:${contactEmail}?subject=${encodeURIComponent("BEYBUKU Contact")}`
    }
  ];

  return (
    <main>
      <PageHeading title={copy.heading} description={copy.description} />
      <section className="container-page grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-sky-300" />
              {copy.formTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="leading-7 text-slate-300">{copy.intro}</p>
            <div className="rounded-md border border-sky-400/25 bg-sky-400/10 p-4">
              <p className="text-sm font-semibold text-slate-400">{copy.emailLabel}</p>
              <Link href={`mailto:${contactEmail}`} className="mt-1 block break-all text-lg font-black text-sky-100 hover:text-white">
                {contactEmail}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {actions.map((action) => (
                <Link key={action.title} href={action.href} className="rounded-md border bg-slate-950/55 p-4 transition hover:border-sky-400/60 hover:bg-slate-900">
                  <MessageSquare className="h-5 w-5 text-sky-300" />
                  <p className="mt-3 font-black text-white">{action.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{action.text}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-sky-300" />
              {copy.sideTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-8 text-slate-300">
            {copy.side.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export function LocalizedPolicyPage({ copy }: { copy: PolicyCopy }) {
  return (
    <main>
      <PageHeading title={copy.heading} description={copy.description} />
      <section className="container-page max-w-3xl space-y-6 leading-8 text-slate-300">
        {copy.sections.map((section, index) => (
          <div key={`${section.title || "section"}-${index}`} className="space-y-3">
            {section.title ? <h2 className="text-2xl font-black text-white">{section.title}</h2> : null}
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

function TextCard({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-4 leading-8 text-slate-300">
        {paragraphs.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
      </CardContent>
    </Card>
  );
}
