'use client'

import { useState, useEffect } from 'react'

interface MpzData {
  capaian: number
  kotakAktif: number
  sudahDijemput: number
  belumDijemput: number
}

interface LeaderboardItem {
  nama: string
  capaian: number
}

export function MpzSummary() {
  const [data, setData] = useState<MpzData | null>(null)
  const [loading, setLoading] = useState(true)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([])
  const [leaderboardLoading, setLeaderboardLoading] = useState(false)
  const [leaderboardPage, setLeaderboardPage] = useState(1)
  const [hasMoreLeaderboard, setHasMoreLeaderboard] = useState(true)

  // Initialize with default values to avoid hydration mismatch
  const [selectedYear, setSelectedYear] = useState<string>('2025')
  const [selectedMonth, setSelectedMonth] = useState<string>('1')
  const [selectedVerified, setSelectedVerified] =
    useState<string>('cash-unverified')

  // Leaderboard dropdowns (separate from summary)
  const [leaderboardYear, setLeaderboardYear] = useState<string>('2025')
  const [leaderboardMonth, setLeaderboardMonth] = useState<string>('1')
  const [leaderboardVerified, setLeaderboardVerified] =
    useState<string>('cash-unverified')

  // Set actual current year and month after mount to avoid hydration error
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    setSelectedYear(currentYear.toString())
    setSelectedMonth(currentMonth.toString())
    setLeaderboardYear(currentYear.toString())
    setLeaderboardMonth(currentMonth.toString())
  }, [])

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/mpz?tahun=${selectedYear}&bulan=${selectedMonth}&verified=${selectedVerified}`
        )
        const result = await response.json()

        if (result.success && isMounted) {
          setData(result.data)
        }
      } catch (error) {
        console.error('Error fetching MPZ data:', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    // Debounce the fetch to prevent rapid requests
    const timeoutId = setTimeout(() => {
      fetchData()
    }, 100)

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [selectedYear, selectedMonth, selectedVerified])

  useEffect(() => {
    let isMounted = true

    const fetchLeaderboard = async (page = 1, append = false) => {
      try {
        setLeaderboardLoading(true)
        const response = await fetch(
          `/api/mpz/leaderboard?tahun=${leaderboardYear}&bulan=${leaderboardMonth}&verified=${leaderboardVerified}&page=${page}&limit=5`
        )
        const result = await response.json()

        if (result.success && isMounted) {
          if (append) {
            setLeaderboardData((prev) => [...prev, ...result.data])
          } else {
            setLeaderboardData(result.data)
          }
          setHasMoreLeaderboard(result.pagination?.hasMore || false)
          setLeaderboardPage(page)
        }
      } catch (error) {
        console.error('Error fetching Leaderboard data:', error)
      } finally {
        if (isMounted) {
          setLeaderboardLoading(false)
        }
      }
    }

    fetchLeaderboard(1, false)

    return () => {
      isMounted = false
    }
  }, [leaderboardYear, leaderboardMonth, leaderboardVerified])

  const loadMoreLeaderboard = async () => {
    if (!leaderboardLoading && hasMoreLeaderboard) {
      try {
        setLeaderboardLoading(true)
        const response = await fetch(
          `/api/mpz/leaderboard?tahun=${leaderboardYear}&bulan=${leaderboardMonth}&verified=${leaderboardVerified}&page=${
            leaderboardPage + 1
          }&limit=5`
        )
        const result = await response.json()

        if (result.success) {
          setLeaderboardData((prev) => [...prev, ...result.data])
          setHasMoreLeaderboard(result.pagination?.hasMore || false)
          setLeaderboardPage(leaderboardPage + 1)
        }
      } catch (error) {
        console.error('Error fetching Leaderboard data:', error)
      } finally {
        setLeaderboardLoading(false)
      }
    }
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  // Generate year options (current year and 2 years back)
  const currentYear = parseInt(selectedYear) || new Date().getFullYear()
  const yearOptions = []
  for (let i = 0; i <= 2; i++) {
    yearOptions.push(currentYear - i)
  }

  // Generate month options
  const monthOptions = [
    { value: 'all', label: 'Semua' },
    { value: '1', label: 'Januari' },
    { value: '2', label: 'Februari' },
    { value: '3', label: 'Maret' },
    { value: '4', label: 'April' },
    { value: '5', label: 'Mei' },
    { value: '6', label: 'Juni' },
    { value: '7', label: 'Juli' },
    { value: '8', label: 'Agustus' },
    { value: '9', label: 'September' },
    { value: '10', label: 'Oktober' },
    { value: '11', label: 'November' },
    { value: '12', label: 'Desember' },
  ]

  const getMonthName = (monthValue: string) => {
    const month = monthOptions.find((m) => m.value === monthValue)
    return month ? month.label : ''
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="font-semibold text-lg text-gray-800">
            Ringkasan MPZ
          </h3>
          <div className="flex items-center gap-2">
            {/* Tahun dropdown */}
            <select
              title="Pilih Tahun"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
            >
              <option value="all">Semua Tahun</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Bulan dropdown */}
            <select
              title="Pilih Bulan"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            {/* Verified dropdown */}
            <select
              title="Pilih Status Verified"
              value={selectedVerified}
              onChange={(e) => setSelectedVerified(e.target.value)}
              className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
            >
              <option value="verified">Verified</option>
              <option value="cash-unverified">Cash Unverified</option>
              <option value="bank-unverified">Bank Unverified</option>
            </select>
          </div>
        </div>

        {/* Display selected period */}
        <div className="text-center text-xs text-gray-500 pb-2">
          Periode: {getMonthName(selectedMonth)} {selectedYear}
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600">
            Rp {formatNumber(data?.capaian || 0)}
          </p>
          <p className="text-sm font-semibold text-gray-600">
            Capaian MPZ
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center border-t border-gray-100 pt-4">
          <div>
            <p className="text-xl font-bold text-blue-600">
              {data?.kotakAktif || 0}
            </p>
            <p className="text-xs text-gray-600">Kotak Aktif</p>
          </div>
          <div>
            <p className="text-xl font-bold text-green-600">
              {data?.sudahDijemput || 0}
            </p>
            <p className="text-xs text-gray-600">Sudah Jemput</p>
          </div>
          <div>
            <p className="text-xl font-bold text-red-500">
              {data?.belumDijemput || 0}
            </p>
            <p className="text-xs text-gray-600">Belum Jemput</p>
          </div>
        </div>
      </div>

      {/* Leaderboard MPZ */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <h3 className="font-semibold text-lg text-gray-800">
            Leaderboard MPZ
          </h3>
          <div className="flex items-center gap-2">
            {/* Tahun dropdown untuk leaderboard */}
            <select
              title="Pilih Tahun untuk Leaderboard"
              value={leaderboardYear}
              onChange={(e) => setLeaderboardYear(e.target.value)}
              className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
            >
              <option value="all">Semua Tahun</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            {/* Bulan dropdown untuk leaderboard */}
            <select
              title="Pilih Bulan untuk Leaderboard"
              value={leaderboardMonth}
              onChange={(e) => setLeaderboardMonth(e.target.value)}
              className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
            >
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            {/* Verified dropdown untuk leaderboard */}
            <select
              title="Pilih Status Verified untuk Leaderboard"
              value={leaderboardVerified}
              onChange={(e) => setLeaderboardVerified(e.target.value)}
              className="bg-gray-100 border-gray-200 border text-gray-800 text-xs font-semibold p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[110px]"
            >
              <option value="verified">Verified</option>
              <option value="cash-unverified">Cash Unverified</option>
              <option value="bank-unverified">Bank Unverified</option>
            </select>
          </div>
        </div>
        <div className="space-y-4 mt-4">
          {leaderboardData.length > 0 ? (
            <>
              {leaderboardData.map((item, index) => (
                <div
                  key={`${item.nama}-${index}`}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {/* Ranking Badge */}
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>

                  {/* Nama Karyawan */}
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-700 text-sm whitespace-nowrap overflow-hidden text-ellipsis block">
                      {item.nama}
                    </span>
                  </div>

                  {/* Capaian */}
                  <div className="flex-shrink-0">
                    <span className="text-purple-600 font-semibold text-sm whitespace-nowrap">
                      Rp {formatNumber(item.capaian)}
                    </span>
                  </div>
                </div>
              ))}
              {hasMoreLeaderboard && (
                <div className="text-center pt-2">
                  <button
                    onClick={loadMoreLeaderboard}
                    disabled={leaderboardLoading}
                    className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm border border-gray-200"
                  >
                    {leaderboardLoading ? (
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
            </>
          ) : (
            <p className="text-center text-sm text-gray-600">
              Belum ada data untuk periode ini.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
