import Script from "next/script";

export function AdsenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adsEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";

  if (!adsEnabled || !clientId || process.env.NODE_ENV !== "production") {
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
