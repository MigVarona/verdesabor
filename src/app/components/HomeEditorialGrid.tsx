import Image from "next/image";
import Link from "next/link";
import { type Article, formatDate, getArticleUrl, getReadingTime } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface HomeEditorialGridProps {
  articles: Article[];
}

export default function HomeEditorialGrid({ articles }: HomeEditorialGridProps) {
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-2">The latest</p>
            <h2 className="text-3xl md:text-4xl font-bold text-renew-dark tracking-tight">Continue reading</h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-renew-sage transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {lead && (
            <Link
              href={getArticleUrl(lead)}
              className="group lg:col-span-7 block bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover transition-all"
            >
              {(lead.imagexl || lead.image) && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={lead.imagexl || lead.image}
                    alt={lead.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
              )}
              <div className="p-6 md:p-8">
                <span className="category-badge">{lead.category}</span>
                <h3 className="mt-3 text-2xl md:text-3xl font-bold text-renew-dark leading-tight group-hover:text-renew-sage transition-colors text-balance">
                  {lead.title}
                </h3>
                <p className="mt-3 text-gray-500 leading-relaxed line-clamp-3">{lead.excerpt}</p>
                <div className="flex items-center gap-4 mt-5 text-xs text-gray-400">
                  <span>{formatDate(lead.publishedAt)}</span>
                  <span>{getReadingTime(`${lead.text || ""} ${lead.excerpt || ""}`)} min read</span>
                </div>
              </div>
            </Link>
          )}

          <div className="lg:col-span-5 flex flex-col gap-3">
            {rest.slice(0, 3).map((article) => {
              const image = article.image || article.imagexl;
              return (
                <Link
                  key={article._id}
                  href={getArticleUrl(article)}
                  className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  {image && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                      <Image
                        src={image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 py-0.5">
                    <span className="category-badge">{article.category}</span>
                    <h3 className="mt-1.5 font-semibold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">{formatDate(article.publishedAt)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {rest.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 pt-10 border-t border-gray-100">
            {rest.slice(3).map((article) => (
              <EditorialCard key={article._id} article={article} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-renew-dark border border-gray-200 px-6 py-3 rounded-full hover:border-renew-sage hover:text-renew-sage transition-colors"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EditorialCard({ article }: { article: Article }) {
  const image = article.imagexl || article.image;
  return (
    <Link href={getArticleUrl(article)} className="group block">
      {image && (
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 ring-1 ring-gray-100">
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
      <h3 className="mt-2 text-lg font-bold text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
      <p className="text-xs text-gray-400 mt-3">{formatDate(article.publishedAt)}</p>
    </Link>
  );
}
