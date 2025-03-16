import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/supabase';

export const runtime = 'experimental-edge';

export const config = {
  matcher: [
    '/admin/:path*',
    '/adlin/:path*'  // Add this to catch typos and redirect
  ]
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  try {
    // Redirect /adlin to /admin
    if (pathname.startsWith('/adlin')) {
      const correctPath = pathname.replace('/adlin', '/admin');
      const response = NextResponse.redirect(new URL(correctPath, req.url));
      response.headers.set('x-middleware-cache', 'no-cache');
      return response;
    }

    // Skip auth check for non-admin routes
    if (!pathname.startsWith('/admin')) {
      const res = NextResponse.next();
      res.headers.set('x-middleware-cache', 'no-cache');
      return res;
    }

    const res = NextResponse.next();
    const supabase = createMiddlewareClient<Database>({ req, res });

    const { data: { session } } = await supabase.auth.getSession();
    const isLoginPage = pathname === '/admin/login';

    // No session but trying to access protected route
    if (!session && !isLoginPage) {
      const response = NextResponse.redirect(new URL('/admin/login', req.url));
      response.headers.set('x-middleware-cache', 'no-cache');
      return response;
    }

    // Has session but trying to access login page
    if (session && isLoginPage) {
      const response = NextResponse.redirect(new URL('/admin/dashboard', req.url));
      response.headers.set('x-middleware-cache', 'no-cache');
      return response;
    }

    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    const response = NextResponse.redirect(new URL('/admin/login', req.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }
}