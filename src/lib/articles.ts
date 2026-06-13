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
