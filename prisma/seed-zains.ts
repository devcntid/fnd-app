import { PrismaClient } from './generated/zains-client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding zains.admin_users...')

  await prisma.adminUsers.deleteMany()

  // md5("admin123")
  const md5Hash = '0192023a7bbd73250516f069df18b500'

  await prisma.adminUsers.create({
    data: {
      userName: 'kevin.adhyatama@dtpeduli.org',
      password: md5Hash,
      fullName: 'Kevin Adhytama',
      idEmployee: 'KAR001',
      idPosition: 'MGR001',
      position: 'Manager Fundraising',
      address: 'Bandung',
      telpon: '022-12345678',
      whatsapp: '081234567890',
      whatsappNotif: 'y',
      apps: 'fundraising',
      idAppsGroupDefault: 'MGR001',
      idOffice: 1,
      email: 'kevin.adhyatama@dtpeduli.org',
      admin: 'y',
      active: 'y',
      created: new Date(),
      updated: new Date(),
      expired: new Date('2030-12-31'),
      lastLogin: null,
      idEntitas: 'DT',
      style: 'default',
      foto: '',
      session: ''
    }
  })

  console.log('✅ Done seeding zains.admin_users')
}

main().finally(async () => prisma.$disconnect())
