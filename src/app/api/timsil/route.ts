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
    const verified = searchParams.get('verified') || 'cash-unverified'

    console.log('Timsil API - idEmployee from cookie:', idEmployee)
    console.log(
      'Timsil API - Tahun:',
      tahun,
      'Bulan:',
      bulan,
      'Verified:',
      verified
    )

    // Debug: Check what id_crm values exist in transaksi_scrap
    const debugResult = await prisma.$queryRaw<Array<{ id_crm: string }>>`
      SELECT DISTINCT id_crm 
      FROM corez_transaksi_scrap 
      WHERE id_crm IS NOT NULL 
      LIMIT 10
    `
    console.log('Timsil API - Sample id_crm from transaksi_scrap:', debugResult)

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

    // 1. Capaian Timsil: sum from corez_transaksi (verified) or corez_transaksi_scrap (unverified)
    // where approved_transaksi = 'y' and id_crm = id_employee and id_jenis in (1,5)
    let capaian = 0

    if (verified === 'verified') {
      // Use corez_transaksi with join to corez_donatur
      const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
        SELECT COALESCE(SUM(corez_transaksi.transaksi), 0) as total
        FROM corez_transaksi
        INNER JOIN corez_donatur ON corez_transaksi.id_donatur = corez_donatur.id_donatur
        WHERE corez_transaksi.id_crm = ${idEmployee}
          AND corez_transaksi.approved_transaksi = 'y'
          AND corez_donatur.id_jenis IN (1, 5)
          AND corez_transaksi.tgl_transaksi >= ${dateFilterStart}
          AND corez_transaksi.tgl_transaksi <= ${dateFilterEnd}
      `
      capaian = Number(capaianResult[0]?.total) || 0
      console.log('Timsil API - Verified capaian result:', capaianResult)
    } else if (verified === 'cash-unverified') {
      // Use corez_transaksi_scrap with join to corez_donatur
      // Note: corez_transaksi_scrap may not have approved_transaksi = 'y' like corez_transaksi
      const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
        SELECT COALESCE(SUM(corez_transaksi_scrap.transaksi), 0) as total
        FROM corez_transaksi_scrap
        INNER JOIN corez_donatur ON corez_transaksi_scrap.id_donatur = corez_donatur.id_donatur
        WHERE corez_transaksi_scrap.id_crm = ${idEmployee}
          AND corez_donatur.id_jenis IN (1, 5)
          AND corez_transaksi_scrap.tgl_transaksi >= ${dateFilterStart}
          AND corez_transaksi_scrap.tgl_transaksi <= ${dateFilterEnd}
      `
      capaian = Number(capaianResult[0]?.total) || 0
      console.log('Timsil API - Cash Unverified capaian result:', capaianResult)
    } else if (verified === 'bank-unverified') {
      // Use corez_transaksi_claim with join to corez_donatur
      const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
        SELECT COALESCE(SUM(corez_transaksi_claim.transaksi), 0) as total
        FROM corez_transaksi_claim
        INNER JOIN corez_donatur ON corez_transaksi_claim.id_donatur = corez_donatur.id_donatur
        WHERE corez_transaksi_claim.id_crm = ${idEmployee}
          AND corez_donatur.id_jenis IN (1, 5)
          AND corez_transaksi_claim.tgl_transaksi >= ${dateFilterStart}
          AND corez_transaksi_claim.tgl_transaksi <= ${dateFilterEnd}
      `
      capaian = Number(capaianResult[0]?.total) || 0
      console.log('Timsil API - Bank Unverified capaian result:', capaianResult)
    }

    console.log('Timsil API - Final capaian:', capaian)

    // 2. Jumlah kunjungan: count corez_kunjungan joined with corez_donatur where id_jenis IN (1,5)
    // Filter by corez_donatur.id_crm instead of corez_kunjungan.id_karyawan to match leaderboard logic
    // Fix collation issue by converting id_donatur
    const kunjunganResult = await prisma.$queryRaw<Array<{ count: number }>>`
      SELECT COUNT(*) as count
      FROM corez_kunjungan
      INNER JOIN corez_donatur ON CONVERT(corez_kunjungan.id_donatur USING utf8mb4) COLLATE utf8mb4_unicode_ci = corez_donatur.id_donatur
      WHERE corez_donatur.id_crm = ${idEmployee}
        AND corez_donatur.id_jenis IN (1, 5)
        AND corez_kunjungan.tgl_kunjungan >= ${dateFilterStart}
        AND corez_kunjungan.tgl_kunjungan <= ${dateFilterEnd}
    `
    const kunjunganCount = Number(kunjunganResult[0]?.count) || 0

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

    // 4. Jumlah sudah dijemput: count corez_kunjungan joined with corez_donatur where id_jenis IN (1,5) and sudah_dikunjungi = 'y'
    // Filter by corez_donatur.id_crm instead of corez_kunjungan.id_karyawan to match leaderboard logic
    // Fix collation issue by converting id_donatur
    const sudahDijemputResult = await prisma.$queryRaw<
      Array<{ count: number }>
    >`
      SELECT COUNT(*) as count
      FROM corez_kunjungan
      INNER JOIN corez_donatur ON CONVERT(corez_kunjungan.id_donatur USING utf8mb4) COLLATE utf8mb4_unicode_ci = corez_donatur.id_donatur
      WHERE corez_donatur.id_crm = ${idEmployee}
        AND corez_donatur.id_jenis IN (1, 5)
        AND corez_kunjungan.sudah_dikunjungi = 'y'
        AND corez_kunjungan.tgl_kunjungan >= ${dateFilterStart}
        AND corez_kunjungan.tgl_kunjungan <= ${dateFilterEnd}
    `
    const sudahDijemputCount = Number(sudahDijemputResult[0]?.count) || 0

    // 5. Jumlah belum dijemput: count corez_kunjungan joined with corez_donatur where id_jenis IN (1,5) and sudah_dikunjungi = 'n'
    // Filter by corez_donatur.id_crm instead of corez_kunjungan.id_karyawan to match leaderboard logic
    // Fix collation issue by converting id_donatur
    const belumDijemputResult = await prisma.$queryRaw<
      Array<{ count: number }>
    >`
      SELECT COUNT(*) as count
      FROM corez_kunjungan
      INNER JOIN corez_donatur ON CONVERT(corez_kunjungan.id_donatur USING utf8mb4) COLLATE utf8mb4_unicode_ci = corez_donatur.id_donatur
      WHERE corez_donatur.id_crm = ${idEmployee}
        AND corez_donatur.id_jenis IN (1, 5)
        AND corez_kunjungan.sudah_dikunjungi = 'n'
        AND corez_kunjungan.tgl_kunjungan >= ${dateFilterStart}
        AND corez_kunjungan.tgl_kunjungan <= ${dateFilterEnd}
    `
    const belumDijemputCount = Number(belumDijemputResult[0]?.count) || 0

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
