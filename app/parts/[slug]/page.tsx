import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parts } from "@/lib/data";
import { getPartBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

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
      title: `${item.name} - BeyVerse`,
      description: item.description,
      url: `${siteConfig.url}/parts/${item.slug}`
    }
  };
}

export default async function PartDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPartBySlug(slug);
  if (!item) notFound();

  return (
    <main className="container-page py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <Badge>{item.category}</Badge>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{item.description}</p>
          <AdBanner slot="parts-detail-page-ad" label="Parts detail page ad" />
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
        </article>
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <Card><CardHeader><CardTitle className="text-sm">{label}</CardTitle></CardHeader><CardContent className="text-2xl font-black text-sky-200">{value}</CardContent></Card>;
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent>
        <ul className="grid gap-2 text-sm text-slate-300">
          {items.map((item) => <li key={item}>- {item}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
}
