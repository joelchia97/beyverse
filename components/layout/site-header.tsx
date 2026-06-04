import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

const nav = [
  ["Database", "/beyblades"],
  ["Parts", "/parts"],
  ["Combos", "/combo-builder"],
  ["Guides", "/guides"],
  ["Tier List", "/tier-list"],
  ["Lore", "/anime-lore"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-slate-950/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="BEYBUKU" width={162} height={40} priority className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/search" className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-semibold text-slate-100 hover:bg-slate-800">
          <Search className="h-4 w-4" />
          Search
        </Link>
        <div className="hidden items-center gap-1 rounded-md border bg-slate-950/60 p-1 text-xs font-semibold text-slate-300 sm:flex">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
