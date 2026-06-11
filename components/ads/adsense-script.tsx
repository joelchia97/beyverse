import Script from "next/script";

export function AdsenseScript() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const hasRealClientId = Boolean(clientId && !clientId.includes("XXXXXXXXXXXXXXXX"));

  // Load the account script for site verification while ad units remain
  // independently disabled until AdSense approval.
  if (!clientId || !hasRealClientId || process.env.NODE_ENV !== "production") {
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
