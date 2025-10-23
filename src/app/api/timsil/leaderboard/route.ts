import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

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

    // Get filter parameters from URL
    const { searchParams } = new URL(request.url)
    const tahun = searchParams.get('tahun')
    const bulan = searchParams.get('bulan')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '5')

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
    const startDateFilter =
      bulan === 'all' ? new Date(filterYear, 0, 1) : startDate
    const endDateFilter =
      bulan === 'all' ? new Date(filterYear, 11, 31, 23, 59, 59) : endDate

    // Get leaderboard data using raw query since we need to join
    const leaderboardData = await prisma.$queryRaw<any[]>`
      SELECT 
        hcm_karyawan.karyawan as nama,
        COALESCE(SUM(corez_transaksi.transaksi), 0) as capaian
      FROM hcm_karyawan
      LEFT JOIN corez_transaksi ON hcm_karyawan.id_karyawan = corez_transaksi.id_crm
        AND corez_transaksi.approved_transaksi = 'y'
        AND corez_transaksi.tgl_transaksi >= ${startDateFilter}
        AND corez_transaksi.tgl_transaksi <= ${endDateFilter}
      WHERE hcm_karyawan.aktif = 'y'
      GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
      HAVING capaian > 0
      ORDER BY capaian DESC
      LIMIT ${limit}
      OFFSET ${(page - 1) * limit}
    `

    // Get total count
    const totalCount = await prisma.$queryRaw<any[]>`
      SELECT COUNT(*) as total
      FROM (
        SELECT hcm_karyawan.id_karyawan
        FROM hcm_karyawan
        LEFT JOIN corez_transaksi ON hcm_karyawan.id_karyawan = corez_transaksi.id_crm
          AND corez_transaksi.approved_transaksi = 'y'
          AND corez_transaksi.tgl_transaksi >= ${startDateFilter}
          AND corez_transaksi.tgl_transaksi <= ${endDateFilter}
        WHERE hcm_karyawan.aktif = 'y'
        GROUP BY hcm_karyawan.id_karyawan
        HAVING COALESCE(SUM(corez_transaksi.transaksi), 0) > 0
      ) as subquery
    `

    const total = Number(totalCount[0]?.total) || 0
    const hasMore = page * limit < total

    return NextResponse.json({
      success: true,
      data: leaderboardData.map((item) => ({
        nama: item.nama,
        capaian: Number(item.capaian),
      })),
      pagination: {
        page,
        limit,
        total,
        hasMore,
      },
    })
  } catch (error) {
    console.error('Error fetching Timsil leaderboard:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
