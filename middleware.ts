import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
  console.log('🔍 Middleware triggered ONCE!');
  console.log('----------------------------------');
  console.log('🛣️  URL:', request.url);
  console.log('----------------------------------');
  
  // Extract the query parameters from the request URL
  const url = new URL(request.url);
  const queryParams = url.searchParams.toString();
  console.log('🔍 Query Parameters:', queryParams);
  queryParams.split('&').forEach((param) => {
    const [key, value] = param.split('=');
    console.log(`🔑 ${decodeURIComponent(key)}: ${decodeURIComponent(value)}`);
  }); 
  
  // Continue processing the request
  return NextResponse.next();
} 

// Match ALL routes except Next.js internals
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
