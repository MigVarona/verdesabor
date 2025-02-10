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
  imagexl: string;
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
      <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
        <div className="space-y-12">
          {articles.map((article) => (
            <article key={article._id} className="bg-white overflow-hidden p-4">
              {/* Título */}
              <div className="bg-custom-yellow mb-4 p-2 inline-block">
                <h3 className="text-3xl text-gray-900 font-fira font-thin">
                  <Link
                    href={`/articles/${generateSlug(article.title)}`}
                    className="hover:underline"
                  >
                    {article.title}
                  </Link>
                </h3>
              </div>
              <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
              <span className="text-[0.75em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase">
                {article.category}
              </span>

              <div className="clearfix mt-4">
                {/* Imagen secundaria */}
                {article.image && (
                  <div className="relative w-full lg:w-64 h-64 lg:h-64 float-none lg:float-right ml-0 lg:ml-4 mb-4 lg:mt-4">
                    <Image
                      src={article.image}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}

                {/* Contenido */}
                <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300 mb-0 lg:mb-[1em]">
                  {article.excerpt}
                </p>
                
                {/* ImagenXL a pantalla completa */}
                {article.imagexl && (
                  <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[70vh]">
                    <Image
                      src={article.imagexl}
                      alt={`${article.title} full width image`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
