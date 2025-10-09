'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'

export default function ClientFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''
  const isLogin = pathname.startsWith('/login')

  return (
    <>
      {!isLogin && <Header notificationCount={4} />}
      {children}
      {!isLogin && <Navigation />}
    </>
  )
}


