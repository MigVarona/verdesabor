"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
        const response = await fetch('/api/articles');
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
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  if (loading) {
    return <div>Cargando artículos...</div>; 
  }

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Artículos Destacados</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article._id} // Utilizamos _id, ya que es único en MongoDB
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-gray-500">{article.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3">
                  <Link href={`/articles/${generateSlug(article.title)}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
