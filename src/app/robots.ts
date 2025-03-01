import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://verdesabor.vercel.app";

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
