import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isTokenValid(token?: string): boolean {
  if (!token || typeof token !== 'string' || token.trim().length === 0) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    // Edge runtime supports atob
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonStr = atob(base64);
    const payload = JSON.parse(jsonStr);
    if (!payload || !payload.exp) return false;
    // Check expiration with 10s clock tolerance
    if (payload.exp * 1000 <= Date.now() - 10000) return false;
    if (payload.role !== 'admin') return false;
    return true;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only guard /admin routes
  if (pathname.startsWith('/admin')) {
    const adminToken = req.cookies.get('admin_token')?.value;
    const valid = isTokenValid(adminToken);

    // If accessing the login page
    if (pathname === '/admin/login') {
      // If already logged in with a valid token, redirect to dashboard
      if (valid) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
      // If token exists but is invalid or expired, clear it
      if (adminToken) {
        const res = NextResponse.next();
        res.cookies.delete('admin_token');
        return res;
      }
      return NextResponse.next();
    }

    // For any other /admin route, require valid active admin session
    if (!valid) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);
      if (adminToken) {
        res.cookies.delete('admin_token');
      }
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
