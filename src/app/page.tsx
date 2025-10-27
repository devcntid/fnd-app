'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GridMenu } from '@/components/home/grid-menu'
import { ActionButtons } from '@/components/home/action-buttons'
import { EventManagement } from '@/components/home/event-management'
import { TimsilSummary } from '@/components/home/timsil-summary'
import { KalimatSummary } from '@/components/home/kalimat-summary'
import { CorporateSummary } from '@/components/home/corporate-summary'
import { GeraiSummary } from '@/components/home/gerai-summary'
import { MitraSummary } from '@/components/home/mitra-summary'
import { formatCurrency } from '@/lib/utils'
import { mockAppData } from '@/lib/mock-data'

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('summary')
  const [appData] = useState(mockAppData)

  const handleToolsClick = () => {
    router.push('/marketing-tools')
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timsil':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Aktivitas Timsil</h2>
            <TimsilSummary />
          </div>
        )

      case 'kalimat':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Aktivitas Kalimat</h2>
            <KalimatSummary />
          </div>
        )

      case 'corporate':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Aktivitas Corporate
            </h2>
            <CorporateSummary />
          </div>
        )

      case 'gerai':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Aktivitas Gerai
            </h2>
            <GeraiSummary />
          </div>
        )

      case 'mitra-unggul':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Aktivitas Mitra Unggul
            </h2>
            <MitraSummary />
          </div>
        )

      case 'event':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Aktivitas Event</h2>
            <EventManagement />
          </div>
        )

      case 'summary':
        const totalCapaian = Object.values(appData).reduce((sum, category) => {
          const categoryData = category as { capaian?: number; donasi?: number }
          return sum + (categoryData.capaian || 0) + (categoryData.donasi || 0)
        }, 0)

        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Total Capaian Fundraising
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="text-center pb-4 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-600">
                  Total Capaian
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {formatCurrency(totalCapaian)}
                </p>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2 pt-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Detail Capaian
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    title="Pilih Wilayah"
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Nasional</option>
                    <option>Bandung</option>
                  </select>
                  <select
                    title="Pilih Tahun"
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>2025</option>
                  </select>
                  <select
                    title="Pilih Bulan"
                    defaultValue="Juli"
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Semua Bulan</option>
                    <option>Juli</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="space-y-2 text-sm">
                {[
                  'Timsil',
                  'Kalimat',
                  'Event',
                  'Gerai',
                  'Mitra Unggul',
                  'Corporate',
                  'MPZ',
                ].map((label, idx) => (
                  <div
                    key={label}
                    className={`flex justify-between p-2 rounded-lg ${
                      idx % 2 === 0 ? 'bg-gray-50' : ''
                    }`}
                  >
                    <span className="text-gray-600">{label}</span>
                    <span className="font-semibold text-gray-800">Rp 0</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Aktivitas {activeTab}
            </h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-center text-gray-600">
                Konten untuk {activeTab} akan segera tersedia.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <main className="p-4 space-y-5">
      <GridMenu activeTab={activeTab} onTabChange={setActiveTab} />
      <ActionButtons
        onToolsClick={handleToolsClick}
        onLaporanDonaturClick={() => {}}
      />
      <div className="mt-5">{renderTabContent()}</div>
    </main>
  )
}
