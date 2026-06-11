// Mock in-memory database for demo mode (when DATABASE_URL is not configured)

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  consent: boolean;
  consentDate: Date | null;
  lastLogin: Date | null;
  ipAddress: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Asset {
  id: string;
  name: string;
  inventoryNumber: string;
  mol: string;
  cost: number;
  accountingDate: Date | null;
  status: string;
  qrCode: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  id: string;
  name: string;
  createdAt: Date;
  completedAt: Date | null;
  status: string;
  totalAssets: number;
  foundAssets: number;
  missingAssets: number;
  percentage: number;
}

export interface Scan {
  id: string;
  assetId: string;
  inventoryId: string;
  status: string;
  timestamp: Date;
  notes: string | null;
}

export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entity: string | null;
  entityId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  details: string | null;
  timestamp: Date;
}

export interface DataRequest {
  id: string;
  userId: string;
  email: string;
  requestType: string;
  status: string;
  reason: string | null;
  response: string | null;
  createdAt: Date;
  completedAt: Date | null;
}

class MockDatabase {
  private users: User[] = [];
  private assets: Asset[] = [];
  private inventories: Inventory[] = [];
  private scans: Scan[] = [];
  private auditLogs: AuditLog[] = [];
  private dataRequests: DataRequest[] = [];
  private idCounter = 1;

  constructor() {
    // Seed with demo data
    this.seedDemoData();
  }

  private generateId(): string {
    return `mock_${this.idCounter++}`;
  }

  private seedDemoData() {
    // Demo user
    this.users.push({
      id: this.generateId(),
      email: 'demo@3avhoz.rf',
      password: '$2b$10$demo.hashed.password', // "demo123"
      name: 'Демо Пользователь',
      consent: true,
      consentDate: new Date(),
      lastLogin: new Date(),
      ipAddress: '127.0.0.1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // User operations
  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.users[index];
  }

  // Asset operations
  async findAssets(): Promise<Asset[]> {
    return [...this.assets];
  }

  async findAssetById(id: string): Promise<Asset | null> {
    return this.assets.find(a => a.id === id) || null;
  }

  async createAsset(data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Asset> {
    const asset: Asset = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.assets.push(asset);
    return asset;
  }

  async createManyAssets(data: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>[]): Promise<number> {
    const assets = data.map(item => ({
      id: this.generateId(),
      ...item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    this.assets.push(...assets);
    return assets.length;
  }

  async updateAsset(id: string, data: Partial<Asset>): Promise<Asset | null> {
    const index = this.assets.findIndex(a => a.id === id);
    if (index === -1) return null;
    
    this.assets[index] = {
      ...this.assets[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.assets[index];
  }

  // Inventory operations
  async findInventories(): Promise<Inventory[]> {
    return [...this.inventories];
  }

  async findInventoryById(id: string): Promise<Inventory | null> {
    return this.inventories.find(i => i.id === id) || null;
  }

  async createInventory(data: Omit<Inventory, 'id' | 'createdAt'>): Promise<Inventory> {
    const inventory: Inventory = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
    };
    this.inventories.push(inventory);
    return inventory;
  }

  async updateInventory(id: string, data: Partial<Inventory>): Promise<Inventory | null> {
    const index = this.inventories.findIndex(i => i.id === id);
    if (index === -1) return null;
    
    this.inventories[index] = {
      ...this.inventories[index],
      ...data,
    };
    return this.inventories[index];
  }

  // Scan operations
  async findScansByInventoryId(inventoryId: string): Promise<Scan[]> {
    return this.scans.filter(s => s.inventoryId === inventoryId);
  }

  async createScan(data: Omit<Scan, 'id' | 'timestamp'>): Promise<Scan> {
    const scan: Scan = {
      id: this.generateId(),
      ...data,
      timestamp: new Date(),
    };
    this.scans.push(scan);
    return scan;
  }

  async findScanByAssetAndInventory(assetId: string, inventoryId: string): Promise<Scan | null> {
    return this.scans.find(s => s.assetId === assetId && s.inventoryId === inventoryId) || null;
  }

  // Clear data (for testing)
  async clearAssets(): Promise<void> {
    this.assets = [];
  }

  async clearInventories(): Promise<void> {
    this.inventories = [];
    this.scans = [];
  }

  // AuditLog operations
  async createAuditLog(data: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const log: AuditLog = {
      id: this.generateId(),
      ...data,
      timestamp: new Date(),
    };
    this.auditLogs.push(log);
    return log;
  }

  async findAuditLogs(filter?: Partial<AuditLog>): Promise<AuditLog[]> {
    if (!filter) return [...this.auditLogs];
    
    return this.auditLogs.filter(log => {
      return Object.entries(filter).every(([key, value]) => 
        log[key as keyof AuditLog] === value
      );
    });
  }

  // DataRequest operations
  async createDataRequest(data: Omit<DataRequest, 'id' | 'createdAt'>): Promise<DataRequest> {
    const request: DataRequest = {
      id: this.generateId(),
      ...data,
      createdAt: new Date(),
    };
    this.dataRequests.push(request);
    return request;
  }

  async findDataRequests(filter?: Partial<DataRequest>): Promise<DataRequest[]> {
    if (!filter) return [...this.dataRequests];
    
    return this.dataRequests.filter(req => {
      return Object.entries(filter).every(([key, value]) => 
        req[key as keyof DataRequest] === value
      );
    });
  }

  async updateDataRequest(id: string, data: Partial<DataRequest>): Promise<DataRequest | null> {
    const index = this.dataRequests.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    this.dataRequests[index] = {
      ...this.dataRequests[index],
      ...data,
    };
    return this.dataRequests[index];
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }
}

// Singleton instance
export const mockDb = new MockDatabase();
