import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// Ambil id_employee dari session / cookie payload yang sama dengan /api/auth/me
async function getSessionEmployeeId(
  request: NextRequest
): Promise<string | null> {
  try {
    const cookie = request.cookies.get('fnd_session')?.value
    if (!cookie) return null
    const payload = JSON.parse(Buffer.from(cookie, 'base64').toString('utf8'))
    return payload?.idKaryawan || null
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '3')
    const search = (searchParams.get('search') || '').trim()
    const idJenis = searchParams.get('id_jenis')

    const offset = (page - 1) * limit

    const idEmployee = await getSessionEmployeeId(request)
    if (!idEmployee) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // filter dasar: hanya donatur yang id_crm sama dengan idEmployee (id_karyawan)
    const where: Prisma.CorezDonaturWhereInput = {
      idCrm: idEmployee,
    }

    if (idJenis && idJenis !== 'all') {
      where.idJenis = Number(idJenis)
    }

    if (search) {
      where.OR = [
        { idDonatur: { contains: search } },
        { donatur: { contains: search } },
        { hp: { contains: search } },
        { telpon: { contains: search } },
      ]
    }

    const totalCount = await prisma.corezDonatur.count({ where })

    const donors = await prisma.corezDonatur.findMany({
      where,
      orderBy: { updated: 'desc' },
      skip: offset,
      take: limit,
      select: {
        idDonatur: true,
        donatur: true,
        idJenis: true,
        hp: true,
        telpon: true,
        tglReg: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: donors,
      pagination: {
        page,
        limit,
        total: totalCount,
        hasMore: offset + limit < totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}
