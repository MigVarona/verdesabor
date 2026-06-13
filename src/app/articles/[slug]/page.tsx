import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/app/components/Header";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ShareButtons from "@/app/components/ShareButtons";
import MedicalDisclaimer from "@/app/components/MedicalDisclaimer";
import ArticleSidebar from "@/app/components/ArticleSidebar";
import RelatedArticles from "@/app/components/RelatedArticles";
import AdSlot from "@/app/components/AdSlot";
import { AD_SLOTS } from "@/lib/constants";
import { formatDate, getArticleUrl, type Article } from "@/lib/articles";
import clientPromise from "@/lib/mongodb";

interface Params {
  slug: string;
}

async function getArticle(slug: string) {
  const client = await clientPromise;
  const db = client.db("verdesabor");
  return db.collection("articles").findOne({ slug });
}

async function getAllArticles(): Promise<Article[]> {
  const client = await clientPromise;
  const db = client.db("verdesabor");
  const articles = await db
    .collection("articles")
    .find()
    .sort({ publishedAt: -1 })
    .limit(20)
    .toArray();
  return JSON.parse(JSON.stringify(articles));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const article = await getArticle(slug);
  if (!article) return {};

  return {
    title: article.title as string,
    description: (article.excerpt as string) || String(article.text || "").slice(0, 150) + "...",
    openGraph: {
      title: article.title as string,
      description: article.excerpt as string,
      url: `https://renewhabits.com/articles/${slug}`,
      type: "article",
      images: article.image
        ? [{ url: article.image as string, width: 1200, height: 630, alt: article.title as string }]
        : [],
      publishedTime: article.publishedAt as string,
    },
    ...(article.author ? { authors: [{ name: article.author as string }] } : {}),
  };
}

const ArticlePage = async (props: { params: Promise<Params> }) => {
  const { slug } = await props.params;
  const raw = await getArticle(slug);

  if (!raw) notFound();

  const article = JSON.parse(JSON.stringify(raw)) as Article;
  const articleUrl = getArticleUrl(article);
  const allArticles = await getAllArticles();
  const related = allArticles.filter(
    (a) => a._id !== article._id && a.category === article.category
  );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-4">
        <AdSlot id={AD_SLOTS.leaderboard} format="leaderboard" />
      </div>

      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            <div className="flex-1 min-w-0 max-w-3xl">
              <Breadcrumbs
                items={[
                  { label: article.category, href: `/${article.category.toLowerCase()}` },
                  { label: article.title },
                ]}
              />

              <header className="mb-8">
                <span className="category-badge">{article.category}</span>
                <h1 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-renew-dark leading-tight text-balance">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                  <p className="text-sm text-gray-400">
                    {formatDate(article.publishedAt)}
                    {article.author && (
                      <span className="ml-3 text-gray-500">by {article.author}</span>
                    )}
                  </p>
                  <ShareButtons title={article.title} url={articleUrl} />
                </div>
              </header>

              {article.imagexl && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8">
                  <Image
                    src={article.imagexl}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 768px"
                  />
                </div>
              )}

              <MedicalDisclaimer />

              {article.excerpt && (
                <p className="prose-article text-xl text-gray-600 font-medium mt-8 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
              )}

              {article.text && (
                <div className="prose-article mt-6">
                  <p>{article.text}</p>
                </div>
              )}

              <AdSlot id={AD_SLOTS.inContent} format="in-content" />

              {article.image2xl && (
                <div className="relative w-full rounded-xl overflow-hidden my-8">
                  <Image
                    src={article.image2xl}
                    alt={`${article.title} illustration`}
                    width={900}
                    height={600}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {article.text2 && (
                <div className="prose-article">
                  <p>{article.text2}</p>
                </div>
              )}

              <RelatedArticles
                articles={related.length > 0 ? related : allArticles}
                currentId={article._id}
              />
            </div>

            <div className="lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-24">
                <ArticleSidebar trending={allArticles} currentCategory={article.category} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <Newsletter />
      <Footer />
    </>
  );
};

export default ArticlePage;
