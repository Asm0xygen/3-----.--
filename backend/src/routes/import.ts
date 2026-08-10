import { Router } from 'express';
import multer from 'multer';
import QRCode from 'qrcode';
import { db } from '../db';

const router = Router();
const MAX_IMPORT_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const acceptedMimeTypes = new Set([
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/csv',
]);
const acceptedExtensions = /\.(xlsx|csv)$/i;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_IMPORT_FILE_SIZE_BYTES, files: 1 },
  fileFilter: (_req, file, callback) => {
    const isAccepted = acceptedMimeTypes.has(file.mimetype) || acceptedExtensions.test(file.originalname);
    if (!isAccepted) {
      callback(new Error('Поддерживаются только файлы XLSX и CSV'));
      return;
    }
    callback(null, true);
  },
});

const parseCsvLine = (line: string, delimiter: string) => {
  const values: string[] = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === delimiter && !quoted) {
      values.push(value.trim());
      value = '';
    } else {
      value += character;
    }
  }

  values.push(value.trim());
  return values;
};

const readImportRows = async (file: Express.Multer.File): Promise<Record<string, unknown>[]> => {
  if (/\.xlsx$/i.test(file.originalname)) {
    const { default: readXlsxFile } = await import('read-excel-file/node');
    const rows = await readXlsxFile(file.buffer) as unknown as unknown[][];
    const [headerRow, ...dataRows] = rows;
    const headers = headerRow?.map((value) => String(value ?? '').trim()) ?? [];
    if (!headers.some(Boolean)) throw new Error('Не найдены заголовки колонок');

    return dataRows
      .filter((row) => row.some((value) => value !== null && value !== undefined && value !== ''))
      .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));
  }

  const lines = file.buffer.toString('utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) throw new Error('Файл не содержит строк данных');

  const delimiter = lines[0].includes(';') ? ';' : ',';
  const headers = parseCsvLine(lines[0], delimiter);
  if (!headers.some(Boolean)) throw new Error('Не найдены заголовки колонок');

  return lines.slice(1).map((line): Record<string, unknown> => {
    const values = parseCsvLine(line, delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
  });
};

router.post('/os', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const data = await readImportRows(req.file);

    const imported: any[] = [];
    const errors: string[] = [];

    for (const row of data) {
      try {
        const inventoryNumber = String(row['Инвентарный номер'] || row['inventoryNumber'] || row.id || '');
        const name = String(row['Наименование'] || row.name || '');
        const mol = String(row['МОЛ'] || row.mol || '');
        const cost = parseFloat(String(row['Стоимость'] || row.cost || '0'));
        const accountingDateRaw = row['Дата постановки'] || row['accountingDate'] || null;
        
        // Парсинг даты
        let accountingDate: Date | null = null;
        if (accountingDateRaw) {
          const parsed = new Date(String(accountingDateRaw));
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
