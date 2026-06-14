import Link from "next/link";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { BeybladeVisual } from "@/components/beyblade-visual";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBeybladeBySlug, getBeyblades, getPartBySlug, getParts } from "@/lib/content";
import { siteConfig } from "@/lib/seo";
import type { Beyblade, Part } from "@/types/database";

export type DatabaseLocale = "zh" | "ms";

const copy = {
  zh: {
    database: "陀螺数据库", partsDatabase: "零件数据库", quickFacts: "快速资料",
    series: "系列", type: "类型", weight: "重量", release: "发售日期", code: "型号",
    strengths: "优点", weaknesses: "缺点", combos: "推荐组合", anime: "动画资料",
    category: "类别", attack: "攻击", defense: "防御", stamina: "持久", balance: "平衡",
    advantages: "优势", disadvantages: "劣势", uses: "推荐用途", relatedBeys: "相关陀螺",
    relatedParts: "相关零件", back: "返回目录", ad: "资料页广告",
    types: { Attack: "攻击型", Defense: "防御型", Stamina: "持久型", Balance: "平衡型" },
    categories: { Blade: "刃片", Ratchet: "棘轮", Bit: "轴心" }
  },
  ms: {
    database: "Pangkalan Data Beyblade", partsDatabase: "Pangkalan Data Parts", quickFacts: "Fakta Ringkas",
    series: "Siri", type: "Jenis", weight: "Berat", release: "Tarikh keluaran", code: "Kod",
    strengths: "Kekuatan", weaknesses: "Kelemahan", combos: "Kombo disyorkan", anime: "Info anime",
    category: "Kategori", attack: "Serangan", defense: "Pertahanan", stamina: "Stamina", balance: "Keseimbangan",
    advantages: "Kelebihan", disadvantages: "Kekurangan", uses: "Kegunaan disyorkan", relatedBeys: "Beyblade berkaitan",
    relatedParts: "Parts berkaitan", back: "Kembali ke katalog", ad: "Iklan halaman maklumat",
    types: { Attack: "Serangan", Defense: "Pertahanan", Stamina: "Stamina", Balance: "Seimbang" },
    categories: { Blade: "Blade", Ratchet: "Ratchet", Bit: "Bit" }
  }
} as const;

