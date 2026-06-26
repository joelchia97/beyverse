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
    series: "系列", type: "类型", weight: "重量", estimated: "估算", unverified: "未核实", release: "发售日期", code: "型号",
    strengths: "优点", weaknesses: "缺点", combos: "推荐组合", anime: "动画资料",
    category: "类别", attack: "攻击", defense: "防御", stamina: "持久", balance: "平衡",
    advantages: "优势", disadvantages: "劣势", uses: "推荐用途", relatedBeys: "相关陀螺",
    relatedParts: "相关零件", back: "返回目录", ad: "资料页广告", analysis: "技术解读",
    source: "英文原始资料", sourceHelp: "以下保留英文原始内容，方便核对专业术语与资料来源。",
    types: { Attack: "攻击型", Defense: "防御型", Stamina: "持久型", Balance: "平衡型" },
    categories: { Blade: "刃片", Ratchet: "棘轮", Bit: "轴心" }
  },
  ms: {
    database: "Pangkalan Data Beyblade", partsDatabase: "Pangkalan Data Parts", quickFacts: "Fakta Ringkas",
    series: "Siri", type: "Jenis", weight: "Berat", estimated: "anggaran", unverified: "belum disahkan", release: "Tarikh keluaran", code: "Kod",
    strengths: "Kekuatan", weaknesses: "Kelemahan", combos: "Kombo disyorkan", anime: "Info anime",
    category: "Kategori", attack: "Serangan", defense: "Pertahanan", stamina: "Stamina", balance: "Keseimbangan",
    advantages: "Kelebihan", disadvantages: "Kekurangan", uses: "Kegunaan disyorkan", relatedBeys: "Beyblade berkaitan",
    relatedParts: "Parts berkaitan", back: "Kembali ke katalog", ad: "Iklan halaman maklumat", analysis: "Analisis Teknikal",
    source: "Maklumat Asal Bahasa Inggeris", sourceHelp: "Kandungan asal dikekalkan untuk semakan istilah teknikal dan ketepatan data.",
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
          <p className="mt-4 text-lg leading-8 text-slate-300">{beybladeAnalysis(item, locale)}</p>
          <BeybladeVisual name={item.name} type={item.type} imageUrl={item.image_url} className="mt-6" />
          <AdBanner slot="beyblade-detail-page-ad" label={text.ad} />
          <FactCard title={text.quickFacts} facts={[
            [text.code, item.product_code || "TBA"], [text.series, item.series], [text.type, text.types[item.type]],
            [text.weight, formatLocalizedWeight(item, text)], [text.release, item.release_date]
          ]} />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ListCard title={text.strengths} items={localizedBeybladePoints(item.type, locale).strengths} />
            <ListCard title={text.weaknesses} items={localizedBeybladePoints(item.type, locale).weaknesses} />
          </div>
          <ListCard title={text.combos} items={item.recommended_combos} className="mt-4" />
          <SourceCard title={text.source} help={text.sourceHelp} description={item.description} sections={[
            [text.strengths, item.strengths], [text.weaknesses, item.weaknesses],
            ...(item.anime_info ? [[text.anime, [item.anime_info]] as [string, string[]]] : [])
          ]} />
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
          <p className="mt-4 text-lg leading-8 text-slate-300">{partAnalysis(item, locale)}</p>
          <AdBanner slot="parts-detail-page-ad" label={text.ad} />
          <FactCard title={text.quickFacts} facts={[
            [text.category, text.categories[item.category]], [text.weight, `${item.weight}g`],
            [text.attack, String(item.attack)], [text.defense, String(item.defense)],
            [text.stamina, String(item.stamina)], [text.balance, String(item.balance)]
          ]} />
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <ListCard title={text.advantages} items={localizedPartPoints(item, locale).advantages} />
            <ListCard title={text.disadvantages} items={localizedPartPoints(item, locale).disadvantages} />
            <ListCard title={text.uses} items={localizedPartPoints(item, locale).uses} />
          </div>
          <SourceCard title={text.source} help={text.sourceHelp} description={item.description} sections={[
            [text.advantages, item.advantages], [text.disadvantages, item.disadvantages], [text.uses, item.recommended_uses]
          ]} />
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

function SourceCard({ title, help, description, sections }: { title: string; help: string; description: string; sections: [string, string[]][] }) {
  return <Card className="mt-4"><CardHeader><CardTitle>{title}</CardTitle><p className="text-sm text-slate-400">{help}</p></CardHeader><CardContent className="space-y-4"><p className="leading-7 text-slate-300">{description}</p>{sections.map(([heading, items]) => items.length ? <div key={heading}><h4 className="text-sm font-bold text-white">{heading}</h4><ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-400">{items.map((item) => <li key={item}>- {item}</li>)}</ul></div> : null)}</CardContent></Card>;
}

function RelatedBeyblades({ locale, title, items, text }: { locale: DatabaseLocale; title: string; items: Beyblade[]; text: typeof copy[DatabaseLocale] }) {
  return <Card className="mt-4"><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{items.map((item) => <Link key={item.slug} href={`/${locale}/beyblades/${item.slug}`} className="rounded-md border bg-slate-950/45 p-3 hover:border-sky-400/60"><div className="flex justify-between gap-3"><span className="font-semibold text-white">{item.name}</span><Badge>{item.product_code || item.type}</Badge></div><p className="mt-1 text-sm text-slate-400">{text.types[item.type]} / {formatLocalizedWeight(item, text)}</p></Link>)}</CardContent></Card>;
}

function formatLocalizedWeight(
  item: Pick<Beyblade, "weight" | "weight_status">,
  text: { estimated: string; unverified: string }
) {
  if (item.weight_status === "Estimated") return `~${item.weight}g (${text.estimated})`;
  if (item.weight_status === "Unverified") return `${item.weight}g (${text.unverified})`;
  return `${item.weight}g`;
}

function beybladeAnalysis(item: Beyblade, locale: DatabaseLocale) {
  const content = {
    zh: {
      Attack: `${item.name} 是攻击型陀螺，主要目标是在对手稳定前制造高速碰撞和击飞机会。建议测试不同发射角度，记录首次接触时间、Xtreme Dash 成功率及自爆出界次数。`,
      Defense: `${item.name} 是防御型陀螺，主要价值是吸收前期重击并保持中心稳定。测试重点应包括抗击飞能力、回弹控制，以及承受攻击后能否保留足够旋转。`,
      Stamina: `${item.name} 是持久型陀螺，依靠平稳移动和较低旋转损耗争取后段胜利。先确认它能安全度过开局，再与主流攻击型和其他持久型进行多回合比较。`,
      Balance: `${item.name} 是平衡型陀螺，可通过棘轮与轴心调整攻击、防御或持久倾向。实战组合应先确定一个主要获胜方式，避免每项能力都有但没有明确优势。`
    },
    ms: {
      Attack: `${item.name} ialah Beyblade jenis serangan yang mahu menghasilkan sentuhan pantas dan peluang knockout sebelum lawan stabil. Uji sudut pelancaran, masa sentuhan pertama, kejayaan Xtreme Dash dan risiko keluar stadium sendiri.`,
      Defense: `${item.name} ialah jenis pertahanan yang menyerap hentaman awal sambil mengekalkan kedudukan stabil. Fokus ujian ialah rintangan knockout, kawalan recoil dan baki putaran selepas menerima serangan.`,
      Stamina: `${item.name} ialah jenis stamina yang bergantung pada pergerakan lancar dan kehilangan putaran rendah. Pastikan ia melepasi fasa awal dengan selamat sebelum dibandingkan dengan kombo serangan dan stamina utama.`,
      Balance: `${item.name} ialah jenis seimbang yang boleh dilaras melalui Ratchet dan Bit. Tetapkan satu cara kemenangan utama supaya kombo tidak menjadi sederhana dalam semua aspek tanpa kelebihan jelas.`
    }
  };
  return content[locale][item.type];
}

function localizedBeybladePoints(type: Beyblade["type"], locale: DatabaseLocale) {
  const content = {
    zh: {
      Attack: { strengths: ["早期击飞压力强", "可利用 Xtreme Dash 制造高速接触", "对被动持久型具有威胁"], weaknesses: ["容易消耗旋转力", "发射角度失误会提高自爆风险", "首次攻击失败后胜率可能下降"] },
      Defense: { strengths: ["能承受较强的初期碰撞", "稳定移动可迫使对手消耗体力", "适合反制过度进攻"], weaknesses: ["面对高效率持久型可能缺乏终结能力", "重量不等于绝对防御", "不良回弹仍可能导致出界"] },
      Stamina: { strengths: ["后段旋转表现稳定", "适合作为组合测试基准", "平稳发射时效率较高"], weaknesses: ["开局容易受到攻击型针对", "被打乱姿态后会快速失去旋转", "需要稳定一致的发射"] },
      Balance: { strengths: ["可根据对局调整组合", "能够覆盖多种比赛情况", "适合测试混合型策略"], weaknesses: ["缺乏明确定位时表现平庸", "零件选择错误会分散优势", "需要较多对局才能完成调整"] }
    },
    ms: {
      Attack: { strengths: ["Tekanan knockout awal yang tinggi", "Boleh menggunakan Xtreme Dash untuk sentuhan pantas", "Mengancam kombo stamina pasif"], weaknesses: ["Stamina cepat berkurang", "Sudut salah meningkatkan risiko keluar sendiri", "Peluang menang menurun jika serangan awal gagal"] },
      Defense: { strengths: ["Mampu menahan hentaman awal", "Pergerakan stabil memaksa lawan menggunakan tenaga", "Sesuai melawan serangan berlebihan"], weaknesses: ["Boleh kalah putaran kepada stamina efisien", "Berat sahaja tidak menjamin pertahanan", "Recoil buruk masih boleh menyebabkan knockout"] },
      Stamina: { strengths: ["Prestasi putaran akhir yang stabil", "Baik sebagai penanda aras ujian", "Efisien dengan pelancaran terkawal"], weaknesses: ["Mudah disasarkan oleh serangan awal", "Kehilangan putaran apabila tidak stabil", "Memerlukan pelancaran yang konsisten"] },
      Balance: { strengths: ["Boleh dilaras mengikut padanan", "Meliputi pelbagai situasi perlawanan", "Sesuai untuk strategi campuran"], weaknesses: ["Prestasi sederhana tanpa fokus jelas", "Pilihan parts salah memecahkan kekuatan", "Memerlukan lebih banyak ujian"] }
    }
  };
  return content[locale][type];
}

function partAnalysis(item: Part, locale: DatabaseLocale) {
  const strongest = strongestPartStat(item);
  const role = localizedStatName(strongest, locale);
  const content = {
    zh: {
      Blade: `${item.name} 是刃片，负责主要撞击形状、回弹方式和战斗定位。数据上最突出的方向是${role}；测试时应固定棘轮和轴心，避免其他零件影响判断。`,
      Ratchet: `${item.name} 是棘轮，影响高度、刃片接触位置、刮地和爆裂风险。数据上最突出的方向是${role}；建议与不同高度棘轮进行同条件比较。`,
      Bit: `${item.name} 是轴心，控制移动路线、摩擦、攻击速度与后段持久。数据上最突出的方向是${role}；测试时应使用相同刃片和棘轮。`
    },
    ms: {
      Blade: `${item.name} ialah Blade yang menentukan bentuk sentuhan, recoil dan identiti pertarungan. Arah statistik utamanya ialah ${role}; kekalkan Ratchet dan Bit yang sama semasa ujian.`,
      Ratchet: `${item.name} ialah Ratchet yang mempengaruhi tinggi, titik sentuhan, scraping dan risiko burst. Arah statistik utamanya ialah ${role}; bandingkan dengan Ratchet pada tinggi berbeza.`,
      Bit: `${item.name} ialah Bit yang mengawal laluan pergerakan, geseran, kelajuan serangan dan stamina akhir. Arah statistik utamanya ialah ${role}; gunakan Blade dan Ratchet yang sama semasa ujian.`
    }
  };
  return content[locale][item.category];
}

function localizedPartPoints(item: Part, locale: DatabaseLocale) {
  const role = localizedStatName(strongestPartStat(item), locale);
  return locale === "zh"
    ? {
        advantages: [`数据倾向以${role}为主`, "可在固定组合中进行清楚的单一变量测试", `适合比较同类别零件的${role}表现`],
        disadvantages: ["纸面数据不能完全代表实际碰撞结果", "表现会受到其他两个零件影响", "需要多回合测试才能判断稳定性"],
        uses: [`建立${role}向组合`, "与同类别零件进行对比", "记录击飞、持久和稳定性结果"]
      }
    : {
        advantages: [`Statistik utama cenderung kepada ${role}`, "Mudah diuji sebagai satu pemboleh ubah dalam kombo tetap", `Sesuai membandingkan prestasi ${role} dalam kategori sama`],
        disadvantages: ["Statistik tidak mewakili semua hasil sentuhan sebenar", "Prestasi dipengaruhi oleh dua parts lain", "Memerlukan banyak pusingan untuk menilai konsistensi"],
        uses: [`Membina kombo berfokus ${role}`, "Perbandingan dengan parts kategori sama", "Merekod hasil knockout, stamina dan kestabilan"]
      };
}

function strongestPartStat(item: Pick<Part, "attack" | "defense" | "stamina" | "balance">) {
  const stats = [["attack", item.attack], ["defense", item.defense], ["stamina", item.stamina], ["balance", item.balance]] as const;
  return stats.reduce((best, current) => current[1] > best[1] ? current : best)[0];
}

function localizedStatName(stat: ReturnType<typeof strongestPartStat>, locale: DatabaseLocale) {
  return {
    zh: { attack: "攻击", defense: "防御", stamina: "持久", balance: "平衡" },
    ms: { attack: "serangan", defense: "pertahanan", stamina: "stamina", balance: "keseimbangan" }
  }[locale][stat];
}
