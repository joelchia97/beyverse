import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Gauge, Layers3, Search, Sparkles, Swords, Trophy } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getBeyblades, getCombos, getGuides, getTierList } from "@/lib/content";
import type { homeTranslations } from "@/lib/home-translations";
import { localizedGuides } from "@/lib/localized-guides";
import { siteConfig } from "@/lib/seo";
import { TiltSurface } from "@/components/motion/tilt-surface";

type HomeCopy = (typeof homeTranslations)[keyof typeof homeTranslations];

export async function HomePageContent({ copy }: { copy: HomeCopy }) {
  const [beyblades, combos, guides, tierList] = await Promise.all([getBeyblades(), getCombos(), getGuides(), getTierList()]);
  const latestBeyblades = [...beyblades]
    .filter((item) => !Number.isNaN(Date.parse(item.release_date)))
    .sort((a, b) => b.release_date.localeCompare(a.release_date))
    .slice(0, 6);
  const displayedGuides =
    copy.lang === "zh"
      ? localizedGuides.zh.map((guide) => ({ ...guide, href: `/zh/guides/${guide.slug}` }))
      : copy.lang === "ms"
        ? localizedGuides.ms.map((guide) => ({ ...guide, href: `/ms/guides/${guide.slug}` }))
        : guides.map((guide) => ({ ...guide, href: `/guides/${guide.slug}` }));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${siteConfig.url}${copy.path === "/" ? "" : copy.path}`,
    inLanguage: copy.lang,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: copy.lang,
    mainEntity: copy.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <section className="home-hero relative overflow-hidden border-b">
        <div className="home-grid absolute inset-0" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="container-page relative grid min-h-[calc(100svh-64px)] items-center gap-12 py-16 md:grid-cols-[1.08fr_0.92fr]">
        <div className="relative z-10">
          <Image
            src="/logo.png"
            alt="BEYBUKU"
            width={620}
            height={310}
            priority
            sizes="(max-width: 768px) calc(100vw - 32px), 620px"
            className="hero-logo mb-6 h-auto w-full max-w-[420px] object-contain"
          />
          <Badge className="border-orange-300/30 bg-orange-400/10 text-orange-100">{copy.badge}</Badge>
          <h1 className="hero-title mt-5 text-5xl font-black leading-[0.92] md:text-7xl lg:text-8xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{copy.description}</p>
          <form action="/search" className="mt-8 flex max-w-2xl gap-3">
            <Input name="q" placeholder={copy.searchPlaceholder} className="h-12 border-white/15 bg-black/45 backdrop-blur" />
            <button className="hero-action inline-flex h-12 items-center gap-2 rounded-md px-5 font-bold text-white">
              <Search className="h-4 w-4" />
              {copy.searchButton}
            </button>
          </form>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10" href="/beyblades">
              {copy.browseDatabase} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10" href="/combo-builder">
              {copy.buildCombo} <Gauge className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative grid gap-4">
          <div className="hero-stage">
            <div className="hero-disc" aria-hidden="true">
              <div className="hero-disc-core">
                <Image src="/logo.png" alt="" width={500} height={250} className="h-auto w-[72%] object-contain" />
              </div>
            </div>
            <TiltSurface className="hero-meta-card relative z-10">
              <Card className="interactive-card border-white/10 bg-black/55 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Sparkles className="motion-icon h-5 w-5 text-orange-300" /> {copy.metaSnapshot}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {tierList.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-md bg-slate-950/55 p-3">
                      <span className="font-semibold">{item.name}</span>
                      <Badge className="border-violet-300/30 bg-violet-400/10 text-violet-100">{item.tier}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TiltSurface>
          </div>
          <AdBanner slot="homepage-top" label="Homepage top banner" />
        </div>
        </div>
      </section>

      <section className="border-y bg-black/35 py-12">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <InfoCard icon={<BookOpen />} title={copy.researchTitle} text={copy.researchText} />
          <InfoCard icon={<Layers3 />} title={copy.compareTitle} text={copy.compareText} />
          <InfoCard icon={<Swords />} title={copy.buildTitle} text={copy.buildText} />
        </div>
        <div className="container-page mt-6">
          <Link href={copy.guidesPath} className="block rounded-lg border bg-card p-5 transition hover:border-sky-400/60 hover:bg-slate-900">
            <p className="text-lg font-black text-white">{copy.localizedGuidesTitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{copy.localizedGuidesText}</p>
          </Link>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>{copy.aboutTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-slate-300">{copy.aboutText}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{copy.popularSearchesTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {copy.popularSearches.map((topic) => (
                  <Link key={topic} href={`/search?q=${encodeURIComponent(topic)}`} className="rounded-sm border border-sky-400/25 bg-sky-400/10 px-3 py-2 text-xs font-semibold text-sky-100 hover:bg-sky-400/20">
                    {topic}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <InfoCard title={copy.productLinesTitle} text={copy.productLinesText} />
          <InfoCard title={copy.beginnerPathTitle} text={copy.beginnerPathText} />
          <InfoCard title={copy.editorialTitle} text={copy.editorialText} />
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-2xl font-black">{copy.latestBeyblades}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {latestBeyblades.map((item) => (
            <EntityCard key={item.id} href={`/beyblades/${item.slug}`} title={item.name} badge={item.type} meta={item.series} description={item.description} visualType={item.type} imageUrl={item.image_url} />
          ))}
        </div>
      </section>

      <AdBanner slot="homepage-middle" label="Homepage middle banner" className="container-page" />

      <section className="container-page grid gap-8 py-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black">{copy.popularGuides}</h2>
            <Link href={copy.guidesPath} className="text-sm font-semibold text-sky-300 hover:text-sky-100">{copy.allGuidesLabel}</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {displayedGuides.slice(0, 4).map((guide) => (
              <EntityCard key={guide.slug} href={guide.href} title={guide.title} badge={guide.category} description={guide.excerpt} />
            ))}
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-sky-300" /> {copy.featuredCombos}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {combos.slice(0, 6).map((combo) => (
              <div key={combo.id} className="rounded-md bg-slate-950/55 p-3">
                <p className="font-semibold">{combo.name}</p>
                <p className="text-sm text-slate-400">{combo.blade} / {combo.ratchet} / {combo.bit}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="container-page py-8">
        <h2 className="text-2xl font-black">{copy.latestUpdates}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <InfoCard title={copy.updateCatalogTitle} text={copy.updateCatalogText} />
          <InfoCard title={copy.updateGuidesTitle} text={copy.updateGuidesText} />
          <InfoCard title={copy.updateAdsTitle} text={copy.updateAdsText} />
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-2xl font-black">{copy.faqTitle}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {copy.faqs.map((item) => (
            <InfoCard key={item.question} title={item.question} text={item.answer} />
          ))}
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, text, icon }: { title: string; text: string; icon?: React.ReactNode }) {
  return (
    <TiltSurface className="h-full">
      <Card className="interactive-card h-full">
        <CardHeader>
          {icon ? <div className="motion-icon mb-2 flex h-10 w-10 items-center justify-center rounded-md border border-orange-300/25 bg-orange-400/10 text-orange-200 [&>svg]:h-5 [&>svg]:w-5">{icon}</div> : null}
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent><p className="text-sm leading-6 text-slate-300">{text}</p></CardContent>
      </Card>
    </TiltSurface>
  );
}
