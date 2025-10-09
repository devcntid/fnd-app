'use client'

import { AppWrapper } from '@/components/layout/app-wrapper'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarClock, Award, CalendarCheck, TrendingUp } from 'lucide-react'
import { mockNotifications } from '@/lib/mock-data'
import { formatDateTime } from '@/lib/utils'

export default function NotifikasiPage() {
  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <CalendarClock className="w-5 h-5" />
      case 'achievement':
        return <Award className="w-5 h-5" />
      case 'event':
        return <CalendarCheck className="w-5 h-5" />
      case 'leaderboard':
        return <TrendingUp className="w-5 h-5" />
      default:
        return <CalendarClock className="w-5 h-5" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-gradient-to-br from-orange-200 to-orange-100 text-orange-600'
      case 'achievement':
        return 'bg-gradient-to-br from-green-200 to-green-100 text-green-600'
      case 'event':
        return 'bg-gradient-to-br from-blue-200 to-blue-100 text-blue-600'
      case 'leaderboard':
        return 'bg-gradient-to-br from-yellow-200 to-yellow-100 text-yellow-600'
      default:
        return 'bg-gradient-to-br from-gray-200 to-gray-100 text-gray-600'
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return 'Baru saja'
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`
    } else if (diffInHours < 48) {
      return 'Kemarin'
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} hari yang lalu`
    }
  }

  return (
    <AppWrapper>
      <Header 
        notificationCount={0}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
      />
      <main className="p-4 space-y-5">
        <h2 className="text-2xl font-bold text-white">Notifikasi</h2>
        
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <Card key={notification.id} className="bg-white/90 backdrop-blur-sm shadow-sm">
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`${getNotificationColor(notification.type)} p-2 rounded-full`}>
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Navigation
        currentPage="notifikasi"
        onPageChange={() => {}}
        onQuickReportClick={() => {}}
      />
    </AppWrapper>
  )
}


