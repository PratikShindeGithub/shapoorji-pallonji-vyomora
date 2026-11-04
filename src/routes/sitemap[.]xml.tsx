import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://shapoorjipallonjivyomora.site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          `${BASE_URL}/`,
          `${BASE_URL}/privacy-policy.html`,
          `${BASE_URL}/terms.html`,
          `${BASE_URL}/lp/2-bhk`,
          `${BASE_URL}/lp/3-bhk`,
          `${BASE_URL}/lp/3-bhk-duplex`,
          `${BASE_URL}/lp/4-bhk`,
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
