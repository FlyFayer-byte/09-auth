import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSessionServer } from '@/lib/api/serverApi';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  // Приватний маршрут + немає accessToken, але є refreshToken → пробуємо поновити сесію
  if (isPrivateRoute && !accessToken && refreshToken) {
    try {
      const response = await checkSessionServer(
        req.headers.get('cookie') ?? ''
      );

      // Якщо отримали користувача → оновлюємо куки
      const nextResponse = NextResponse.next();
      const setCookie = response.headers['set-cookie'];
      if (setCookie) {
        setCookie.forEach((cookie) =>
          nextResponse.headers.append('set-cookie', cookie)
        );
      }

      return nextResponse;
    } catch {
      // Помилка поновлення → редирект на сторінку логіну
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  // Приватний маршрут + немає accessToken → редирект на логін
  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Auth-маршрути + користувач авторизований → редирект на профіль
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
