import { NextResponse } from "next/server";
import { fetchArticleBySlug } from "@/lib/articles.server";

export async function GET(
  _req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await props.params;
    const article = await fetchArticleBySlug(slug);

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching article", error: String(error) },
      { status: 500 }
    );
  }
}
