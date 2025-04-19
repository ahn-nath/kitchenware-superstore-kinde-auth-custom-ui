import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Example middleware logic
  // You can modify the request or response here
  
  // Example: redirect logic, header modification, etc.
  // const origin = request.headers.get('origin')
  // console.log('Middleware running for path:', request.nextUrl.pathname);
  const url = new URL(request.url);
  const queryParams = url.searchParams.toString();
  console.log('🔍 Query Parameters:', queryParams);
  queryParams.split('&').forEach(param => {
  const [key, value] = param.split('=');
  console.log(`${decodeURIComponent(key)}: ${decodeURIComponent(value)}`)
  }
  );
  // Simply forward the request by default
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};