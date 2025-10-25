'use client'

import { useState, useEffect } from 'react'
import {
  Download,
  CheckSquare,
  Calendar,
  MapPin,
  Users,
  Plus,
  Edit,
  Trash2,
} from 'lucide-react'

interface Event {
  id: number
  nama: string
  tgl_event: string
  target_peserta: number
  flyer: string
  lokasi: string
  file_proposal: string
  jenis_event: string
  kota: string
  id_program: number
  nominal_donasi: number
  realisasi_peserta: number
  lead: number
  evaluasi: string | null
  created_at: string
  updated_at: string
  status: 'upcoming' | 'done'
}

export function EventManagement() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showRealisasiForm, setShowRealisasiForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null)
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null)
  const [eventToRealisasi, setEventToRealisasi] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    nominalDonasi: '',
    realisasiPeserta: '',
    lead: '',
    evaluasi: '',
  })
  const [addFormData, setAddFormData] = useState({
    nama: '',
    tgl_event: '',
    target_peserta: '',
    lokasi: '',
    kota: '',
    jenis_event: '',
    file_proposal: '',
    flyer: '',
  })
  const [editFormData, setEditFormData] = useState({
    nama: '',
    tgl_event: '',
    target_peserta: '',
    lokasi: '',
    kota: '',
    jenis_event: '',
    file_proposal: '',
    flyer: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentUpcomingPage, setCurrentUpcomingPage] = useState(1)
  const [hasMoreUpcoming, setHasMoreUpcoming] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async (
    upcomingPage = 1,
    donePage = 1,
    appendUpcoming = false,
    appendDone = false
  ) => {
    try {
      if (appendUpcoming) {
        // Only fetch upcoming events when appending
        const upcomingResponse = await fetch(
          `/api/events?status=upcoming&page=${upcomingPage}&limit=2`
        )
        const upcomingResult = await upcomingResponse.json()

        if (upcomingResult.success) {
          setEvents((prev) => [...prev, ...upcomingResult.data])
          setHasMoreUpcoming(upcomingResult.pagination?.hasMore || false)
          setCurrentUpcomingPage(upcomingPage)
        }
      } else if (appendDone) {
        // Only fetch completed events when appending
        const completedResponse = await fetch(
          `/api/events?status=done&page=${donePage}&limit=2`
        )
        const completedResult = await completedResponse.json()

        if (completedResult.success) {
          setEvents((prev) => [...prev, ...completedResult.data])
          setHasMore(completedResult.pagination?.hasMore || false)
          setCurrentPage(donePage)
        }
      } else {
        // Fetch both upcoming and completed events
        const upcomingResponse = await fetch(
          `/api/events?status=upcoming&page=${upcomingPage}&limit=2`
        )
        const upcomingResult = await upcomingResponse.json()

        const completedResponse = await fetch(
          `/api/events?status=done&page=${donePage}&limit=2`
        )
        const completedResult = await completedResponse.json()

        if (upcomingResult.success && completedResult.success) {
          const allEvents = [...upcomingResult.data, ...completedResult.data]
          setEvents(allEvents)
          setHasMoreUpcoming(upcomingResult.pagination?.hasMore || false)
          setHasMore(completedResult.pagination?.hasMore || false)
          setCurrentUpcomingPage(upcomingPage)
          setCurrentPage(donePage)
        }
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMoreUpcoming = () => {
    if (!loadingMore && hasMoreUpcoming) {
      setLoadingMore(true)
      fetchEvents(currentUpcomingPage + 1, currentPage, true, false)
    }
  }

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true)
      fetchEvents(currentUpcomingPage, currentPage + 1, false, true)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatNumber = (value: string | number) => {
    const num = typeof value === 'string' ? parseInt(value) || 0 : value
    return new Intl.NumberFormat('id-ID').format(num)
  }

  const parseNumber = (value: string) => {
    return value.replace(/[^\d]/g, '')
  }

  const handleDownloadProposal = (event: Event) => {
    if (event.file_proposal) {
      window.open(event.file_proposal, '_blank')
    }
  }

  const handleInputRealisasi = (event: Event) => {
    // Hide other forms first
    setShowAddForm(false)
    setShowEditForm(false)
    setEventToEdit(null)

    setEventToRealisasi(event)
    setFormData({
      nominalDonasi: event.nominal_donasi.toString(),
      realisasiPeserta: event.realisasi_peserta.toString(),
      lead: event.lead.toString(),
      evaluasi: event.evaluasi || '',
    })
    setShowRealisasiForm(true)

    // Auto scroll ke bawah setelah form muncul
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }

  const handleAddEvent = () => {
    // Hide other forms first
    setShowEditForm(false)
    setShowRealisasiForm(false)
    setEventToEdit(null)
    setEventToRealisasi(null)

    setShowAddForm(true)

    // Auto scroll ke bawah setelah form muncul
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }

  const handleEditEvent = (event: Event) => {
    // Hide other forms first
    setShowAddForm(false)
    setShowRealisasiForm(false)
    setEventToRealisasi(null)

    setEventToEdit(event)
    setEditFormData({
      nama: event.nama || '',
      tgl_event: event.tgl_event ? event.tgl_event.split('T')[0] : '',
      target_peserta: event.target_peserta?.toString() || '',
      lokasi: event.lokasi || '',
      kota: event.kota || '',
      jenis_event: event.jenis_event || '',
      file_proposal: event.file_proposal || '',
      flyer: event.flyer || '',
    })
    setShowEditForm(true)

    // Auto scroll ke bawah setelah form muncul
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }, 100)
  }

  const handleDeleteEvent = (event: Event) => {
    setEventToDelete(event)
    setShowDeleteConfirm(true)
  }

  const handleAddEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: addFormData.nama,
          tgl_event: addFormData.tgl_event,
          target_peserta: parseInt(addFormData.target_peserta) || 0,
          lokasi: addFormData.lokasi,
          kota: addFormData.kota,
          jenis_event: addFormData.jenis_event,
          file_proposal: addFormData.file_proposal,
          flyer: addFormData.flyer,
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Refresh events list
        fetchEvents(1, 1, false, false)
        setShowAddForm(false)
        setAddFormData({
          nama: '',
          tgl_event: '',
          target_peserta: '',
          lokasi: '',
          kota: '',
          jenis_event: '',
          file_proposal: '',
          flyer: '',
        })
      }
    } catch (error) {
      console.error('Error creating event:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventToEdit) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/events/${eventToEdit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: editFormData.nama,
          tgl_event: editFormData.tgl_event,
          target_peserta: parseInt(editFormData.target_peserta) || 0,
          lokasi: editFormData.lokasi,
          kota: editFormData.kota,
          jenis_event: editFormData.jenis_event,
          file_proposal: editFormData.file_proposal,
          flyer: editFormData.flyer,
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Refresh events list
        fetchEvents(1, 1, false, false)
        setShowEditForm(false)
        setEventToEdit(null)
      }
    } catch (error) {
      console.error('Error updating event:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/events/${eventToDelete.id}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      if (result.success) {
        // Refresh events list
        fetchEvents(1, 1, false, false)
        setShowDeleteConfirm(false)
        setEventToDelete(null)
      }
    } catch (error) {
      console.error('Error deleting event:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!eventToRealisasi) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/events/${eventToRealisasi.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nominalDonasi: parseInt(formData.nominalDonasi) || 0,
          realisasiPeserta: parseInt(formData.realisasiPeserta) || 0,
          lead: parseInt(formData.lead) || 0,
          evaluasi: formData.evaluasi || null,
        }),
      })

      const result = await response.json()
      if (result.success) {
        // Refresh events list
        fetchEvents(1, 1, false, false)
        setShowRealisasiForm(false)
        setEventToRealisasi(null)
      }
    } catch (error) {
      console.error('Error updating realisasi:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const upcomingEvents = events.filter((e) => e.status === 'upcoming')
  const completedEvents = events.filter((e) => e.status === 'done')

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <p className="text-gray-600">Memuat data event...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header dengan tombol Add New Event */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-gray-800">
            Manajemen Event
          </h3>
          <button
            onClick={handleAddEvent}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Baru
          </button>
        </div>
      </div>

      {/* Akan Datang Section */}
      {upcomingEvents.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">
            Akan Datang
          </h3>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDownloadProposal={handleDownloadProposal}
                onInputRealisasi={handleInputRealisasi}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            ))}
          </div>

          {/* Load More Button untuk events akan datang */}
          {hasMoreUpcoming && (
            <div className="text-center mt-6">
              <button
                onClick={loadMoreUpcoming}
                disabled={loadingMore}
                className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm border border-gray-200"
              >
                {loadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    Memuat...
                  </div>
                ) : (
                  'Muat Lebih Banyak'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Selesai Section */}
      {completedEvents.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Selesai</h3>
          <div className="space-y-4">
            {completedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDownloadProposal={handleDownloadProposal}
                onInputRealisasi={handleInputRealisasi}
                onEditEvent={handleEditEvent}
                onDeleteEvent={handleDeleteEvent}
              />
            ))}
          </div>

          {/* Load More Button untuk events selesai */}
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm border border-gray-200"
              >
                {loadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                    Memuat...
                  </div>
                ) : (
                  'Muat Lebih Banyak'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {events.length === 0 && !loading && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 mb-2">Belum ada event yang tersedia</p>
            <p className="text-sm text-gray-500">
              Event akan muncul setelah ditambahkan ke sistem
            </p>
          </div>
        </div>
      )}

      {/* Form Event Baru */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Form Event Baru</h3>
            <button
              onClick={() => {
                setShowAddForm(false)
                setAddFormData({
                  nama: '',
                  tgl_event: '',
                  target_peserta: '',
                  lokasi: '',
                  kota: '',
                  jenis_event: '',
                  file_proposal: '',
                  flyer: '',
                })
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              × Tutup
            </button>
          </div>

          <form onSubmit={handleAddEventSubmit} className="space-y-4">
            {/* Nama Event */}
            <div>
              <input
                type="text"
                title="Nama Event"
                value={addFormData.nama}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, nama: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Nama Event"
                required
              />
            </div>

            {/* Tanggal Event */}
            <div className="relative">
              <input
                type="date"
                title="Tanggal Event"
                value={addFormData.tgl_event}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, tgl_event: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
              <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Jenis Event */}
            <div>
              <select
                title="Pilih Jenis Event"
                value={addFormData.jenis_event}
                onChange={(e) =>
                  setAddFormData({
                    ...addFormData,
                    jenis_event: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg appearance-none bg-white"
              >
                <option value="">Pilih Jenis Event</option>
                <option value="Program Donasi">Program Donasi</option>
                <option value="Sosial">Sosial</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Bencana">Bencana</option>
              </select>
            </div>

            {/* Lokasi */}
            <div>
              <input
                type="text"
                value={addFormData.lokasi}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, lokasi: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Lokasi"
              />
            </div>

            {/* Kota */}
            <div>
              <input
                type="text"
                value={addFormData.kota}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, kota: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Kota"
              />
            </div>

            {/* Target Peserta */}
            <div>
              <input
                type="text"
                title="Target Peserta"
                value={formatNumber(addFormData.target_peserta)}
                onChange={(e) => {
                  const cleanValue = parseNumber(e.target.value)
                  setAddFormData({
                    ...addFormData,
                    target_peserta: cleanValue,
                  })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-right"
                placeholder="Target Peserta"
              />
            </div>

            {/* Upload Proposal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Proposal
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Choose File
                </button>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <input
                type="url"
                value={addFormData.file_proposal}
                onChange={(e) =>
                  setAddFormData({
                    ...addFormData,
                    file_proposal: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mt-2"
                placeholder="Atau masukkan URL file proposal"
              />
            </div>

            {/* Upload Poster */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Poster
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Choose File
                </button>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <input
                type="url"
                value={addFormData.flyer}
                onChange={(e) =>
                  setAddFormData({ ...addFormData, flyer: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mt-2"
                placeholder="Atau masukkan URL poster"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl text-lg font-semibold transition-colors"
              >
                {submitting ? 'Menyimpan...' : 'Simpan Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Input Realisasi Form */}
      {showRealisasiForm && eventToRealisasi && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Input Realisasi</h3>
            <button
              onClick={() => {
                setShowRealisasiForm(false)
                setEventToRealisasi(null)
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              × Tutup
            </button>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">
              {eventToRealisasi.nama}
            </h4>
            <p className="text-sm text-gray-600">
              {formatDate(eventToRealisasi.tgl_event)} •{' '}
              {eventToRealisasi.lokasi}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Donasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donasi (Rp)
              </label>
              <input
                type="text"
                title="Nominal Donasi"
                value={formatNumber(formData.nominalDonasi)}
                onChange={(e) => {
                  const cleanValue = parseNumber(e.target.value)
                  setFormData({ ...formData, nominalDonasi: cleanValue })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-right"
                placeholder="Masukkan nominal donasi"
              />
            </div>

            {/* Peserta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peserta
              </label>
              <input
                type="text"
                title="Jumlah Peserta"
                value={formatNumber(formData.realisasiPeserta)}
                onChange={(e) => {
                  const cleanValue = parseNumber(e.target.value)
                  setFormData({ ...formData, realisasiPeserta: cleanValue })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-right"
                placeholder="Masukkan jumlah peserta"
              />
            </div>

            {/* Lead */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lead
              </label>
              <input
                type="text"
                title="Jumlah Lead"
                value={formatNumber(formData.lead)}
                onChange={(e) => {
                  const cleanValue = parseNumber(e.target.value)
                  setFormData({ ...formData, lead: cleanValue })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-right"
                placeholder="Masukkan jumlah lead"
              />
            </div>

            {/* Evaluasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluasi
              </label>
              <textarea
                title="Evaluasi Event"
                value={formData.evaluasi}
                onChange={(e) =>
                  setFormData({ ...formData, evaluasi: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                rows={3}
                placeholder="Masukkan evaluasi event"
              />
              <p className="text-xs text-gray-500 mt-1">
                Masukkan evaluasi dan pembelajaran dari event ini
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl text-lg font-semibold transition-colors"
              >
                {submitting ? 'Menyimpan...' : 'Simpan Realisasi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditForm && eventToEdit && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Edit Event</h3>
            <button
              onClick={() => {
                setShowEditForm(false)
                setEventToEdit(null)
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              × Tutup
            </button>
          </div>

          <form onSubmit={handleEditEventSubmit} className="space-y-4">
            {/* Nama Event */}
            <div>
              <input
                type="text"
                title="Nama Event"
                value={editFormData.nama}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, nama: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Nama Event"
                required
              />
            </div>

            {/* Tanggal Event */}
            <div className="relative">
              <input
                type="date"
                title="Tanggal Event"
                value={editFormData.tgl_event}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    tgl_event: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                required
              />
              <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Jenis Event */}
            <div>
              <select
                title="Pilih Jenis Event"
                value={editFormData.jenis_event}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    jenis_event: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg appearance-none bg-white"
              >
                <option value="">Pilih Jenis Event</option>
                <option value="Program Donasi">Program Donasi</option>
                <option value="Sosial">Sosial</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Bencana">Bencana</option>
              </select>
            </div>

            {/* Lokasi */}
            <div>
              <input
                type="text"
                value={editFormData.lokasi}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, lokasi: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Lokasi"
              />
            </div>

            {/* Kota */}
            <div>
              <input
                type="text"
                value={editFormData.kota}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, kota: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                placeholder="Kota"
              />
            </div>

            {/* Target Peserta */}
            <div>
              <input
                type="text"
                title="Target Peserta"
                value={formatNumber(editFormData.target_peserta)}
                onChange={(e) => {
                  const cleanValue = parseNumber(e.target.value)
                  setEditFormData({
                    ...editFormData,
                    target_peserta: cleanValue,
                  })
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-right"
                placeholder="Target Peserta"
              />
            </div>

            {/* Upload Proposal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Proposal
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Choose File
                </button>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <input
                type="url"
                value={editFormData.file_proposal}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    file_proposal: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mt-2"
                placeholder="Atau masukkan URL file proposal"
              />
            </div>

            {/* Upload Poster */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Poster
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Choose File
                </button>
                <span className="text-gray-500">No file chosen</span>
              </div>
              <input
                type="url"
                value={editFormData.flyer}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, flyer: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg mt-2"
                placeholder="Atau masukkan URL poster"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl text-lg font-semibold transition-colors"
              >
                {submitting ? 'Menyimpan...' : 'Update Event'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && eventToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 pt-20 pb-24 z-[9999]">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Konfirmasi Hapus Event
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Apakah Anda yakin ingin menghapus event &quot;
                {eventToDelete.nama}&quot;? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setEventToDelete(null)
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Menghapus...' : 'Hapus Event'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EventCard({
  event,
  onDownloadProposal,
  onInputRealisasi,
  onEditEvent,
  onDeleteEvent,
}: {
  event: Event
  onDownloadProposal: (event: Event) => void
  onInputRealisasi: (event: Event) => void
  onEditEvent: (event: Event) => void
  onDeleteEvent: (event: Event) => void
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatNumber = (value: string | number) => {
    const num = typeof value === 'string' ? parseInt(value) || 0 : value
    return new Intl.NumberFormat('id-ID').format(num)
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      {/* Status Badge */}
      <div className="flex justify-end mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.status === 'upcoming'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {event.status === 'upcoming' ? 'Segera' : 'Selesai'}
        </span>
      </div>

      {/* Event Poster */}
      <div className="bg-blue-600 rounded-lg p-8 mb-4 text-center">
        {event.flyer ? (
          <img
            src={event.flyer}
            alt={`Poster ${event.nama}`}
            className="w-full h-32 object-cover rounded-lg"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
              const nextElement = target.nextElementSibling as HTMLElement
              if (nextElement) {
                nextElement.style.display = 'block'
              }
            }}
          />
        ) : null}
        <div
          className={`text-white font-medium ${
            event.flyer ? 'hidden' : 'block'
          }`}
        >
          Poster Event
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <h4 className="font-bold text-gray-800">{event.nama}</h4>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.tgl_event)}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Lokasi: {event.lokasi}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>
            Target Peserta:{' '}
            <span className="text-blue-600 font-medium">
              {formatNumber(event.target_peserta)} Orang
            </span>
          </span>
        </div>

        {/* Hasil Pelaksanaan for completed events */}
        {event.status === 'done' && (
          <div className="mt-3 p-3 bg-white rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">
              Hasil Pelaksanaan:
            </h5>
            <div className="space-y-1 text-sm">
              <div>
                Donasi:{' '}
                <span className="text-orange-600 font-medium">
                  Rp {formatNumber(event.nominal_donasi)}
                </span>
              </div>
              <div>
                Peserta:{' '}
                <span className="text-gray-700">
                  {formatNumber(event.realisasi_peserta)}
                </span>
              </div>
              <div>
                Lead:{' '}
                <span className="text-gray-700">
                  {formatNumber(event.lead)}
                </span>
              </div>
            </div>

            <div className="mt-2">
              <h6 className="font-semibold text-gray-800 mb-1">Evaluasi:</h6>
              <p className="text-sm text-gray-600">
                {event.evaluasi || 'Belum ada evaluasi.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-4">
        {/* Primary Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onDownloadProposal(event)}
            disabled={!event.file_proposal}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Unduh Proposal
          </button>

          {event.status === 'done' && (
            <button
              onClick={() => onInputRealisasi(event)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              Input Realisasi
            </button>
          )}
        </div>

        {/* Edit & Delete Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEditEvent(event)}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm flex items-center justify-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Event
          </button>
          <button
            onClick={() => onDeleteEvent(event)}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Hapus Event
          </button>
        </div>
      </div>
    </div>
  )
}
