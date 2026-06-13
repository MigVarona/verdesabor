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
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-renew-sage mb-2">The latest</p>
            <h2 className="text-3xl md:text-4xl font-bold text-renew-dark tracking-tight">Continue reading</h2>
          </div>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-renew-dark hover:text-renew-sage transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Lead card */}
          {lead && (
            <Link
              href={getArticleUrl(lead)}
              className="group lg:col-span-7 block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-card-hover transition-shadow"
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

          {/* Side stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {rest.slice(0, 3).map((article) => {
              const image = article.image || article.imagexl;
              return (
                <Link
                  key={article._id}
                  href={getArticleUrl(article)}
                  className="group flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-renew-sage/30 hover:shadow-card transition-all"
                >
                  {image && (
                    <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="112px"
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

        {/* Remaining articles grid */}
        {rest.length > 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {rest.slice(3).map((article) => (
              <EditorialCard key={article._id} article={article} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-renew-dark border border-gray-200 px-6 py-3 rounded-full hover:border-renew-sage transition-colors"
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
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
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
