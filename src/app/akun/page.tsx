'use client'

import { useEffect, useState } from 'react'

export default function AkunPage() {
  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    fetch('/api/auth/me').then(async r=>{
      if(!r.ok) return
      const d = await r.json()
      setMe(d.user)
    })
  }, [])

  return (
    <main className="p-4 space-y-5">
      <h2 className="text-2xl font-bold text-white">Akun Saya</h2>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 shadow">
        <img src={me?.karyawan?.avatar || 'https://placehold.co/64x64/f39c12/ffffff?text=A'} className="w-16 h-16 rounded-full object-cover" alt="Avatar" />
        <div className="flex-grow">
          <p className="font-bold text-xl text-gray-800">{me?.karyawan?.karyawan || 'Memuat...'}</p>
          <p className="text-gray-500">{me?.email}</p>
        </div>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow">
        <a href="/tugasku" className="flex items-center justify-between p-3 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-600">Tugasku</span>
          </div>
          <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">2</span>
        </a>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow">
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Capaian Kinerja</h3>
        <div className="flex gap-2 mb-3">
          <select className="flex-grow bg-gray-100 p-2 rounded-md text-sm"><option>Tahun 2025</option><option>Tahun 2024</option></select>
          <select className="flex-grow bg-gray-100 p-2 rounded-md text-sm"><option value="all">Semua Bulan</option><option value="7">Juli</option><option value="6">Juni</option></select>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-800"><span className="text-gray-500">Kunjungan Timsil</span><span className="font-bold">150</span></div>
          <div className="flex justify-between text-gray-800"><span className="text-gray-500">Donasi Terkumpul</span><span className="font-bold">Rp 25.5 Jt</span></div>
        </div>
      </div>
      <div className="h-8" />
      <form action="/api/auth/logout" method="post" className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow mb-24">
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-500" type="submit">
          <span className="font-semibold">Keluar</span>
          <span>⎋</span>
        </button>
      </form>
    </main>
  )
}
