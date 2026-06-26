export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(
  request: NextRequest
) {
   const token =
    request.cookies.get("token")
      ?.value;

  console.log("TOKEN:", token);

  if (!token) {
    console.log("NO TOKEN");

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

const user =
    verifyToken(token);

  console.log("USER:", user);

  if (!user) {
    console.log("INVALID TOKEN");

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const path =
    request.nextUrl.pathname;

  if (
    user.role === "EMPLOYEE"
  ) {
    const allowed = [
      "/dashboard",
      "/sales",
    ];

    const canAccess =
      allowed.some((route) =>
        path.startsWith(route)
      );

    if (!canAccess) {
      return NextResponse.redirect(
        new URL(
          "/dashboard",
          request.url
        )
      );
    }
  }

  if (
    user.role === "MANAGER" &&
    path.startsWith("/settings")
  ) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/vendors/:path*",
    "/sales/:path*",
    "/analytics/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/inventory-history/:path*",
  ],
};