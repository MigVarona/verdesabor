import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import ArticleImage from "@/app/components/ArticleImage";
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
import ProductRecommendations from "@/app/components/ProductRecommendations";
import JsonLd from "@/app/components/JsonLd";
import ArticleFAQ from "@/app/components/ArticleFAQ";
import {
  ArticleGuideCTA,
  ArticleReferences,
  ArticleTableOfContents,
  AuthorBio,
  getArticleTakeaways,
} from "@/app/components/ArticleEnhancements";
import { resolveProductPicks } from "@/lib/affiliates";
import { AD_SLOTS } from "@/lib/constants";
import { formatDate, getArticleUrl, getArticleImage, getReadingTime, getArticleSummary } from "@/lib/articles";
import { fetchArticleBySlug, fetchArticles, getAllArticleSlugs } from "@/lib/articles.server";
import { toTagSlug } from "@/lib/tags";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildHowToSchema,
  buildPageMetadata,
} from "@/lib/seo";

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
  if (!article) {
    return buildPageMetadata({
      title: "Article Not Found",
      description: "The requested article could not be found.",
      path: `/articles/${slug}`,
      noIndex: true,
    });
  }

  const heroImage = getArticleImage(article);
  const description = getArticleSummary(article, 160);

  return buildPageMetadata({
    title: article.title,
    description,
    path: `/articles/${slug}`,
    type: "article",
    images: [{ url: heroImage, width: 1200, height: 630, alt: article.title }],
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt || article.publishedAt,
    authors: article.author ? [article.author] : undefined,
  });
}

const ArticlePage = async (props: { params: Promise<Params> }) => {
  const { slug } = await props.params;
  const article = await fetchArticleBySlug(slug);

  if (!article) notFound();

  const articleUrl = getArticleUrl(article);
  const heroImage = getArticleImage(article);
  const allArticles = await fetchArticles();
  const related = allArticles
    .filter((a) => a._id !== article._id && a.category.toLowerCase() === article.category.toLowerCase())
    .slice(0, 6);
  const articleText = `${article.text || ""} ${article.text2 || ""}`;
  const readTime = getReadingTime(articleText);
  const wordCount = articleText.trim().split(/\s+/).filter(Boolean).length;
  const takeaways = getArticleTakeaways(article);
  const productPicks = resolveProductPicks(article.productPicks ?? []);
  const description = getArticleSummary(article, 180);

  const internalLinks = related
    .slice(0, 3)
    .map((a) => ({ title: a.title, href: getArticleUrl(a), category: a.category }));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: article.category, url: `/${article.category.toLowerCase()}` },
    { name: article.title },
  ]);

  const articleSchema = buildArticleSchema({
    title: article.title,
    description,
    path: articleUrl,
    image: heroImage,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    author: article.author,
    category: article.category,
    wordCount: wordCount > 0 ? wordCount : undefined,
    keywords: article.tags,
  });

  const faqSchema = article.faq?.length ? buildFAQSchema(article.faq) : null;
  const howToSchema = article.howTo ? buildHowToSchema(article.howTo) : null;

  return (
    <>
      <JsonLd data={[
        breadcrumbSchema,
        articleSchema,
        ...(faqSchema ? [faqSchema] : []),
        ...(howToSchema ? [howToSchema] : []),
      ]} />
      <Header />
      <div className="container mx-auto px-4 py-4">
        <AdSlot id={AD_SLOTS.leaderboard} format="leaderboard" />
      </div>

      <header className="relative min-h-[520px] overflow-hidden bg-renew-ink text-white md:min-h-[620px]">
        <ArticleImage
          src={heroImage}
          alt={article.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-renew-ink via-renew-ink/45 to-renew-ink/10" />
        <div className="relative z-10 flex min-h-[520px] items-end md:min-h-[620px]">
          <div className="container mx-auto px-4 pb-10 md:pb-14">
            <div className="max-w-4xl">
              <div className="mb-5">
                <Breadcrumbs
                  variant="light"
                  items={[
                    { label: article.category, href: `/${article.category.toLowerCase()}` },
                    { label: article.title },
                  ]}
                />
              </div>
              <span className="inline-flex items-center bg-renew-accent px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-renew-dark">
                {article.category}
              </span>
              <h1 className="mt-5 font-serif text-4xl leading-[0.98] text-white text-balance md:text-6xl lg:text-[4.75rem]">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
                {description}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-white/62">
                <span>{formatDate(article.publishedAt)}</span>
                {article.updatedAt && <span>Updated {formatDate(article.updatedAt)}</span>}
                <span>by {article.author || "RENEW Editorial"}</span>
                <ReadingTime minutes={readTime} />
              </div>
              {article.sources && article.sources.length > 0 && (() => {
                const topJournals = article.sources
                  .filter((s) => s.publisher)
                  .slice(0, 2)
                  .map((s) => s.publisher!.split(",")[0].trim());
                const hasHighQuality = article.sources.some(
                  (s) => s.studyType === "meta-analysis" || s.studyType === "rct"
                );
                return (
                  <div className="mt-3 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-renew-accent flex-shrink-0" />
                    <span className="text-xs text-white/80">
                      {hasHighQuality ? "Peer-reviewed · " : ""}
                      {article.sources.length} {article.sources.length === 1 ? "source" : "sources"}
                      {topJournals.length > 0 && (
                        <span className="text-white/55"> · {topJournals.join(" · ")}</span>
                      )}
                    </span>
                  </div>
                );
              })()}
              <div className="mt-6">
                <ShareButtons title={article.title} url={articleUrl} variant="light" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="bg-renew-paper py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
            <div className="flex-1 min-w-0 max-w-3xl">
              <MedicalDisclaimer />

              <ArticleTableOfContents
                hasSecondSection={Boolean(article.text2)}
                hasFAQ={Boolean(article.faq?.length)}
                hasProductPicks={productPicks.length > 0}
              />

              <KeyTakeaways items={takeaways} />

              <ArticleContent
                excerpt={article.excerpt}
                text={article.text}
                text2={article.text2}
                image2xl={article.image2xl}
                title={article.title}
                cta={<ArticleGuideCTA />}
                relatedLinks={internalLinks.length > 0 ? internalLinks : undefined}
              />

              {article.faq && article.faq.length > 0 && (
                <ArticleFAQ items={article.faq} />
              )}

              {productPicks.length > 0 && (
                <ProductRecommendations
                  products={productPicks}
                  articleSlug={article.slug || slug}
                />
              )}

              <AdSlot id={AD_SLOTS.inContent} format="in-content" />

              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-renew-border">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${toTagSlug(tag)}`}
                      className="text-xs font-medium text-renew-muted bg-renew-mist px-3 py-1.5 rounded-full hover:bg-renew-accent hover:text-renew-dark transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              <AuthorBio article={article} />
              <ArticleReferences article={article} />

              <RelatedArticles
                articles={related.length > 0 ? related : allArticles}
                currentId={article._id}
              />
            </div>

            <div className="hidden lg:block lg:w-80 flex-shrink-0">
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
