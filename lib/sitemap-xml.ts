const xmlHeaders = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function sitemapResponse(
  entries: Array<{ url: string; lastModified: Date | string }>
) {
  const body = entries
    .map(
      ({ url, lastModified }) =>
        `<url><loc>${escapeXml(url)}</loc><lastmod>${new Date(lastModified).toISOString()}</lastmod></url>`
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
    { headers: xmlHeaders }
  );
}

export function sitemapIndexResponse(
  entries: Array<{ url: string; lastModified: Date | string }>
) {
  const body = entries
    .map(
      ({ url, lastModified }) =>
        `<sitemap><loc>${escapeXml(url)}</loc><lastmod>${new Date(lastModified).toISOString()}</lastmod></sitemap>`
    )
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`,
    { headers: xmlHeaders }
  );
}
