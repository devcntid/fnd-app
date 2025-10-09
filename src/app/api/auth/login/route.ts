import { NextResponse } from 'next/server'
import { prismaZains } from '@/lib/prisma-zains'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

const SESSION_COOKIE = 'fnd_session'

export async function POST(req: Request) {
  try {
    if (!process.env.ZAINSDATABASE_URL || !process.env.DATABASE_URL) {
      return NextResponse.json(
        { ok: false, message: 'Konfigurasi database belum diset. Isi ZAINSDATABASE_URL & DATABASE_URL.' },
        { status: 500 }
      )
    }
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ ok: false, message: 'Username & password wajib' }, { status: 400 })
    }

    const md5 = crypto.createHash('md5').update(password).digest('hex')

    const user = await prismaZains.adminUsers.findFirst({
      where: {
        userName: username,
        password: md5,
        active: 'y'
      }
    })

    if (!user) {
      return NextResponse.json({ ok: false, message: 'Login gagal' }, { status: 401 })
    }

    const karyawan = await prisma.hcmKaryawan.findUnique({
      where: { idKaryawan: user.idEmployee }
    })

    if (!karyawan) {
      return NextResponse.json({ ok: false, message: 'Karyawan tidak ditemukan' }, { status: 404 })
    }

    const sessionData = {
      userId: user.idUser,
      idKaryawan: karyawan.idKaryawan,
      name: karyawan.karyawan,
      email: user.email || user.userName
    }

    const res = NextResponse.json({ ok: true, user: sessionData })
    res.cookies.set(SESSION_COOKIE, Buffer.from(JSON.stringify(sessionData)).toString('base64'), {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json({ ok: false, message: 'Internal error' }, { status: 500 })
  }
}

