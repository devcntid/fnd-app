import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { prismaZains } from '@/lib/prisma-zains'

const SESSION_COOKIE = 'fnd_session'

export async function GET() {
  const cookie = (await cookies()).get(SESSION_COOKIE)
  if (!cookie?.value) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  
  try {
    const payload = JSON.parse(
      Buffer.from(cookie.value, 'base64').toString('utf8')
    )
    
    const karyawan = await prisma.hcmKaryawan.findUnique({
      where: { idKaryawan: payload.idKaryawan },
    })
    if (!karyawan) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    // Ambil data admin_users untuk mendapatkan foto dan id_employee
    const adminUser = await prismaZains.adminUsers.findFirst({
      where: { idEmployee: payload.idKaryawan },
    })

    return NextResponse.json({
      ok: true,
      user: {
        ...payload,
        karyawan: {
          ...karyawan,
          foto: adminUser?.foto || '',
          idEmployee: adminUser?.idEmployee || payload.idKaryawan,
        },
      },
    })
  } catch (error) {
    console.error('Error in /api/auth/me:', error)
    return NextResponse.json({ ok: false }, { status: 401 })
  }
}
