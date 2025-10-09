'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface OverlayProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Overlay({ isOpen, onClose, children, className }: OverlayProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60">
      <div className={cn(
        "w-full h-full flex flex-col items-center justify-center text-white bg-black/80 p-4 relative",
        className
      )}>
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/10"
          variant="ghost"
          size="icon"
        >
          <X className="w-6 h-6" />
        </Button>
        {children}
      </div>
    </div>
  )
}


