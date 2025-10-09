import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentMonth, getCurrentYear } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      donaturName,
      donaturPhone,
      donaturAddress,
      akadProgram,
      donationAmount,
      transactionTime,
      nextVisitSchedule,
      nextVisitDate,
      userId
    } = body

    const report = await prisma.timsilReport.create({
      data: {
        donaturName,
        donaturPhone,
        donaturAddress,
        akadProgram,
        donationAmount: parseInt(donationAmount),
        transactionTime: new Date(transactionTime),
        nextVisitSchedule,
        nextVisitDate: nextVisitDate ? new Date(nextVisitDate) : null,
        month: getCurrentMonth(),
        year: getCurrentYear(),
        userId
      }
    })

    return NextResponse.json(report)
  } catch (error) {
    console.error('Error creating Timsil report:', error)
    return NextResponse.json(
      { error: 'Failed to create Timsil report' },
      { status: 500 }
    )
  }
}


