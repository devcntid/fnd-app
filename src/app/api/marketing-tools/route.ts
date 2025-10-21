import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '5')
    const offset = (page - 1) * limit

    // Get total count
    const totalCount = await prisma.corezMarketingTools.count()

    // Get paginated data
    const marketingTools = await prisma.corezMarketingTools.findMany({
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
