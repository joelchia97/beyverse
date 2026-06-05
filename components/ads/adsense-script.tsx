import Script from "next/script";

export function AdsenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
  const hasRealClientId = Boolean(clientId && !clientId.includes("XXXXXXXXXXXXXXXX"));

  if (!adsEnabled || !clientId || !hasRealClientId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
    />
  );
}
