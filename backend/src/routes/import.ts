import { Router } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import QRCode from 'qrcode';
import { db } from '../db';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/os', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet) as any[];

    const imported: any[] = [];
    const errors: string[] = [];

    for (const row of data) {
      try {
        const inventoryNumber = row['Инвентарный номер'] || row['inventoryNumber'] || String(row.id || '');
        const name = row['Наименование'] || row['name'] || '';
        const mol = row['МОЛ'] || row['mol'] || '';
        const cost = parseFloat(row['Стоимость'] || row['cost'] || '0');
        const accountingDateRaw = row['Дата постановки'] || row['accountingDate'] || null;
        
        // Парсинг даты
        let accountingDate: Date | null = null;
        if (accountingDateRaw) {
          const parsed = new Date(accountingDateRaw);
          accountingDate = isNaN(parsed.getTime()) ? null : parsed;
        }

        if (!inventoryNumber || !name) {
          errors.push(`Пропущена строка: отсутствуют обязательные поля`);
          continue;
        }

        const asset = await db.asset.create({
          data: {
            name,
            inventoryNumber,
            mol,
            cost,
            accountingDate,
            status: 'active',
            qrCode: null, // QR генерируется по запросу пользователя
          },
        });

        imported.push(asset);
      } catch (error: any) {
        errors.push(`Ошибка импорта: ${error.message}`);
      }
    }

    res.json({
      success: true,
      imported: imported.length,
      errors,
      assets: imported,
    });
  } catch (error) {
    res.status(500).json({ error: 'Import failed' });
  }
});

// Генерация QR-кодов для выбранных активов
router.post('/generate-qr', async (req, res) => {
  try {
    const { assetIds } = req.body;

    if (!assetIds || !Array.isArray(assetIds) || assetIds.length === 0) {
      return res.status(400).json({ error: 'Asset IDs are required' });
    }

    const results: any[] = [];
    const errors: string[] = [];

    for (const assetId of assetIds) {
      try {
        const asset = await db.asset.findUnique({
          where: { id: assetId },
        });

        if (!asset) {
          errors.push(`Актив ${assetId} не найден`);
          continue;
        }

        // Генерация QR-кода
        const qrCode = await QRCode.toDataURL(asset.inventoryNumber);

        // Обновление актива с QR-кодом
        const updated = await db.asset.update({
          where: { id: assetId },
          data: { qrCode },
        });

        results.push(updated);
      } catch (error: any) {
        errors.push(`Ошибка генерации QR для ${assetId}: ${error.message}`);
      }
    }

    res.json({
      success: true,
      generated: results.length,
      errors,
      assets: results,
    });
  } catch (error) {
    res.status(500).json({ error: 'QR generation failed' });
  }
});

export default router;
