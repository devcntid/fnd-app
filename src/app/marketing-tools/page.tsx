'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Download,
  FileText,
  BookOpen,
  Calendar,
  Image,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface MarketingTool {
  id: number
  nama: string | null
  fileUrl: string | null
  tipe: string | null
  createdAt: string
  updatedAt: string
}

interface PaginationInfo {
  page: number
  limit: number
  total: number
  hasMore: boolean
  totalPages: number
}

export default function MarketingToolsPage() {
  const router = useRouter()
  const [marketingTools, setMarketingTools] = useState<MarketingTool[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)

  const fetchMarketingTools = async (
    page: number = 1,
    append: boolean = false
  ) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const response = await fetch(`/api/marketing-tools?page=${page}&limit=5`)
      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()

      if (append) {
        setMarketingTools((prev) => [...prev, ...data.data])
      } else {
        setMarketingTools(data.data || [])
      }

      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching marketing tools:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchMarketingTools(1, false)
  }, [])

  const loadMore = () => {
    if (pagination && pagination.hasMore && !loadingMore) {
      fetchMarketingTools(pagination.page + 1, true)
    }
  }

  const getIconForType = (tipe: string | null) => {
    switch (tipe?.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-6 h-6" />
      case 'video':
        return <Calendar className="w-6 h-6" />
      case 'gambar':
        return <Image className="w-6 h-6" aria-label="Gambar" />
      default:
        return <BookOpen className="w-6 h-6" />
    }
  }

  const getColorForType = (tipe: string | null) => {
    switch (tipe?.toLowerCase()) {
      case 'pdf':
        return 'bg-blue-100 text-blue-600'
      case 'video':
        return 'bg-green-100 text-green-600'
      case 'gambar':
        return 'bg-purple-100 text-purple-600'
      default:
        return 'bg-orange-100 text-orange-600'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleDownload = (tool: MarketingTool) => {
    if (tool.fileUrl) {
      window.open(tool.fileUrl, '_blank')
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-600">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Memuat peralatan marketing...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-600">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-6 text-white">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-grow">
            <h1 className="text-xl font-bold">Peralatan Marketing</h1>
            {pagination && (
              <p className="text-blue-100 text-sm mt-1">
                Total {pagination.total} peralatan tersedia
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-blue-50 min-h-screen px-4 py-6">
        <div className="space-y-4">
          {marketingTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Belum Ada Peralatan Marketing
                </h3>
                <p className="text-gray-600">
                  Peralatan marketing akan muncul di sini setelah ditambahkan
                  oleh admin.
                </p>
              </div>
            </div>
          ) : (
            marketingTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  {/* Top Row: Icon and Content */}
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`${getColorForType(
                        tool.tipe
                      )} p-3 rounded-lg flex-shrink-0`}
                    >
                      {getIconForType(tool.tipe)}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm mb-1">
                        {tool.nama || 'Untitled Document'}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        Dirilis: {formatDate(tool.createdAt)}
                      </p>
                      {tool.tipe && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          {tool.tipe.toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row: Download Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDownload(tool)}
                      disabled={!tool.fileUrl}
                      className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Unduh
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Load More Button */}
          {pagination && pagination.hasMore && (
            <div className="text-center py-6">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors shadow-sm border border-gray-200"
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
      </div>
    </div>
  )
}