export async function LocalizedBeybladeDetail({ locale, slug }: { locale: DatabaseLocale; slug: string }) {
  const item = await getBeybladeBySlug(slug);
  if (!item) notFound();
  const text = copy[locale];
  const related = (await getBeyblades())
    .filter((candidate) => candidate.slug !== item.slug && (candidate.type === item.type || candidate.series === item.series))
    .slice(0, 4);
  const pageUrl = `${siteConfig.url}/${locale}/beyblades/${item.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    sku: item.product_code,
    description: item.description,
    category: `Beyblade X ${item.type}`,
    url: pageUrl,
    brand: { "@type": "Brand", name: "Beyblade X" }
  };

  return (
    <main className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href={`/${locale}/beyblades`} className="text-sm font-semibold text-sky-300 hover:text-sky-200">← {text.back}</Link>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <div className="flex flex-wrap gap-2"><Badge>{item.product_code || "Catalog"}</Badge><Badge>{item.series}</Badge></div>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{item.description}</p>
          <BeybladeVisual name={item.name} type={item.type} imageUrl={item.image_url} className="mt-6" />
          <AdBanner slot="beyblade-detail-page-ad" label={text.ad} />
          <FactCard title={text.quickFacts} facts={[
            [text.code, item.product_code || "TBA"], [text.series, item.series], [text.type, text.types[item.type]],
            [text.weight, `${item.weight}g`], [text.release, item.release_date]
          ]} />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ListCard title={text.strengths} items={item.strengths} />
            <ListCard title={text.weaknesses} items={item.weaknesses} />
          </div>
          <ListCard title={text.combos} items={item.recommended_combos} className="mt-4" />
          {item.anime_info ? <TextCard title={text.anime} text={item.anime_info} /> : null}
          <RelatedBeyblades locale={locale} title={text.relatedBeys} items={related} text={text} />
        </article>
        <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
      </div>
    </main>
  );
}

export async function LocalizedPartDetail({ locale, slug }: { locale: DatabaseLocale; slug: string }) {
  const item = await getPartBySlug(slug);
  if (!item) notFound();
  const text = copy[locale];
  const related = (await getParts()).filter((candidate) => candidate.slug !== item.slug && candidate.category === item.category).slice(0, 4);
  const pageUrl = `${siteConfig.url}/${locale}/parts/${item.slug}`;
  const structuredData = {
    "@context": "https://schema.org", "@type": "Product", name: item.name,
    description: item.description, category: `Beyblade X ${item.category}`, url: pageUrl,
    brand: { "@type": "Brand", name: "Beyblade X" }
  };

  return (
    <main className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Link href={`/${locale}/parts`} className="text-sm font-semibold text-sky-300 hover:text-sky-200">← {text.back}</Link>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <Badge>{text.categories[item.category]}</Badge>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{item.description}</p>
          <AdBanner slot="parts-detail-page-ad" label={text.ad} />
          <FactCard title={text.quickFacts} facts={[
            [text.category, text.categories[item.category]], [text.weight, `${item.weight}g`],
            [text.attack, String(item.attack)], [text.defense, String(item.defense)],
            [text.stamina, String(item.stamina)], [text.balance, String(item.balance)]
          ]} />
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <ListCard title={text.advantages} items={item.advantages} />
            <ListCard title={text.disadvantages} items={item.disadvantages} />
            <ListCard title={text.uses} items={item.recommended_uses} />
          </div>
          <Card className="mt-4">
            <CardHeader><CardTitle>{text.relatedParts}</CardTitle></CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {related.map((part) => (
                <Link key={part.slug} href={`/${locale}/parts/${part.slug}`} className="rounded-md border bg-slate-950/45 p-3 hover:border-sky-400/60">
                  <div className="flex justify-between gap-3"><span className="font-semibold text-white">{part.name}</span><Badge>{text.categories[part.category]}</Badge></div>
                  <p className="mt-1 text-sm text-slate-400">A{part.attack} / D{part.defense} / S{part.stamina} / B{part.balance}</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </article>
        <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
      </div>
    </main>
  );
}

function FactCard({ title, facts }: { title: string; facts: string[][] }) {
  return <Card className="mt-6"><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><dl className="grid gap-3 md:grid-cols-2">{facts.map(([label, value]) => <div key={label} className="rounded-md border bg-slate-950/45 p-3"><dt className="text-xs font-semibold uppercase text-slate-500">{label}</dt><dd className="mt-1 font-semibold text-slate-100">{value}</dd></div>)}</dl></CardContent></Card>;
}

function ListCard({ title, items, className }: { title: string; items: string[]; className?: string }) {
  return <Card className={className}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><ul className="grid gap-2 text-sm leading-6 text-slate-300">{items.map((item) => <li key={item}>- {item}</li>)}</ul></CardContent></Card>;
}

function TextCard({ title, text }: { title: string; text: string }) {
  return <Card className="mt-4"><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><p className="leading-7 text-slate-300">{text}</p></CardContent></Card>;
}

function RelatedBeyblades({ locale, title, items, text }: { locale: DatabaseLocale; title: string; items: Beyblade[]; text: typeof copy[DatabaseLocale] }) {
  return <Card className="mt-4"><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{items.map((item) => <Link key={item.slug} href={`/${locale}/beyblades/${item.slug}`} className="rounded-md border bg-slate-950/45 p-3 hover:border-sky-400/60"><div className="flex justify-between gap-3"><span className="font-semibold text-white">{item.name}</span><Badge>{item.product_code || item.type}</Badge></div><p className="mt-1 text-sm text-slate-400">{text.types[item.type]} / {item.weight}g</p></Link>)}</CardContent></Card>;
}
