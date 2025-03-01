import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Newsletter from '@/app/components/Newsletter';
import Footer from '@/app/components/Footer';
import Image from "next/image";
import clientPromise from "@/lib/mongodb";

interface Params {
  slug: string;
}

// Generación de metadatos dinámicos para SEO
export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = params;
  const client = await clientPromise;
  const db = client.db("verdesabor");
  const collection = db.collection("articles");
  const article = await collection.findOne({ slug });

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt || article.text?.slice(0, 150) + "...",
    keywords: article.tags?.join(", ") || "healthy recipes, nutrition, wellness, organic food, plant-based diet, clean eating",
    authors: article.author ? [{ name: article.author }] : undefined,
    robots: "index, follow",
    openGraph: {
      title: article.title,
      description: article.excerpt || article.text?.slice(0, 150) + "...",
      url: `https://verdesabor.com/articles/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      images: [
        {
          url: article.image || "https://verdesabor.com/default-image.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

const RecipePage = async ({ params }: { params: Params }) => {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`);

  if (!res.ok) {
    notFound();
  }

  const articleData = await res.json();
  const publishedDate = new Date(articleData.publishedAt).toLocaleDateString();

  return (
    <>
      <Header />
      <section className="py-16">
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
              {articleData.image && (
                <div className="relative w-full float-none lg:float-right ml-0 lg:ml-4 mb-6">
                  <Image
                    src={articleData.image}
                    alt={articleData.title}
                    width={900}
                    height={600}
                    priority={true}
                    style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }}
                  />
                </div>
              )}

              <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 mb-6 mt-6">
                {articleData.excerpt}
              </p>

              {articleData.imagexl && (
                <div className="relative w-full">
                  <Image
                    src={articleData.imagexl}
                    alt={`${articleData.title} full width`}
                    width={900}
                    height={600}
                    loading="lazy"
                    style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              )}

              {articleData.text && (
                <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 mb-6 mt-4">
                  {articleData.text}
                </p>
              )}

              {articleData.image2xl && (
                <div className="relative w-full">
                  <Image
                    src={articleData.image2xl}
                    alt={`${articleData.title} second full width`}
                    width={900}
                    height={600}
                    loading="lazy"
                    style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                  />
                </div>
              )}

              {articleData.text2 && (
                <p className="font-tisa font-normal text-lg leading-[1.825em] text-gray-700 mt-4">
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
