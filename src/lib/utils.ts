import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `Rp ${(value / 1000000000).toFixed(1).replace('.', ',')} M`
  }
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1).replace('.', ',')} Jt`
  }
  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(1).replace('.', ',')} Rb`
  }
  return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1
}

export function getCurrentYear(): number {
  return new Date().getFullYear()
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

