import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com";

  let articleUrls: MetadataRoute.Sitemap = [];
  try {
    const articles = await fetch(`${siteUrl}/api/articles`).then((res) => res.json());
    if (Array.isArray(articles)) {
      articleUrls = articles.map((article: { slug: string }) => ({
        url: `${siteUrl}/articles/${article.slug}`,
        lastModified: new Date().toISOString(),
      }));
    }
  } catch {
    /* API unavailable at build time */
  }

  const categories = ["nutrition", "biohacking", "neuroscience", "wellness", "lifestyle", "longevity"];

  const categoryUrls = categories.map((category) => ({
    url: `${siteUrl}/${category}`,
    lastModified: new Date().toISOString(),
  }));

  const staticPages = ["about", "disclaimer", "privacy", "articles"].map((page) => ({
    url: `${siteUrl}/${page}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    { url: `${siteUrl}/`, lastModified: new Date().toISOString() },
    ...staticPages,
    ...articleUrls,
    ...categoryUrls,
  ];
}
