import { NextResponse } from 'next/server'

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

    // Mock response for now since the database model doesn't exist yet
    const mockReport = {
      id: Math.random().toString(36).substr(2, 9),
      donaturName,
      donaturPhone,
      donaturAddress,
      akadProgram,
      donationAmount: parseInt(donationAmount),
      transactionTime: new Date(transactionTime),
      nextVisitSchedule,
      nextVisitDate: nextVisitDate ? new Date(nextVisitDate) : null,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      userId,
      createdAt: new Date()
    }

    return NextResponse.json(mockReport)
  } catch (error) {
    console.error('Error creating Timsil report:', error)
    return NextResponse.json(
      { error: 'Failed to create Timsil report' },
      { status: 500 }
    )
  }
}


