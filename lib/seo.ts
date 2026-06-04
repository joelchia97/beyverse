export const siteConfig = {
  name: "BEYBUKU",
  title: "BEYBUKU - The Ultimate Beyblade X Encyclopedia",
  description:
    "A Beyblade encyclopedia for Beyblade X releases, parts data, combo building, strategy guides, meta tier notes, and anime lore.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://beyverse-bpop.vercel.app",
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"
};

export function pageTitle(title: string) {
  return `${title} | ${siteConfig.name}`;
}
