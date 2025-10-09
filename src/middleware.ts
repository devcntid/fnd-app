import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_COOKIE = 'fnd_session'

const PUBLIC_PATHS = [
  '/login',
  '/_next',
  '/favicon.ico',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/me',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next()

  const hasSession = req.cookies.get(SESSION_COOKIE)?.value
  if (!hasSession) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/).*)'],
}


