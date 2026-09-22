import { PrismaClient } from '@prisma/client';
import { env } from '../config/load-env';
import { resolveDatabaseMode } from './database-mode';
import { mockDb } from './mock';

const databaseMode = resolveDatabaseMode(env);

const prisma = databaseMode === 'postgres' ? new PrismaClient() : null;

export const db = databaseMode === 'mock' ? {
  // Mock DB adapter with Prisma-like API
  user: {
    findUnique: async ({ where }: any) => {
      if (where.email) return mockDb.findUserByEmail(where.email);
      if (where.id) return mockDb.findUserById(where.id);
      return null;
    },
    create: async ({ data }: any) => mockDb.createUser(data),
    update: async ({ where, data }: any) => mockDb.updateUser(where.id, data),
    delete: async ({ where }: any) => {
      const deleted = await mockDb.deleteUser(where.id);
      if (!deleted) throw new Error('User not found');
      return { id: where.id };
    },
  },
  asset: {
    findMany: async () => mockDb.findAssets(),
    findUnique: async ({ where }: any) => mockDb.findAssetById(where.id),
    create: async ({ data }: any) => mockDb.createAsset(data),
    createMany: async ({ data }: any) => {
      const count = await mockDb.createManyAssets(data);
      return { count };
    },
    update: async ({ where, data }: any) => mockDb.updateAsset(where.id, data),
    deleteMany: async () => {
      await mockDb.clearAssets();
      return { count: 0 };
    },
  },
  inventory: {
    findMany: async () => mockDb.findInventories(),
    findUnique: async ({ where }: any) => mockDb.findInventoryById(where.id),
    create: async ({ data }: any) => mockDb.createInventory(data),
    update: async ({ where, data }: any) => mockDb.updateInventory(where.id, data),
    deleteMany: async () => {
      await mockDb.clearInventories();
      return { count: 0 };
    },
  },
  scan: {
    findMany: async ({ where }: any) => {
      if (where?.inventoryId) return mockDb.findScansByInventoryId(where.inventoryId);
      return [];
    },
    findFirst: async ({ where }: any) => {
      if (where?.assetId && where?.inventoryId) {
        return mockDb.findScanByAssetAndInventory(where.assetId, where.inventoryId);
      }
      return null;
    },
    create: async ({ data }: any) => mockDb.createScan(data),
  },
  auditLog: {
    create: async ({ data }: any) => mockDb.createAuditLog(data),
    findMany: async ({ where }: any) => mockDb.findAuditLogs(where),
  },
  dataRequest: {
    create: async ({ data }: any) => mockDb.createDataRequest(data),
    findMany: async ({ where }: any) => mockDb.findDataRequests(where),
    update: async ({ where, data }: any) => mockDb.updateDataRequest(where.id, data),
  },
} : prisma!;

export const isMockMode = databaseMode === 'mock';
export const connectDatabase = async (): Promise<void> => {
  if (!prisma) {
    return;
  }

  await prisma.$connect();
};

if (isMockMode) {
  console.log('🔶 Running in MOCK MODE (no database required)');
} else {
  console.log('🔷 Running with PostgreSQL/Supabase');
}
