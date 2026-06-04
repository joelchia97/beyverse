import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-slate-950/80">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <Image src="/logo.png" alt="BEYBUKU" width={220} height={110} className="h-14 w-auto object-contain" />
          <p className="mt-2 text-sm text-slate-400">The Ultimate Beyblade X Encyclopedia.</p>
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
            <LanguageSwitcher variant="footer" />
          </div>
          <p className="text-sm text-slate-500">Fan-made encyclopedia. Beyblade is a trademark of its respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
