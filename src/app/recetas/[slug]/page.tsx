// app/recetas/[slug]/page.js
import { notFound } from 'next/navigation';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

interface Params {
  slug: string;
}

const RecipePage = ({ params }: { params: Params }) => {
  const { slug } = params;

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

  // Buscar el artículo que coincide con el slug
  const articleData = articles.find(
    (article) => generateSlug(article.title) === slug
  );

  if (!articleData) {
    notFound(); // Muestra una página 404 si no se encuentra el artículo
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{articleData.title}</h1>
      <img
        src={articleData.image}
        alt={articleData.title}
        className="w-full h-96 object-cover my-6"
      />
      <p className="text-gray-600">{articleData.excerpt}</p>
    </div>
  );
};

export default RecipePage;
