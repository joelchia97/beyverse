import Link from "next/link";
import { ArrowRight, Gauge, Search, Sparkles, Trophy } from "lucide-react";
import { AdBanner } from "@/components/ads/ad-banner";
import { EntityCard } from "@/components/entity-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getBeyblades, getCombos, getGuides, getTierList } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

export default async function HomePage() {
  const [beyblades, combos, guides, tierList] = await Promise.all([getBeyblades(), getCombos(), getGuides(), getTierList()]);
  const faqs = [
    {
      question: "What is BeyVerse?",
      answer: "BeyVerse is a fan-made Beyblade encyclopedia focused on Beyblade X releases, parts, combo ideas, strategy guides, tier notes, and anime lore."
    },
    {
      question: "Can I use BeyVerse to build Beyblade combos?",
      answer: "Yes. The Combo Builder lets you choose a Blade, Ratchet, and Bit, then estimates attack, defense, stamina, balance, overall rating, and recommended play style."
    },
    {
      question: "Are the tier lists official?",
      answer: "No. Tier notes on BeyVerse are fan-made testing references. Local rules, stadiums, launch style, and part condition can change real match results."
    },
    {
      question: "Does BeyVerse show ads?",
      answer: "BeyVerse is prepared for Google AdSense, but ads can stay disabled until approval. The site is designed to keep content readable and avoid overloaded ad placement."
    }
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
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
      <section className="container-page grid min-h-[calc(100vh-64px)] items-center gap-10 py-12 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Badge>Everything About Beyblade In One Universe</Badge>
          <h1 className="mt-5 text-5xl font-black leading-tight text-white md:text-7xl">BeyVerse</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Explore Beyblade releases, part stats, combo theory, anime lore, and meta trends in a fast, content-focused encyclopedia built for search and long-term AdSense readiness.
          </p>
          <form action="/search" className="mt-8 flex max-w-2xl gap-3">
            <Input name="q" placeholder="Search Beyblades, parts, guides, combos..." className="h-12" />
            <button className="inline-flex h-12 items-center gap-2 rounded-md bg-sky-400 px-5 font-bold text-slate-950 hover:bg-sky-300">
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800" href="/beyblades">
              Browse Database <ArrowRight className="h-4 w-4" />
            </Link>
            <Link className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800" href="/combo-builder">
              Build Combo <Gauge className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-sky-300" /> Meta Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {tierList.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-md bg-slate-950/55 p-3">
                  <span className="font-semibold">{item.name}</span>
                  <Badge>{item.tier}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          <AdBanner slot="homepage-top" label="Homepage top banner" />
        </div>
      </section>

      <section className="border-y bg-slate-950/35 py-10">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader><CardTitle>Research Releases</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-6 text-slate-300">Browse Beyblade X releases with type, series, release date, strengths, weaknesses, combo ideas, and beginner-friendly usage notes.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Compare Parts</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-6 text-slate-300">Use the Parts Database to understand Blade, Ratchet, and Bit roles before testing your own custom combinations.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Build and Test</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-6 text-slate-300">Start with the Combo Builder, then use strategy guides to refine launch control, matchup planning, and testing notes.</p></CardContent>
          </Card>
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-2xl font-black">Latest Beyblades</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {beyblades.slice(0, 6).map((item) => (
            <EntityCard key={item.id} href={`/beyblades/${item.slug}`} title={item.name} badge={item.type} meta={item.series} description={item.description} visualType={item.type} />
          ))}
        </div>
      </section>

      <AdBanner slot="homepage-middle" label="Homepage middle banner" className="container-page" />

      <section className="container-page grid gap-8 py-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-black">Popular Guides</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {guides.slice(0, 4).map((guide) => (
              <EntityCard key={guide.id} href={`/guides/${guide.slug}`} title={guide.title} badge={guide.category} description={guide.excerpt} />
            ))}
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-sky-300" /> Featured Combos</CardTitle>
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
        <h2 className="text-2xl font-black">Latest Updates</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card><CardHeader><CardTitle>Beyblade X Catalog</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-300">BX, UX, CX, and X-Over entries are organized for search, detail pages, and future photo updates.</p></CardContent></Card>
          <Card><CardHeader><CardTitle>Original Guides</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-300">Strategy content now covers launch control, combo theory, Ratchet height, type roles, and testing methods.</p></CardContent></Card>
          <Card><CardHeader><CardTitle>AdSense-ready</CardTitle></CardHeader><CardContent><p className="text-sm text-slate-300">Ad spaces are reserved but disabled by default so the reading experience stays clean before approval.</p></CardContent></Card>
        </div>
      </section>

      <section className="container-page py-8">
        <h2 className="text-2xl font-black">BeyVerse FAQ</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <Card key={item.question}>
              <CardHeader><CardTitle>{item.question}</CardTitle></CardHeader>
              <CardContent><p className="text-sm leading-6 text-slate-300">{item.answer}</p></CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
