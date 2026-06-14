"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { localeFromPath, localePrefix } from "@/lib/localized-navigation";

export function SiteFooter() {
  const locale = localeFromPath(usePathname());
  const prefix = localePrefix(locale);
  const text = {
    en: { tagline: "The Ultimate Beyblade X Encyclopedia.", about: "About", contact: "Contact", privacy: "Privacy Policy", terms: "Terms of Service", disclaimer: "Fan-made encyclopedia. Beyblade is a trademark of its respective owners." },
    zh: { tagline: "终极 Beyblade X 百科全书。", about: "关于我们", contact: "联系我们", privacy: "隐私政策", terms: "服务条款", disclaimer: "本网站为粉丝制作的百科。Beyblade 商标归其权利所有者所有。" },
    ms: { tagline: "Ensiklopedia Beyblade X Terlengkap.", about: "Tentang Kami", contact: "Hubungi Kami", privacy: "Polisi Privasi", terms: "Terma Perkhidmatan", disclaimer: "Ensiklopedia buatan peminat. Tanda dagangan Beyblade dimiliki oleh pemilik masing-masing." }
  }[locale];

  return (
    <footer className="mt-16 border-t bg-slate-950/80">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Image src="/logo.png" alt="BEYBUKU" width={220} height={110} sizes="220px" className="h-14 w-auto object-contain" />
          <p className="mt-2 text-sm text-slate-400">{text.tagline}</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <Link href={`${prefix}/about`}>{text.about}</Link>
          <Link href={`${prefix}/contact`}>{text.contact}</Link>
          <Link href={`${prefix}/privacy`}>{text.privacy}</Link>
          <Link href={`${prefix}/terms`}>{text.terms}</Link>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <LanguageSwitcher variant="footer" />
          </div>
          <p className="text-sm text-slate-500">{text.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
