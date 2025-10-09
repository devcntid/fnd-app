'use client'

import { UploadCloud, QrCode, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TimsilOptionsProps {
  onUploadBulk: () => void
  onScanQR: () => void
  onManualReport: () => void
}

export function TimsilOptions({ onUploadBulk, onScanQR, onManualReport }: TimsilOptionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Button
        onClick={onUploadBulk}
        className="flex flex-col items-center justify-center gap-1.5 bg-white rounded-xl shadow-sm py-4 hover:bg-gray-50"
      >
        <UploadCloud className="w-7 h-7 text-gray-800" />
        <span className="text-xs font-semibold text-center">Upload Bulk</span>
      </Button>
      <Button
        onClick={onScanQR}
        className="flex flex-col items-center justify-center gap-1.5 bg-white rounded-xl shadow-sm py-4 hover:bg-gray-50"
      >
        <QrCode className="w-7 h-7 text-gray-800" />
        <span className="text-xs font-semibold text-center">Scan QR</span>
      </Button>
      <Button
        onClick={onManualReport}
        className="flex flex-col items-center justify-center gap-1.5 bg-white rounded-xl shadow-sm py-4 hover:bg-gray-50"
      >
        <Edit3 className="w-7 h-7 text-gray-800" />
        <span className="text-xs font-semibold text-center">Kunjungan</span>
      </Button>
    </div>
  )
}
