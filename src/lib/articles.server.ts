import "server-only";

import fs from "fs";
import path from "path";
import type { Article } from "@/lib/articles";
import { generateSlug } from "@/lib/articles";
import { toTagSlug } from "@/lib/tags";

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
    .filter((a): a is Article => a !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function matchesSlug(article: Article, slug: string): boolean {
  return article.slug === slug || generateSlug(article.title) === slug;
}

export async function fetchArticles(): Promise<Article[]> {
  return readArticlesFromDisk();
}

export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  const regex = new RegExp(`^${category}$`, "i");
  return readArticlesFromDisk().filter((a) => regex.test(a.category));
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const articles = readArticlesFromDisk();
  return articles.find((a) => matchesSlug(a, slug)) ?? null;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  return readArticlesFromDisk().map((a) => a.slug || generateSlug(a.title));
}

export async function fetchArticlesByTag(tag: string): Promise<Article[]> {
  const normalizedTag = toTagSlug(tag);
  return readArticlesFromDisk().filter((a) =>
    a.tags?.some((t) => toTagSlug(t) === normalizedTag)
  );
}

export async function getAllTags(): Promise<string[]> {
  const articles = readArticlesFromDisk();
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags ?? []) {
      tagSet.add(toTagSlug(tag));
    }
  }
  return Array.from(tagSet).sort();
}
