import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/home', '/movies', '/tv-shows'];

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // if (pathname === "/" && token) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/','/home/:path*', '/movies/:path*', '/tv-shows/:path*'],
};
