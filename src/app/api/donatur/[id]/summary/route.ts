import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Bad Request' },
      { status: 400 }
    )
  }
  try {
    const agg = await prisma.corezTransaksi.aggregate({
      where: {
        idDonatur: id,
        approvedTransaksi: 'y',
      },
      _sum: {
        transaksi: true,
      },
    })

    const totalTransaksi = agg._sum.transaksi || 0

    return NextResponse.json({ success: true, data: { totalTransaksi } })
  } catch (error) {
    console.error('Error donor summary:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}
