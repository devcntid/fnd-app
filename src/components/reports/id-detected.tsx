'use client'

import { useState } from 'react'
import { AppWrapper } from '@/components/layout/app-wrapper'
import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { X } from 'lucide-react'
import Image from 'next/image'

interface IdDetectedProps {
  scannedData: {
    id: string
    name: string
    phone: string
    address: string
    cabang: string
    tgl_registrasi: string
    type: 'kencleng' | 'kalimat'
  }
  onClose: () => void
  onSave: (data: {
    name: string
    phone: string
    address: string
    cabang: string
    tgl_registrasi: string
    nextVisit: string
    customDate: string
  }) => void
  onJemput: (data: {
    name: string
    phone: string
    address: string
    cabang: string
    tgl_registrasi: string
    nextVisit: string
    customDate: string
  }) => void
}

export function IdDetected({ scannedData, onClose, onSave, onJemput }: IdDetectedProps) {
  const [formData, setFormData] = useState({
    name: scannedData.name,
    phone: scannedData.phone,
    address: scannedData.address,
    cabang: scannedData.cabang,
    tgl_registrasi: scannedData.tgl_registrasi,
    nextVisit: 'pekanan',
    customDate: ''
  })

  const handleSave = () => {
    onSave(formData)
  }

  const handleJemput = () => {
    onJemput(formData)
  }

  const getVisualImage = () => {
    return scannedData.type === 'kencleng' 
      ? 'https://i.imgur.com/P2f48pI.png'
      : 'https://i.imgur.com/gsOAYkU.png'
  }

  const getLabel = () => {
    return scannedData.type === 'kencleng' ? 'Kencleng' : 'Kotak Kalimat'
  }

  return (
    <AppWrapper>
      <Header 
        notificationCount={4}
        onSearch={() => {}}
        onNotificationClick={() => {}}
      />
      <main className="p-4 space-y-5 bg-white overflow-y-auto">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-2xl font-bold text-gray-800">ID Terdeteksi</h2>
          <Button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            variant="ghost"
            size="icon"
          >
            <X className="w-6 h-6 text-gray-500" />
          </Button>
        </div>

        <div className="text-center">
          <Image 
            src={getVisualImage()}
            alt="Visual Donasi" 
            width={288}
            height={288}
            className="h-72 mx-auto float-animation"
          />
          <p className="text-xl font-bold text-gray-800 mt-2 mb-4">
            {getLabel()}
          </p>
          
          <Card className="text-left">
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">ID Kencleng/Kalimat</label>
                <p className="font-semibold text-gray-800 text-lg">{scannedData.id}</p>
              </div>
              
              <div>
                <label htmlFor="detected-item-branch" className="text-sm font-medium text-gray-600">
                  Cabang
                </label>
                <Select
                  id="detected-item-branch"
                  value={formData.cabang}
                  onChange={(e) => setFormData(prev => ({ ...prev, cabang: e.target.value }))}
                  className="w-full p-2 rounded-md border border-gray-300 text-sm mt-1"
                >
                  <option value="DT Peduli Bandung">DT Peduli Bandung</option>
                  <option value="DT Peduli Jakarta">DT Peduli Jakarta</option>
                  <option value="DT Peduli Surabaya">DT Peduli Surabaya</option>
                  <option value="DT Peduli Nasional">DT Peduli Nasional</option>
                </Select>
              </div>
              
              <div>
                <label htmlFor="detected-item-regdate" className="text-sm font-medium text-gray-600">
                  Tanggal Registrasi
                </label>
                <Input
                  type="date"
                  id="detected-item-regdate"
                  value={formData.tgl_registrasi}
                  onChange={(e) => setFormData(prev => ({ ...prev, tgl_registrasi: e.target.value }))}
                  className="w-full p-2 rounded-md border border-gray-300 text-sm mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="detected-item-name" className="text-sm font-medium text-gray-600">
                  Nama Donatur/Tempat
                </label>
                <Input
                  type="text"
                  id="detected-item-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 rounded-md border border-gray-300 text-sm mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="detected-item-phone" className="text-sm font-medium text-gray-600">
                  No. HP
                </label>
                <Input
                  type="tel"
                  id="detected-item-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-2 border border-gray-300 text-sm mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="detected-item-address" className="text-sm font-medium text-gray-600">
                  Alamat
                </label>
                <Textarea
                  id="detected-item-address"
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-2 rounded-md border border-gray-300 text-sm mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="detected-item-next-visit" className="text-sm font-medium text-gray-600">
                  Jadwal Penjemputan Berikutnya
                </label>
                <Select
                  id="detected-item-next-visit"
                  value={formData.nextVisit}
                  onChange={(e) => setFormData(prev => ({ ...prev, nextVisit: e.target.value }))}
                  className="w-full p-2 rounded-md border border-gray-300 text-sm mt-1"
                >
                  <option value="pekanan">Pekanan</option>
                  <option value="bulanan">Bulanan</option>
                  <option value="custom">Pilih Tanggal</option>
                </Select>
                {formData.nextVisit === 'custom' && (
                  <Input
                    type="date"
                    id="detected-item-custom-date"
                    value={formData.customDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, customDate: e.target.value }))}
                    className="hidden mt-2 w-full p-2 rounded-md border border-gray-300 text-sm"
                  />
                )}
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
                >
                  Simpan
                </Button>
                <Button
                  onClick={handleJemput}
                  className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold py-3 rounded-lg"
                >
                  Jemput
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Navigation
        currentPage="id-terdeteksi"
        onPageChange={() => {}}
        onQuickReportClick={() => {}}
      />
    </AppWrapper>
  )
}


