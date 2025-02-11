import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Newsletter from '@/app/components/Newsletter';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

interface Params {
  slug: string;
}

const RecipePage = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const { slug } = params;

  // Obtenemos el artículo por el slug
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`);

  if (!res.ok) {
    notFound(); // Muestra 404 si no se encuentra el artículo
  }

  const articleData = await res.json();

  // Formateamos la fecha de publicación
  const publishedDate = new Date(articleData.publishedAt).toLocaleDateString();

  return (
    <>
      <Header />
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-16 max-w-2xl lg:max-w-4xl">
          <article className="bg-white overflow-hidden p-4">
            <div className="bg-custom-yellow mb-4 p-2 inline-block">
              <h3 className="text-3xl text-gray-900 font-fira font-thin">
                {articleData.title}
              </h3>
            </div>
            <hr className="h-px bg-gray-300 border-0 mt-6 mb-6" />
            <span className="text-[0.75em] text-gray-400 leading-[1.25em] font-bold tracking-[0.1em] uppercase">
              {articleData.category}
            </span>
            <p className="text-sm text-gray-500">{publishedDate}</p>

            <div className="clearfix mt-4">
              {articleData.imagel && (
                <div className="block lg:hidden mb-4">
                  <div className="relative w-full h-[40vh]">
                    <Image
                      src={articleData.imagel}
                      alt={`${articleData.title} full width image`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
              )}

              {articleData.image && (
                <div className="relative w-full lg:w-64 h-64 lg:h-64 float-none lg:float-right ml-0 lg:ml-4 mb-4 lg:mt-4">
                  <Image
                    src={articleData.image}
                    alt={articleData.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}

              <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300 mb-0">
                {articleData.excerpt}
              </p>

              {articleData.imagexl && (
                <div className="relative w-full h-[40vh] lg:h-[70vh]">
                  <Image
                    src={articleData.imagexl}
                    alt={`${articleData.title} full width image`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}

              {articleData.text && (
                <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300">
                  {articleData.text}
                </p>
              )}

              {articleData.image2xl && (
                <div className="relative w-full h-[40vh] lg:h-[70vh]">
                  <Image
                    src={articleData.image2xl}
                    alt={`${articleData.title} full width image`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}

              {articleData.text2 && (
                <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 dark:text-gray-300">
                  {articleData.text2}
                </p>
              )}
            </div>
          </article>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </>
  );
};

export default RecipePage;
