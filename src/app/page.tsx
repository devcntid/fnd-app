'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GridMenu } from '@/components/home/grid-menu'
import { ActionButtons } from '@/components/home/action-buttons'
import { EventManagement } from '@/components/home/event-management'
import { TimsilSummary } from '@/components/home/timsil-summary'
import { KalimatSummary } from '@/components/home/kalimat-summary'
import { CorporateSummary } from '@/components/home/corporate-summary'
import { GeraiSummary } from '@/components/home/gerai-summary'
import { MitraSummary } from '@/components/home/mitra-summary'
import { MpzSummary } from '@/components/home/mpz-summary'
import { formatCurrencyFull } from '@/lib/utils'

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('summary')
  // const [appData] = useState(mockAppData) // No longer needed

  // State for Summary filters
  const currentYear = new Date().getFullYear()
  const [summaryYear, setSummaryYear] = useState<string>(currentYear.toString())
  const [summaryMonth, setSummaryMonth] = useState<string>('1')
  const [summaryVerified, setSummaryVerified] = useState<string>('verified')

  // State for summary data
  const [summaryData, setSummaryData] = useState<Record<string, number>>({
    Timsil: 0,
    Kalimat: 0,
    Event: 0,
    Gerai: 0,
    'Mitra Unggul': 0,
    Corporate: 0,
    MPZ: 0,
  })
  const [summaryLoading, setSummaryLoading] = useState(false)

  // Set current year and month on mount
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    setSummaryYear(currentYear.toString())
    setSummaryMonth(currentMonth.toString())
  }, [])

  const handleToolsClick = () => {
    router.push('/marketing-tools')
  }

  // Fetch summary data when filters change
  useEffect(() => {
    let isMounted = true

    const fetchSummaryData = async () => {
      if (activeTab !== 'summary') return

      try {
        setSummaryLoading(true)

        const apiEndpoints = [
          {
            key: 'Timsil',
            url: `/api/timsil?tahun=${summaryYear}&bulan=${summaryMonth}&verified=${summaryVerified}`,
          },
          {
            key: 'Kalimat',
            url: `/api/kalimat?tahun=${summaryYear}&bulan=${summaryMonth}&verified=${summaryVerified}`,
          },
          {
            key: 'Corporate',
            url: `/api/corporate?tahun=${summaryYear}&bulan=${summaryMonth}&verified=${summaryVerified}`,
          },
          {
            key: 'Gerai',
            url: `/api/gerai?tahun=${summaryYear}&bulan=${summaryMonth}&verified=${summaryVerified}`,
          },
          {
            key: 'Mitra Unggul',
            url: `/api/mitra?tahun=${summaryYear}&bulan=${summaryMonth}&verified=${summaryVerified}`,
          },
          {
            key: 'MPZ',
            url: `/api/mpz?tahun=${summaryYear}&bulan=${summaryMonth}&verified=${summaryVerified}`,
          },
        ]

        const results = await Promise.all(
          apiEndpoints.map(async (endpoint) => {
            try {
              const response = await fetch(endpoint.url)
              const result = await response.json()
              return {
                key: endpoint.key,
                value: result.success ? result.data?.capaian || 0 : 0,
              }
            } catch (error) {
              console.error(`Error fetching ${endpoint.key}:`, error)
              return { key: endpoint.key, value: 0 }
            }
          })
        )

        if (isMounted) {
          const newData: Record<string, number> = {}
          results.forEach((r) => {
            newData[r.key] = r.value
          })
          setSummaryData(newData)
        }
      } catch (error) {
        console.error('Error fetching summary data:', error)
      } finally {
        if (isMounted) {
          setSummaryLoading(false)
        }
      }
    }

    fetchSummaryData()

    return () => {
      isMounted = false
    }
  }, [summaryYear, summaryMonth, summaryVerified, activeTab])

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
            <h2 className="text-2xl font-bold text-white">Aktivitas Gerai</h2>
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

      case 'mpz':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Aktivitas MPZ</h2>
            <MpzSummary />
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
        const totalCapaian = Object.values(summaryData).reduce(
          (sum, value) => sum + value,
          0
        )

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
                  {summaryLoading ? '...' : formatCurrencyFull(totalCapaian)}
                </p>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-2 pt-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Detail Capaian
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    title="Pilih Status Verified"
                    value={summaryVerified}
                    onChange={(e) => setSummaryVerified(e.target.value)}
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="verified">Verified</option>
                    <option value="cash-unverified">Cash Unverified</option>
                    <option value="bank-unverified">Bank Unverified</option>
                  </select>
                  <select
                    title="Pilih Tahun"
                    value={summaryYear}
                    onChange={(e) => setSummaryYear(e.target.value)}
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
                  >
                    <option value="all">Semua Tahun</option>
                    {[2025, 2024, 2023].map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <select
                    title="Pilih Bulan"
                    value={summaryMonth}
                    onChange={(e) => setSummaryMonth(e.target.value)}
                    className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Semua Bulan</option>
                    <option value="1">Januari</option>
                    <option value="2">Februari</option>
                    <option value="3">Maret</option>
                    <option value="4">April</option>
                    <option value="5">Mei</option>
                    <option value="6">Juni</option>
                    <option value="7">Juli</option>
                    <option value="8">Agustus</option>
                    <option value="9">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desember</option>
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
                    <span className="font-semibold text-gray-800">
                      {summaryLoading
                        ? '...'
                        : formatCurrencyFull(summaryData[label] || 0)}
                    </span>
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
        onLaporanDonaturClick={() => {
          router.push('/laporan-donatur')
        }}
      />
      <div className="mt-5">{renderTabContent()}</div>
    </main>
  )
}
