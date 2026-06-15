import { MetadataRoute } from "next";
import { getArticleUrl } from "@/lib/articles";
import { fetchArticles, getAllTags } from "@/lib/articles.server";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [articles, tags] = await Promise.all([fetchArticles(), getAllTags()]);
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
    { url: `${siteUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/editorial-policy`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/cookies`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/articles`, changeFrequency: "daily" as const, priority: 0.8, lastModified: new Date() },
    {
      url: `${siteUrl}/resources/7-daily-habits-healthspan`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date("2024-11-01"),
    },
  ];

  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
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
    ...tagUrls,
  ];
}
