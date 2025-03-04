import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/adminpage"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
