import Link from 'next/link';

const FeaturedArticles = () => {
  const articles = [
    {
      id: 1,
      title: "Los beneficios de una dieta basada en plantas",
      excerpt: "Descubre cómo una alimentación basada en plantas puede mejorar tu salud y bienestar...",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Nutrición",
    },
    {
      id: 2,
      title: "Guía completa de proteínas vegetales",
      excerpt: "Todo lo que necesitas saber sobre las fuentes de proteína vegetal...",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544",
      category: "Guías",
    },
  ];

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Artículos Destacados</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
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
                    {article.title} {/* Cambié el uso de Link correctamente */}
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
