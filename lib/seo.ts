export const siteConfig = {
  name: "BeyVerse",
  title: "BeyVerse - Everything About Beyblade In One Universe",
  description:
    "A Beyblade encyclopedia for Beyblade X releases, parts data, combo building, strategy guides, meta tier notes, and anime lore.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  publisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"
};

export function pageTitle(title: string) {
  return `${title} | ${siteConfig.name}`;
}
