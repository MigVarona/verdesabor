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

        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error("La respuesta no es un array:", data);
          setArticles([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
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
    return <div className="text-center py-10 text-gray-500">Cargando artículos...</div>;
  }

  if (articles.length === 0) {
    return <div className="text-center py-10 text-gray-500">No hay artículos disponibles.</div>;
  }

  const blocks = [];
  let i = 0;

  while (i < articles.length) {
    const mainArticle = i < articles.length ? articles[i] : null;
    i++;
    const thumbnailArticles = i + 2 < articles.length ? articles.slice(i, i + 3) : articles.slice(i);
    i += thumbnailArticles.length;
    const penultimateArticle = i < articles.length ? articles[i] : null;
    i++;

    blocks.push({ mainArticle, thumbnailArticles, penultimateArticle });
  }


  return (
    <section className="py-16">
      {blocks.map((block, index) => (
        <div key={index} className="mb-12">
          {block.mainArticle && (
            <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
              <article className="bg-white overflow-hidden p-4">
                {block.mainArticle.imagexl && (
                  <div className="relative w-full mb-4">
                    <Image
                      src={block.mainArticle.imagexl}
                      alt={block.mainArticle.title}
                      width={900}
                      height={600}
                      priority
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="bg-custom-yellow mb-2 p-2 inline-block">
                    <h3 className="text-3xl text-gray-900 font-fira font-thin">
                      <Link href={`/articles/${generateSlug(block.mainArticle.title)}`} className="hover:underline">
                        {block.mainArticle.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-[0.75em] text-gray-400 font-bold uppercase tracking-wide">
                      {block.mainArticle.category}
                    </span>
                    <p className="text-sm text-gray-500">
                      {new Date(block.mainArticle.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
                </div>
              </article>
            </div>
          )}

          {block.thumbnailArticles.length > 0 && (
            <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl mt-8">
              <div className="space-y-6">
                {block.thumbnailArticles.map((article) => (
                  <article key={article._id} className="flex bg-white overflow-hidden border-b border-gray-200 pb-6">
                    {article.image && (
                      <div className="relative flex-shrink-0 mr-4">
                        <Image
                          src={article.image}
                          alt={article.title}
                          width={150}
                          height={100}
                          className="w-[150px] h-[100px] object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="bg-custom-yellow mb-2 p-1 inline-block">
                        <h3 className="text-lg text-gray-900 font-fira font-thin">
                          <Link href={`/articles/${generateSlug(article.title)}`} className="hover:underline">
                            {article.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="mb-2">
                        <span className="text-[0.65em] text-gray-400 font-bold uppercase tracking-wide mr-2">
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-tisa text-sm text-gray-700 hidden sm:line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {block.penultimateArticle && (
            <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl mt-8">
              <article className="bg-white overflow-hidden p-4">
                {block.penultimateArticle.imagexl && (
                  <div className="relative w-full mb-4">
                    <Image
                      src={block.penultimateArticle.imagexl}
                      alt={block.penultimateArticle.title}
                      width={900}
                      height={600}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="bg-custom-yellow mb-2 p-2 inline-block">
                    <h3 className="text-3xl text-gray-900 font-fira font-thin">
                      <Link href={`/articles/${generateSlug(block.penultimateArticle.title)}`} className="hover:underline">
                        {block.penultimateArticle.title}
                      </Link>
                    </h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-[0.75em] text-gray-400 font-bold uppercase tracking-wide">
                      {block.penultimateArticle.category}
                    </span>
                    <p className="text-sm text-gray-500">
                      {new Date(block.penultimateArticle.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
                </div>
              </article>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FeaturedArticles;
