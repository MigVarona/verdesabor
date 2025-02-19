"use client";

import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

interface Article {
  _id: string;
  image: string;
  title: string;
  category: string;
  excerpt: string;
  imagexl: string;
  text: string;
  image2xl: string;
  text2: string;
  publishedAt: string;
}

const NutritionCategory = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles/category/Nutrition"); 
        const data = await response.json();

        setArticles(
          data.sort(
            (a: Article, b: Article) =>
              new Date(b.publishedAt).getTime() -
              new Date(a.publishedAt).getTime()
          )
        );
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading articles...</div>;
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No nutrition articles found.
      </div>
    );
  }

  return (
    <section className="py-16">
      {articles.map((article) => (
        <div key={article._id} className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
          <article className="bg-white overflow-hidden p-4">
            {article.imagexl && (
              <div className="relative w-full mb-4">
                <Image
                  src={article.imagexl || "/placeholder.svg"}
                  alt={article.title}
                  objectFit="contain"
                  width={900}
                  height={600}
                />
              </div>
            )}
            <div>
              <div className="bg-custom-yellow mb-2 p-2 inline-block">
                <h3 className="text-3xl text-gray-900 font-fira font-thin">
                  <Link
                    href={`/articles/${generateSlug(article.title)}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </h3>
              </div>

              <div className="mb-4">
                <span className="text-[0.75em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase">
                  {article.category}
                </span>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
            </div>
          </article>
        </div>
      ))}
    </section>
  );
};

export default NutritionCategory;
