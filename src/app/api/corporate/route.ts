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

    console.log('Corporate API - idEmployee:', idEmployee)

    // Get filter parameters from URL
    const { searchParams } = new URL(request.url)
    const tahun = searchParams.get('tahun')
    const bulan = searchParams.get('bulan')
    const verified = searchParams.get('verified') || 'cash-unverified'

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
    const dateFilterStart =
      bulan === 'all' ? new Date(filterYear, 0, 1) : startDate
    const dateFilterEnd =
      bulan === 'all' ? new Date(filterYear, 11, 31, 23, 59, 59) : endDate

    // 1. Capaian Corporate: sum from corez_transaksi (verified) or corez_transaksi_scrap (unverified)
    // where id_crm = id_employee and id_jenis = 3
    let capaian = 0

    if (verified === 'verified') {
      // Use corez_transaksi with join to corez_donatur
      const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
        SELECT COALESCE(SUM(corez_transaksi.transaksi), 0) as total
        FROM corez_transaksi
        INNER JOIN corez_donatur ON corez_transaksi.id_donatur = corez_donatur.id_donatur
        WHERE corez_transaksi.id_crm = ${idEmployee}
          AND corez_transaksi.approved_transaksi = 'y'
          AND corez_donatur.id_jenis = 3
          AND corez_transaksi.tgl_transaksi >= ${dateFilterStart}
          AND corez_transaksi.tgl_transaksi <= ${dateFilterEnd}
      `
      capaian = Number(capaianResult[0]?.total) || 0
    } else if (verified === 'cash-unverified') {
      // Use corez_transaksi_scrap with join to corez_donatur
      const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
        SELECT COALESCE(SUM(corez_transaksi_scrap.transaksi), 0) as total
        FROM corez_transaksi_scrap
        INNER JOIN corez_donatur ON corez_transaksi_scrap.id_donatur = corez_donatur.id_donatur
        WHERE corez_transaksi_scrap.id_crm = ${idEmployee}
          AND corez_donatur.id_jenis = 3
          AND corez_transaksi_scrap.tgl_transaksi >= ${dateFilterStart}
          AND corez_transaksi_scrap.tgl_transaksi <= ${dateFilterEnd}
      `
      capaian = Number(capaianResult[0]?.total) || 0
      console.log('Corporate API - Cash Unverified capaian:', capaian)
    } else if (verified === 'bank-unverified') {
      // Use corez_transaksi_claim with join to corez_donatur
      const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
        SELECT COALESCE(SUM(corez_transaksi_claim.transaksi), 0) as total
        FROM corez_transaksi_claim
        INNER JOIN corez_donatur ON corez_transaksi_claim.id_donatur = corez_donatur.id_donatur
        WHERE corez_transaksi_claim.id_crm = ${idEmployee}
          AND corez_donatur.id_jenis = 3
          AND corez_transaksi_claim.tgl_transaksi >= ${dateFilterStart}
          AND corez_transaksi_claim.tgl_transaksi <= ${dateFilterEnd}
      `
      capaian = Number(capaianResult[0]?.total) || 0
      console.log('Corporate API - Bank Unverified capaian:', capaian)
    }

    // 2. Kotak Aktif: total count of donatur with id_jenis = 3 and id_crm = id_employee (all time)
    const kotakAktifCount = await prisma.corezDonatur.count({
      where: {
        idJenis: 3,
        idCrm: idEmployee,
      },
    })

    // 3. Sudah Jemput: count distinct donatur from transaksi yang sudah ada transaksi di periode ini
    // For Corporate, we consider donatur as "sudah dijemput" if they have transactions
    const sudahDijemputResult = await prisma.$queryRaw<
      Array<{ count: number }>
    >`
      SELECT COUNT(DISTINCT corez_donatur.id_donatur) as count
      FROM corez_donatur
      INNER JOIN corez_transaksi_scrap ON corez_donatur.id_donatur = corez_transaksi_scrap.id_donatur
      WHERE corez_donatur.id_crm = ${idEmployee}
        AND corez_donatur.id_jenis = 3
        AND corez_transaksi_scrap.tgl_transaksi >= ${dateFilterStart}
        AND corez_transaksi_scrap.tgl_transaksi <= ${dateFilterEnd}
    `
    const sudahDijemputCount = Number(sudahDijemputResult[0]?.count) || 0

    // 4. Belum Jemput: Kotak Aktif - Sudah Jemput
    const belumDijemputCount = kotakAktifCount - sudahDijemputCount

    console.log('Corporate API - Final data:', {
      capaian,
      kotakAktif: kotakAktifCount,
      sudahDijemput: sudahDijemputCount,
      belumDijemput: belumDijemputCount,
    })

    return NextResponse.json({
      success: true,
      data: {
        capaian,
        kotakAktif: kotakAktifCount,
        sudahDijemput: sudahDijemputCount,
        belumDijemput: belumDijemputCount,
      },
    })
  } catch (error) {
    console.error('Error fetching Corporate data:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
