import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing admin dashboard
  if (pathname.startsWith('/admin/dashboard')) {
    // This will be checked on client side via localStorage
    // Server-side protection will be added with Firebase later
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
