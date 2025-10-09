'use client'

import { Users, Archive, CalendarHeart, Store, Gem, Building2, ShieldCheck, PieChart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GridMenuProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: 'timsil', label: 'Timsil', icon: Users },
  { id: 'kalimat', label: 'Kalimat', icon: Archive },
  { id: 'event', label: 'Event', icon: CalendarHeart },
  { id: 'gerai', label: 'Gerai', icon: Store },
  { id: 'mitra-unggul', label: 'Mitra Unggul', icon: Gem },
  { id: 'corporate', label: 'Corporate', icon: Building2 },
  { id: 'mpz', label: 'MPZ', icon: ShieldCheck },
  { id: 'summary', label: 'Summary', icon: PieChart },
]

export function GridMenu({ activeTab, onTabChange }: GridMenuProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 aspect-square rounded-xl transition-all duration-200 shadow",
              isActive 
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl scale-110" 
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            <Icon className={cn("w-7 h-7", isActive ? "text-white" : "text-gray-500")} />
            <span className={cn("text-xs font-semibold text-center", isActive ? "text-white" : "text-gray-700")}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
