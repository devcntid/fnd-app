'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Archive, Box } from 'lucide-react'
import { mockTasks } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function TugaskuPage() {
  const handleTaskClick = (task: typeof mockTasks[0]) => {
    console.log('Task clicked:', task)
    // Navigate to quick report page
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'kalimat':
        return <Archive className="w-5 h-5" />
      case 'kencleng':
        return <Box className="w-5 h-5" />
      default:
        return <Archive className="w-5 h-5" />
    }
  }

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'kalimat':
        return 'bg-gradient-to-br from-blue-200 to-blue-100 text-blue-600'
      case 'kencleng':
        return 'bg-gradient-to-br from-orange-200 to-orange-100 text-orange-500'
      default:
        return 'bg-gradient-to-br from-gray-200 to-gray-100 text-gray-600'
    }
  }

  return (
    <main className="p-4 space-y-5">
      <h2 className="text-2xl font-bold text-white">Tugasku</h2>
      
      <div className="space-y-3">
        {mockTasks.map((task) => (
          <Card 
            key={task.id} 
            className={cn(
              "bg-white/90 backdrop-blur-sm shadow-sm cursor-pointer hover:bg-gray-100 transition-colors",
              task.status === 'completed' && "opacity-70 bg-gray-50 cursor-not-allowed"
            )}
            onClick={() => task.status !== 'completed' && handleTaskClick(task)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className={`${getTaskColor(task.type)} p-3 rounded-lg`}>
                  {getTaskIcon(task.type)}
                </div>
                <div className="flex-grow">
                  <p className="font-bold text-gray-800">
                    Jemput {task.type === 'kalimat' ? 'Kalimat' : 'Kencleng'}
                  </p>
                  <p className="text-sm text-gray-600">{task.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{task.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    {formatDate(task.dueDate)}
                  </p>
                  <Badge 
                    variant={task.status === 'completed' ? 'success' : 'error'}
                    className="mt-1"
                  >
                    {task.status === 'completed' ? 'Selesai' : 'Belum'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}


