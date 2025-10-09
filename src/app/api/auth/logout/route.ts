import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'fnd_session'

function makeRedirectResponse() {
  const res = NextResponse.redirect(new URL('/login', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
  res.cookies.set(SESSION_COOKIE, '', { path: '/', httpOnly: true, maxAge: 0 })
  return res
}

export async function POST() {
  return makeRedirectResponse()
}

export async function GET() {
  return makeRedirectResponse()
}
