export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Asset {
  id: string;
  name: string;
  inventoryNumber: string;
  mol: string; // Материально ответственное лицо
  cost: number;
  status: 'active' | 'found' | 'missing' | 'surplus';
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inventory {
  id: string;
  name: string;
  createdAt: Date;
  completedAt?: Date;
  status: 'draft' | 'in_progress' | 'completed';
  totalAssets: number;
  foundAssets: number;
  missingAssets: number;
  percentage: number;
}

export interface Scan {
  id: string;
  assetId: string;
  inventoryId: string;
  status: 'found' | 'damaged' | 'missing';
  timestamp: Date;
  notes?: string;
}

export interface ImportResult {
  success: boolean;
  imported: number;
  errors: string[];
}

export interface InventoryReport {
  inventoryId: string;
  inventoryName: string;
  totalAssets: number;
  foundAssets: number;
  missingAssets: number;
  percentage: number;
  scans: Scan[];
  createdAt: Date;
}
