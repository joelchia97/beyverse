import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import type { GuideLocale } from "@/lib/localized-guides";
import { getLocalizedGuide, localizedGuides } from "@/lib/localized-guides";

const closingNote = {
  zh: "把这篇攻略当成测试起点。记录你的发射角度、对手组合、胜利方式和失败原因，笔记会比单纯排名更有价值。",
  ms: "Gunakan panduan ini sebagai titik mula ujian. Catat sudut launch, combo lawan, cara menang dan sebab kalah supaya nota anda lebih berguna daripada ranking sahaja."
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

  return (
    <main className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
      <article>
        <Badge>{guide.category}</Badge>
        <h1 className="mt-4 max-w-4xl text-4xl font-black text-white md:text-6xl">{guide.title}</h1>
        <p className="mt-4 text-slate-400">{guide.published_at}</p>
        <AdBanner slot="article-top-ad" label="Article top ad" />
        <div className="mt-6 space-y-6">
          {guide.content.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-lg leading-9 text-slate-300">{paragraph}</p>
          ))}
        </div>
        <AdBanner slot="article-middle-ad" label="Article middle ad" />
        <p className="text-lg leading-9 text-slate-300">{closingNote[locale]}</p>
        <AdBanner slot="article-bottom-ad" label="Article bottom ad" />
      </article>
      <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
    </main>
  );
}
