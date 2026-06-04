import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { beyblades } from "@/lib/data";
import { siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return beyblades.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = beyblades.find((bey) => bey.slug === slug);
  if (!item) return {};
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: `${item.name} - BeyVerse`,
      description: item.description,
      url: `${siteConfig.url}/beyblades/${item.slug}`
    }
  };
}

export default async function BeybladeDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = beyblades.find((bey) => bey.slug === slug);
  if (!item) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.name,
    description: item.description,
    datePublished: item.release_date,
    author: { "@type": "Organization", name: "BeyVerse" }
  };

  return (
    <main className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <Badge>{item.series}</Badge>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{item.description}</p>
          <AdBanner slot="beyblade-detail-page-ad" label="Beyblade detail page ad" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card><CardHeader><CardTitle>Type</CardTitle></CardHeader><CardContent>{item.type}</CardContent></Card>
            <Card><CardHeader><CardTitle>Weight</CardTitle></CardHeader><CardContent>{item.weight}g</CardContent></Card>
            <Card><CardHeader><CardTitle>Release</CardTitle></CardHeader><CardContent>{item.release_date}</CardContent></Card>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoList title="Strengths" items={item.strengths} />
            <InfoList title="Weaknesses" items={item.weaknesses} />
          </div>
          <InfoList title="Recommended Combos" items={item.recommended_combos} className="mt-4" />
          <Card className="mt-4"><CardHeader><CardTitle>Anime Info</CardTitle></CardHeader><CardContent><p className="leading-7 text-slate-300">{item.anime_info}</p></CardContent></Card>
        </article>
        <aside>
          <AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" />
        </aside>
      </div>
    </main>
  );
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
