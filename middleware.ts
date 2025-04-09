// import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export async function middleware(request: NextRequest) {
  //   const response = NextResponse.next();
  const req = withAuth(request);
  console.log('withAuth', req);
  return req;
  //   return response;
}
