import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";

interface CategoryArticlesProps {
  articles: Article[];
}

export default function CategoryArticles({ articles }: CategoryArticlesProps) {
  if (articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-400">No articles in this category yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} variant="default" />
          ))}
        </div>
      </div>
    </section>
  );
}
