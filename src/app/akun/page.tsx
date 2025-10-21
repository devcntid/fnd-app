'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import QRCode from 'qrcode'

interface User {
  email: string
  karyawan?: {
    karyawan: string
    avatar?: string
    foto?: string
    idEmployee?: string
  }
}

export default function AkunPage() {
  const [me, setMe] = useState<User | null>(null)
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('')

  useEffect(() => {
    fetch('/api/auth/me').then(async (r) => {
      if (!r.ok) return
      const d = await r.json()
      setMe(d.user)

      // Generate QR code dari URL verifikasi dengan id_employee
      if (d.user?.karyawan?.idEmployee) {
        try {
          const verificationUrl = `${window.location.origin}/verify/${d.user.karyawan.idEmployee}`
          const qrCodeUrl = await QRCode.toDataURL(verificationUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          })
          setQrCodeDataUrl(qrCodeUrl)
        } catch (error) {
          console.error('Error generating QR code:', error)
        }
      }
    })
  }, [])

  return (
    <main className="p-4 space-y-5">
      <h2 className="text-2xl font-bold text-white">Akun Saya</h2>
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 flex items-center gap-4 shadow">
        <Image
          src={
            me?.karyawan?.foto ||
            me?.karyawan?.avatar ||
            'https://placehold.co/64x64/f39c12/ffffff?text=A'
          }
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
          alt="Avatar"
        />
        <div className="flex-grow">
          <p className="font-bold text-xl text-gray-800">
            {me?.karyawan?.karyawan || 'Memuat...'}
          </p>
          <p className="text-gray-500">{me?.email}</p>
          {me?.karyawan?.idEmployee && (
            <p className="text-sm text-gray-400">
              ID: {me.karyawan.idEmployee}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow">
        <a
          href="/tugasku"
          className="flex items-center justify-between p-3 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-600">Tugasku</span>
          </div>
          <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            2
          </span>
        </a>
      </div>

      {/* QR Code Section */}
      {qrCodeDataUrl && (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            ID Samil (Santri Amil)
          </h3>
          <div className="flex flex-col items-center space-y-3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <a
                href={`/verify/${me?.karyawan?.idEmployee}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer hover:opacity-80 transition-opacity"
                title="Klik untuk membuka halaman verifikasi di tab baru"
              >
                <Image
                  src={qrCodeDataUrl}
                  alt="QR Code ID Employee"
                  width={192}
                  height={192}
                  className="w-48 h-48"
                />
              </a>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Pindai untuk verifikasi identitas atau klik untuk membuka di tab
              baru
            </p>
            {me?.karyawan?.idEmployee && (
              <p className="text-xs text-gray-400">
                ID: {me.karyawan.idEmployee}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow">
        <h3 className="font-semibold text-lg mb-3 text-gray-800">
          Capaian Kinerja
        </h3>
        <div className="flex gap-2 mb-3">
          <select
            className="flex-grow bg-gray-100 p-2 rounded-md text-sm"
            title="Pilih Tahun"
          >
            <option>Tahun 2025</option>
            <option>Tahun 2024</option>
          </select>
          <select
            className="flex-grow bg-gray-100 p-2 rounded-md text-sm"
            title="Pilih Bulan"
          >
            <option value="all">Semua Bulan</option>
            <option value="7">Juli</option>
            <option value="6">Juni</option>
          </select>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-800">
            <span className="text-gray-500">Kunjungan Timsil</span>
            <span className="font-bold">150</span>
          </div>
          <div className="flex justify-between text-gray-800">
            <span className="text-gray-500">Donasi Terkumpul</span>
            <span className="font-bold">Rp 25.5 Jt</span>
          </div>
        </div>
      </div>
      <div className="h-8" />
      <form
        action="/api/auth/logout"
        method="post"
        className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow mb-24"
      >
        <button
          className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors text-red-500"
          type="submit"
        >
          <span className="font-semibold">Keluar</span>
          <span>⎋</span>
        </button>
      </form>
    </main>
  )
}
