import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Отримуємо cookies
  const accessToken = req.cookies.get('accessToken');

  // Приватні маршрути (profile, notes)
  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  // Публічні маршрути (sign-in, sign-up)
  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // Якщо користувач неавторизований і йде на приватну сторінку → редірект на sign-in
  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Якщо користувач авторизований і йде на сторінку логіну/реєстрації → редірект на profile
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

// Налаштування, щоб middleware працював лише на потрібних маршрутах
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
