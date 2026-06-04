import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  name: string;
  email: string;
  message: string;
  button: string;
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
  return (
    <main>
      <PageHeading title={copy.heading} description={copy.description} />
      <section className="container-page grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader><CardTitle>{copy.formTitle}</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <Input placeholder={copy.name} />
            <Input placeholder={copy.email} type="email" />
            <Textarea placeholder={copy.message} />
            <Button>{copy.button}</Button>
          </CardContent>
        </Card>
        <TextCard title={copy.sideTitle} paragraphs={copy.side} />
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
