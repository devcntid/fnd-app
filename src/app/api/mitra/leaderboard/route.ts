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
    // Get filter parameters from URL
    const { searchParams } = new URL(request.url)
    const tahun = searchParams.get('tahun')
    const bulan = searchParams.get('bulan')
    const verified = searchParams.get('verified') || 'cash-unverified'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '5')

    // Validate tahun and bulan
    const currentYear = new Date().getFullYear()

    const filterYear = tahun && tahun !== 'all' ? parseInt(tahun) : currentYear

    // Check if selected year is current year (not when tahun is 'all')
    const isCurrentYear = tahun && tahun !== 'all' && filterYear === currentYear

    // Build date filter (no longer used since we switched to YEAR/MONTH filter)
    // const startDate = new Date(filterYear, filterMonth - 1, 1)
    // const endDate = new Date(filterYear, filterMonth, 0, 23, 59, 59)
    // const startDateFilter = bulan === 'all' ? new Date(filterYear, 0, 1) : startDate
    // const endDateFilter = bulan === 'all' ? new Date(filterYear, 11, 31, 23, 59, 59) : endDate

    // Get leaderboard data using raw query since we need to join
    interface LeaderboardRow {
      nama: string
      capaian: number
    }

    let leaderboardData: LeaderboardRow[] = []
    let totalCount: Array<{ total: number }> = []

    if (verified === 'verified') {
      if (isCurrentYear) {
        // Use corez_transaksi_thisyear for current year
        let monthCondition = Prisma.empty
        if (bulan && bulan !== 'all') {
          monthCondition = Prisma.sql`AND MONTH(corez_transaksi_thisyear.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        leaderboardData = await prisma.$queryRaw<LeaderboardRow[]>`
          SELECT 
            hcm_karyawan.karyawan as nama,
            COALESCE(SUM(corez_transaksi_thisyear.transaksi), 0) as capaian
          FROM hcm_karyawan
          LEFT JOIN (
            corez_transaksi_thisyear
            INNER JOIN corez_donatur ON corez_transaksi_thisyear.id_donatur = corez_donatur.id_donatur
              AND corez_donatur.id_jenis = 6
          ) ON hcm_karyawan.id_karyawan = corez_transaksi_thisyear.id_crm
            AND corez_transaksi_thisyear.approved_transaksi = 'y'
            ${monthCondition}
          WHERE hcm_karyawan.aktif = 'y'
          GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
          HAVING capaian > 0
          ORDER BY capaian DESC
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `

        // Get total count
        interface CountRow {
          total: number
        }

        totalCount = await prisma.$queryRaw<CountRow[]>`
          SELECT COUNT(*) as total
          FROM (
            SELECT hcm_karyawan.id_karyawan
            FROM hcm_karyawan
            LEFT JOIN (
              corez_transaksi_thisyear
              INNER JOIN corez_donatur ON corez_transaksi_thisyear.id_donatur = corez_donatur.id_donatur
                AND corez_donatur.id_jenis = 6
            ) ON hcm_karyawan.id_karyawan = corez_transaksi_thisyear.id_crm
              AND corez_transaksi_thisyear.approved_transaksi = 'y'
              ${monthCondition}
            WHERE hcm_karyawan.aktif = 'y'
            GROUP BY hcm_karyawan.id_karyawan
            HAVING COALESCE(SUM(corez_transaksi_thisyear.transaksi), 0) > 0
          ) as subquery
        `
      } else {
        // Use corez_transaksi
        let yearCondition = Prisma.empty
        let monthCondition = Prisma.empty

        if (tahun && tahun !== 'all') {
          yearCondition = Prisma.sql`AND YEAR(corez_transaksi.tgl_transaksi) = ${filterYear}`
        }

        if (bulan && bulan !== 'all') {
          monthCondition = Prisma.sql`AND MONTH(corez_transaksi.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        leaderboardData = await prisma.$queryRaw<LeaderboardRow[]>`
          SELECT 
            hcm_karyawan.karyawan as nama,
            COALESCE(SUM(corez_transaksi.transaksi), 0) as capaian
          FROM hcm_karyawan
          LEFT JOIN (
            corez_transaksi
            INNER JOIN corez_donatur ON corez_transaksi.id_donatur = corez_donatur.id_donatur
              AND corez_donatur.id_jenis = 6
          ) ON hcm_karyawan.id_karyawan = corez_transaksi.id_crm
            AND corez_transaksi.approved_transaksi = 'y'
            ${yearCondition}
            ${monthCondition}
          WHERE hcm_karyawan.aktif = 'y'
          GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
          HAVING capaian > 0
          ORDER BY capaian DESC
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `

        // Get total count
        interface CountRow {
          total: number
        }

        totalCount = await prisma.$queryRaw<CountRow[]>`
          SELECT COUNT(*) as total
          FROM (
            SELECT hcm_karyawan.id_karyawan
            FROM hcm_karyawan
            LEFT JOIN (
              corez_transaksi
              INNER JOIN corez_donatur ON corez_transaksi.id_donatur = corez_donatur.id_donatur
                AND corez_donatur.id_jenis = 6
            ) ON hcm_karyawan.id_karyawan = corez_transaksi.id_crm
              AND corez_transaksi.approved_transaksi = 'y'
              ${yearCondition}
              ${monthCondition}
            WHERE hcm_karyawan.aktif = 'y'
            GROUP BY hcm_karyawan.id_karyawan
            HAVING COALESCE(SUM(corez_transaksi.transaksi), 0) > 0
          ) as subquery
        `
      }
    } else if (verified === 'cash-unverified') {
      if (isCurrentYear) {
        // Use corez_transaksi_scrap_thisyear for current year
        let monthCondition = Prisma.empty
        if (bulan && bulan !== 'all') {
          monthCondition = Prisma.sql`AND MONTH(corez_transaksi_scrap_thisyear.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        leaderboardData = await prisma.$queryRaw<LeaderboardRow[]>`
          SELECT 
            hcm_karyawan.karyawan as nama,
            COALESCE(SUM(corez_transaksi_scrap_thisyear.transaksi), 0) as capaian
          FROM hcm_karyawan
          LEFT JOIN (
            corez_transaksi_scrap_thisyear
            INNER JOIN corez_donatur ON corez_transaksi_scrap_thisyear.id_donatur = corez_donatur.id_donatur
              AND corez_donatur.id_jenis = 6
          ) ON hcm_karyawan.id_karyawan = corez_transaksi_scrap_thisyear.id_crm
            ${monthCondition}
          WHERE hcm_karyawan.aktif = 'y'
          GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
          HAVING capaian > 0
          ORDER BY capaian DESC
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `

        // Get total count
        interface CountRow {
          total: number
        }

        totalCount = await prisma.$queryRaw<CountRow[]>`
          SELECT COUNT(*) as total
          FROM (
            SELECT hcm_karyawan.id_karyawan
            FROM hcm_karyawan
            LEFT JOIN (
              corez_transaksi_scrap_thisyear
              INNER JOIN corez_donatur ON corez_transaksi_scrap_thisyear.id_donatur = corez_donatur.id_donatur
                AND corez_donatur.id_jenis = 6
            ) ON hcm_karyawan.id_karyawan = corez_transaksi_scrap_thisyear.id_crm
              ${monthCondition}
            WHERE hcm_karyawan.aktif = 'y'
            GROUP BY hcm_karyawan.id_karyawan
            HAVING COALESCE(SUM(corez_transaksi_scrap_thisyear.transaksi), 0) > 0
          ) as subquery
        `
      } else {
        // Use corez_transaksi_scrap
        let yearCondition = Prisma.empty
        let monthCondition = Prisma.empty

        if (tahun && tahun !== 'all') {
          yearCondition = Prisma.sql`AND YEAR(corez_transaksi_scrap.tgl_transaksi) = ${filterYear}`
        }

        if (bulan && bulan !== 'all') {
          monthCondition = Prisma.sql`AND MONTH(corez_transaksi_scrap.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        leaderboardData = await prisma.$queryRaw<LeaderboardRow[]>`
          SELECT 
            hcm_karyawan.karyawan as nama,
            COALESCE(SUM(corez_transaksi_scrap.transaksi), 0) as capaian
          FROM hcm_karyawan
          LEFT JOIN (
            corez_transaksi_scrap
            INNER JOIN corez_donatur ON corez_transaksi_scrap.id_donatur = corez_donatur.id_donatur
              AND corez_donatur.id_jenis = 6
          ) ON hcm_karyawan.id_karyawan = corez_transaksi_scrap.id_crm
            ${yearCondition}
            ${monthCondition}
          WHERE hcm_karyawan.aktif = 'y'
          GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
          HAVING capaian > 0
          ORDER BY capaian DESC
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `

        // Get total count
        interface CountRow {
          total: number
        }

        totalCount = await prisma.$queryRaw<CountRow[]>`
          SELECT COUNT(*) as total
          FROM (
            SELECT hcm_karyawan.id_karyawan
            FROM hcm_karyawan
            LEFT JOIN (
              corez_transaksi_scrap
              INNER JOIN corez_donatur ON corez_transaksi_scrap.id_donatur = corez_donatur.id_donatur
                AND corez_donatur.id_jenis = 6
            ) ON hcm_karyawan.id_karyawan = corez_transaksi_scrap.id_crm
              ${yearCondition}
              ${monthCondition}
            WHERE hcm_karyawan.aktif = 'y'
            GROUP BY hcm_karyawan.id_karyawan
            HAVING COALESCE(SUM(corez_transaksi_scrap.transaksi), 0) > 0
          ) as subquery
        `
      }
    } else if (verified === 'bank-unverified') {
      if (isCurrentYear) {
        // Use corez_transaksi_claim_thisyear for current year
        let monthCondition = Prisma.empty
        if (bulan && bulan !== 'all') {
          monthCondition = Prisma.sql`AND MONTH(corez_transaksi_claim_thisyear.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        leaderboardData = await prisma.$queryRaw<LeaderboardRow[]>`
          SELECT 
            hcm_karyawan.karyawan as nama,
            COALESCE(SUM(corez_transaksi_claim_thisyear.transaksi), 0) as capaian
          FROM hcm_karyawan
          LEFT JOIN (
            corez_transaksi_claim_thisyear
            INNER JOIN corez_donatur ON corez_transaksi_claim_thisyear.id_donatur = corez_donatur.id_donatur
              AND corez_donatur.id_jenis = 6
          ) ON hcm_karyawan.id_karyawan = corez_transaksi_claim_thisyear.id_crm
            ${monthCondition}
        WHERE hcm_karyawan.aktif = 'y'
        GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
        HAVING capaian > 0
        ORDER BY capaian DESC
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
      `

        // Get total count
        interface CountRow {
          total: number
        }

        totalCount = await prisma.$queryRaw<CountRow[]>`
          SELECT COUNT(*) as total
          FROM (
            SELECT hcm_karyawan.id_karyawan
            FROM hcm_karyawan
            LEFT JOIN (
              corez_transaksi_claim_thisyear
              INNER JOIN corez_donatur ON corez_transaksi_claim_thisyear.id_donatur = corez_donatur.id_donatur
                AND corez_donatur.id_jenis = 6
            ) ON hcm_karyawan.id_karyawan = corez_transaksi_claim_thisyear.id_crm
              ${monthCondition}
            WHERE hcm_karyawan.aktif = 'y'
            GROUP BY hcm_karyawan.id_karyawan
            HAVING COALESCE(SUM(corez_transaksi_claim_thisyear.transaksi), 0) > 0
          ) as subquery
        `
      } else {
        // Use corez_transaksi_claim
        let yearCondition = Prisma.empty
        let monthCondition = Prisma.empty

        if (tahun && tahun !== 'all') {
          yearCondition = Prisma.sql`AND YEAR(corez_transaksi_claim.tgl_transaksi) = ${filterYear}`
        }

        if (bulan && bulan !== 'all') {
          monthCondition = Prisma.sql`AND MONTH(corez_transaksi_claim.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        leaderboardData = await prisma.$queryRaw<LeaderboardRow[]>`
          SELECT 
            hcm_karyawan.karyawan as nama,
            COALESCE(SUM(corez_transaksi_claim.transaksi), 0) as capaian
          FROM hcm_karyawan
          LEFT JOIN (
            corez_transaksi_claim
            INNER JOIN corez_donatur ON corez_transaksi_claim.id_donatur = corez_donatur.id_donatur
              AND corez_donatur.id_jenis = 6
          ) ON hcm_karyawan.id_karyawan = corez_transaksi_claim.id_crm
            ${yearCondition}
            ${monthCondition}
          WHERE hcm_karyawan.aktif = 'y'
          GROUP BY hcm_karyawan.id_karyawan, hcm_karyawan.karyawan
          HAVING capaian > 0
          ORDER BY capaian DESC
          LIMIT ${limit}
          OFFSET ${(page - 1) * limit}
        `

        // Get total count
        interface CountRow {
          total: number
        }

        totalCount = await prisma.$queryRaw<CountRow[]>`
          SELECT COUNT(*) as total
          FROM (
            SELECT hcm_karyawan.id_karyawan
            FROM hcm_karyawan
            LEFT JOIN (
              corez_transaksi_claim
              INNER JOIN corez_donatur ON corez_transaksi_claim.id_donatur = corez_donatur.id_donatur
                AND corez_donatur.id_jenis = 6
            ) ON hcm_karyawan.id_karyawan = corez_transaksi_claim.id_crm
              ${yearCondition}
              ${monthCondition}
            WHERE hcm_karyawan.aktif = 'y'
            GROUP BY hcm_karyawan.id_karyawan
            HAVING COALESCE(SUM(corez_transaksi_claim.transaksi), 0) > 0
          ) as subquery
        `
      }
    }

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
    console.error('Error fetching Mitra leaderboard:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
