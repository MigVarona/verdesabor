import Image from "next/image";
import Link from "next/link";
import { type Article, formatDate, getArticleUrl, getArticleImage, getArticleThumbnail } from "@/lib/articles";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact" | "featured" | "horizontal";
  className?: string;
}

export default function ArticleCard({
  article,
  variant = "default",
  className,
}: ArticleCardProps) {
  const url = getArticleUrl(article);
  const image = getArticleImage(article);
  const thumb = getArticleThumbnail(article);

  if (variant === "horizontal") {
    return (
      <article className={cn("group flex gap-4 py-5 border-b border-gray-100 last:border-0", className)}>
        {image && (
          <Link href={url} className="relative flex-shrink-0 w-28 h-20 md:w-36 md:h-24 rounded-lg overflow-hidden">
            <Image
              src={thumb}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="144px"
            />
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <span className="category-badge">{article.category}</span>
          <h3 className="mt-1 font-semibold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
            <Link href={url}>{article.title}</Link>
          </h3>
          <p className="text-xs text-gray-400 mt-1">{formatDate(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link href={url} className="block">
          {image && (
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-3">
              <Image
                src={image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
          <span className="category-badge">{article.category}</span>
          <h3 className="mt-1.5 font-semibold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1.5">{formatDate(article.publishedAt)}</p>
        </Link>
      </article>
    );
  }

  if (variant === "featured") {
    return (
      <article className={cn("group", className)}>
        <Link href={url} className="block">
          {image && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5">
              <Image
                src={image}
                alt={article.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <span className="inline-block bg-renew-accent text-renew-dark text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3">
                  {article.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight text-balance">
                  {article.title}
                </h2>
              </div>
            </div>
          )}
          <p className="text-gray-600 leading-relaxed line-clamp-2 md:line-clamp-none">
            {article.excerpt}
          </p>
          <p className="text-sm text-gray-400 mt-3">{formatDate(article.publishedAt)}</p>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group bg-white rounded-xl border border-gray-100 shadow-card hover:shadow-card-hover transition-shadow overflow-hidden", className)}>
      <Link href={url} className="block">
        {image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-5">
          <span className="category-badge">{article.category}</span>
          <h3 className="mt-2 text-lg font-semibold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
          <p className="text-xs text-gray-400 mt-3">{formatDate(article.publishedAt)}</p>
        </div>
      </Link>
    </article>
  );
}
