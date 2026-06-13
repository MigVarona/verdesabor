import clientPromise from "@/lib/mongodb";

export interface Article {
  _id: string;
  slug?: string;
  image: string;
  title: string;
  category: string;
  excerpt: string;
  imagexl?: string;
  text?: string;
  image2xl?: string;
  text2?: string;
  publishedAt: string;
  author?: string;
  tags?: string[];
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getArticleUrl(article: Pick<Article, "title" | "slug">): string {
  return `/articles/${article.slug || generateSlug(article.title)}`;
}

async function queryArticles(filter: Record<string, unknown> = {}): Promise<Article[]> {
  try {
    const client = await clientPromise;
    const db = client.db("verdesabor");
    const articles = await db
      .collection("articles")
      .find(filter)
      .sort({ publishedAt: -1 })
      .toArray();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error("Error fetching articles from database:", error);
    return [];
  }
}

export async function fetchArticles(): Promise<Article[]> {
  return queryArticles();
}

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  return queryArticles({ category: new RegExp(`^${category}$`, "i") });
}
