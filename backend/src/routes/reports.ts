import { Router } from 'express';
import { db } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const inventories = await db.inventory.findMany();
    
    const reports = await Promise.all(
      inventories.map(async (inv) => {
        const scans = await db.scan.findMany({
          where: { inventoryId: inv.id },
        });

        const assets = await db.asset.findMany();
        const scansWithAssets = scans.map(scan => ({
          ...scan,
          asset: assets.find(a => a.id === scan.assetId) || null,
        }));

        return {
          inventoryId: inv.id,
          inventoryName: inv.name,
          totalAssets: inv.totalAssets,
          foundAssets: inv.foundAssets,
          missingAssets: inv.missingAssets,
          percentage: inv.percentage,
          scans: scansWithAssets,
          createdAt: inv.createdAt,
        };
      })
    );

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const inventory = await db.inventory.findUnique({
      where: { id: req.params.id },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const scans = await db.scan.findMany({
      where: { inventoryId: req.params.id },
    });

    const assets = await db.asset.findMany();
    const scansWithAssets = scans.map(scan => ({
      ...scan,
      asset: assets.find(a => a.id === scan.assetId) || null,
    }));

    const report = {
      inventoryId: inventory.id,
      inventoryName: inventory.name,
      totalAssets: inventory.totalAssets,
      foundAssets: inventory.foundAssets,
      missingAssets: inventory.missingAssets,
      percentage: inventory.percentage,
      scans: scansWithAssets,
      createdAt: inventory.createdAt,
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch report' });
  }
});

export default router;
