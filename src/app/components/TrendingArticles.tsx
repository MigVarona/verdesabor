import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

interface TrendingArticlesProps {
  articles: Article[];
}

export default function TrendingArticles({ articles }: TrendingArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
