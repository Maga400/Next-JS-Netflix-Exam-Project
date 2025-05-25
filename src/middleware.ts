import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);
const protectedRoutes = ['/home', '/movies', '/tv-shows'];

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

  // ✅ Eğer kullanıcı doğrudan `/${locale}` adresine gelirse
  // token varsa -> yönlendir
  // token yoksa -> olduğu yerde bırak
  // if (isKnownLocale && segments.length === 2) {
  //   if (token) {
  //     return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  //   } else {
  //     return intlMiddleware(request); // sadece i18n uygula, yönlendirme yapma
  //   }
  // }

  // Eğer / veya bilinmeyen locale ise (örneğin: /asd gibi)
  // ve token varsa → defaultLocale + /home
  // if ((pathname === '/' || !isKnownLocale) && token) {
  //   return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  // }

  // Korunan sayfa ve token yoksa → login'e yönlendir
  const isProtected = protectedRoutes.some(route =>
    pathWithoutLocale.startsWith(route)
  );

  // if (isProtected && !token) {
  //   return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  // }

  // Diğer tüm durumlarda sadece locale ayarla
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
