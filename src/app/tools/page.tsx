'use client'

import { AppWrapper } from '@/components/layout/app-wrapper'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, BookOpen, Clipboard, Image } from 'lucide-react'
import { mockMarketingTools } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

export default function ToolsPage() {
  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleBackClick = () => {
    window.history.back()
  }

  const handleDownload = (tool: any) => {
    console.log('Download:', tool)
  }

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5" />
      case 'catalog':
        return <BookOpen className="w-5 h-5" />
      case 'proposal':
        return <Clipboard className="w-5 h-5" />
      case 'marketing':
        return <Image className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getToolColor = (type: string) => {
    switch (type) {
      case 'document':
        return 'bg-gradient-to-br from-blue-200 to-blue-100 text-blue-600'
      case 'catalog':
        return 'bg-gradient-to-br from-green-200 to-green-100 text-green-600'
      case 'proposal':
        return 'bg-gradient-to-br from-orange-200 to-orange-100 text-orange-500'
      case 'marketing':
        return 'bg-gradient-to-br from-purple-200 to-purple-100 text-purple-600'
      default:
        return 'bg-gradient-to-br from-gray-200 to-gray-100 text-gray-600'
    }
  }

  return (
    <AppWrapper>
      <Header 
        notificationCount={4}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
      />
      <main className="p-4 space-y-5">
        <div className="flex items-center gap-4 text-white">
          <Button
            onClick={handleBackClick}
            className="p-1 -ml-1 text-white hover:bg-white/10"
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl font-bold">Peralatan Marketing</h2>
        </div>
        
        <div className="space-y-3">
          {mockMarketingTools.map((tool) => (
            <Card key={tool.id} className="bg-white/90 backdrop-blur-sm shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`${getToolColor(tool.type)} p-3 rounded-lg`}>
                    {getToolIcon(tool.type)}
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-gray-800">{tool.name}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Dirilis: {formatDate(tool.releaseDate)}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDownload(tool)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded-lg text-xs"
                    variant="ghost"
                  >
                    Unduh
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      
      <Navigation
        currentPage="tools"
        onPageChange={() => {}}
        onQuickReportClick={() => {}}
      />
    </AppWrapper>
  )
}
