import { MetadataRoute } from "next"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://renewhabits.com"

  // Suponiendo que tienes una API que devuelve tus artículos
  const articles = await fetch(`${siteUrl}/api/articles`).then((res) => res.json())

  const articleUrls = articles.map((article: { slug: string }) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date().toISOString(),
  }))

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
  ]
}
