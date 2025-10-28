'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FloatingTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: 'mitra', label: 'Mitra' },
  { id: 'gerai', label: 'Gerai' },
  { id: 'timsil', label: 'Tim Sil/Kal' },
  { id: 'mpz', label: 'MPZ' },
  { id: 'corporate', label: 'Corp' },
]

export function FloatingTabs({
  activeCategory,
  onCategoryChange,
}: FloatingTabsProps) {
  return (
    <div className="fixed bottom-20 left-0 right-0 z-10 p-4 pointer-events-none">
      <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm p-1.5 rounded-full shadow-lg w-full max-w-md mx-auto pointer-events-auto">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 text-center flex items-center justify-center',
              activeCategory === category.id
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg'
                : 'bg-gray-700 text-gray-200 shadow-inner'
            )}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
