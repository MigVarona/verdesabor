import { MetadataRoute } from "next";
import { getArticleUrl } from "@/lib/articles";
import { fetchArticles } from "@/lib/articles.server";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const articles = await fetchArticles();
  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}${getArticleUrl(article)}`,
    lastModified: article.updatedAt
      ? new Date(article.updatedAt)
      : article.publishedAt
        ? new Date(article.publishedAt)
        : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categories = [
    "nutrition",
    "biohacking",
    "neuroscience",
    "wellness",
    "lifestyle",
    "longevity",
  ];

  const categoryUrls = categories.map((category) => ({
    url: `${siteUrl}/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${siteUrl}/editorial-policy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/cookies`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${siteUrl}/articles`, changeFrequency: "daily" as const, priority: 0.8 },
    {
      url: `${siteUrl}/resources/7-daily-habits-healthspan`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...staticPages,
    ...articleUrls,
    ...categoryUrls,
  ];
}
