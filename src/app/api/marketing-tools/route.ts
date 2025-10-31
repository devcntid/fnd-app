import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const tipe = (searchParams.get('tipe') || '').trim()
    const offset = (page - 1) * limit

    const where: Prisma.CorezMarketingToolsWhereInput = {}
    if (tipe) {
      where.tipe = tipe
    }

    // Get total count
    const totalCount = await prisma.corezMarketingTools.count({ where })

    // Get paginated data
    const marketingTools = await prisma.corezMarketingTools.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
    })

    const hasMore = offset + limit < totalCount

    return NextResponse.json({
      success: true,
      data: marketingTools,
      pagination: {
        page,
        limit,
        total: totalCount,
        hasMore,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching marketing tools:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}
