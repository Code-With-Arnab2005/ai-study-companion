import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const publicPaths = [
  '/',
  '/login',
  '/signup',
  '/verify-email',
  '/auth/callback',
];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookies) {
          cookies.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookies.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;
  const pathname = request.nextUrl.pathname;

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  // 🚫 Not logged in → block protected routes
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // 🚫 Logged in → block auth pages
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}