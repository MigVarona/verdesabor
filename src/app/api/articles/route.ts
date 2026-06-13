import { NextResponse } from "next/server";
import { fetchArticles } from "@/lib/articles.server";

export async function GET() {
  try {
    const articles = await fetchArticles();
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching articles", error: String(error) },
      { status: 500 }
    );
  }
}
