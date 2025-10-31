'use client'

import { useEffect, useRef, useState } from 'react'
import { AppWrapper } from '@/components/layout/app-wrapper'
import { Navigation } from '@/components/layout/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Search,
  FileSpreadsheet,
  ShieldCheck,
  ChevronRight,
  Heart,
  Circle,
} from 'lucide-react'
import { formatDate, formatCurrencyFull } from '@/lib/utils'

type DonorItem = {
  idDonatur: string
  donatur: string
  idJenis: number
  hp: string | null
  telpon: string
  tglReg: string | null
}

type PosterItem = {
  id: number
  nama: string | null
  fileUrl: string | null
  tipe: string | null
  createdAt: string | null
}

export default function LaporanDonaturPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [idJenis, setIdJenis] = useState<string>('all')

  const formatDateShort = (date: string) => {
    try {
      const d = new Date(date)
      return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return '-'
    }
  }

  // donors state
  const [donors, setDonors] = useState<DonorItem[]>([])
  const [donorPage, setDonorPage] = useState(1)
  const [donorHasMore, setDonorHasMore] = useState(true)
  const [donorTotal, setDonorTotal] = useState(0)
  const donorLoadingRef = useRef(false)
  const donorAbortRef = useRef<AbortController | null>(null)

  // posters state
  const [posters, setPosters] = useState<PosterItem[]>([])
  const [posterPage, setPosterPage] = useState(1)
  const [posterHasMore, setPosterHasMore] = useState(true)
  const posterLoadingRef = useRef(false)

  const [showDetail, setShowDetail] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState<DonorItem | null>(null)
  const [selectedDonorTotal, setSelectedDonorTotal] = useState<number | null>(
    null
  )

  const normalizeWaNumber = (phone: string) => {
    const digits = (phone || '').replace(/\D/g, '')
    if (!digits) return ''
    if (digits.startsWith('62')) return digits
    if (digits.startsWith('0')) return `62${digits.slice(1)}`
    return digits
  }

  const jenisLabel: Record<string, string> = {
    '1': 'Perorangan',
    '2': 'Lembaga',
    '3': 'Perusahaan',
    '4': 'Kotak',
    '5': 'Kencleng',
    '6': 'Mitra Unggul',
    '7': 'Gerai',
    '8': 'MPZ',
    '9': 'Event',
  }

  const jenisBadgeClass = (idJenis: number) => {
    switch (String(idJenis)) {
      case '1':
        return 'bg-blue-100 text-blue-700'
      case '2':
        return 'bg-emerald-100 text-emerald-700'
      case '3':
        return 'bg-purple-100 text-purple-700'
      case '4':
        return 'bg-amber-100 text-amber-700'
      case '5':
        return 'bg-pink-100 text-pink-700'
      case '6':
        return 'bg-indigo-100 text-indigo-700'
      case '7':
        return 'bg-teal-100 text-teal-700'
      case '8':
        return 'bg-sky-100 text-sky-700'
      case '9':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  // no-op

  const handleBackClick = () => {
    window.history.back()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetAndLoadDonors({ search: searchQuery, idJenis })
  }

  const handleDonorSelect = (donor: DonorItem) => {
    setSelectedDonor(donor)
    setShowDetail(true)
    // fetch summary total transaksi approved=y
    ;(async () => {
      try {
        const res = await fetch(`/api/donatur/${donor.idDonatur}/summary`)
        const json = await res.json()
        if (json.success) {
          setSelectedDonorTotal(json.data?.totalTransaksi ?? 0)
        } else {
          setSelectedDonorTotal(0)
        }
      } catch {
        setSelectedDonorTotal(0)
      }
    })()
  }

  const handleBackToSearch = () => {
    setShowDetail(false)
    setSelectedDonor(null)
    setSelectedDonorTotal(null)
    setSearchQuery('')
  }

  const handleDownload = (type: string) => {
    console.log('Download:', type, selectedDonor)
  }

  const getPosterIcon = (type: string) => {
    switch (type) {
      case 'ramadhan':
        return <Heart className="w-5 h-5" />
      case 'qurban':
        return <Circle className="w-5 h-5" />
      default:
        return <Heart className="w-5 h-5" />
    }
  }

  const getPosterColor = (type: string) => {
    switch (type) {
      case 'ramadhan':
        return 'text-red-500'
      case 'qurban':
        return 'text-green-600'
      default:
        return 'text-gray-500'
    }
  }

  // fetch donors
  const loadDonors = async (opts?: {
    page?: number
    idJenis?: string
    search?: string
    force?: boolean
  }) => {
    if (donorLoadingRef.current) return
    if (!donorHasMore && !opts?.force) return
    donorLoadingRef.current = true
    try {
      // siapkan abort agar bisa cancel request berjalan
      donorAbortRef.current?.abort()
      const controller = new AbortController()
      donorAbortRef.current = controller

      const params = new URLSearchParams({
        page: String(opts?.page ?? donorPage),
        limit: '3',
      })
      const effectiveSearch = (opts?.search ?? searchQuery).trim()
      const effectiveJenis = opts?.idJenis ?? idJenis
      if (effectiveSearch) params.set('search', effectiveSearch)
      if (effectiveJenis && effectiveJenis !== 'all')
        params.set('id_jenis', effectiveJenis)

      const res = await fetch(`/api/donatur?${params.toString()}`, {
        signal: controller.signal,
      })
      const json = await res.json()
      if (json.success) {
        setDonors((prev) => [...prev, ...json.data])
        setDonorHasMore(json.pagination?.hasMore)
        setDonorTotal(json.pagination?.total || 0)
      }
    } catch (e) {
      console.error('loadDonors error', e)
    } finally {
      donorLoadingRef.current = false
    }
  }

  const resetAndLoadDonors = (overrides?: {
    idJenis?: string
    search?: string
  }) => {
    // batalkan request berjalan dan reset status loading
    try {
      donorAbortRef.current?.abort()
    } catch {}
    donorLoadingRef.current = false
    setDonors([])
    setDonorHasMore(true)
    setDonorPage(1)
    // fetch immediately with overrides
    loadDonors({
      page: 1,
      idJenis: overrides?.idJenis,
      search: overrides?.search,
      force: true,
    })
  }

  useEffect(() => {
    // ketika donorPage berubah, load halaman berikutnya
    loadDonors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorPage])

  // Hilangkan auto-fetch saat mengetik untuk mencegah spam; fetch terjadi saat submit atau ubah kategori

  // posters fetch
  const loadPosters = async () => {
    if (posterLoadingRef.current || !posterHasMore) return
    posterLoadingRef.current = true
    try {
      const params = new URLSearchParams({
        page: String(posterPage),
        limit: '10',
        tipe: 'laporan',
      })
      const res = await fetch(`/api/marketing-tools?${params.toString()}`)
      const json = await res.json()
      if (json.success) {
        setPosters((prev) => [...prev, ...json.data])
        setPosterHasMore(json.pagination?.hasMore)
      }
    } catch (e) {
      console.error('loadPosters error', e)
    } finally {
      posterLoadingRef.current = false
    }
  }

  useEffect(() => {
    loadPosters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posterPage])

  // Infinite scroll poster dinonaktifkan: gunakan tombol "Muat Lebih Banyak Laporan"

  return (
    <AppWrapper>
      <main className="p-4 space-y-5">
        <div className="flex items-center gap-4 text-white">
          <Button
            onClick={handleBackClick}
            className="p-1 -ml-1 text-white hover:bg-white/10"
            variant="ghost"
            size="icon"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl font-bold">Laporan ke Donatur</h2>
        </div>

        {!showDetail && (
          <div>
            {/* Search Card */}
            <Card className="bg-white rounded-xl shadow">
              <CardHeader>
                <CardTitle className="font-semibold text-lg text-gray-800">
                  Cari Donatur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Nama / No. HP / ID Donatur"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    size="icon"
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      setIdJenis('all')
                      resetAndLoadDonors({ search: '', idJenis: 'all' })
                    }}
                    className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                  >
                    Reset
                  </Button>
                </form>

                {/* Filter kategori id_jenis dan total donatur */}
                <div className="mt-3 flex items-center gap-3">
                  <Select
                    value={idJenis}
                    onChange={(e) => {
                      const v = e.target.value
                      setIdJenis(v)
                      resetAndLoadDonors({ idJenis: v, search: searchQuery })
                    }}
                    className="w-40"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="1">Perorangan</option>
                    <option value="2">Lembaga</option>
                    <option value="3">Perusahaan</option>
                    <option value="4">Kotak</option>
                    <option value="5">Kencleng</option>
                    <option value="6">Mitra Unggul</option>
                    <option value="7">Gerai</option>
                    <option value="8">MPZ</option>
                    <option value="9">Event</option>
                  </Select>
                  <span className="text-sm text-gray-600">
                    Total Donatur:{' '}
                    <span className="font-semibold text-gray-800">
                      {donorTotal}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Donor Results with Load More */}
            <div className="mt-4 space-y-3">
              {donors.map((donor, idx) => (
                <Card
                  key={donor.idDonatur}
                  className="bg-white/90 border border-gray-100 hover:shadow-sm transition-shadow rounded-xl"
                >
                  <CardContent className="p-3">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleDonorSelect(donor)}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <Badge
                          variant="outline"
                          className="min-w-6 h-6 px-2 py-0.5 rounded-full text-xs flex items-center justify-center"
                        >
                          {idx + 1}
                        </Badge>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {donor.donatur}
                          </p>
                          <div className="flex justify-between items-start gap-3 mt-0.5">
                            {/* Kiri: ID dan Reg */}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-600 truncate">
                                {donor.idDonatur}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                Reg :{' '}
                                {donor.tglReg
                                  ? formatDateShort(donor.tglReg)
                                  : '-'}
                              </p>
                            </div>
                            {/* Kanan: Badge kategori dan No HP */}
                            <div className="flex flex-col items-end gap-1">
                              <Badge
                                variant="secondary"
                                className={`px-2 py-0.5 rounded-full text-[10px] ${jenisBadgeClass(
                                  donor.idJenis
                                )}`}
                              >
                                {jenisLabel[String(donor.idJenis)] ||
                                  `Jenis ${donor.idJenis}`}
                              </Badge>
                              <p className="text-xs text-gray-600">
                                {donor.hp || donor.telpon || '-'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {donorHasMore && (
                <div className="pt-1">
                  <Button
                    onClick={() => setDonorPage((p) => p + 1)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    Muat Lebih Banyak Donatur
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {showDetail && selectedDonor && (
          <div>
            {/* Detail Card */}
            <Card className="bg-white rounded-xl shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-semibold text-lg text-gray-800">
                    Laporan untuk {selectedDonor.donatur}
                  </CardTitle>
                  <Button
                    onClick={handleBackToSearch}
                    className="text-sm text-blue-600 hover:underline"
                    variant="ghost"
                  >
                    Kembali
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Ringkasan Donatur */}
                <div className="rounded-lg bg-gray-50 p-3 border border-gray-100">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800">
                        {selectedDonor.donatur}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">
                        {selectedDonor.idDonatur}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Reg :{' '}
                        {selectedDonor.tglReg
                          ? formatDateShort(selectedDonor.tglReg)
                          : '-'}
                      </p>
                      {selectedDonorTotal !== null && (
                        <p className="text-xs text-gray-700 mt-1">
                          Total Transaksi (approved):{' '}
                          <span className="font-semibold">
                            {formatCurrencyFull(selectedDonorTotal)}
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="secondary"
                        className={`px-2 py-0.5 rounded-full text-[10px] ${jenisBadgeClass(
                          selectedDonor.idJenis
                        )}`}
                      >
                        {jenisLabel[String(selectedDonor.idJenis)] ||
                          `Jenis ${selectedDonor.idJenis}`}
                      </Badge>
                      <a
                        className="text-xs text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={(() => {
                          const num = normalizeWaNumber(
                            selectedDonor.hp || selectedDonor.telpon || ''
                          )
                          return num ? `https://wa.me/${num}` : '#'
                        })()}
                      >
                        {selectedDonor.hp || selectedDonor.telpon || '-'}
                      </a>
                    </div>
                  </div>
                </div>
                {/* Filter */}
                <div className="flex gap-2">
                  <Select className="flex-grow bg-gray-100 p-2 rounded-md text-sm">
                    <option>Tahun 2025</option>
                    <option>Tahun 2024</option>
                  </Select>
                  <Select className="flex-grow bg-gray-100 p-2 rounded-md text-sm">
                    <option value="all">Semua Bulan</option>
                    <option value="7">Juli</option>
                    <option value="6">Juni</option>
                  </Select>
                </div>

                {/* Download Buttons */}
                <div className="space-y-3 pt-2">
                  <Button
                    onClick={() => handleDownload('transaction')}
                    className="w-full flex items-center justify-center gap-3 bg-green-500 text-white rounded-lg transition-all duration-200 shadow p-3 font-semibold hover:bg-green-600"
                  >
                    <FileSpreadsheet className="w-5 h-5" />
                    <span>Unduh Laporan Transaksi</span>
                  </Button>
                  <Button
                    onClick={() => handleDownload('zakat')}
                    className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white rounded-lg transition-all duration-200 shadow p-3 font-semibold hover:bg-blue-600"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span>Unduh Bukti Setor Zakat</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Digital Poster Section */}
        <Card className="bg-white rounded-xl shadow">
          <CardHeader>
            <CardTitle className="font-semibold text-lg text-gray-800">
              Digital Poster Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {posters.map((poster, idx) => (
                <div key={poster.id} className="bg-gray-50 rounded-lg p-2.5">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="min-w-6 h-6 px-2 py-0.5 rounded-full text-xs flex items-center justify-center"
                    >
                      {idx + 1}
                    </Badge>
                    <div className={getPosterColor(poster.tipe || '')}>
                      {getPosterIcon(poster.tipe || '')}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800 text-sm">
                        {poster.nama || 'Poster'}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Dirilis:{' '}
                        {poster.createdAt ? formatDate(poster.createdAt) : '-'}
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        window.open(poster.fileUrl || '#', '_blank')
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1.5 px-3 rounded-lg text-xs"
                      variant="ghost"
                    >
                      Unduh
                    </Button>
                  </div>
                </div>
              ))}
              {posterHasMore && (
                <div className="pt-1">
                  <Button
                    onClick={() => setPosterPage((p) => p + 1)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200"
                  >
                    Muat Lebih Banyak Laporan
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Navigation
        currentPage="laporan-donatur"
        onPageChange={() => {}}
        onQuickReportClick={() => {}}
      />
    </AppWrapper>
  )
}
