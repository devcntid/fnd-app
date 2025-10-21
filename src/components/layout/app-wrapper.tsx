'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface AppWrapperProps {
  children: ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const pathname = usePathname() || ''
  const isVerify = pathname.startsWith('/verify')

  // Untuk halaman verify, tidak menggunakan wrapper khusus
  if (isVerify) {
    return <>{children}</>
  }

  return (
    <div
      className="max-w-sm mx-auto min-h-screen flex flex-col"
      style={{ backgroundColor: '#1e4ab3' }}
    >
      <div
        className="flex-grow overflow-y-auto pb-24"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(30, 74, 179, 0.8), rgba(36, 83, 199, 0.75)), url('https://i.imgur.com/fE9xsga.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
