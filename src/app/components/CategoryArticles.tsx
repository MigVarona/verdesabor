import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

interface CategoryArticlesProps {
  articles: Article[];
}

export default function CategoryArticles({ articles }: CategoryArticlesProps) {
  if (articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-renew-muted">No articles in this category yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-renew-paper">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between border-b border-renew-border pb-5">
          <div>
            <p className="editorial-kicker mb-2">Latest dispatches</p>
            <h2 className="font-serif text-3xl text-renew-dark md:text-4xl">Read the archive</h2>
          </div>
          <p className="hidden text-sm text-renew-muted sm:block">{articles.length} articles</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
