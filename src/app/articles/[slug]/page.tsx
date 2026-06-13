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
import ArticleContent from "@/app/components/ArticleContent";
import KeyTakeaways, { ReadingTime } from "@/app/components/KeyTakeaways";
import AdSlot from "@/app/components/AdSlot";
import { AD_SLOTS } from "@/lib/constants";
import { formatDate, getArticleUrl, getReadingTime } from "@/lib/articles";
import { fetchArticleBySlug, fetchArticles, getAllArticleSlugs } from "@/lib/articles.server";

interface Params {
  slug: string;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt || String(article.text || "").slice(0, 150) + "...",
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://renewhabits.com/articles/${slug}`,
      type: "article",
      images: article.imagexl
        ? [{ url: article.imagexl, width: 1200, height: 630, alt: article.title }]
        : [],
      publishedTime: article.publishedAt,
    },
    ...(article.author ? { authors: [{ name: article.author }] } : {}),
  };
}

const TAKEAWAYS: Record<string, string[]> = {
  "cold-exposure-science-recovery": [
    "Cold water (10–15°C) for 10–15 min can reduce post-exercise muscle soreness.",
    "Norepinephrine release from cold exposure may improve mood and alertness.",
    "Start with 30–60 sec cold showers before attempting ice baths.",
    "Avoid immediate post-strength-training immersion if muscle growth is your goal.",
  ],
};

const ArticlePage = async (props: { params: Promise<Params> }) => {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);

  if (!article) notFound();

  const articleUrl = getArticleUrl(article);
  const allArticles = await fetchArticles();
  const related = allArticles.filter(
    (a) => a._id !== article._id && a.category.toLowerCase() === article.category.toLowerCase()
  );
  const readTime = getReadingTime(`${article.text || ""} ${article.text2 || ""}`);
  const takeaways = TAKEAWAYS[article.slug || ""] || [];

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-4">
        <AdSlot id={AD_SLOTS.leaderboard} format="leaderboard" />
      </div>

      {article.imagexl && (
        <div className="relative h-[40vh] md:h-[50vh] min-h-[280px] max-h-[520px]">
          <Image
            src={article.imagexl}
            alt={article.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-renew-dark/70 via-renew-dark/20 to-transparent" />
        </div>
      )}

      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            <div className="flex-1 min-w-0 max-w-3xl">
              <Breadcrumbs
                items={[
                  { label: article.category, href: `/${article.category.toLowerCase()}` },
                  { label: article.title },
                ]}
              />

              <header className={`mb-8 ${article.imagexl ? "-mt-2" : ""}`}>
                <span className="category-badge">{article.category}</span>
                <h1 className="mt-3 text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-renew-dark leading-[1.15] text-balance">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
                  <p className="text-sm text-gray-400">
                    {formatDate(article.publishedAt)}
                    {article.author && (
                      <span className="ml-3 text-gray-500">by {article.author}</span>
                    )}
                  </p>
                  <ReadingTime minutes={readTime} />
                </div>
                <div className="mt-4">
                  <ShareButtons title={article.title} url={articleUrl} />
                </div>
              </header>

              <MedicalDisclaimer />

              {takeaways.length > 0 && <KeyTakeaways items={takeaways} />}

              <ArticleContent
                excerpt={article.imagexl ? undefined : article.excerpt}
                text={article.text}
                text2={article.text2}
                image2xl={article.image2xl}
                title={article.title}
              />

              <AdSlot id={AD_SLOTS.inContent} format="in-content" />

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
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
