import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { Badge } from "@/components/ui/badge";
import { guides } from "@/lib/data";
import { getGuideBySlug } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
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
        <p className="text-lg leading-9 text-slate-300">
          Treat every guide as a starting point for testing. Record your launch angle, opponent combo, win condition, and failure mode so your notes become more useful than a generic ranking.
        </p>
        <AdBanner slot="article-bottom-ad" label="Article bottom ad" />
      </article>
      <aside><AdBanner slot="sidebar-ad" label="Sidebar ad" className="sticky top-24" /></aside>
    </main>
  );
}
