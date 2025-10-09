'use client'

// Removed unused Card imports
import { Award, User } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { LeaderboardEntry } from '@/lib/mock-data'
import Image from 'next/image'

interface LeaderboardCardProps {
  title: string
  data: LeaderboardEntry[]
  month: string
  onMonthChange: (month: string) => void
  className?: string
}

export function LeaderboardCard({ 
  title, 
  data, 
  month, 
  onMonthChange,
  className 
}: LeaderboardCardProps) {
  const sortedData = [...data].sort((a, b) => b.amount - a.amount).slice(0, 5)
  const medalColors = ['text-amber-400', 'text-gray-400', 'text-amber-600']

  return (
    <div className={`bg-white rounded-xl shadow ${className}`}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">
            {title}
          </h3>
          <select
            value={month}
            onChange={(e) => onMonthChange(e.target.value)}
            className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua</option>
            <option value="7">Juli</option>
            <option value="6">Juni</option>
          </select>
        </div>
        <div className="space-y-4">
          {sortedData.length === 0 ? (
            <p className="text-center text-sm text-gray-600">
              Belum ada data untuk periode ini.
            </p>
          ) : (
            sortedData.map((item, index) => {
              const rank = index + 1
              const rankElement = rank <= 3 ? (
                <Award className={`w-6 h-6 ${medalColors[index]} fill-current`} />
              ) : (
                <span className="text-lg font-bold text-gray-500 w-6 text-center">
                  {rank}
                </span>
              )

              const avatarElement = item.avatar ? (
                <Image 
                  src={item.avatar} 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover" 
                  alt="Avatar"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
              )

              return (
                <div key={index} className="flex items-center gap-4">
                  {rankElement}
                  {avatarElement}
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <div className="text-xs text-gray-600">
                      <span>{item.subtext}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
