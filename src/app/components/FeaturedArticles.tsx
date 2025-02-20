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
  text: string;
  image2xl: string;
  text2: string;
  publishedAt: string;
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
    return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading articles...
      </div>
    );
  }

  const total = articles.length;
  const mainArticle = total > 0 ? articles[total - 1] : null;
  const penultimateArticle = total > 1 ? articles[total - 2] : null;
  const thumbnailArticles = total > 2 ? articles.slice(0, total - 2) : [];

  return (
    <section className="py-16">
      {/* Container for the main article */}
      <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
        {mainArticle && (
          <article className="bg-white overflow-hidden p-4">
            {mainArticle.imagexl && (
              <div className="relative w-full mb-4">
                <Image
                  src={mainArticle.imagexl || "/placeholder.svg"}
                  alt={`${mainArticle.title} full width image`}
                  width={900}
                  height={600}
                  priority 
                  style={{
                    maxWidth: "100%",
                    height: "auto", 
                    objectFit: "contain"
                  }}
                />
              </div>
            )}
            {/* Main content */}
            <div>
              {/* Title */}
              <div className="bg-custom-yellow mb-2 lg:mb-0 p-2 inline-block">
                <h3 className="text-3xl text-gray-900 font-fira font-thin">
                  <Link
                    href={`/articles/${generateSlug(mainArticle.title)}`}
                    className="hover:underline"
                  >
                    {mainArticle.title}
                  </Link>
                </h3>
              </div>
              {/* Category and Publication Date (below the title) */}
              <div className="mb-4">
                <span className="text-[0.75em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase">
                  {mainArticle.category}
                </span>
                <p className="text-sm text-gray-500">
                  {new Date(mainArticle.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
            </div>
          </article>
        )}
      </div>
      {/* Container for older articles */}
      <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
        <div className="space-y-6">
          {thumbnailArticles.map((article) => (
            <article
              key={article._id}
              className="flex bg-white overflow-hidden border-b border-gray-200 pb-6"
            >
              {/* Thumbnail image */}
              {article.image && (
                <div className="relative flex-shrink-0 mr-4 ">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    objectFit="cover"
                    width={150}
                    height={100}
                  />
                </div>
              )}
              <div className="flex-grow">
                {/* Title */}
                <div className="bg-custom-yellow mb-2 p-1 inline-block">
                  <h3 className="text-lg text-gray-900 font-fira font-thin">
                    <Link
                      href={`/articles/${generateSlug(article.title)}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h3>
                </div>
                {/* Category and Date */}
                <div className="mb-2">
                  <span className="text-[0.65em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase mr-2">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                {/* Excerpt - Oculto en móviles, truncado a 2 líneas en sm y mayores */}
                <p className="font-tisa font-normal text-sm leading-[1.5em] text-gray-700 hidden sm:line-clamp-2">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      {/* Container for the penultimate article (displayed in full) */}
      {penultimateArticle && (
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl mt-4">
          <article className="bg-white overflow-hidden p-4">
            {/* Show the same image for mobile and desktop */}
            {penultimateArticle.imagexl && (
              <div className="relative w-full mb-4">
                <Image
                  src={penultimateArticle.imagexl || "/placeholder.svg"}
                  alt={`${penultimateArticle.title} full width image`}
                  width={900}
                  height={600}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
            )}
            {/* Main content for penultimate article */}
            <div>
              {/* Title */}
              <div className="bg-custom-yellow mb-2 p-2 inline-block">
                <h3 className="text-3xl text-gray-900 font-fira font-thin">
                  <Link
                    href={`/articles/${generateSlug(penultimateArticle.title)}`}
                    className="hover:underline"
                  >
                    {penultimateArticle.title}
                  </Link>
                </h3>
              </div>
              {/* Category and Publication Date */}
              <div className="mb-4">
                <span className="text-[0.75em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase">
                  {penultimateArticle.category}
                </span>
                <p className="text-sm text-gray-500">
                  {new Date(penultimateArticle.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default FeaturedArticles;