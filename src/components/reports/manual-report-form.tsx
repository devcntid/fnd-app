'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

interface FormData {
  donaturName: string
  donaturHp: string
  donaturAddress: string
  akadProgram: string
  donationAmount: string
  transactionTime: string
  nextVisitSchedule: string
  nextVisitDate: string
}

interface ManualReportFormProps {
  onSubmit: (data: FormData) => void
}

export function ManualReportForm({ onSubmit }: ManualReportFormProps) {
  const [formData, setFormData] = useState({
    donaturName: '',
    donaturHp: '',
    donaturAddress: '',
    akadProgram: '',
    donationAmount: '',
    transactionTime: '',
    nextVisitSchedule: 'none',
    nextVisitDate: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleSetCurrentTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    setFormData(prev => ({
      ...prev,
      transactionTime: now.toISOString().slice(0, 16)
    }))
  }

  return (
    <Card className="w-full bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800">
          Laporan Kunjungan Donatur
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="donatur-name"
            placeholder="Nama Donatur"
            value={formData.donaturName}
            onChange={(e) => setFormData(prev => ({ ...prev, donaturName: e.target.value }))}
            required
          />
          <Input
            type="tel"
            name="donatur-hp"
            placeholder="Nomer HP"
            value={formData.donaturHp}
            onChange={(e) => setFormData(prev => ({ ...prev, donaturHp: e.target.value }))}
          />
          <Textarea
            name="donatur-address"
            rows={2}
            placeholder="Alamat"
            value={formData.donaturAddress}
            onChange={(e) => setFormData(prev => ({ ...prev, donaturAddress: e.target.value }))}
          />
          <Input
            type="text"
            name="akad-program"
            placeholder="Akad Program"
            value={formData.akadProgram}
            onChange={(e) => setFormData(prev => ({ ...prev, akadProgram: e.target.value }))}
            required
          />
          <Input
            type="number"
            name="donation-amount"
            placeholder="Nominal Donasi"
            value={formData.donationAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, donationAmount: e.target.value }))}
            required
          />
          <div>
            <label htmlFor="transaction-time" className="text-sm font-medium text-gray-600">
              Waktu Transaksi
            </label>
            <Input
              type="datetime-local"
              id="transaction-time"
              name="transaction-time"
              value={formData.transactionTime}
              onChange={(e) => setFormData(prev => ({ ...prev, transactionTime: e.target.value }))}
              className="mt-1"
            />
            <Button
              type="button"
              onClick={handleSetCurrentTime}
              className="text-xs text-blue-600 hover:underline mt-1 p-0 h-auto"
              variant="ghost"
            >
              Gunakan waktu sekarang
            </Button>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-2">
            <label htmlFor="next-visit-schedule" className="text-sm font-medium text-gray-600">
              Jadwal Kunjungan Berikutnya
            </label>
            <Select
              id="next-visit-schedule"
              name="next-visit-schedule"
              value={formData.nextVisitSchedule}
              onChange={(e) => setFormData(prev => ({ ...prev, nextVisitSchedule: e.target.value }))}
              className="mt-1"
            >
              <option value="none">Tidak Ada</option>
              <option value="weekly">Rutin Pekanan</option>
              <option value="monthly">Rutin Bulanan</option>
              <option value="custom">Pilih Tanggal</option>
            </Select>
            {formData.nextVisitSchedule === 'custom' && (
              <Input
                type="date"
                id="next-visit-date"
                name="next-visit-date"
                value={formData.nextVisitDate}
                onChange={(e) => setFormData(prev => ({ ...prev, nextVisitDate: e.target.value }))}
                className="mt-2"
              />
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-br from-amber-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-2.5 rounded-lg"
          >
            Simpan Laporan
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}


