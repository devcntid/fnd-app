import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const month = searchParams.get('month')

    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 }
      )
    }

    let leaderboardData = []

    switch (type) {
      case 'timsil':
        const timsilReports = await prisma.timsilReport.findMany({
          where: month && month !== 'all' ? { month: parseInt(month) } : {},
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                branch: true
              }
            }
          }
        })

        // Group by user and sum amounts
        const timsilGrouped = timsilReports.reduce((acc, report) => {
          const userId = report.userId
          if (!acc[userId]) {
            acc[userId] = {
              name: report.user.name,
              amount: 0,
              month: report.month,
              avatar: report.user.avatar,
              subtext: report.user.branch
            }
          }
          acc[userId].amount += report.donationAmount
          return acc
        }, {} as Record<string, any>)

        leaderboardData = Object.values(timsilGrouped)
        break

      case 'kalimat':
        const kalimatReports = await prisma.kalimatReport.findMany({
          where: month && month !== 'all' ? { month: parseInt(month) } : {},
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                branch: true
              }
            }
          }
        })

        const kalimatGrouped = kalimatReports.reduce((acc, report) => {
          const userId = report.userId
          if (!acc[userId]) {
            acc[userId] = {
              name: report.user.name,
              amount: 0,
              month: report.month,
              avatar: report.user.avatar,
              subtext: report.user.branch
            }
          }
          acc[userId].amount += report.donationAmount
          return acc
        }, {} as Record<string, any>)

        leaderboardData = Object.values(kalimatGrouped)
        break

      case 'gerai':
        const geraiReports = await prisma.geraiReport.findMany({
          where: month && month !== 'all' ? { month: parseInt(month) } : {},
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                branch: true
              }
            }
          }
        })

        const geraiGrouped = geraiReports.reduce((acc, report) => {
          const userId = report.userId
          if (!acc[userId]) {
            acc[userId] = {
              name: report.user.name,
              amount: 0,
              month: report.month,
              avatar: report.user.avatar,
              subtext: report.user.branch
            }
          }
          acc[userId].amount += report.donationAmount
          return acc
        }, {} as Record<string, any>)

        leaderboardData = Object.values(geraiGrouped)
        break

      case 'mitraUnggul':
        const mitraReports = await prisma.mitraReport.findMany({
          where: month && month !== 'all' ? { month: parseInt(month) } : {},
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                branch: true
              }
            }
          }
        })

        const mitraGrouped = mitraReports.reduce((acc, report) => {
          const userId = report.userId
          if (!acc[userId]) {
            acc[userId] = {
              name: report.user.name,
              amount: 0,
              month: report.month,
              avatar: report.user.avatar,
              subtext: report.user.branch
            }
          }
          acc[userId].amount += report.donationAmount
          return acc
        }, {} as Record<string, any>)

        leaderboardData = Object.values(mitraGrouped)
        break

      case 'corporate':
        const corporateReports = await prisma.corporateReport.findMany({
          where: month && month !== 'all' ? { month: parseInt(month) } : {},
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                branch: true
              }
            }
          }
        })

        const corporateGrouped = corporateReports.reduce((acc, report) => {
          const userId = report.userId
          if (!acc[userId]) {
            acc[userId] = {
              name: report.user.name,
              amount: 0,
              month: report.month,
              avatar: report.user.avatar,
              subtext: report.user.branch
            }
          }
          acc[userId].amount += report.donationAmount
          return acc
        }, {} as Record<string, any>)

        leaderboardData = Object.values(corporateGrouped)
        break

      case 'mpz':
        const mpzReports = await prisma.mpzReport.findMany({
          where: month && month !== 'all' ? { month: parseInt(month) } : {},
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                branch: true
              }
            }
          }
        })

        const mpzGrouped = mpzReports.reduce((acc, report) => {
          const userId = report.userId
          if (!acc[userId]) {
            acc[userId] = {
              name: report.user.name,
              amount: 0,
              month: report.month,
              avatar: report.user.avatar,
              subtext: report.user.branch
            }
          }
          acc[userId].amount += report.donationAmount
          return acc
        }, {} as Record<string, any>)

        leaderboardData = Object.values(mpzGrouped)
        break

      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        )
    }

    return NextResponse.json(leaderboardData)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}


