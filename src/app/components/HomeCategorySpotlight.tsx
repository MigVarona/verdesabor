import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { type Article, getArticleUrl } from "@/lib/articles";
import { ArrowRight } from "lucide-react";

interface HomeCategorySpotlightProps {
  articles: Article[];
}

export default function HomeCategorySpotlight({ articles }: HomeCategorySpotlightProps) {
  const byCategory = CATEGORIES.map((cat) => {
    const match = articles.find((a) => a.category.toLowerCase() === cat.slug);
    return { ...cat, article: match ?? null };
  }).filter((c) => c.article);

  return (
    <section className="py-16 md:py-20 bg-renew-mist border-t border-renew-border">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <p className="editorial-kicker mb-2">By topic</p>
          <h2 className="font-serif text-4xl md:text-5xl text-renew-dark leading-tight">Explore the library</h2>
        </div>

        {byCategory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {byCategory.map(({ slug, label, description, article }) => (
              <Link
                key={slug}
                href={article ? getArticleUrl(article) : `/${slug}`}
                className="group p-6 bg-renew-paper border border-renew-border hover:bg-white hover:border-renew-sage/40 hover:shadow-card transition-all"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-renew-sage mb-3">{label}</p>
                {article ? (
                  <>
                    <h3 className="font-semibold text-lg text-renew-dark leading-snug group-hover:text-renew-sage transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-renew-muted mt-2 line-clamp-2">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-renew-muted group-hover:text-renew-sage transition-colors">
                      Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </>
                ) : (
                  <p className="text-sm text-renew-muted">{description}</p>
                )}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group p-4 bg-renew-paper border border-renew-border text-center hover:bg-renew-accent hover:border-renew-dark transition-all"
            >
              <p className="font-semibold text-sm text-renew-dark transition-colors">
                {cat.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
