import "server-only";

import clientPromise from "@/lib/mongodb";
import type { Article } from "@/lib/articles";

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

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const client = await clientPromise;
    const db = client.db("verdesabor");
    const article = await db.collection("articles").findOne({ slug });
    return article ? JSON.parse(JSON.stringify(article)) : null;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }
}
