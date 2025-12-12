import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals / static files quickly.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt')
  ) {
    return NextResponse.next();
  }

  const lockdown = process.env.LOCKDOWN === 'true';
  const isLoginRoute = pathname === '/host/login' || pathname === '/api/login';

  const needsAuth = lockdown ? !isLoginRoute : (pathname.startsWith('/host') && pathname !== '/host/login');

  if (!needsAuth) return NextResponse.next();

  const authed = req.cookies.get('enc_host')?.value === '1';
  if (authed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/host/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
