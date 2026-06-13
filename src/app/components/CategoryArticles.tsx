"use client";

import { useEffect, useState } from "react";
import { type Article } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryProps {
  category: string;
}

const CategoryArticles = ({ category }: CategoryProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/articles/category/${category}`);
        const data = await response.json();
        setArticles(
          Array.isArray(data)
            ? data.sort(
                (a: Article, b: Article) =>
                  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
              )
            : []
        );
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-400">
        Loading articles...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-gray-400">
        No articles found in this category yet. Check back soon!
      </div>
    );
  }

  const totalPages = Math.ceil(articles.length / perPage);
  const paginated = articles.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((article) => (
            <ArticleCard key={article._id} article={article} variant="default" />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryArticles;
