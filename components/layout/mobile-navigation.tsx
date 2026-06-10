"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

const nav = [
  ["Database", "/beyblades"],
  ["Parts", "/parts"],
  ["Combos", "/combo-builder"],
  ["Guides", "/guides"],
  ["Tier List", "/tier-list"],
  ["Lore", "/anime-lore"]
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-slate-950/60 text-slate-100 hover:bg-slate-800"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-0 top-16 border-b bg-slate-950/98 shadow-2xl">
          <nav className="container-page grid gap-1 py-4" aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-md px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/search"
              className="mt-2 inline-flex items-center gap-2 rounded-md border px-3 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800"
              onClick={() => setIsOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <div className="mt-2 flex items-center gap-2 border-t pt-4 text-sm font-semibold text-slate-300">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
