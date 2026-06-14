export type SiteLocale = "en" | "zh" | "ms";

export function localeFromPath(pathname: string): SiteLocale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first === "zh" || first === "ms" ? first : "en";
}

export function localePrefix(locale: SiteLocale) {
  return locale === "en" ? "" : `/${locale}`;
}

export function localizedNavigation(locale: SiteLocale) {
  const prefix = localePrefix(locale);
  const labels = {
    en: { database: "Database", parts: "Parts", combos: "Combos", guides: "Guides", tier: "Tier List", lore: "Lore", search: "Search" },
    zh: { database: "陀螺资料", parts: "零件", combos: "组合", guides: "攻略", tier: "强度榜", lore: "动画设定", search: "搜索" },
    ms: { database: "Beyblade", parts: "Parts", combos: "Kombo", guides: "Panduan", tier: "Senarai Tier", lore: "Lore", search: "Cari" }
  }[locale];

  return {
    labels,
    home: prefix || "/",
    items: [
      [labels.database, `${prefix}/beyblades`],
      [labels.parts, `${prefix}/parts`],
      [labels.combos, "/combo-builder"],
      [labels.guides, `${prefix}/guides`],
      [labels.tier, "/tier-list"],
      [labels.lore, "/anime-lore"]
    ] as [string, string][],
    search: "/search"
  };
}
