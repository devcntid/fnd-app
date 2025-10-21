import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { prismaZains } from '@/lib/prisma-zains'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idEmployee } = await params

    // Ambil data karyawan dari database lokal
    const karyawan = await prisma.hcmKaryawan.findUnique({
      where: { idKaryawan: idEmployee },
      include: {
        kantor: true,
        jabatan: true,
      },
    })

    if (!karyawan) {
      return NextResponse.json(
        { success: false, message: 'Karyawan tidak ditemukan' },
        { status: 404 }
      )
    }

    // Ambil data admin_users untuk mendapatkan foto dan informasi tambahan
    const adminUser = await prismaZains.adminUsers.findFirst({
      where: { idEmployee: idEmployee },
    })

    // Format data untuk response
    const verificationData = {
      success: true,
      data: {
        idEmployee: karyawan.idKaryawan,
        nama: karyawan.karyawan,
        panggilan: karyawan.panggilan,
        foto: adminUser?.foto || '',
        email: adminUser?.email || karyawan.email,
        telpon: karyawan.telpon,
        hp: karyawan.hp,
        jabatan: karyawan.jabatan?.jabatan || 'Petugas',
        kantor: karyawan.kantor?.kantor || 'DT Peduli',
        alamatKantor: karyawan.kantor?.alamat || '',
        kotaKantor: karyawan.kantor?.kota || '',
        tglMasuk: karyawan.tglMasuk,
        aktif: karyawan.aktif === 'y',
        whatsapp: adminUser?.whatsapp || karyawan.hp,
      },
    }

    return NextResponse.json(verificationData)
  } catch (error) {
    console.error('Error in verification API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
