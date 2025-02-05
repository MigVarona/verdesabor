import { notFound } from 'next/navigation';

interface Params {
  slug: string;
}

const RecipePage = async ({ params }: { params: Params }) => {
  const { slug } = params;

  // Realizamos la solicitud GET al API para obtener el artículo por el slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`);

  // Si la respuesta no es exitosa, mostramos un error 404
  if (!res.ok) {
    notFound(); // Muestra una página 404 si no se encuentra el artículo
  }

  const articleData = await res.json();

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
