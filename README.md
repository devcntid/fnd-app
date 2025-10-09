# FND - DT Peduli Fundraising System

Sistem aplikasi fundraising untuk DT Peduli yang dibangun dengan Next.js, TypeScript, dan Prisma.

## 🚀 Fitur Utama

- **Dashboard Interaktif**: Tampilan ringkasan capaian fundraising dengan animasi yang smooth
- **Laporan Cepat**: Sistem pelaporan yang mudah digunakan dengan QR scanner
- **Manajemen Tugas**: Tracking dan manajemen tugas penjemputan donasi
- **Leaderboard**: Sistem ranking untuk memotivasi tim
- **Multi-channel Fundraising**: Support untuk Timsil, Kalimat, Event, Gerai, Mitra Unggul, Corporate, dan MPZ
- **Responsive Design**: Optimized untuk mobile dan desktop
- **Real-time Updates**: Update data secara real-time

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons
- **Database**: Prisma ORM (PostgreSQL/MySQL compatible)
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **API**: Next.js API Routes

## 📦 Instalasi

1. Clone repository:
```bash
git clone <repository-url>
cd fnd-app
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

4. Configure database:
```bash
# Untuk PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/fnd_db?schema=public"

# Untuk MySQL
DATABASE_URL="mysql://username:password@localhost:3306/fnd_db"

# Untuk Neon (Serverless PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/fnd_db?sslmode=require"
```

5. Setup database:
```bash
npx prisma migrate dev
npx prisma generate
```

6. Run development server:
```bash
npm run dev
```

## 🗄️ Database Schema

Aplikasi menggunakan Prisma ORM dengan schema yang fleksibel untuk berbagai jenis laporan fundraising:

- **Users**: Manajemen pengguna dan amil
- **TimsilReport**: Laporan kunjungan tim silaturahmi
- **KalimatReport**: Laporan penjemputan kotak kalimat
- **EventReport**: Laporan event fundraising
- **GeraiReport**: Laporan setoran gerai
- **MitraReport**: Laporan donasi mitra unggul
- **CorporateReport**: Laporan donasi corporate
- **MpzReport**: Laporan donasi MPZ
- **Tasks**: Manajemen tugas penjemputan
- **Notifications**: Sistem notifikasi

## 🎨 Komponen Utama

### Layout Components
- `AppWrapper`: Container utama dengan background gradient
- `Header`: Header dengan search dan notifikasi
- `Navigation`: Bottom navigation dengan floating action button

### Home Components
- `GridMenu`: Menu grid untuk navigasi tab
- `SummaryCard`: Card untuk menampilkan ringkasan data
- `LeaderboardCard`: Card untuk menampilkan leaderboard

### Report Components
- `FloatingTabs`: Tab floating untuk kategori laporan
- `TimsilOptions`: Opsi laporan timsil (upload, scan, manual)
- `ManualReportForm`: Form laporan manual
- `QRScanner`: Scanner QR code dengan animasi
- `IdDetected`: Halaman setelah QR code terdeteksi

### UI Components
- `Button`: Button dengan berbagai variant
- `Card`: Card container dengan header, content, footer
- `Input`: Input field dengan styling konsisten
- `Select`: Select dropdown
- `Modal`: Modal overlay
- `Badge`: Badge untuk status

## 📱 Halaman Aplikasi

1. **Home** (`/`): Dashboard utama dengan grid menu dan ringkasan
2. **Laporan Cepat** (`/laporan-cepat`): Sistem pelaporan dengan QR scanner
3. **Akun** (`/akun`): Profil pengguna dan pengaturan
4. **Notifikasi** (`/notifikasi`): Daftar notifikasi
5. **Tugasku** (`/tugasku`): Manajemen tugas penjemputan
6. **Tools** (`/tools`): Peralatan marketing
7. **Laporan Donatur** (`/laporan-donatur`): Laporan untuk donatur

## 🔧 API Routes

- `GET /api/summary`: Mendapatkan ringkasan data
- `GET /api/leaderboard`: Mendapatkan data leaderboard
- `GET /api/tasks`: Mendapatkan daftar tugas
- `POST /api/tasks`: Update status tugas
- `POST /api/reports/timsil`: Submit laporan timsil

## 🎭 Animasi & Transisi

Aplikasi menggunakan Framer Motion untuk animasi yang smooth:

- **Page Transitions**: Fade in/out saat navigasi
- **Card Animations**: Hover effects dan scale animations
- **Loading States**: Skeleton loading dan spinners
- **QR Scanner**: Animasi scanning line
- **Floating Elements**: Float animation untuk elemen penting

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t fnd-app .
docker run -p 3000:3000 fnd-app
```

## 🔒 Environment Variables

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/fnd_db?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# App Configuration
NEXT_PUBLIC_APP_NAME="FND - DT Peduli"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## 📊 Performance Optimizations

- **Code Splitting**: Automatic code splitting dengan Next.js
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Lazy loading untuk komponen yang tidak critical
- **Memoization**: React.memo untuk komponen yang expensive
- **Database Indexing**: Optimized database queries dengan Prisma
- **CDN**: Static assets served via CDN

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- DT Peduli untuk kepercayaan dan kolaborasi
- Next.js team untuk framework yang powerful
- Prisma team untuk ORM yang excellent
- Tailwind CSS untuk utility-first CSS framework
- Lucide untuk icon set yang beautiful