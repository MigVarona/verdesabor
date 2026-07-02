import { getArticleUrl, getArticleSummary } from "@/lib/articles";
import { fetchArticles } from "@/lib/articles.server";
import { SITE_NAME, SITE_DESCRIPTION, CATEGORIES } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const articles = await fetchArticles();

  const categorySections = CATEGORIES.map((category) => {
    const categoryArticles = articles.filter(
      (article) => article.category.toLowerCase() === category.slug
    );
    const lines = categoryArticles.map(
      (article) =>
        `- [${article.title}](${absoluteUrl(getArticleUrl(article))}): ${getArticleSummary(article, 160)}`
    );
    return `## ${category.label}\n\n${category.description}\n\n${lines.join("\n")}`;
  });

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION} Every article is written from peer-reviewed research and reviewed for accuracy; see our editorial policy at ${absoluteUrl("/editorial-policy")}.

Key pages:

- [All articles](${absoluteUrl("/articles")})
- [About](${absoluteUrl("/about")})
- [RSS feed](${absoluteUrl("/feed.xml")})

${categorySections.join("\n\n")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
