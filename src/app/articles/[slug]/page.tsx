import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Newsletter from '@/app/components/Newsletter';
import Footer from '@/app/components/Footer';

interface Params {
  slug: string;
}

const RecipePage = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const { slug } = params;

  // Realizamos la solicitud GET al API para obtener el artículo por el slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`);

  // Si la respuesta no es exitosa, mostramos un error 404
  if (!res.ok) {
    notFound(); // Muestra una página 404 si no se encuentra el artículo
  }

  const articleData = await res.json();

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{articleData.title}</h1>
      <img
        src={articleData.image}
        alt={articleData.title}
        className="w-full h-96 object-cover my-6"
      />
      <p className="text-gray-600">{articleData.excerpt}</p>
    </div>
    <Newsletter />
    <Footer />
    </>
  );
};

export default RecipePage;
