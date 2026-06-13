import "server-only";

import fs from "fs";
import path from "path";
import type { Article } from "@/lib/articles";
import { generateSlug } from "@/lib/articles";
import { getMongoClient } from "@/lib/mongodb";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function normalizeArticle(raw: Omit<Article, "_id"> & { _id?: string }, filename: string): Article {
  const slug = raw.slug || generateSlug(raw.title);
  return {
    ...raw,
    _id: raw._id || slug || filename.replace(/\.json$/, ""),
    slug,
    publishedAt: raw.publishedAt || new Date().toISOString(),
  };
}

function normalizeMongoArticle(raw: Record<string, unknown>): Article {
  const title = String(raw.title || "");
  const slug = String(raw.slug || generateSlug(title));
  const publishedAt = raw.publishedAt
    ? new Date(raw.publishedAt as string | Date).toISOString()
    : new Date().toISOString();

  return {
    _id: String(raw._id),
    slug,
    title,
    category: String(raw.category || ""),
    excerpt: String(raw.excerpt || ""),
    image: String(raw.image || ""),
    imagexl: raw.imagexl ? String(raw.imagexl) : undefined,
    text: raw.text ? String(raw.text) : undefined,
    image2xl: raw.image2xl ? String(raw.image2xl) : undefined,
    text2: raw.text2 ? String(raw.text2) : undefined,
    publishedAt,
    author: raw.author ? String(raw.author) : undefined,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : undefined,
  };
}

function readArticlesFromDisk(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      try {
        const raw = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8"));
        return normalizeArticle(raw, file);
      } catch (error) {
        console.error(`Error reading article file ${file}:`, error);
        return null;
      }
    })
    .filter((a): a is Article => a !== null);
}

async function readArticlesFromMongo(): Promise<Article[]> {
  try {
    const clientPromise = getMongoClient();
    if (!clientPromise) return [];

    const client = await clientPromise;
    const articles = await client
      .db("verdesabor")
      .collection("articles")
      .find()
      .sort({ publishedAt: -1 })
      .toArray();

    return articles.map((doc) => normalizeMongoArticle(doc as Record<string, unknown>));
  } catch (error) {
    console.error("Error fetching articles from MongoDB:", error);
    return [];
  }
}

function mergeArticles(mongoArticles: Article[], fileArticles: Article[]): Article[] {
  const bySlug = new Map<string, Article>();

  for (const article of mongoArticles) {
    const key = article.slug || generateSlug(article.title);
    bySlug.set(key, article);
  }

  // File-based articles override MongoDB entries with the same slug
  for (const article of fileArticles) {
    const key = article.slug || generateSlug(article.title);
    bySlug.set(key, article);
  }

  return Array.from(bySlug.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

async function getAllArticles(): Promise<Article[]> {
  const [mongoArticles, fileArticles] = await Promise.all([
    readArticlesFromMongo(),
    Promise.resolve(readArticlesFromDisk()),
  ]);
  return mergeArticles(mongoArticles, fileArticles);
}

function matchesSlug(article: Article, slug: string): boolean {
  return article.slug === slug || generateSlug(article.title) === slug;
}

export async function fetchArticles(): Promise<Article[]> {
  return getAllArticles();
}

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  const regex = new RegExp(`^${category}$`, "i");
  return (await getAllArticles()).filter((a) => regex.test(a.category));
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((a) => matchesSlug(a, slug)) ?? null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map((a) => a.slug || generateSlug(a.title));
}
