import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminSecret = request.cookies.get("admin_secret")?.value;

  if (request.nextUrl.pathname.startsWith("/adminpage") && adminSecret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminpage"],
};
