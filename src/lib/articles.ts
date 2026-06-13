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

export function getReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function splitParagraphs(text: string): string[] {
  return text.split(/\n\n+/).filter(Boolean);
}

export const DEFAULT_ARTICLE_IMAGE =
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&h=900&q=80";

export function getArticleImage(article: Pick<Article, "image" | "imagexl">): string {
  const url = article.imagexl || article.image;
  if (url && url.startsWith("http")) return url;
  return DEFAULT_ARTICLE_IMAGE;
}

export function getArticleThumbnail(article: Pick<Article, "image" | "imagexl">): string {
  const url = article.image || article.imagexl;
  if (url && url.startsWith("http")) {
    return url.includes("unsplash.com")
      ? url.replace(/w=\d+/, "w=600").replace(/h=\d+/, "h=400")
      : url;
  }
  return DEFAULT_ARTICLE_IMAGE.replace("w=1600", "w=600").replace("h=900", "h=400");
}
