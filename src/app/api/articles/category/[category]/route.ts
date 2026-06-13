import { NextResponse } from "next/server";
import { fetchArticlesByCategory } from "@/lib/articles.server";

export async function GET(
  _req: Request,
  props: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await props.params;
    const articles = await fetchArticlesByCategory(category);

    if (articles.length === 0) {
      return NextResponse.json(
        { message: "No articles found in this category" },
        { status: 404 }
      );
    }

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}
