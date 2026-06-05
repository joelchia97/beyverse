import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { guides } from "@/lib/data";
import { getGuideBySlug, getGuides } from "@/lib/content";
import { siteConfig } from "@/lib/seo";
import type { Guide } from "@/types/database";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/guides/${guide.slug}`
    },
    openGraph: {
      title: `${guide.title} - BEYBUKU`,
      description: guide.excerpt,
      url: `${siteConfig.url}/guides/${guide.slug}`,
      type: "article"
    }
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();
  const allGuides = await getGuides();
  const relatedGuides = allGuides
    .filter((item) => item.slug !== guide.slug)
    .sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category))
    .slice(0, 3);
  const paragraphs = guide.content.split("\n\n").filter(Boolean);
  const keyTakeaways = buildKeyTakeaways(guide, paragraphs);
  const pageUrl = `${siteConfig.url}/guides/${guide.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.excerpt,
      articleSection: guide.category,
      datePublished: guide.published_at,
      dateModified: guide.published_at,
      wordCount: guide.content.split(/\s+/).filter(Boolean).length,
      author: { "@type": "Organization", name: "BEYBUKU", url: siteConfig.url },
      publisher: {
        "@type": "Organization",
        name: "BEYBUKU",
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo.png`
        }
      },
      mainEntityOfPage: pageUrl
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Strategy Guides", item: `${siteConfig.url}/guides` },
        { "@type": "ListItem", position: 3, name: guide.title, item: pageUrl }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Related BEYBUKU guides for ${guide.title}`,
      itemListElement: relatedGuides.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/guides/${item.slug}`,
        name: item.title
      }))
    }
  ];

  return (
    <main className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_300px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
            <CardTitle>Key Takeaways</CardTitle>
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
            <CardTitle>Testing Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-7 text-slate-300">
              Treat every guide as a starting point for testing. Record your launch angle, opponent combo, win condition, and failure mode so your notes become more useful than a generic ranking.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Related Guides</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {relatedGuides.map((item) => (
              <Link key={item.slug} href={`/guides/${item.slug}`} className="rounded-md border bg-slate-950/45 p-3 transition hover:border-sky-400/60 hover:bg-slate-900">
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

function buildKeyTakeaways(guide: Guide, paragraphs: string[]) {
  const firstParagraph = paragraphs[0] || guide.excerpt;
  const secondParagraph = paragraphs[1] || guide.excerpt;
  return [
    guide.excerpt,
    firstParagraph.split(". ")[0].replace(/\.$/, "") + ".",
    secondParagraph.split(". ")[0].replace(/\.$/, "") + "."
  ];
}
