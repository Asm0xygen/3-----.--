import { Router } from 'express';
import { db } from '../db';

const router = Router();

router.post('/start', async (req, res) => {
  try {
    const { name } = req.body;
    
    const assets = await db.asset.findMany();
    const totalAssets = assets.length;
    
    const inventory = await db.inventory.create({
      data: {
        name: name || `Инвентаризация ${new Date().toLocaleDateString('ru-RU')}`,
        status: 'in_progress',
        totalAssets,
        foundAssets: 0,
        missingAssets: 0,
        percentage: 0,
        completedAt: null,
      },
    });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start inventory' });
  }
});

router.post('/scan', async (req, res) => {
  try {
    const { inventoryId, inventoryNumber, status, notes } = req.body;

    const assets = await db.asset.findMany();
    const asset = assets.find(a => a.inventoryNumber === inventoryNumber);

    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    // Проверяем, не был ли уже отсканирован
    const existingScan = await db.scan.findFirst({
      where: { assetId: asset.id, inventoryId },
    });

    if (existingScan) {
      return res.status(400).json({ error: 'Asset already scanned in this inventory' });
    }

    const scan = await db.scan.create({
      data: {
        assetId: asset.id,
        inventoryId,
        status: status || 'found',
        notes: notes || null,
      },
    });

    // Обновление статуса актива
    await db.asset.update({
      where: { id: asset.id },
      data: { status: status || 'found' },
    });

    // Обновление статистики инвентаризации
    const inventory = await db.inventory.findUnique({
      where: { id: inventoryId },
    });

    if (inventory) {
      const scans = await db.scan.findMany({
        where: { inventoryId },
      });

      const foundAssets = scans.filter(s => s.status === 'found').length;
      const percentage = inventory.totalAssets > 0 
        ? Math.round((foundAssets / inventory.totalAssets) * 100 * 100) / 100
        : 0;

      await db.inventory.update({
        where: { id: inventoryId },
        data: {
          foundAssets,
          missingAssets: inventory.totalAssets - foundAssets,
          percentage,
        },
      });
    }

    res.json(scan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to record scan' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const inventory = await db.inventory.findUnique({
      where: { id: req.params.id },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    // Получаем сканы для этой инвентаризации
    const scans = await db.scan.findMany({
      where: { inventoryId: req.params.id },
    });

    // Получаем все активы
    const assets = await db.asset.findMany();

    // Обогащаем сканы данными об активах
    const scansWithAssets = scans.map(scan => ({
      ...scan,
      asset: assets.find(a => a.id === scan.assetId) || null,
    }));

    res.json({
      ...inventory,
      scans: scansWithAssets,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

export default router;
