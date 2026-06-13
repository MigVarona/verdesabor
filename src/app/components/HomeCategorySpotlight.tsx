import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { type Article } from "@/lib/articles";
import { getArticleUrl } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface HomeCategorySpotlightProps {
  articles: Article[];
}

export default function HomeCategorySpotlight({ articles }: HomeCategorySpotlightProps) {
  const byCategory = CATEGORIES.map((cat) => {
    const match = articles.find(
      (a) => a.category.toLowerCase() === cat.slug
    );
    return { ...cat, article: match ?? null };
  }).filter((c) => c.article);

  if (byCategory.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-renew-dark text-white">
        <div className="container mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-renew-accent mb-3">Explore</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Browse by topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group p-4 border border-gray-800 rounded-xl hover:border-renew-sage/50 transition-colors text-center"
              >
                <p className="font-semibold text-sm group-hover:text-renew-accent transition-colors">{cat.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-renew-dark text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-renew-accent mb-2">By topic</p>
            <h2 className="text-3xl md:text-4xl font-bold">Explore the library</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {byCategory.map(({ slug, label, description, article }) => (
            <Link
              key={slug}
              href={article ? getArticleUrl(article) : `/${slug}`}
              className="group p-6 border border-gray-800 rounded-xl hover:border-renew-sage/40 transition-all hover:bg-white/5"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-renew-sage mb-3">{label}</p>
              {article ? (
                <>
                  <h3 className="font-semibold text-lg leading-snug group-hover:text-renew-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                    Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </>
              ) : (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-800">
          {CATEGORIES.filter((c) => !byCategory.find((b) => b.slug === c.slug)).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-sm text-gray-500 hover:text-white transition-colors"
            >
              {cat.label} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
