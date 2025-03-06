import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com";

  const articles = await fetch(`${siteUrl}/api/articles`).then((res) => res.json());

  const articleUrls = articles.map((article: { slug: string }) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date().toISOString(),
  }));
  

  const categories = [
    "nutrition",
    "biohacking",
    "neuroscience",
    "wellness",
    "lifestyle",
    "longevity"
  ];

  const categoryUrls = categories.map((category) => ({
    url: `${siteUrl}/${category}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${siteUrl}/articles`,
      lastModified: new Date().toISOString(),
    },
    ...articleUrls,
    ...categoryUrls,
  ];
}

export const config = {
  runtime: 'edge', 
  revalidate: 86400, 
};
