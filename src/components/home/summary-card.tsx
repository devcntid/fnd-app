'use client'

// Removed unused Card imports
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface SummaryCardProps {
  title: string
  mainValue: number
  mainLabel: string
  stats: Array<{
    label: string
    value: number
    color?: string
  }>
  filters?: Array<{
    label: string
    options: string[]
    value: string
    onChange: (value: string) => void
  }>
  className?: string
}

export function SummaryCard({ 
  title, 
  mainValue, 
  mainLabel, 
  stats, 
  filters,
  className 
}: SummaryCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm", className)}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="font-semibold text-lg text-gray-800">
            {title}
          </h3>
          {filters && (
            <div className="flex items-center gap-2">
              {filters.map((filter, index) => (
                <select
                  key={index}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            {formatCurrency(mainValue)}
          </p>
          <p className="text-sm font-semibold text-gray-600">{mainLabel}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className={cn(
                "text-xl font-bold",
                stat.color || "bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
              )}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
