import ArticleImage from "./ArticleImage";
import Link from "next/link";
import { type Article, formatDate, getArticleUrl, getArticleImage, getArticleThumbnail, getReadingTime } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface HomeEditorialGridProps {
  articles: Article[];
}

export default function HomeEditorialGrid({ articles }: HomeEditorialGridProps) {
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <section className="py-16 md:py-20 bg-renew-paper">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 md:mb-12 border-b border-renew-border pb-6">
          <div>
            <p className="editorial-kicker mb-2">The latest</p>
            <h2 className="font-serif text-4xl md:text-5xl text-renew-dark leading-tight">Fresh from the newsroom</h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-renew-muted hover:text-renew-sage transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {lead && (
            <Link
              href={getArticleUrl(lead)}
              className="group lg:col-span-7 block bg-renew-mist border border-renew-border overflow-hidden hover:shadow-card-hover transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ArticleImage
                  src={getArticleImage(lead)}
                  alt={lead.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="category-badge">{lead.category}</span>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl text-renew-dark leading-tight group-hover:text-renew-sage transition-colors text-balance">
                  {lead.title}
                </h3>
                <p className="mt-3 text-renew-muted leading-relaxed line-clamp-3">{lead.excerpt}</p>
                <div className="flex items-center gap-4 mt-5 text-xs text-renew-muted">
                  <span>{formatDate(lead.publishedAt)}</span>
                  <span>{getReadingTime(`${lead.text || ""} ${lead.excerpt || ""}`)} min read</span>
                </div>
              </div>
            </Link>
          )}

          <div className="lg:col-span-5 flex flex-col gap-3">
            {rest.slice(0, 3).map((article) => {
              const thumb = getArticleThumbnail(article);
              return (
                <Link
                  key={article._id}
                  href={getArticleUrl(article)}
                  className="group flex gap-4 p-4 bg-renew-paper border border-renew-border hover:bg-white hover:shadow-sm transition-all"
                >
                  <div className="relative w-24 h-24 overflow-hidden flex-shrink-0 ring-1 ring-renew-border">
                    <ArticleImage
                      src={thumb}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-0.5">
                    <span className="category-badge">{article.category}</span>
                    <h3 className="mt-1.5 font-semibold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-renew-muted mt-2">{formatDate(article.publishedAt)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {rest.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 pt-10 border-t border-renew-border">
            {rest.slice(3).map((article) => (
              <EditorialCard key={article._id} article={article} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-renew-dark border border-renew-border px-6 py-3 rounded-full hover:border-renew-sage hover:text-renew-sage transition-colors"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EditorialCard({ article }: { article: Article }) {
  const image = getArticleImage(article);
  return (
    <Link href={getArticleUrl(article)} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden mb-4 ring-1 ring-renew-border">
        <ArticleImage
          src={image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <span className="category-badge">{article.category}</span>
      <h3 className="mt-2 text-lg font-bold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-renew-muted mt-2 line-clamp-2">{article.excerpt}</p>
      <p className="text-xs text-renew-muted mt-3">{formatDate(article.publishedAt)}</p>
    </Link>
  );
}
