import { PrismaClient } from '@prisma/client';

// globalThis survit aux hot reloads de Next.js en développement.
// En production, ce bloc est ignoré — chaque process Node a sa propre instance.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
