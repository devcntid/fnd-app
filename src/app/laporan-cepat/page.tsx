'use client'

import { useState } from 'react'
import { FloatingTabs } from '@/components/reports/floating-tabs'
import { TimsilOptions } from '@/components/reports/timsil-options'
import { ManualReportForm } from '@/components/reports/manual-report-form'
import { QRScanner } from '@/components/reports/qr-scanner'
import { Modal } from '@/components/ui/modal'
import { IdDetected } from '@/components/reports/id-detected'

export default function LaporanCepatPage() {
  const [activeCategory, setActiveCategory] = useState('timsil')
  const [showManualForm, setShowManualForm] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showIdDetected, setShowIdDetected] = useState(false)
  const [scannedData, setScannedData] = useState<{
    id: string
    name: string
    phone: string
    address: string
    cabang: string
    tgl_registrasi: string
    type: 'kencleng' | 'kalimat'
  } | null>(null)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setShowManualForm(false)
    setShowQRScanner(false)
    setShowUploadModal(false)
    setShowIdDetected(false)
  }

  const handleUploadBulk = () => setShowUploadModal(true)
  const handleScanQR = () => setShowQRScanner(true)
  const handleManualReport = () => setShowManualForm(true)

  const handleManualFormSubmit = (data: {
    donaturName: string
    donaturHp: string
    donaturAddress: string
    akadProgram: string
    donationAmount: string
    transactionTime: string
    nextVisitSchedule: string
    nextVisitDate: string
  }) => {
    console.log('Manual form submitted:', data)
    setShowManualForm(false)
  }

  const handleTestScan = () => {
    setShowQRScanner(false)
    const isKencleng = Math.random() > 0.5
    const mockScannedData = {
      id: isKencleng ? 'KCL-BDG-01234' : 'KMT-BDG-0001',
      name: isKencleng ? 'Bapak Abdullah' : 'Masjid Al-Ikhlas',
      phone: '081234567890',
      address: 'Jl. Gegerkalong Girang No. 67, Bandung',
      cabang: 'DT Peduli Bandung',
      tgl_registrasi: '2025-01-01',
      type: (isKencleng ? 'kencleng' : 'kalimat') as 'kencleng' | 'kalimat'
    }
    setScannedData(mockScannedData)
    setShowIdDetected(true)
  }

  const handleIdDetectedSave = (data: {
    name: string
    phone: string
    address: string
    cabang: string
    tgl_registrasi: string
    nextVisit: string
    customDate: string
  }) => {
    console.log('ID detected save:', data)
    setShowIdDetected(false)
    setScannedData(null)
  }

  const handleIdDetectedJemput = (data: {
    name: string
    phone: string
    address: string
    cabang: string
    tgl_registrasi: string
    nextVisit: string
    customDate: string
  }) => {
    console.log('ID detected jemput:', data)
    setShowIdDetected(false)
    setScannedData(null)
  }

  if (showIdDetected && scannedData) {
    return (
      <IdDetected
        scannedData={scannedData}
        onClose={() => {
          setShowIdDetected(false)
          setScannedData(null)
        }}
        onSave={handleIdDetectedSave}
        onJemput={handleIdDetectedJemput}
      />
    )
  }

  return (
    <main className="p-4 space-y-5">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Laporan Cepat</h2>

      {activeCategory === 'timsil' && !showManualForm && (
        <TimsilOptions
          onUploadBulk={handleUploadBulk}
          onScanQR={handleScanQR}
          onManualReport={handleManualReport}
        />
      )}

      {showManualForm && (
        <ManualReportForm onSubmit={handleManualFormSubmit} />
      )}

      {activeCategory !== 'timsil' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-center text-gray-600">
            Form laporan untuk {activeCategory} akan segera tersedia.
          </p>
        </div>
      )}

      <FloatingTabs
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onTestScan={handleTestScan}
      />

      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)}>
        <h3 className="text-lg font-bold text-gray-800">Upload Bulk Data Kencleng</h3>
        <p className="text-sm text-gray-600">Pastikan file Anda sesuai dengan template yang disediakan.</p>
        <a href="#" className="text-sm text-blue-600 hover:underline font-semibold flex items-center gap-1">
          <span>📥</span>
          Unduh Template File
        </a>
        <input type="file" className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200" />
        <div className="flex gap-3 mt-4">
          <button onClick={() => setShowUploadModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 rounded-lg">Batal</button>
          <button className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold py-2.5 rounded-lg">Upload</button>
        </div>
      </Modal>
    </main>
  )
}
