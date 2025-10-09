'use client'

import { useState } from 'react'
import { AppWrapper } from '@/components/layout/app-wrapper'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { ArrowLeft, Search, FileSpreadsheet, ShieldCheck, ChevronRight, Heart, Circle } from 'lucide-react'
import { mockDonors, mockDigitalPosters } from '@/lib/mock-data'
import { formatDate } from '@/lib/utils'

export default function LaporanDonaturPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedDonor, setSelectedDonor] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  const handleBackClick = () => {
    window.history.back()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const results = mockDonors.filter(donor => 
        donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donor.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(true)
    }
  }

  const handleDonorSelect = (donor: any) => {
    setSelectedDonor(donor)
    setShowDetail(true)
    setShowResults(false)
  }

  const handleBackToSearch = () => {
    setShowDetail(false)
    setSelectedDonor(null)
    setShowResults(false)
    setSearchQuery('')
  }

  const handleDownload = (type: string) => {
    console.log('Download:', type, selectedDonor)
  }

  const getPosterIcon = (type: string) => {
    switch (type) {
      case 'ramadhan':
        return <Heart className="w-5 h-5" />
      case 'qurban':
        return <Circle className="w-5 h-5" />
      default:
        return <Heart className="w-5 h-5" />
    }
  }

  const getPosterColor = (type: string) => {
    switch (type) {
      case 'ramadhan':
        return 'text-red-500'
      case 'qurban':
        return 'text-green-600'
      default:
        return 'text-gray-500'
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
          <h2 className="text-2xl font-bold">Laporan ke Donatur</h2>
        </div>
        
        {!showDetail && (
          <div>
            {/* Search Card */}
            <Card className="bg-white rounded-xl shadow">
              <CardHeader>
                <CardTitle className="font-semibold text-lg text-gray-800">
                  Cari Donatur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Nama / No. HP / ID Donatur"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    size="icon"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Search Results */}
            {showResults && (
              <div className="mt-4 space-y-3">
                {searchResults.map((donor) => (
                  <Card key={donor.id} className="bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div 
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-50"
                        onClick={() => handleDonorSelect(donor)}
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{donor.name}</p>
                          <p className="text-sm text-gray-600">{donor.id}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {showDetail && selectedDonor && (
          <div>
            {/* Detail Card */}
            <Card className="bg-white rounded-xl shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-semibold text-lg text-gray-800">
                    Laporan untuk {selectedDonor.name}
                  </CardTitle>
                  <Button
                    onClick={handleBackToSearch}
                    className="text-sm text-blue-600 hover:underline"
                    variant="ghost"
                  >
                    Kembali
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter */}
                <div className="flex gap-2">
                  <Select className="flex-grow bg-gray-100 p-2 rounded-md text-sm">
                    <option>Tahun 2025</option>
                    <option>Tahun 2024</option>
                  </Select>
                  <Select className="flex-grow bg-gray-100 p-2 rounded-md text-sm">
                    <option value="all">Semua Bulan</option>
                    <option value="7">Juli</option>
                    <option value="6">Juni</option>
                  </Select>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={() => handleDownload('transaction')}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg transition-all duration-200 shadow p-3 font-semibold hover:bg-green-600"
                  >
                    <FileSpreadsheet className="w-5 h-5" />
                    <span>Unduh Laporan Transaksi</span>
                  </Button>
                  <Button
                    onClick={() => handleDownload('zakat')}
                    className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white rounded-lg transition-all duration-200 shadow p-3 font-semibold hover:bg-blue-600"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Unduh Bukti Setor Zakat</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Digital Poster Section */}
        <Card className="bg-white rounded-xl shadow">
          <CardHeader>
            <CardTitle className="font-semibold text-lg text-gray-800">
              Digital Poster Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockDigitalPosters.map((poster) => (
                <div key={poster.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-4">
                    <div className={getPosterColor(poster.type)}>
                      {getPosterIcon(poster.type)}
                    </div>
                    <div className="flex-grow">
                      <p className="font-bold text-gray-800 text-sm">{poster.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Dirilis: {formatDate(poster.releaseDate)}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDownload(poster.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs"
                      variant="ghost"
                    >
                      Unduh
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Navigation
        currentPage="laporan-donatur"
        onPageChange={() => {}}
        onQuickReportClick={() => {}}
      />
    </AppWrapper>
  )
}
