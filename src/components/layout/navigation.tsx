'use client'

import { Home, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface NavigationProps {
  currentPage?: string
  onPageChange?: (page: string) => void
  onQuickReportClick?: () => void
}

export function Navigation({ currentPage = 'home', onPageChange, onQuickReportClick }: NavigationProps) {
  const router = useRouter()
  const isHomeActive = currentPage === 'home' || currentPage === 'tools' || currentPage === 'laporan-donatur'
  const isAccountActive = currentPage === 'akun' || currentPage === 'tugasku'
  const isReportActive = currentPage === 'laporan-cepat'

  const go = (path: string, pageKey: string) => {
    try { onPageChange?.(pageKey) } catch {}
    router.push(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/70 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-between items-center h-14 max-w-sm mx-auto">
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => go('/', 'home')}
            className={cn(
              "flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 h-full transition-all duration-200 w-full pt-1",
              isHomeActive && "text-orange-500"
            )}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-0.5">Home</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={() => { try { onQuickReportClick?.() } catch {}; router.push('/laporan-cepat') }}
            className={cn(
              "-translate-y-5 text-white w-16 h-16 flex items-center justify-center",
              "bg-gray-700 rounded-3xl transform rotate-45 shadow-lg hover:bg-gray-600 transition-colors"
            )}
          >
            <div className="w-full h-full flex items-center justify-center">
              <Image 
                src="https://i.imgur.com/4QlWXM3.png" 
                width={56}
                height={56}
                className={cn(
                  "w-14 h-14 -rotate-45 filter transition-all duration-200",
                  isReportActive ? "grayscale-0" : "grayscale"
                )}
                alt="Laporan Cepat"
              />
            </div>
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => go('/akun', 'akun')}
            className={cn(
              "flex flex-col items-center justify-center text-gray-500 hover:text-orange-500 h-full transition-all duration-200 w-full pt-1",
              isAccountActive && "text-orange-500"
            )}
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-0.5">Akun</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
