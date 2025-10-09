import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'fnd_session'

function makeRedirectResponse(req: Request) {
  const origin = new URL(req.url).origin
  const res = NextResponse.redirect(new URL('/login', origin))
  res.cookies.set(SESSION_COOKIE, '', { path: '/', httpOnly: true, maxAge: 0 })
  return res
}

export async function POST(req: Request) {
  return makeRedirectResponse(req)
}

export async function GET(req: Request) {
  return makeRedirectResponse(req)
}
