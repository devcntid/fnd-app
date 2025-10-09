'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const [username, setUsername] = useState('kevin.adhyatama@dtpeduli.org')
  const [password, setPassword] = useState('admin123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok || !data.ok) {
      setError(data.message || 'Gagal login')
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    router.push('/')
  }

  return (
    <div className="max-w-sm mx-auto min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f2552' }}>
      <main className="p-6 w-full relative">
        <div className="bg-white rounded-3xl w-full shadow-2xl overflow-hidden">
          <div className="bg-cover bg-center p-6 relative" style={{backgroundImage: `linear-gradient(to bottom, rgba(30, 74, 179, 0.7), rgba(36, 83, 199, 0.7)), url('https://i.imgur.com/fE9xsga.jpeg')`}}>
            <div className="absolute left-6 top-6">
              <Image src="https://erp.dtpeduli.org/assets/2025-06/2506183HM7B6.png" alt="dtpeduli" width={28} height={28} className="h-7 w-auto drop-shadow" />
            </div>
            <div className="flex flex-col justify-center items-center gap-3 py-12">
              <Image src="https://i.imgur.com/hd2Ueeq.png" alt="Logo FND" width={64} height={64} className="h-16 w-auto drop-shadow-lg" />
            </div>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Selamat Datang</h2>
            <p className="text-gray-500 mb-6 text-center">Silakan masuk untuk melanjutkan</p>
            <form onSubmit={onSubmit} className="space-y-4">
              <input 
                value={username}
                onChange={e=>setUsername(e.target.value)}
                type="text" 
                placeholder="Email / Username" 
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                <input 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  type={showPassword? 'text' : 'password'} 
                  placeholder="Password" 
                  className="w-full p-4 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
                <button 
                  type="button" 
                  onClick={()=>setShowPassword(p=>!p)} 
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button
                disabled={isLoading}
                className="w-full bg-gradient-to-b from-amber-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
                {isLoading ? 'Masuk...' : 'Masuk'}
              </button>
            </form>
          </div>
        </div>

        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <p className="text-white font-semibold">Memproses login...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
