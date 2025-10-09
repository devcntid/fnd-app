'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className={cn(
        "bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4 relative",
        className
      )}>
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700"
          variant="ghost"
          size="icon"
        >
          <X className="w-5 h-5" />
        </Button>
        {children}
      </div>
    </div>
  )
}


