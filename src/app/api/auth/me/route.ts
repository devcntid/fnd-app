import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const SESSION_COOKIE = 'fnd_session'

export async function GET() {
  const cookie = (await cookies()).get(SESSION_COOKIE)
  if (!cookie?.value) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const payload = JSON.parse(Buffer.from(cookie.value, 'base64').toString('utf8'))
    const karyawan = await prisma.hcmKaryawan.findUnique({ where: { idKaryawan: payload.idKaryawan } })
    if (!karyawan) return NextResponse.json({ ok: false }, { status: 401 })
    return NextResponse.json({ ok: true, user: { ...payload, karyawan } })
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}


