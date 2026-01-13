import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Debugging: Cek token
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Logic Redirect
  if (path === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (path.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*"],
};
