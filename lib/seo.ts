const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const canonicalSiteUrl =
  configuredSiteUrl && !configuredSiteUrl.includes("beyverse")
    ? configuredSiteUrl.replace(/\/$/, "")
    : "https://beybuku.vercel.app";

export const siteConfig = {
  name: "BEYBUKU",
  title: "BEYBUKU - The Ultimate Beyblade X Encyclopedia",
  description:
    "A Beyblade encyclopedia for Beyblade X releases, parts data, combo building, strategy guides, meta tier notes, and anime lore.",
  url: canonicalSiteUrl,
  publisherId:
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-3402203312861170"
};

export function pageTitle(title: string) {
  return `${title} | ${siteConfig.name}`;
}
