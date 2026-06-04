import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/ads/ad-banner";
import { BeybladeVisual } from "@/components/beyblade-visual";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { beyblades } from "@/lib/data";
import { getBeybladeBySlug } from "@/lib/content";
import { siteConfig } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return beyblades.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getBeybladeBySlug(slug);
  if (!item) return {};
  return {
    title: item.name,
    description: item.description,
    openGraph: {
      title: `${item.name} - BEYBUKU`,
      description: item.description,
      url: `${siteConfig.url}/beyblades/${item.slug}`
    }
  };
}

export default async function BeybladeDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getBeybladeBySlug(slug);
  if (!item) notFound();
  const guide = beybladeGuide(item);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.name,
    identifier: item.product_code,
    description: item.description,
    datePublished: item.release_date,
    author: { "@type": "Organization", name: "BEYBUKU" }
  };

  return (
    <main className="container-page py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <article>
          <div className="flex flex-wrap gap-2">
            <Badge>{item.product_code || "Catalog"}</Badge>
            <Badge>{item.series}</Badge>
          </div>
          <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">{item.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">{item.description}</p>
          <BeybladeVisual name={item.name} type={item.type} className="mt-6" />
          <AdBanner slot="beyblade-detail-page-ad" label="Beyblade detail page ad" />
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Card><CardHeader><CardTitle>Product Code</CardTitle></CardHeader><CardContent>{item.product_code || "TBA"}</CardContent></Card>
            <Card><CardHeader><CardTitle>Type</CardTitle></CardHeader><CardContent>{item.type}</CardContent></Card>
            <Card><CardHeader><CardTitle>Weight</CardTitle></CardHeader><CardContent>{item.weight}g</CardContent></Card>
            <Card><CardHeader><CardTitle>Release</CardTitle></CardHeader><CardContent>{item.release_date}</CardContent></Card>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <InfoList title="Strengths" items={item.strengths} />
            <InfoList title="Weaknesses" items={item.weaknesses} />
          </div>
          <Card className="mt-4">
            <CardHeader><CardTitle>How to Use {item.name}</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {guide.howToUse.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="leading-7 text-slate-300">{paragraph}</p>
              ))}
            </CardContent>
          </Card>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <InfoList title="Best Combo Ideas" items={guide.bestCombos} />
            <InfoList title="Matchup Notes" items={guide.matchupNotes} />
          </div>
          <Card className="mt-4">
            <CardHeader><CardTitle>Beginner Advice</CardTitle></CardHeader>
            <CardContent><p className="leading-7 text-slate-300">{guide.beginnerAdvice}</p></CardContent>
          </Card>
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

function beybladeGuide(item: {
  name: string;
  type: "Attack" | "Defense" | "Stamina" | "Balance";
  recommended_combos: string[];
}) {
  const bladeName = item.name.split(" ").slice(0, -1).join(" ");

  const content = {
    Attack: {
      howToUse: [
        `${item.name} should be played with a clear early-game plan. Attack types usually perform best when they make meaningful contact before the opponent settles into a safer pattern.`,
        `Start by testing a slightly angled launch, then compare it with a flatter launch. If ${bladeName} reaches the Xtreme line too early and misses, reduce launch power or change the angle until contact becomes more consistent.`
      ],
      bestCombos: [
        `${bladeName} 9-60 Rush for controlled attack pressure`,
        `${bladeName} 3-60 Flat for direct knockout attempts`,
        `${bladeName} 5-60 Point for attack-balance testing`
      ],
      matchupNotes: [
        "Strong into passive stamina builds if it lands early contact",
        "Risky against defense builds that can absorb the first hit",
        "Needs careful launch control to avoid self-KO losses"
      ],
      beginnerAdvice:
        "Do not judge an attack Beyblade after only a few battles. Attack results can swing heavily based on launch angle, contact timing, and stadium movement. Test at least ten rounds before deciding whether the combo is weak."
    },
    Defense: {
      howToUse: [
        `${item.name} works best when it controls risk. A defense-type Beyblade does not need to chase the opponent; it needs to survive the dangerous opening and make the opponent spend energy.`,
        `Use calmer launches first. If ${bladeName} gets pushed too easily, try a lower Ratchet or a more stable Bit. If it survives but loses by spin, add a little more stamina or balance to the setup.`
      ],
      bestCombos: [
        `${bladeName} 9-60 Hexa for strong defensive testing`,
        `${bladeName} 5-70 Needle for center-hold practice`,
        `${bladeName} 3-80 Orb for defense-stamina experiments`
      ],
      matchupNotes: [
        "Useful into aggressive attack players who overcommit",
        "Can struggle against stamina builds if it has no late-game plan",
        "Works best when the launch avoids unnecessary wall contact"
      ],
      beginnerAdvice:
        "Defense is not only about being heavy. A good defensive combo must avoid bad movement, reduce recoil, and still have a way to win after the opponent's attack fails."
    },
    Stamina: {
      howToUse: [
        `${item.name} should be tested around spin preservation. Stamina types usually want smooth movement, safe positioning, and as little wasted contact as possible.`,
        `Begin with a controlled launch that lets ${bladeName} settle cleanly. If it gets knocked out too often, improve stability before chasing more stamina. Surviving the first exchange matters more than a perfect spin finish on paper.`
      ],
      bestCombos: [
        `${bladeName} 9-60 Ball for low-risk stamina testing`,
        `${bladeName} 5-70 Orb for center control`,
        `${bladeName} 9-80 Disk Ball for taller stamina experiments`
      ],
      matchupNotes: [
        "Strong into low-pressure balance setups",
        "Needs protection against heavy attack openings",
        "Can win long matches if it avoids early destabilization"
      ],
      beginnerAdvice:
        "When testing stamina, record how often the combo survives the first ten seconds. A combo with amazing spin time still needs enough stability to reach the late game."
    },
    Balance: {
      howToUse: [
        `${item.name} is best treated as a flexible platform. Balance types should still have a primary win condition, even when they can adapt to several matchups.`,
        `Try one aggressive setup and one safer setup for ${bladeName}. If the aggressive version wins only by luck, move toward Point, Taper, or Orb-style Bits. If the safe version has no pressure, add a lower Ratchet or more mobile Bit.`
      ],
      bestCombos: [
        `${bladeName} 5-60 Point for flexible movement`,
        `${bladeName} 9-60 Taper for controlled balance`,
        `${bladeName} 5-70 Orb for stamina-leaning balance`
      ],
      matchupNotes: [
        "Can adapt into mixed local metas",
        "May lose to extreme attack or extreme stamina if the setup is too neutral",
        "Best results come from tuning one clear primary plan"
      ],
      beginnerAdvice:
        "Balance combos are easy to overbuild. Choose one main way to win, then let the secondary traits support that plan instead of fighting against it."
    }
  }[item.type];

  return {
    ...content,
    bestCombos: Array.from(new Set([...item.recommended_combos, ...content.bestCombos])).slice(0, 6)
  };
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
