'use client'

import { Overlay } from '@/components/ui/overlay'
import { Button } from '@/components/ui/button'

interface QRScannerProps {
  isOpen: boolean
  onClose: () => void
  onTestScan: () => void
}

export function QRScanner({ isOpen, onClose, onTestScan }: QRScannerProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="scanner-box mx-auto">
          <div className="scanner-line"></div>
        </div>
        <p className="mt-4 text-lg">Arahkan kamera ke QR Code</p>
      </div>
      <div className="absolute bottom-10 flex gap-4">
        <Button
          onClick={onTestScan}
          className="bg-white/20 backdrop-blur-sm rounded-full py-2 px-6 text-white hover:bg-white/30"
        >
          Test
        </Button>
        <Button
          onClick={onClose}
          className="bg-white/20 backdrop-blur-sm rounded-full py-2 px-6 text-white hover:bg-white/30"
        >
          Batal
        </Button>
      </div>
    </Overlay>
  )
}


