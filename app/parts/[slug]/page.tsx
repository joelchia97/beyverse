import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parts } from "@/lib/data";
import { getPartBySlug, getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";
import type { Part } from "@/types/database";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return parts.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPartBySlug(slug);
  if (!item) return {};
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: `${item.name} - BEYBUKU`,
      description: item.description,
      url: `${siteConfig.url}/parts/${item.slug}`
    }
  };
}

export default async function PartDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPartBySlug(slug);
  if (!item) notFound();
  const allParts = await getParts();
  const guide = partGuide(item);
  const relatedParts = allParts.filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category).slice(0, 4);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    category: `Beyblade X ${item.category}`,
    description: item.description,
    url: `${siteConfig.url}/parts/${item.slug}`,
    brand: { "@type": "Brand", name: "Beyblade X" },
    weight: {
      "@type": "QuantitativeValue",
      value: item.weight,
      unitText: "g"
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Attack", value: item.attack },
      { "@type": "PropertyValue", name: "Defense", value: item.defense },
      { "@type": "PropertyValue", name: "Stamina", value: item.stamina },
      { "@type": "PropertyValue", name: "Balance", value: item.balance }
    ]
  };

  return (
    <main className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <Badge>{item.category}</Badge>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{item.description}</p>
          <AdBanner slot="parts-detail-page-ad" label="Parts detail page ad" />
          <QuickFacts item={item} />
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <Stat label="Weight" value={`${item.weight}g`} />
            <Stat label="Attack" value={item.attack} />
            <Stat label="Defense" value={item.defense} />
            <Stat label="Stamina" value={item.stamina} />
            <Stat label="Balance" value={item.balance} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <InfoList title="Advantages" items={item.advantages} />
            <InfoList title="Disadvantages" items={item.disadvantages} />
            <InfoList title="Recommended Uses" items={item.recommended_uses} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <InfoList title="Testing Method" items={guide.testingMethod} />
            <InfoList title="Works Well With" items={guide.worksWellWith} />
          </div>
          <InfoList title="Risk Notes" items={guide.riskNotes} className="mt-4" />
          <Card className="mt-4">
            <CardHeader><CardTitle>Related Parts</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {relatedParts.map((related) => (
                <Link key={related.slug} href={`/parts/${related.slug}`} className="rounded-md border bg-slate-950/45 p-3 transition hover:border-sky-400/60 hover:bg-slate-900">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-white">{related.name}</p>
                    <Badge>{related.category}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">A{related.attack} / D{related.defense} / S{related.stamina} / B{related.balance}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </article>
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </div>
    </main>
  );
}

function QuickFacts({ item }: { item: Part }) {
  const facts = [
    ["Category", item.category],
    ["Weight", `${item.weight}g`],
    ["Primary Role", strongestStat(item)],
    ["Best Use", item.recommended_uses[0] || "Testing"],
    ["Attack", String(item.attack)],
    ["Defense", String(item.defense)]
  ];

  return (
    <Card className="mt-6">
      <CardHeader><CardTitle>Quick Facts</CardTitle></CardHeader>
      <CardContent>
        <dl className="grid gap-3 md:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="rounded-md border bg-slate-950/45 p-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt>
              <dd className="mt-1 font-semibold text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <Card><CardHeader><CardTitle className="text-sm">{label}</CardTitle></CardHeader><CardContent className="text-2xl font-black text-sky-200">{value}</CardContent></Card>;
}

function InfoList({ title, items, className }: { title: string; items: string[]; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-sm text-slate-300">
          {items.map((item) => <li key={item}>- {item}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
}

function strongestStat(item: Part) {
  const stats = [
    ["Attack", item.attack],
    ["Defense", item.defense],
    ["Stamina", item.stamina],
    ["Balance", item.balance]
  ] as const;
  return stats.reduce((best, current) => (current[1] > best[1] ? current : best))[0];
}

function partGuide(item: Part) {
  const categoryGuides = {
    Blade: {
      testingMethod: ["Test with one stable Ratchet and one aggressive Ratchet", "Keep the Bit the same before judging contact shape", "Record whether wins come from knockout, spin finish, or destabilization"],
      worksWellWith: ["Ratchets that support the Blade's contact height", "Bits that match the Blade's primary role", "Combos built around one clear win condition"],
      riskNotes: ["Blade shape can look strong but fail if the Bit does not support its movement", "High recoil contact may create self-KO risk", "Testing against only one matchup can hide weaknesses"]
    },
    Ratchet: {
      testingMethod: ["Change only the Ratchet during comparison sets", "Track exposure, scraping, and destabilization separately", "Test at least one low, one mid, and one taller alternative"],
      worksWellWith: ["Blades that benefit from its height", "Bits that remain stable at the chosen height", "Setups that need either compactness or clearance"],
      riskNotes: ["Tall Ratchets can improve clearance but increase exposure", "Low Ratchets can be safer but may change contact angles", "Burst and scrape behavior should be recorded separately"]
    },
    Bit: {
      testingMethod: ["Use the same Blade and Ratchet while swapping Bits", "Record movement pattern during the first ten seconds", "Separate stamina loss from missed attack contact"],
      worksWellWith: ["Blades that need its movement style", "Ratchets that keep the combo stable", "Launch patterns that match its aggression level"],
      riskNotes: ["Aggressive Bits can waste stamina if contact is late", "Passive Bits may survive but lack pressure", "A Bit can feel strong in solo spin but fail in real contact"]
    }
  }[item.category];

  return {
    testingMethod: categoryGuides.testingMethod,
    worksWellWith: [...categoryGuides.worksWellWith, ...item.recommended_uses].slice(0, 5),
    riskNotes: [...categoryGuides.riskNotes, ...item.disadvantages].slice(0, 5)
  };
}
