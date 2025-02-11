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
    return <div className="text-center py-10 text-gray-500">Loading articles...</div>;
  }

  // Use the last article as the main (full) article and the rest as older articles.
  const mainArticle = articles[articles.length - 1];
  const olderArticles = articles.slice(0, articles.length - 1);

  return (
    <section className="py-16 dark:bg-gray-900">
      {/* Adjust the container width if needed for a smaller main article */}
      <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
        {/* Main Article (displayed in full) */}
        {mainArticle && (
          <article className="bg-white overflow-hidden p-4 mb-16">
            {/* Mobile image (visible only on mobile) */}
            {mainArticle.image && (
              <div className="block lg:hidden relative w-full h-[40vh] mb-4">
                <Image
                  src={mainArticle.image || "/placeholder.svg"}
                  alt={`${mainArticle.title} mobile primary image`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            {/* Main content */}
            <div>
              {/* Title */}
              <div className="bg-custom-yellow mb-4 p-2 inline-block">
                <h3 className="text-3xl text-gray-900 font-fira font-thin">
                  <Link
                    href={`/articles/${generateSlug(mainArticle.title)}`}
                    className="hover:underline"
                  >
                    {mainArticle.title}
                  </Link>
                </h3>
              </div>
              <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
              <span className="text-[0.75em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase">
                {mainArticle.category}
              </span>
              {/* Publication date */}
              <p className="text-sm text-gray-500">
                {new Date(mainArticle.publishedAt).toLocaleDateString()}
              </p>
              <div className="clearfix mt-4">
                {/* Desktop image */}
                {mainArticle.image && (
                  <div className="hidden lg:block relative w-full lg:w-64 h-64 lg:h-64 float-none lg:float-right ml-0 lg:ml-4 mb-4 lg:mt-4">
                    <Image
                      src={mainArticle.image || "/placeholder.svg"}
                      alt={mainArticle.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                {/* Excerpt */}
                <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300 mb-4">
                  {mainArticle.excerpt}
                </p>
                {/* Full-width image (below the excerpt) */}
                {mainArticle.imagexl && (
                  <div className="relative w-full h-[40vh] lg:h-[70vh] mb-4">
                    <Image
                      src={mainArticle.imagexl || "/placeholder.svg"}
                      alt={`${mainArticle.title} full width image`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                {/* Additional text blocks */}
                {mainArticle.text && (
                  <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300 mb-4">
                    {mainArticle.text}
                  </p>
                )}
                {mainArticle.image2xl && (
                  <div className="relative w-full h-[40vh] lg:h-[70vh] mb-4">
                    <Image
                      src={mainArticle.image2xl || "/placeholder.svg"}
                      alt={`${mainArticle.title} additional image`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                {mainArticle.text2 && (
                  <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300">
                    {mainArticle.text2}
                  </p>
                )}
              </div>
              <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />

            </div>
          </article>
        )}
        {/* Older Articles as Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {olderArticles.map((article) => (
            <article key={article._id} className="bg-white overflow-hidden shadow-lg">
              {article.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="p-4">
                <div className="bg-custom-yellow mb-2 p-1 inline-block">
                  <h3 className="text-xl text-gray-900 font-fira font-thin">
                    <Link
                      href={`/articles/${generateSlug(article.title)}`}
                      className="hover:underline"
                    >
                      {article.title}
                    </Link>
                  </h3>
                </div>
                <div className="mb-2">
                  <span className="text-[0.65em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase mr-2">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-tisa font-normal text-sm leading-[1.5em] text-gray-700 dark:text-gray-300 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
