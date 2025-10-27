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

    const idEmployee = payload.idKaryawan

    console.log('Mitra API - idEmployee:', idEmployee)

    // Get filter parameters from URL
    const { searchParams } = new URL(request.url)
    const tahun = searchParams.get('tahun')
    const bulan = searchParams.get('bulan')
    const verified = searchParams.get('verified') || 'cash-unverified'

    // Validate tahun and bulan
    const currentYear = new Date().getFullYear()

    const filterYear = tahun && tahun !== 'all' ? parseInt(tahun) : currentYear

    // Check if selected year is current year (not when tahun is 'all')
    const isCurrentYear = tahun && tahun !== 'all' && filterYear === currentYear

    // 1. Capaian Mitra: sum from corez_transaksi (verified)_options or corez_transaksi_scrap (unverified)
    // where id_crm = id_employee and id_jenis = 6
    let capaian = 0

    if (verified === 'verified') {
      if (isCurrentYear) {
        // Use corez_transaksi_thisyear for current year
        let monthFilter = Prisma.empty
        if (bulan && bulan !== 'all') {
          monthFilter = Prisma.sql`AND MONTH(corez_transaksi_thisyear.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
          SELECT COALESCE(SUM(corez_transaksi_thisyear.transaksi), 0) as total
          FROM corez_transaksi_thisyear
          INNER JOIN corez_donatur ON corez_transaksi_thisyear.id_donatur = corez_donatur.id_donatur
          WHERE corez_transaksi_thisyear.id_crm = ${idEmployee}
            AND corez_transaksi_thisyear.approved_transaksi = 'y'
            AND corez_donatur.id_jenis = 6
            ${monthFilter}
        `
        capaian = Number(capaianResult[0]?.total) || 0
      } else {
        // Use corez_transaksi
        let yearFilter = Prisma.empty
        let monthFilter = Prisma.empty

        if (tahun && tahun !== 'all') {
          yearFilter = Prisma.sql`AND YEAR(corez_transaksi.tgl_transaksi) = ${filterYear}`
        }

        if (bulan && bulan !== 'all') {
          monthFilter = Prisma.sql`AND MONTH(corez_transaksi.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
          SELECT COALESCE(SUM(corez_transaksi.transaksi), 0) as total
          FROM corez_transaksi
          INNER JOIN corez_donatur ON corez_transaksi.id_donatur = corez_donatur.id_donatur
          WHERE corez_transaksi.id_crm = ${idEmployee}
            AND corez_transaksi.approved_transaksi = 'y'
            AND corez_donatur.id_jenis = 6
            ${yearFilter}
            ${monthFilter}
        `
        capaian = Number(capaianResult[0]?.total) || 0
      }
    } else if (verified === 'cash-unverified') {
      if (isCurrentYear) {
        // Use corez_transaksi_scrap_thisyear for current year
        let monthFilter = Prisma.empty
        if (bulan && bulan !== 'all') {
          monthFilter = Prisma.sql`AND MONTH(corez_transaksi_scrap_thisyear.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
          SELECT COALESCE(SUM(corez_transaksi_scrap_thisyear.transaksi), 0) as total
          FROM corez_transaksi_scrap_thisyear
          INNER JOIN corez_donatur ON corez_transaksi_scrap_thisyear.id_donatur = corez_donatur.id_donatur
          WHERE corez_transaksi_scrap_thisyear.id_crm = ${idEmployee}
            AND corez_donatur.id_jenis = 6
            ${monthFilter}
        `
        capaian = Number(capaianResult[0]?.total) || 0
      } else {
        // Use corez_transaksi_scrap
        let yearFilter = Prisma.empty
        let monthFilter = Prisma.empty

        if (tahun && tahun !== 'all') {
          yearFilter = Prisma.sql`AND YEAR(corez_transaksi_scrap.tgl_transaksi) = ${filterYear}`
        }

        if (bulan && bulan !== 'all') {
          monthFilter = Prisma.sql`AND MONTH(corez_transaksi_scrap.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
          SELECT COALESCE(SUM(corez_transaksi_scrap.transaksi), 0) as total
          FROM corez_transaksi_scrap
          INNER JOIN corez_donatur ON corez_transaksi_scrap.id_donatur = corez_donatur.id_donatur
          WHERE corez_transaksi_scrap.id_crm = ${idEmployee}
            AND corez_donatur.id_jenis = 6
            ${yearFilter}
            ${monthFilter}
        `
        capaian = Number(capaianResult[0]?.total) || 0
      }
      console.log('Mitra API - Cash Unverified capaian:', capaian)
    } else if (verified === 'bank-unverified') {
      if (isCurrentYear) {
        // Use corez_transaksi_claim_thisyear for current year
        let monthFilter = Prisma.empty
        if (bulan && bulan !== 'all') {
          monthFilter = Prisma.sql`AND MONTH(corez_transaksi_claim_thisyear.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
          SELECT COALESCE(SUM(corez_transaksi_claim_thisyear.transaksi), 0) as total
          FROM corez_transaksi_claim_thisyear
          INNER JOIN corez_donatur ON corez_transaksi_claim_thisyear.id_donatur = corez_donatur.id_donatur
          WHERE corez_transaksi_claim_thisyear.id_crm = ${idEmployee}
            AND corez_donatur.id_jenis = 6
            ${monthFilter}
        `
        capaian = Number(capaianResult[0]?.total) || 0
      } else {
        // Use corez_transaksi_claim
        let yearFilter = Prisma.empty
        let monthFilter = Prisma.empty

        if (tahun && tahun !== 'all') {
          yearFilter = Prisma.sql`AND YEAR(corez_transaksi_claim.tgl_transaksi) = ${filterYear}`
        }

        if (bulan && bulan !== 'all') {
          monthFilter = Prisma.sql`AND MONTH(corez_transaksi_claim.tgl_transaksi) = ${parseInt(
            bulan
          )}`
        }

        const capaianResult = await prisma.$queryRaw<Array<{ total: number }>>`
          SELECT COALESCE(SUM(corez_transaksi_claim.transaksi), 0) as total
          FROM corez_transaksi_claim
          INNER JOIN corez_donatur ON corez_transaksi_claim.id_donatur = corez_donatur.id_donatur
          WHERE corez_transaksi_claim.id_crm = ${idEmployee}
            AND corez_donatur.id_jenis = 6
            ${yearFilter}
            ${monthFilter}
        `
        capaian = Number(capaianResult[0]?.total) || 0
      }
      console.log('Mitra API - Bank Unverified capaian:', capaian)
    }

    // 2. Kotak Aktif: total count of donatur with id_jenis = 6 and id_crm = id_employee (all time)
    const kotakAktifCount = await prisma.corezDonatur.count({
      where: {
        idJenis: 3,
        idCrm: idEmployee,
      },
    })

    // 3. Sudah Jemput: count distinct donatur from transaksi yang sudah ada transaksi di periode ini
    let sudahDijemputResult
    if (isCurrentYear) {
      let monthFilterJemput = Prisma.empty
      if (bulan && bulan !== 'all') {
        monthFilterJemput = Prisma.sql`AND MONTH(corez_transaksi_scrap_thisyear.tgl_transaksi) = ${parseInt(
          bulan
        )}`
      }

      sudahDijemputResult = await prisma.$queryRaw<Array<{ count: number }>>`
        SELECT COUNT(DISTINCT corez_donatur.id_donatur) as count
        FROM corez_donatur
        INNER JOIN corez_transaksi_scrap_thisyear ON corez_donatur.id_donatur = corez_transaksi_scrap_thisyear.id_donatur
        WHERE corez_donatur.id_crm = ${idEmployee}
          AND corez_donatur.id_jenis = 6
          ${monthFilterJemput}
      `
    } else {
      let yearFilterJemput = Prisma.empty
      let monthFilterJemput = Prisma.empty

      if (tahun && tahun !== 'all') {
        yearFilterJemput = Prisma.sql`AND YEAR(corez_transaksi_scrap.tgl_transaksi) = ${filterYear}`
      }

      if (bulan && bulan !== 'all') {
        monthFilterJemput = Prisma.sql`AND MONTH(corez_transaksi_scrap.tgl_transaksi) = ${parseInt(
          bulan
        )}`
      }

      sudahDijemputResult = await prisma.$queryRaw<Array<{ count: number }>>`
        SELECT COUNT(DISTINCT corez_donatur.id_donatur) as count
        FROM corez_donatur
        INNER JOIN corez_transaksi_scrap ON corez_donatur.id_donatur = corez_transaksi_scrap.id_donatur
        WHERE corez_donatur.id_crm = ${idEmployee}
          AND corez_donatur.id_jenis = 6
          ${yearFilterJemput}
          ${monthFilterJemput}
      `
    }
    const sudahDijemputCount = Number(sudahDijemputResult[0]?.count) || 0

    // 4. Belum Jemput: Kotak Aktif - Sudah Jemput
    const belumDijemputCount = kotakAktifCount - sudahDijemputCount

    console.log('Mitra API - Final data:', {
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
    console.error('Error fetching Mitra data:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
