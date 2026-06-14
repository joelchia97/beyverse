"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedGuides, type GuideLocale } from "@/lib/localized-guides";
import { cn } from "@/lib/utils";

const localizedStaticRoutes = new Set(["about", "beyblades", "contact", "guides", "parts", "privacy", "terms"]);

function guideExists(locale: GuideLocale, slug: string) {
  return localizedGuides[locale].some((guide) => guide.slug === slug);
}

function getLanguagePath(pathname: string, locale: "en" | GuideLocale) {
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = segments[0] === "zh" || segments[0] === "ms" ? segments[0] : "en";
  const cleanSegments = currentLocale === "en" ? segments : segments.slice(1);
  const section = cleanSegments[0] ?? "";
  const slug = cleanSegments[1] ?? "";

  if (locale === "en") {
    if (currentLocale !== "en") {
      return cleanSegments.length ? `/${cleanSegments.join("/")}` : "/";
    }

    return pathname || "/";
  }

  if (!cleanSegments.length) {
    return `/${locale}`;
  }

  if (section === "guides" && slug) {
    return guideExists(locale, slug) ? `/${locale}/guides/${slug}` : `/${locale}/guides`;
  }

  if ((section === "beyblades" || section === "parts") && slug) {
    return `/${locale}/${section}/${slug}`;
  }

  if (localizedStaticRoutes.has(section) && !slug) {
    return `/${locale}/${section}`;
  }

  return `/${locale}`;
}

export function LanguageSwitcher({ variant = "header" }: { variant?: "header" | "footer" }) {
  const pathname = usePathname();
  const baseClass =
    variant === "header"
      ? "rounded-sm px-2 py-1 hover:bg-slate-800 hover:text-white"
      : "rounded-sm border px-2 py-1 hover:bg-slate-800";

  return (
    <>
      <Link className={cn(baseClass)} href={getLanguagePath(pathname, "en")}>
        EN
      </Link>
      <Link className={cn(baseClass)} href={getLanguagePath(pathname, "zh")}>
        中文
      </Link>
      <Link className={cn(baseClass)} href={getLanguagePath(pathname, "ms")}>
        BM
      </Link>
    </>
  );
}
