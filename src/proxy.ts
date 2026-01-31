import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/cookies";

const PROTECTED_ROUTES = ["/dashboard"] as const;
const PUBLIC_ROUTES = ["/", "/login"] as const;

const DEBUG_PROXY = process.env.DEBUG_PROXY === "1";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const isAuthenticated = Boolean(accessToken ?? refreshToken);

  const { pathname } = request.nextUrl;
  const isProtected = (PROTECTED_ROUTES as readonly string[]).includes(pathname);
  const isPublic = (PUBLIC_ROUTES as readonly string[]).includes(pathname);

  if (DEBUG_PROXY) {
    console.debug("[proxy]", pathname, {
      isAuthenticated,
      isProtected,
      isPublic,
    });
  }

  if (isProtected && !isAuthenticated) {
    if (DEBUG_PROXY) console.debug("[proxy] redirect", pathname, "-> /login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublic && isAuthenticated && pathname !== "/dashboard") {
    if (DEBUG_PROXY) console.debug("[proxy] redirect", pathname, "-> /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard"],
};
