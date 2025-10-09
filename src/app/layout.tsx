import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppWrapper } from '@/components/layout/app-wrapper'
import { ReactNode } from 'react'
import ClientFrame from '@/components/layout/client-frame'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard FND - DT Peduli',
  description: 'Sistem aplikasi fundraising DT Peduli',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased text-gray-800`}>
        <AppWrapper>
          <ClientFrame>
            {children}
          </ClientFrame>
        </AppWrapper>
      </body>
    </html>
  )
}