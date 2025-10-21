'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GridMenu } from '@/components/home/grid-menu'
import { ActionButtons } from '@/components/home/action-buttons'
import { EventManagement } from '@/components/home/event-management'
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
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Ringkasan Timsil
                </h3>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Nasional</option>
                    <option>Bandung</option>
                  </select>
                  <select className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>2025</option>
                  </select>
                  <select
                    defaultValue="Juli"
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Juli</option>
                  </select>
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {formatCurrency(appData.timsil.capaian)}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  Capaian Timsil
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {appData.timsil.kunjungan}
                  </p>
                  <p className="text-xs text-gray-600">Kunjungan</p>
                </div>
                <div>
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {appData.timsil.donatur}
                  </p>
                  <p className="text-xs text-gray-600">Donatur Kencleng</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-green-600">
                    {appData.timsil.jemput}
                  </p>
                  <p className="text-xs text-gray-600">Sudah Dijemput</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xl font-bold text-red-500">
                    {appData.timsil.belumJemput}
                  </p>
                  <p className="text-xs text-gray-600">Belum Dijemput</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  Leaderboard Timsil
                </h3>
                <select
                  defaultValue="7"
                  className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua</option>
                  <option value="7">Juli</option>
                  <option value="6">Juni</option>
                </select>
              </div>
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-600">
                  Belum ada data untuk periode ini.
                </p>
              </div>
            </div>
          </div>
        )

      case 'kalimat':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Aktivitas Kalimat</h2>
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Ringkasan Kalimat
                </h3>
                <div className="flex items-center gap-2">
                  <select className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Nasional</option>
                    <option>Bandung</option>
                  </select>
                  <select className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>2025</option>
                  </select>
                  <select
                    defaultValue="Juli"
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Juli</option>
                  </select>
                </div>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {formatCurrency(appData.kalimat.donasi)}
                </p>
                <p className="text-sm font-semibold text-gray-600">
                  Total Donasi
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {appData.kalimat.aktif}
                  </p>
                  <p className="text-xs text-gray-600">Kotak Aktif</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-green-600">
                    {appData.kalimat.jemput}
                  </p>
                  <p className="text-xs text-gray-600">Sudah Jemput</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-red-500">
                    {appData.kalimat.belumJemput}
                  </p>
                  <p className="text-xs text-gray-600">Belum Jemput</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  Leaderboard Kalimat
                </h3>
                <select
                  defaultValue="7"
                  className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua</option>
                  <option value="7">Juli</option>
                  <option value="6">Juni</option>
                </select>
              </div>
              <div className="space-y-4">
                <p className="text-center text-sm text-gray-600">
                  Belum ada data untuk periode ini.
                </p>
              </div>
            </div>
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
                  <select className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Nasional</option>
                    <option>Bandung</option>
                  </select>
                  <select className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>2025</option>
                  </select>
                  <select
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
