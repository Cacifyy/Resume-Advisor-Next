import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Public routes that don't require authentication (prefix match)
const publicPrefixes = ["/login", "/signup", "/api", "/auth"];
// Exact public routes (empty = all non-public routes require auth)
const publicExactRoutes: string[] = [];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  console.log("🔒 Middleware running for:", pathname);

  // Check if the requested path is a public route
  const isPublic =
    publicExactRoutes.includes(pathname) ||
    publicPrefixes.some((route) => pathname.startsWith(route));

  if (isPublic) {
    console.log("✅ Public route, allowing access");
    return NextResponse.next();
  }

  // Check authentication using JWT token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("🔑 Token exists:", !!token);

  if (!token) {
    console.log("❌ No token, redirecting to login");
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  console.log("✅ Token valid, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
