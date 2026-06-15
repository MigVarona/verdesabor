import { NextRequest, NextResponse } from "next/server";
import { getAffiliateRedirectUrl } from "@/lib/affiliates";

interface Params {
  slug: string;
}

export async function GET(request: NextRequest, context: { params: Promise<Params> }) {
  const { slug } = await context.params;
  const articleSlug = request.nextUrl.searchParams.get("from") ?? undefined;
  const destination = getAffiliateRedirectUrl(slug, articleSlug);

  if (!destination) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  return NextResponse.redirect(destination, 302);
}
