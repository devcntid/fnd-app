export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  branch: string
}

export interface TimsilData {
  capaian: number
  kunjungan: number
  donatur: number
  jemput: number
  belumJemput: number
}

export interface KalimatData {
  donasi: number
  aktif: number
  jemput: number
  belumJemput: number
}

export interface EventData {
  donasi: number
}

export interface GeraiData {
  donasi: number
  total: number
  aktif: number
  nonaktif: number
}

export interface MitraData {
  donasi: number
  total: number
  aktif: number
  nonaktif: number
}

export interface CorporateData {
  donasi: number
  partner: number
  program: number
}

export interface MpzData {
  donasi: number
  mitra: number
  aktif: number
}

export interface LeaderboardEntry {
  name: string
  amount: number
  month: number
  avatar?: string
  subtext: string
}

export interface Task {
  id: string
  type: 'kencleng' | 'kalimat'
  name: string
  location: string
  kenclengId: string
  branch: string
  dueDate: string
  status: 'pending' | 'completed'
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'reminder' | 'achievement' | 'event' | 'leaderboard'
  isRead: boolean
  createdAt: string
}

export interface Event {
  id: string
  name: string
  date: string
  type: 'fundraising' | 'kajian'
  location: string
  city: string
  targetParticipants: number
  posterUrl?: string
  status: 'upcoming' | 'finished'
  donationAmount?: number
  participants?: number
  leads?: number
  notes?: string
}

// Mock Data
export const mockUser: User = {
  id: '1',
  name: 'Kevin Adhytama',
  email: 'kevin.adhytama@dtpeduli.org',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJ1PjF2ICndyrDqjfirOjjqZC0osGjoQpCEUECp4yw8QKQ8VKl_=s432-c-no',
  branch: 'DT Peduli Bandung'
}

export const mockAppData = {
  timsil: {
    capaian: 0,
    kunjungan: 0,
    donatur: 0,
    jemput: 0,
    belumJemput: 1
  } as TimsilData,
  kalimat: {
    donasi: 0,
    aktif: 0,
    jemput: 0,
    belumJemput: 1
  } as KalimatData,
  event: {
    donasi: 0
  } as EventData,
  gerai: {
    donasi: 0,
    total: 0,
    aktif: 0,
    nonaktif: 0
  } as GeraiData,
  mitra: {
    donasi: 0,
    total: 0,
    aktif: 0,
    nonaktif: 0
  } as MitraData,
  corporate: {
    donasi: 0,
    partner: 0,
    program: 0
  } as CorporateData,
  mpz: {
    donasi: 0,
    mitra: 0,
    aktif: 0
  } as MpzData
}

export const mockLeaderboardData = {
  timsil: [] as LeaderboardEntry[],
  kalimat: [] as LeaderboardEntry[],
  gerai: [] as LeaderboardEntry[],
  mitraUnggul: [] as LeaderboardEntry[],
  corporate: [] as LeaderboardEntry[],
  mpz: [] as LeaderboardEntry[]
}

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    type: 'kalimat',
    name: 'Masjid Al-Ikhlas',
    location: 'Jl. Cikutra No. 12, Bandung',
    kenclengId: 'KMT-BDG-0001',
    branch: 'DT Peduli Bandung',
    dueDate: '2025-07-15',
    status: 'pending'
  },
  {
    id: 'task-2',
    type: 'kencleng',
    name: 'Bapak Abdullah',
    location: 'Jl. Gegerkalong Girang No. 67',
    kenclengId: 'KCL-BDG-01234',
    branch: 'DT Peduli Bandung',
    dueDate: '2025-07-16',
    status: 'pending'
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Pengingat Jemputan',
    message: 'Jadwal penjemputan kencleng di Toko Buku Cerdas besok.',
    type: 'reminder',
    isRead: false,
    createdAt: '2025-07-14T12:00:00Z'
  },
  {
    id: '2',
    title: 'Pencapaian Baru!',
    message: 'Selamat, Anda mencapai target bulanan Timsil!',
    type: 'achievement',
    isRead: false,
    createdAt: '2025-07-14T09:30:00Z'
  },
  {
    id: '3',
    title: 'Event Akan Datang',
    message: 'Event "Kajian Tauhid Aa Gym" akan dimulai dalam 3 hari.',
    type: 'event',
    isRead: false,
    createdAt: '2025-07-13T15:00:00Z'
  },
  {
    id: '4',
    title: 'Update Leaderboard',
    message: 'Anda naik ke peringkat 2 di leaderboard Kalimat. Pertahankan!',
    type: 'leaderboard',
    isRead: false,
    createdAt: '2025-07-12T10:00:00Z'
  }
]

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'Kajian Tauhid Aa Gym',
    date: '2025-07-30',
    type: 'kajian',
    location: 'Masjid DT, Bandung',
    city: 'Bandung',
    targetParticipants: 500,
    posterUrl: 'https://placehold.co/600x300/2453C7/FFFFFF?text=Poster+Kajian',
    status: 'upcoming'
  },
  {
    id: 'event-2',
    name: 'Bantu Korban Bencana',
    date: '2025-06-01',
    type: 'fundraising',
    location: 'Posko Bencana, Garut',
    city: 'Garut',
    targetParticipants: 200,
    status: 'finished',
    donationAmount: 0,
    participants: 0,
    leads: 0,
    notes: 'Belum ada evaluasi.'
  }
]

