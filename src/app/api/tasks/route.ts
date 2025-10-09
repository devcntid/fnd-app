import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data for now since the database model doesn't exist yet
    const mockTasks = [
      {
        id: '1',
        name: 'Jemput Kencleng Masjid Al-Ikhlas',
        location: 'Jl. Gegerkalong Girang No. 67, Bandung',
        type: 'kencleng',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        user: {
          name: 'Ahmad Fauzi',
          avatar: 'https://placehold.co/40x40/f39c12/ffffff?text=AF'
        }
      },
      {
        id: '2',
        name: 'Jemput Kalimat Kantor DT Peduli',
        location: 'Jl. Diponegoro No. 123, Jakarta',
        type: 'kalimat',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        user: {
          name: 'Siti Nurhaliza',
          avatar: 'https://placehold.co/40x40/3498db/ffffff?text=SN'
        }
      }
    ]

    return NextResponse.json(mockTasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { taskId, status } = body

    // Mock response for now since the database model doesn't exist yet
    const mockUpdatedTask = {
      id: taskId,
      status: status,
      updatedAt: new Date()
    }

    return NextResponse.json(mockUpdatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}


