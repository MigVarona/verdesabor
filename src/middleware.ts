import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAdmin = request.cookies.get("admin-auth")?.value === "true";

  if (request.nextUrl.pathname.startsWith("/adminpage") && !isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adminpage/:path*"],
};