export const mockGerais = [
  {
    id: '1',
    name: 'Supermarket Sejahtera',
    address: 'Jl. Raya Bandung No. 123',
    picName: 'Ahmad Sutrisno',
    picPhone: '081234567890',
    cooperationType: 'Donasi di Kasir',
    status: 'active'
  },
  {
    id: '2',
    name: 'Minimarket Barokah',
    address: 'Jl. Cibiru No. 456',
    picName: 'Siti Nurhaliza',
    picPhone: '081987654321',
    cooperationType: 'Sebagian Profit',
    status: 'active'
  }
]

export const mockMitraUngguls = [
  {
    id: '1',
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    phone: '081234567890',
    status: 'active'
  }
]

export const mockCorporates = [
  {
    id: '1',
    name: 'PT Sejahtera Abadi',
    picName: 'Dr. Muhammad Ali',
    picPhone: '081234567890',
    status: 'active'
  }
]

export const mockMpzs = [
  {
    id: '1',
    name: 'Komunitas Berbagi',
    type: 'Komunitas Sosial',
    picName: 'Ustadz Ahmad',
    picPhone: '081234567890',
    status: 'active'
  }
]

export const mockDonors = [
  {
    id: 'DNT-001',
    name: 'Budi Santoso',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 123, Bandung'
  },
  {
    id: 'DNT-002',
    name: 'Siti Aminah',
    phone: '081987654321',
    address: 'Jl. Sudirman No. 456, Jakarta'
  },
  {
    id: 'DNT-003',
    name: 'Rahmat Hidayat',
    phone: '081555666777',
    address: 'Jl. Diponegoro No. 789, Surabaya'
  }
]

export const mockMarketingTools = [
  {
    id: '1',
    name: 'Company Profile 2025',
    type: 'document',
    releaseDate: '2025-07-15',
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Katalog Program Qurban',
    type: 'catalog',
    releaseDate: '2025-07-10',
    downloadUrl: '#'
  },
  {
    id: '3',
    name: 'Proposal Event Ramadhan',
    type: 'proposal',
    releaseDate: '2025-06-01',
    downloadUrl: '#'
  },
  {
    id: '4',
    name: 'Brosur & Spanduk Wakaf',
    type: 'marketing',
    releaseDate: '2025-05-25',
    downloadUrl: '#'
  }
]

export const mockDigitalPosters = [
  {
    id: '1',
    name: 'Laporan Ramadhan 1446 H',
    type: 'ramadhan',
    releaseDate: '2025-05-01',
    downloadUrl: '#'
  },
  {
    id: '2',
    name: 'Laporan Qurban 1446 H',
    type: 'qurban',
    releaseDate: '2025-07-20',
    downloadUrl: '#'
  }
]

