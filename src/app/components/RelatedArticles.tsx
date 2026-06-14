import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

interface RelatedArticlesProps {
  articles: Article[];
  currentId: string;
}

export default function RelatedArticles({ articles, currentId }: RelatedArticlesProps) {
  const related = articles.filter((a) => a._id !== currentId).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-renew-border">
      <div className="mb-6">
        <p className="editorial-kicker mb-2">Keep reading</p>
        <h2 className="font-serif text-3xl text-renew-dark md:text-4xl">Related articles</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {related.map((article) => (
          <ArticleCard key={article._id} article={article} variant="compact" />
        ))}
      </div>
    </section>
  );
}
