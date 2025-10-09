import { PrismaClient } from '../../prisma/generated/zains-client'

declare global {
  var prismaZains: PrismaClient | undefined
}

export const prismaZains =
  global.prismaZains ||
  new PrismaClient({
    datasources: process.env.ZAINSDATABASE_URL
      ? { zains: { url: process.env.ZAINSDATABASE_URL } }
      : undefined,
  })

if (process.env.NODE_ENV !== 'production') global.prismaZains = prismaZains
