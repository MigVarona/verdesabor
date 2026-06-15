import { MetadataRoute } from "next";
import { getArticleUrl } from "@/lib/articles";
import { fetchArticles, getAllTags } from "@/lib/articles.server";
import { getSiteUrl } from "@/lib/seo";
import { toTagSlug } from "@/lib/tags";

function getArticleTimestamp(article: { updatedAt?: string; publishedAt: string }): Date {
  const updated = article.updatedAt ? new Date(article.updatedAt) : null;
  if (updated && !Number.isNaN(updated.getTime())) return updated;
  const published = new Date(article.publishedAt);
  if (!Number.isNaN(published.getTime())) return published;
  return new Date();
}

function getLatestDate(dates: Date[], fallback: Date): Date {
  if (dates.length === 0) return fallback;
  return dates.reduce((latest, current) =>
    current.getTime() > latest.getTime() ? current : latest
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [articles, tags] = await Promise.all([fetchArticles(), getAllTags()]);
  const articleDates = articles.map(getArticleTimestamp);
  const fallbackDate = new Date("2024-11-01");
  const siteLastModified = getLatestDate(articleDates, fallbackDate);
  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}${getArticleUrl(article)}`,
    lastModified: getArticleTimestamp(article),
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
    lastModified: getLatestDate(
      articles
        .filter((article) => article.category.toLowerCase() === category)
        .map(getArticleTimestamp),
      siteLastModified
    ),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/about`, changeFrequency: "monthly" as const, priority: 0.5, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/editorial-policy`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/cookies`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date("2024-11-01") },
    { url: `${siteUrl}/articles`, changeFrequency: "daily" as const, priority: 0.8, lastModified: siteLastModified },
    {
      url: `${siteUrl}/resources/7-daily-habits-healthspan`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date("2024-11-01"),
    },
  ];

  const tagLastModified = new Map<string, Date>();
  for (const article of articles) {
    const date = getArticleTimestamp(article);
    for (const tag of article.tags ?? []) {
      const slug = toTagSlug(tag);
      const current = tagLastModified.get(slug);
      if (!current || date.getTime() > current.getTime()) {
        tagLastModified.set(slug, date);
      }
    }
  }

  const tagUrls: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: tagLastModified.get(tag) ?? siteLastModified,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: siteLastModified,
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...staticPages,
    ...articleUrls,
    ...categoryUrls,
    ...tagUrls,
  ];
}
