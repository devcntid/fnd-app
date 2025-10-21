import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = Number(id)
    const event = await prisma.corez_event.findUnique({
      where: { id: eventId },
    })
    if (!event) return NextResponse.json({ success: false }, { status: 404 })

    const serializedEvent = {
      ...event,
      nominal_donasi: event.nominal_donasi ? Number(event.nominal_donasi) : 0,
    }

    return NextResponse.json({ success: true, data: serializedEvent })
  } catch (error) {
    console.error('Error get event:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

// Update event: bisa untuk realisasi atau edit semua field
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = Number(id)
    const body = await req.json()

    // Check if this is a realisasi update or full event update
    const {
      nominalDonasi,
      realisasiPeserta,
      lead,
      evaluasi,
      nama,
      tgl_event,
      target_peserta,
      lokasi,
      kota,
      jenis_event,
      file_proposal,
      flyer,
    } = body

    let updateData: any = {
      updated_at: new Date(),
    }

    // If it's a realisasi update (has nominalDonasi, realisasiPeserta, lead, evaluasi)
    if (
      nominalDonasi !== undefined ||
      realisasiPeserta !== undefined ||
      lead !== undefined ||
      evaluasi !== undefined
    ) {
      updateData.nominal_donasi = nominalDonasi ?? undefined
      updateData.realisasi_peserta = realisasiPeserta ?? undefined
      updateData.lead = lead ?? undefined
      updateData.evaluasi = evaluasi ?? undefined
    } else {
      // If it's a full event update
      updateData.nama = nama ?? undefined
      updateData.tgl_event = tgl_event ? new Date(tgl_event) : undefined
      updateData.target_peserta = target_peserta ?? undefined
      updateData.lokasi = lokasi ?? undefined
      updateData.kota = kota ?? undefined
      updateData.jenis_event = jenis_event ?? undefined
      updateData.file_proposal = file_proposal ?? undefined
      updateData.flyer = flyer ?? undefined
    }

    const updated = await prisma.corez_event.update({
      where: { id: eventId },
      data: updateData,
    })

    const serializedUpdated = {
      ...updated,
      nominal_donasi: updated.nominal_donasi
        ? Number(updated.nominal_donasi)
        : 0,
    }

    return NextResponse.json({ success: true, data: serializedUpdated })
  } catch (error) {
    console.error('Error patch event:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = Number(id)

    await prisma.corez_event.delete({
      where: { id: eventId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
