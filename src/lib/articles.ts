import { optimizeImageUrl } from "@/lib/images";

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
  updatedAt?: string;
  author?: string;
  reviewedBy?: string;
  tags?: string[];
  keyTakeaways?: string[];
  sources?: Array<{
    title: string;
    url?: string;
    publisher?: string;
    year?: number;
    studyType?: "meta-analysis" | "rct" | "review" | "cohort" | "observational" | "institutional";
  }>;
  faq?: Array<{ q: string; a: string }>;
  howTo?: {
    name: string;
    description?: string;
    steps: Array<{ name: string; text: string }>;
    totalTime?: string;
  };
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

export { optimizeImageUrl, DEFAULT_HERO_IMAGE as DEFAULT_ARTICLE_IMAGE, articleImageLoader } from "@/lib/images";

export function getArticleImage(article: Pick<Article, "image" | "imagexl">): string {
  return optimizeImageUrl(article.imagexl || article.image, "hero");
}

export function getArticleThumbnail(article: Pick<Article, "image" | "imagexl">): string {
  return optimizeImageUrl(article.image || article.imagexl, "card");
}
