'use client'

import { Wrench, FileText } from 'lucide-react'

interface ActionButtonsProps {
  onToolsClick: () => void
  onLaporanDonaturClick: () => void
}

export function ActionButtons({
  onToolsClick,
  onLaporanDonaturClick,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onToolsClick}
        className="w-full flex items-center justify-center gap-2 bg-white rounded-xl transition-all duration-200 shadow p-3 font-semibold text-gray-800 hover:bg-gray-200"
      >
        <Wrench className="w-5 h-5 text-orange-500" />
        <span className="text-sm">Marketing Tools</span>
      </button>
      <button
        onClick={onLaporanDonaturClick}
        className="w-full flex items-center justify-center gap-2 bg-white rounded-xl transition-all duration-200 shadow p-3 font-semibold text-gray-800 hover:bg-gray-200"
      >
        <FileText className="w-5 h-5 text-blue-600" />
        <span className="text-sm">Laporan ke Donatur</span>
      </button>
    </div>
  )
}
