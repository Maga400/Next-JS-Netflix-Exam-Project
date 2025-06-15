import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
const protectedRoutes = ['/home', '/movies', '/tv-shows','/profile'];

function isValidLocale(locale: string): locale is (typeof routing.locales)[number] {
  return (routing.locales as readonly string[]).includes(locale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const segments = pathname.split('/');
  const maybeLocale = segments[1];
  const isKnownLocale = isValidLocale(maybeLocale);
  const locale = isKnownLocale ? maybeLocale : routing.defaultLocale;
  const pathWithoutLocale = isKnownLocale
    ? '/' + segments.slice(2).join('/')
    : '/' + segments.slice(1).join('/');

  if (isKnownLocale && segments.length === 2) {
    if (token) {
      return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
    } else {
      return intlMiddleware(request);
    }
  }

  if ((pathname === '/' || !isKnownLocale) && token) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  const isProtected = protectedRoutes.some(route =>
    pathWithoutLocale.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
