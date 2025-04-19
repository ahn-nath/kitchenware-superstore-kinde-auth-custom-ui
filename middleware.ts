import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Access query parameters from the URL
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  // Example: Get a specific parameter
  const name = searchParams.get('name');
  const id = searchParams.get('id');
  
  // Log for debugging
  console.log('Middleware accessing query params:', {
    name,
    id,
    allParams: Object.fromEntries(searchParams.entries())
  });
  
  // Example: Add a query parameter
  if (name && !searchParams.has('greeting')) {
    const newUrl = new URL(request.url);
    newUrl.searchParams.set('greeting', `Hello ${name}`);
    return NextResponse.redirect(newUrl);
  }
  
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