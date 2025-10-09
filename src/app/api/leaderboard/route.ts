import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    // const month = searchParams.get('month') // Will be used when database models are available

    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      )
    }

    // Mock data for now since the database models don't exist yet
    const mockLeaderboardData = [
      {
        name: 'Ahmad Fauzi',
        amount: 2500000,
        month: 7,
        avatar: 'https://placehold.co/40x40/f39c12/ffffff?text=AF',
        subtext: 'DT Peduli Bandung'
      },
      {
        name: 'Siti Nurhaliza',
        amount: 1800000,
        month: 7,
        avatar: 'https://placehold.co/40x40/3498db/ffffff?text=SN',
        subtext: 'DT Peduli Jakarta'
      },
      {
        name: 'Budi Santoso',
        amount: 1500000,
        month: 7,
        avatar: 'https://placehold.co/40x40/2ecc71/ffffff?text=BS',
        subtext: 'DT Peduli Surabaya'
      }
    ]

    return NextResponse.json(mockLeaderboardData)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}


