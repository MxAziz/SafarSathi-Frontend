/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { deleteCookies, getCookies } from "./services/auth/tokenHandler";
import { getDefaultDashboardRoutes, getRouteOwner, isAuthRoutes, UserRole, } from "./utility/auth-utils";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = await getCookies("accessToken");

  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      const verifyToken = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;

      userRole = verifyToken.role as UserRole;
    } catch (error: any) {
        console.log(error);
      await deleteCookies("accessToken");
      await deleteCookies("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoutes(pathname);

  // Role: 1
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url)
    );
  }

  // Role: 2
  if (routeOwner === null) {
    return NextResponse.next();
  }

  //Rule : 3
  if (!accessToken) {
    if (isAuth) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  //Rule : 4
  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule : 5
  if (routeOwner === "ADMIN" || routeOwner === "TRAVELER") {
    if (routeOwner !== userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoutes(userRole as UserRole), request.url)
      );
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};