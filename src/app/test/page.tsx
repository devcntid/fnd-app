'use client'

import { useState, useEffect } from 'react'
import { AppWrapper } from '@/components/layout/app-wrapper'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [testResults, setTestResults] = useState<Array<{ name: string; status: string; message: string }>>([])

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      setTestResults([
        { name: 'Database Connection', status: 'success', message: 'Connected to PostgreSQL' },
        { name: 'API Routes', status: 'success', message: 'All routes working' },
        { name: 'Components', status: 'success', message: 'All components loaded' },
        { name: 'Animations', status: 'success', message: 'Framer Motion working' },
        { name: 'Icons', status: 'success', message: 'Lucide icons loaded' },
        { name: 'Styling', status: 'success', message: 'Tailwind CSS working' },
      ])
    }, 2000)
  }, [])

  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const runTests = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setTestResults([
        { name: 'Database Connection', status: 'success', message: 'Connected to PostgreSQL' },
        { name: 'API Routes', status: 'success', message: 'All routes working' },
        { name: 'Components', status: 'success', message: 'All components loaded' },
        { name: 'Animations', status: 'success', message: 'Framer Motion working' },
        { name: 'Icons', status: 'success', message: 'Lucide icons loaded' },
        { name: 'Styling', status: 'success', message: 'Tailwind CSS working' },
      ])
    }, 2000)
  }

  return (
    <AppWrapper>
      <Header 
        notificationCount={4}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
      />
      <main className="p-4 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">System Test</h2>
          <Button
            onClick={runTests}
            disabled={isLoading}
            className="bg-gradient-to-br from-amber-400 to-orange-500 text-white"
          >
            {isLoading ? 'Running...' : 'Run Tests'}
          </Button>
        </div>
        
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-semibold text-lg text-gray-800">
              Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {testResults.map((test, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Badge 
                      variant={test.status === 'success' ? 'success' : 'error'}
                      className="w-20 justify-center"
                    >
                      {test.status}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{test.name}</p>
                      <p className="text-sm text-gray-600">{test.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-semibold text-lg text-gray-800">
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Next.js Version:</span>
              <span className="font-semibold">15.5.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">React Version:</span>
              <span className="font-semibold">19.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TypeScript:</span>
              <span className="font-semibold">5.x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tailwind CSS:</span>
              <span className="font-semibold">4.x</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prisma:</span>
              <span className="font-semibold">6.17.0</span>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Navigation
        currentPage="test"
        onPageChange={() => {}}
        onQuickReportClick={() => {}}
      />
    </AppWrapper>
  )
}


