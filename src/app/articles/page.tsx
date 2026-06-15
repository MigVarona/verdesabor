import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import TrendingArticles from "../components/TrendingArticles";
import AdSlot from "../components/AdSlot";
import { AD_SLOTS } from "@/lib/constants";
import { fetchArticles } from "@/lib/articles.server";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "All Articles",
  description:
    "Browse all articles on nutrition, biohacking, neuroscience, wellness, lifestyle, and longevity.",
  path: "/articles",
});

export const revalidate = 300;

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <h1 className="text-3xl md:text-4xl font-bold text-renew-dark">All Articles</h1>
            <p className="mt-3 text-gray-500 text-lg max-w-2xl">
              Explore our full library of science-backed health, wellness, and longevity content.
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <AdSlot id={`${AD_SLOTS.leaderboard}-articles`} format="leaderboard" />
        </div>
        <TrendingArticles articles={articles} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
