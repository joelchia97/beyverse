import Link from "next/link";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GuideLocale } from "@/lib/localized-guides";
import { getLocalizedGuide, localizedGuides, type LocalizedGuide } from "@/lib/localized-guides";

const closingNote = {
  zh: "把这篇攻略当成测试起点。记录你的发射角度、对手组合、胜利方式和失败原因，笔记会比单纯排名更有价值。",
  ms: "Gunakan panduan ini sebagai titik mula ujian. Catat sudut launch, combo lawan, cara menang dan sebab kalah supaya nota anda lebih berguna daripada ranking sahaja."
};

const articleLabels = {
  zh: {
    takeaways: "重点摘要",
    testingNote: "测试说明",
    related: "相关文章"
  },
  ms: {
    takeaways: "Isi Penting",
    testingNote: "Nota Ujian",
    related: "Panduan Berkaitan"
  }
};

export function LocalizedGuidesList({ locale }: { locale: GuideLocale }) {
  const guides = localizedGuides[locale];
  const basePath = `/${locale}/guides`;
  const heading = locale === "zh" ? "攻略文章" : "Panduan Strategi";
  const description = locale === "zh" ? "先阅读最重要的新手攻略，再进入英文完整资料库继续研究。" : "Baca panduan pemula yang penting dahulu, kemudian teruskan kajian dalam database penuh.";

  return (
    <main>
      <section className="container-page py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">BEYBUKU</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-black text-white md:text-5xl">{heading}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{description}</p>
      </section>
      <section className="container-page grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <a key={guide.slug} href={`${basePath}/${guide.slug}`} className="rounded-lg border bg-card p-5 transition hover:border-sky-400/60 hover:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-black text-white">{guide.title}</h2>
              <Badge>{guide.category}</Badge>
            </div>
            <p className="mt-3 text-sm text-slate-400">{guide.published_at}</p>
            <p className="mt-4 leading-7 text-slate-300">{guide.excerpt}</p>
          </a>
        ))}
      </section>
    </main>
  );
}

export function LocalizedGuidePage({ locale, slug }: { locale: GuideLocale; slug: string }) {
  const guide = getLocalizedGuide(locale, slug);
  if (!guide) notFound();
  const paragraphs = guide.content.split("\n\n").filter(Boolean);
  const relatedGuides = localizedGuides[locale].filter((item) => item.slug !== guide.slug).slice(0, 3);
  const labels = articleLabels[locale];
  const keyTakeaways = buildLocalizedKeyTakeaways(guide, paragraphs);

  return (
    <main className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
      <article>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{guide.category}</Badge>
          <span className="text-sm text-slate-400">{guide.published_at}</span>
        </div>
        <h1 className="mt-4 max-w-4xl text-4xl font-black text-white md:text-6xl">{guide.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{guide.excerpt}</p>
        <AdBanner slot="article-top-ad" label="Article top ad" />
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{labels.takeaways}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 text-sm leading-6 text-slate-300">
              {keyTakeaways.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <div className="mt-8 space-y-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-lg leading-9 text-slate-300">{paragraph}</p>
          ))}
        </div>
        <AdBanner slot="article-middle-ad" label="Article middle ad" />
        <Card>
          <CardHeader>
            <CardTitle>{labels.testingNote}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-slate-300">{closingNote[locale]}</p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{labels.related}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {relatedGuides.map((item) => (
              <Link key={item.slug} href={`/${locale}/guides/${item.slug}`} className="rounded-md border bg-slate-950/45 p-3 transition hover:border-sky-400/60 hover:bg-slate-900">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{item.excerpt}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <AdBanner slot="article-bottom-ad" label="Article bottom ad" />
      </article>
      <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
    </main>
  );
}

function buildLocalizedKeyTakeaways(guide: LocalizedGuide, paragraphs: string[]) {
  return [guide.excerpt, paragraphs[0] || guide.excerpt, paragraphs[1] || guide.excerpt].map((item) => {
    const firstSentence = item.split(/[。.!?]\s*/)[0] || item;
    return firstSentence.replace(/[。.!?]$/, "");
  });
}
