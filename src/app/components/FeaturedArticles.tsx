"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  _id: string;
  image: string;
  title: string;
  category: string;
  excerpt: string;
}

const FeaturedArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Cargando artículos...
      </div>
    );
  }

  return (
    <section className="py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-16 max-w-2xl">
        <div className="space-y-12">
          {articles.map((article) => (
            <article key={article._id} className="bg-white overflow-hidden">
              {/* Título con fondo amarillo */}
              <div className="bg-custom-yellow mb-4 p-2 inline-block">
                <h3 className="text-3xl text-gray-900 font-fira font-thin">
                  <Link
                    href={`/articles/${generateSlug(article.title)}`}
                    className="hover:underline"
                    dangerouslySetInnerHTML={{
                      __html: article.title.replace(/\n/g, "<br />"),
                    }}
                  />
                </h3>
              </div>
              {/* Imagen y contenido */}
              <div className="flex flex-col lg:flex-row">
                {/* Imagen */}
                <div className="relative w-full lg:w-1/3 h-56 lg:h-auto">
                  <Image
                    src={article.image}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-bl-lg lg:rounded-none"
                  />
                </div>
                {/* Contenido */}
                <div className="p-6 flex-grow">
                  <span className="text-sm text-gray-500 uppercase">
                    {article.category}
                  </span>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
