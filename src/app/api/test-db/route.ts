import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test koneksi database
    const donaturCount = await prisma.corezDonatur.count()
    const transaksiCount = await prisma.corezTransaksi.count()
    const kantorCount = await prisma.hcmKantor.count()
    const programCount = await prisma.settingProgram.count()

    // Get sample data
    const donatur = await prisma.corezDonatur.findFirst({
      include: {
        kantor: true,
        transaksi: {
          take: 3,
          include: {
            program: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      data: {
        counts: {
          donatur: donaturCount,
          transaksi: transaksiCount,
          kantor: kantorCount,
          program: programCount
        },
        sampleDonatur: donatur
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


