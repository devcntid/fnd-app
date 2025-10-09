'use client'

import { useState } from 'react'
import { Search, Bell, X } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  notificationCount?: number
  onSearch?: (query: string) => void
  onNotificationClick?: () => void
}

export function Header({ notificationCount = 4, onSearch, onNotificationClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header 
      className="sticky top-0 z-30 backdrop-blur-sm text-white flex items-center h-16 px-4 shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(20, 54, 133, 0.95), rgba(26, 63, 159, 0.9)), url('https://i.imgur.com/fE9xsga.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex-1 flex justify-between items-center w-full">
        {!isSearchOpen ? (
          <>
            <div className="flex-1 flex justify-start">
              <Image 
                src="https://i.imgur.com/hd2Ueeq.png" 
                alt="Logo FND" 
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex-shrink-0">
              <Image 
                src="https://erp.dtpeduli.org/assets/2025-06/2506183HM7B6.png" 
                alt="Logo DT Peduli" 
                width={44}
                height={44}
                className="h-11 w-auto"
              />
            </div>
            <div className="flex-1 flex justify-end items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:bg-white/10 p-2 rounded-md transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={onNotificationClick}
                className="text-white hover:bg-white/10 p-2 rounded-md transition-colors relative"
              >
                <Bell className="w-6 h-6" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white">
                    {notificationCount}
                  </span>
                )}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSearchSubmit} className="flex items-center w-full gap-2">
            <input
              type="search"
              placeholder="Cari di halaman ini..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-blue-800/50 text-white placeholder-white/70 border border-blue-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleCloseSearch}
              className="text-white hover:bg-white/10 p-2 rounded-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </form>
        )}
      </div>
    </header>
  )
}
