import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.corezTransaksiScrap.deleteMany()
  await prisma.corezTransaksiClaim.deleteMany()
  await prisma.corezTransaksi.deleteMany()
  await prisma.hcmKaryawan.deleteMany()
  await prisma.corezDonatur.deleteMany()
  await prisma.settingProgram.deleteMany()
  await prisma.hcmKantorJabatan.deleteMany()
  await prisma.hcmPangkat.deleteMany()
  await prisma.hcmKantorLevel.deleteMany()
  await prisma.hcmKantor.deleteMany()

  // 1. Create Kantor Level
  console.log('📊 Creating Kantor Level...')
  const kantorLevel = await prisma.hcmKantorLevel.create({
    data: {
      idKantorLevel: 1,
      kantorLevel: 'Pusat',
      kantorLevelCode: 'PST',
      active: 'y',
    }
  })

  // 2. Create Kantor
  console.log('🏢 Creating Kantor...')
  const kantor = await prisma.hcmKantor.create({
    data: {
      kantor: 'DT Peduli Pusat',
      alamat: 'Jl. Raya Bogor KM 30, Cibinong',
      kota: 'Bogor',
      keterangan: 'Kantor Pusat DT Peduli',
      telpon: '021-12345678',
      fax: '021-12345679',
      aktif: 'y',
      idKantorParent: 0,
      idKantorLevel: kantorLevel.idKantorLevel,
      idKantorold: '001',
      omid: 'DT001',
      coa: '1101001',
      coaNoncash: '1101002',
      ll: '-6.2088,106.8456',
      propinsi: 'Jawa Barat',
      isAnggaran: 'y',
      amilVirtualOffice: 'amil001',
      updated: new Date(),
    }
  })

  // 3. Create Pangkat
  console.log('⭐ Creating Pangkat...')
  const pangkat = await prisma.hcmPangkat.create({
    data: {
      idPangkat: 1,
      pangkatKaryawan: 'Manager',
      deskripsiPangkat: 'Manager Level',
      aktif: 'Aktif',
    }
  })

  // 4. Create Jabatan
  console.log('👔 Creating Jabatan...')
  const jabatan = await prisma.hcmKantorJabatan.create({
    data: {
      jabatan: 'Manager Fundraising',
      kode: 'MGR',
      idJabatanParent: 0,
      aktif: 'y',
      apps: 'fundraising,donatur,transaksi',
      idAppsGroupDefault: 'MGR001',
      keterangan: 'Manager untuk divisi fundraising',
      idExpendLevel: 1,
      idReceiptLevel: 1,
      idDivisi: 'FND',
      fundingApp: 'fundraising_app',
    }
  })

  // 5. Create Program
  console.log('📋 Creating Program...')
  const program = await prisma.settingProgram.create({
    data: {
      idProgram: 1,
      program: 'Zakat Fitrah',
      idProgramParent: 0,
      idSumberDana: 1,
      coaIndividu: '4101001',
      coaEntitas: '4101002',
      coa1: '1101001',
      coa2: '1101002',
      dp: 2.5,
      level: 1,
      parent: 'y',
      jenis: 'r',
      idProgramDepag: 1,
      nom: 45000.00,
      nomEditable: 'y',
      spc: 'n',
      aktif: 'y',
      sort: 1.00,
      note: 'Program zakat fitrah tahunan',
      early: new Date('2025-01-01'),
      end: new Date('2025-12-31'),
      idProgramTemp: 'ZF001',
      flag: 'zakat_fitrah',
    }
  })

  // 6. Create Donatur
  console.log('👥 Creating Donatur...')
  const donatur = await prisma.corezDonatur.create({
    data: {
      idDonatur: 'DON001',
      donatur: 'Ahmad Rizki',
      panggilan: 'Ahmad',
      tglLahir: new Date('1985-05-15'),
      tempatLahir: 'Jakarta',
      alamat: 'Jl. Sudirman No. 123, Jakarta Pusat',
      des: 'Donatur tetap zakat fitrah',
      idDonaturParent: 'DON000',
      nikah: 'Menikah',
      komitment: 100000.00,
      idJenis: 1,
      status: 'Donatur',
      tglReg: new Date('2024-01-15'),
      telpon: '021-12345678',
      hp: '081234567890',
      email: 'ahmad.rizki@email.com',
      jk: 'l',
      ll: '-6.2088,106.8456',
      idPekerjaan: 1,
      agama: 'Islam',
      idCaraBayar: 1,
      idRutinitasTransaksi: 1,
      tglTransaksi: 1,
      idPenghasilan: 1,
      idPendidikan: 1,
      sumber: 'Website',
      idSumberDonatur: 'WEB001',
      lain: 'Donatur dari website resmi',
      idKantor: kantor.idKantor,
      idCrm: 'CRM001',
      npwp: '123456789012345',
      idProgram: '1',
      userInsert: 'admin',
      userName: 'ahmad_rizki',
      password: 'hashed_password_123',
      aktif: 'y',
      verified: 'verified',
      foto: 'ahmad_rizki.jpg',
      idKoordinator: 'KOOR001',
      session: 'session_123',
      note: 'Donatur aktif dan terpercaya',
      idHubung: 'WhatsApp',
      idPelayanan: 1,
      idProfiling: 1,
      updated: new Date(),
      sendEmail: 'ahmad.rizki@email.com',
      whatsapp: '081234567890',
      lastTransaction: new Date('2025-01-15'),
      emailValid: 'ahmad.rizki@email.com',
      emailCheck: 1,
      bidIndComm: 'BID001',
    }
  })

  // 7. Create Karyawan
  console.log('👨‍💼 Creating Karyawan...')
  const karyawan = await prisma.hcmKaryawan.create({
    data: {
      idKaryawan: 'KAR001',
      karyawan: 'Siti Nurhaliza',
      panggilan: 'Siti',
      jk: 'p',
      tempatLahir: 'Bandung',
      tglLahir: new Date('1990-03-20'),
      identitasid: 1,
      noIdentitas: '3201990032000001',
      tglMasuk: new Date('2023-01-01'),
      alamat: 'Jl. Asia Afrika No. 456, Bandung',
      kota: 'Bandung',
      ll: '-6.9175,107.6191',
      lain: 'Karyawan tetap',
      nikah: 'Menikah',
      email: 'siti.nurhaliza@dtpeduli.org',
      telpon: '022-12345678',
      hp: '081987654321',
      nikInput: 'admin',
      idKaryawanParent: 'KAR000',
      idJabatan: jabatan.idJabatan,
      idDonatur: donatur.idDonatur,
      aktif: 'y',
      idKantor: kantor.idKantor,
      grup: 'FUNDRAISING',
      statusKaryawan: 'Tetap',
      tglAwalKontrak: new Date('2023-01-01'),
      tglAkhirKontrak: new Date('2025-12-31'),
      idPangkat: pangkat.idPangkat,
      note: 'Karyawan terpercaya dan berdedikasi',
    }
  })

  // 8. Create Transaksi
  console.log('💰 Creating Transaksi...')
  const transaksi = await prisma.corezTransaksi.create({
    data: {
      idTransaksi: 'TRX001',
      idViaBayar: 1,
      idDonatur: donatur.idDonatur,
      detailid: 1,
      idProgram: program.idProgram,
      idProgramClaim: program.idProgram.toString(),
      coaDebet: '1101001',
      coaKredit: '4101001',
      quantity: 1,
      transaksi: 45000.00,
      tglTransaksi: new Date('2025-01-15'),
      idKantorTransaksi: kantor.idKantor,
      idKantorDonatur: kantor.idKantor,
      idPenghimpunan: 1,
      idViaHimpun: 'BANK001',
      idCaraBayar: 'uuid_cara_bayar_001',
      idNc: 1,
      idCrm: 'CRM001',
      idClaim: 'CLM001',
      idPositionClaim: 'POS001',
      cdt: new Date(),
      approvedTransaksi: 'y',
      tglDonasi: new Date('2025-01-15'),
      keterangan: 'Zakat fitrah untuk 1 orang',
      userInsert: 'admin',
      noBukti: 'BUK001',
      cur: 'IDR',
      viaInput: '1',
      note: 'Transaksi zakat fitrah',
      sendSms: '081234567890',
      sendEmail: 'ahmad.rizki@email.com',
      sendWhatsapp: '081234567890',
      dp: 2.5,
      rekapid: 'REK001',
      idAffiliate: 'AFF001',
      grouptrx: 'GRP001',
    }
  })

  // 9. Create Transaksi Claim
  console.log('📝 Creating Transaksi Claim...')
  const transaksiClaim = await prisma.corezTransaksiClaim.create({
    data: {
      idTransaksi: 'TRX002',
      idViaBayar: 1,
      idDonatur: donatur.idDonatur,
      detailid: 1,
      idProgram: program.idProgram,
      idProgramClaim: program.idProgram.toString(),
      coaDebet: '1101001',
      coaKredit: '4101001',
      quantity: 1,
      transaksi: 50000.00,
      tglTransaksi: new Date('2025-01-20'),
      idKantorTransaksi: kantor.idKantor,
      idKantorDonatur: kantor.idKantor,
      idPenghimpunan: 1,
      idViaHimpun: 'BANK001',
      idCaraBayar: 'uuid_cara_bayar_002',
      idNc: 1,
      idCrm: 'CRM001',
      idClaim: 'CLM002',
      idPositionClaim: 'POS002',
      cdt: new Date(),
      approvedTransaksi: 'y',
      tglDonasi: new Date('2025-01-20'),
      keterangan: 'Zakat mal untuk donatur',
      userInsert: 'admin',
      noBukti: 'BUK002',
      cur: 'IDR',
      viaInput: '1',
      note: 'Transaksi zakat mal',
      sendSms: '081234567890',
      sendEmail: 'ahmad.rizki@email.com',
      sendWhatsapp: '081234567890',
      dp: 2.5,
      rekapid: 'REK002',
      idAffiliate: 'AFF001',
      grouptrx: 'GRP002',
      userApprove: 'admin',
      tglApprove: new Date('2025-01-20'),
    }
  })

  // 10. Create Transaksi Scrap
  console.log('🗑️ Creating Transaksi Scrap...')
  const transaksiScrap = await prisma.corezTransaksiScrap.create({
    data: {
      idTransaksi: 'TRX003',
      idViaBayar: 1,
      idDonatur: donatur.idDonatur,
      detailid: 1,
      idProgram: program.idProgram,
      idProgramClaim: program.idProgram.toString(),
      coaDebet: '1101001',
      coaKredit: '4101001',
      quantity: 1,
      transaksi: 25000.00,
      tglTransaksi: new Date('2025-01-10'),
      idKantorTransaksi: kantor.idKantor,
      idKantorDonatur: kantor.idKantor,
      idPenghimpunan: 1,
      idViaHimpun: 'BANK001',
      idCaraBayar: 'uuid_cara_bayar_003',
      idNc: 1,
      idCrm: 'CRM001',
      idClaim: 'CLM003',
      idPositionClaim: 'POS003',
      cdt: new Date(),
      approvedTransaksi: 'n',
      tglDonasi: new Date('2025-01-10'),
      keterangan: 'Transaksi gagal - data scrap',
      userInsert: 'admin',
      noBukti: 'BUK003',
      cur: 'IDR',
      viaInput: '1',
      note: 'Transaksi gagal dan dihapus',
      sendSms: '081234567890',
      sendEmail: 'ahmad.rizki@email.com',
      sendWhatsapp: '081234567890',
      dp: 2.5,
      rekapid: 'REK003',
      idAffiliate: 'AFF001',
      grouptrx: 'GRP003',
    }
  })

  console.log('✅ Database seeding completed successfully!')
  console.log('📊 Summary:')
  console.log(`   - Kantor Level: 1`)
  console.log(`   - Kantor: 1`)
  console.log(`   - Pangkat: 1`)
  console.log(`   - Jabatan: 1`)
  console.log(`   - Program: 1`)
  console.log(`   - Donatur: 1`)
  console.log(`   - Karyawan: 1`)
  console.log(`   - Transaksi: 1`)
  console.log(`   - Transaksi Claim: 1`)
  console.log(`   - Transaksi Scrap: 1`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })