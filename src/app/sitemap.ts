import { MetadataRoute } from "next";
import { getArticleUrl } from "@/lib/articles";
import { fetchArticles } from "@/lib/articles.server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com";

  const articles = await fetchArticles();
  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}${getArticleUrl(article)}`,
    lastModified: article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : new Date().toISOString(),
  }));

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
