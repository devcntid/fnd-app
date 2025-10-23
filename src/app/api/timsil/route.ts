import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const SESSION_COOKIE = 'fnd_session'

export async function GET(request: Request) {
  const cookie = (await cookies()).get(SESSION_COOKIE)
  if (!cookie?.value) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const payload = JSON.parse(
      Buffer.from(cookie.value, 'base64').toString('utf8')
    )

    const idEmployee = payload.idKaryawan

    // Get filter parameters from URL
    const { searchParams } = new URL(request.url)
    const tahun = searchParams.get('tahun')
    const bulan = searchParams.get('bulan')

    // Validate tahun and bulan
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const filterYear = tahun && tahun !== 'all' ? parseInt(tahun) : currentYear
    const filterMonth =
      bulan && bulan !== 'all' ? parseInt(bulan) : currentMonth

    // Build date filter
    const startDate = new Date(filterYear, filterMonth - 1, 1)
    const endDate = new Date(filterYear, filterMonth, 0, 23, 59, 59)

    // If month is "all", filter by year only
    const dateFilter =
      bulan === 'all'
        ? {
            tglTransaksi: {
              gte: new Date(filterYear, 0, 1),
              lte: new Date(filterYear, 11, 31, 23, 59, 59),
            },
          }
        : {
            tglTransaksi: {
              gte: startDate,
              lte: endDate,
            },
          }

    // 1. Capaian Timsil: sum corez_transaksi where approved_transaksi = 'y' and id_crm = id_employee
    const capaianResult = await prisma.corezTransaksi.aggregate({
      where: {
        idCrm: idEmployee,
        approvedTransaksi: 'y',
        ...dateFilter,
      },
      _sum: {
        transaksi: true,
      },
    })
    const capaian = capaianResult._sum.transaksi || 0

    // Build date filter for kunjungan (using tgl_kunjungan)
    const kunjunganDateFilter =
      bulan === 'all'
        ? {
            tgl_kunjungan: {
              gte: new Date(filterYear, 0, 1),
              lte: new Date(filterYear, 11, 31, 23, 59, 59),
            },
          }
        : {
            tgl_kunjungan: {
              gte: startDate,
              lte: endDate,
            },
          }

    // 2. Jumlah kunjungan: count corez_kunjungan where id_karyawan = id_employee
    const kunjunganCount = await prisma.corez_kunjungan.count({
      where: {
        id_karyawan: idEmployee,
        ...kunjunganDateFilter,
      },
    })

    // 3. Jumlah donatur kencleng: count corez_donatur where id_jenis = 5 and id_crm = id_employee
    const donaturKenclengCount = await prisma.corezDonatur.count({
      where: {
        idJenis: 5,
        idCrm: idEmployee,
        tglReg: {
          gte: bulan === 'all' ? new Date(filterYear, 0, 1) : startDate,
          lte:
            bulan === 'all'
              ? new Date(filterYear, 11, 31, 23, 59, 59)
              : endDate,
        },
      },
    })

    // 4. Jumlah sudah dijemput: count corez_kunjungan where sudah_dikunjungi = 'y' and id_karyawan = id_employee
    const sudahDijemputCount = await prisma.corez_kunjungan.count({
      where: {
        id_karyawan: idEmployee,
        sudah_dikunjungi: 'y',
        ...kunjunganDateFilter,
      },
    })

    // 5. Jumlah belum dijemput: count corez_kunjungan where sudah_dikunjungi = 'n' and id_karyawan = id_employee
    const belumDijemputCount = await prisma.corez_kunjungan.count({
      where: {
        id_karyawan: idEmployee,
        sudah_dikunjungi: 'n',
        ...kunjunganDateFilter,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        capaian,
        kunjungan: kunjunganCount,
        donaturKencleng: donaturKenclengCount,
        sudahDijemput: sudahDijemputCount,
        belumDijemput: belumDijemputCount,
      },
    })
  } catch (error) {
    console.error('Error fetching Timsil data:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
