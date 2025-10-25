import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    const now = new Date()

    // Build where clause based on status filter
    let whereClause = {}
    if (status === 'upcoming') {
      whereClause = {
        tgl_event: {
          gte: now,
        },
      }
    } else if (status === 'done') {
      whereClause = {
        tgl_event: {
          lt: now,
        },
      }
    }

    const totalCount = await prisma.corez_event.count({ where: whereClause })

    // Both upcoming and done events use pagination
    const events = await prisma.corez_event.findMany({
      where: whereClause,
      orderBy: [{ tgl_event: 'desc' }, { id: 'desc' }],
      skip: offset,
      take: limit,
    })

    const mapped = events.map((e) => {
      const eventStatus =
        e.tgl_event && e.tgl_event >= now ? 'upcoming' : 'done'
      return {
        ...e,
        status: eventStatus,
        nominal_donasi: e.nominal_donasi ? Number(e.nominal_donasi) : 0,
      }
    })

    const hasMore = offset + limit < totalCount

    return NextResponse.json({
      success: true,
      data: mapped,
      pagination: {
        page,
        limit,
        total: totalCount,
        hasMore,
        totalPages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      nama,
      tgl_event,
      target_peserta,
      lokasi,
      kota,
      jenis_event,
      file_proposal,
      flyer,
    } = body

    const event = await prisma.corez_event.create({
      data: {
        nama: nama || null,
        tgl_event: tgl_event ? new Date(tgl_event) : null,
        target_peserta: target_peserta || null,
        lokasi: lokasi || null,
        kota: kota || null,
        jenis_event: jenis_event || null,
        file_proposal: file_proposal || null,
        flyer: flyer || null,
        nominal_donasi: 0,
        realisasi_peserta: 0,
        lead: 0,
        evaluasi: null,
      },
    })

    const serializedEvent = {
      ...event,
      nominal_donasi: event.nominal_donasi ? Number(event.nominal_donasi) : 0,
    }

    return NextResponse.json({ success: true, data: serializedEvent })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server.' },
      { status: 500 }
    )
  }
}
