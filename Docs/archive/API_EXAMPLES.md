# API Examples для 3авхоз.рф

## Генерация QR-кодов для выбранных активов

### Endpoint

```
POST http://localhost:3001/api/import/generate-qr
Content-Type: application/json
```

### Request Body

```json
{
  "assetIds": [
    "asset_id_1",
    "asset_id_2",
    "asset_id_3"
  ]
}
```

### Response (Success)

```json
{
  "success": true,
  "generated": 3,
  "errors": [],
  "assets": [
    {
      "id": "asset_id_1",
      "name": "Компьютер HP ProBook",
      "inventoryNumber": "INV-001",
      "mol": "Иванов И.И.",
      "cost": 45000,
      "status": "active",
      "qrCode": "data:image/png;base64,iVBORw0KGgo...",
      "createdAt": "2026-06-07T08:00:00.000Z",
      "updatedAt": "2026-06-07T08:22:00.000Z"
    }
    // ... остальные активы
  ]
}
```

### Response (Partial Success with Errors)

```json
{
  "success": true,
  "generated": 2,
  "errors": [
    "Актив asset_id_3 не найден"
  ],
  "assets": [
    // ... успешно обработанные активы
  ]
}
```

---

## Пример cURL команды

```bash
curl -X POST http://localhost:3001/api/import/generate-qr \
  -H "Content-Type: application/json" \
  -d "{\"assetIds\":[\"mock_2\",\"mock_3\"]}"
```

---

## Пример использования в JavaScript/TypeScript

```typescript
async function generateQRCodes(assetIds: string[]) {
  const response = await fetch('http://localhost:3001/api/import/generate-qr', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ assetIds }),
  });

  const result = await response.json();
  
  if (result.success) {
    console.log(`✅ Сгенерировано QR-кодов: ${result.generated}`);
    
    if (result.errors.length > 0) {
      console.warn('⚠️ Ошибки:', result.errors);
    }
    
    return result.assets;
  } else {
    throw new Error('QR generation failed');
  }
}

// Использование
const assetIds = ['asset_1', 'asset_2', 'asset_3'];
const assetsWithQR = await generateQRCodes(assetIds);
```

---

## Frontend: Пример компонента для генерации QR

```tsx
import { useState } from 'react';
import { Button } from '@radix-ui/themes';

interface Asset {
  id: string;
  name: string;
  inventoryNumber: string;
  qrCode: string | null;
}

function QRGenerator({ assets }: { assets: Asset[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/import/generate-qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetIds: selectedIds }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Сгенерировано QR: ${result.generated}`);
        // Обновить состояние приложения с новыми QR-кодами
      }
    } catch (error) {
      alert('❌ Ошибка генерации QR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="space-y-2">
        {assets.map(asset => (
          <label key={asset.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.includes(asset.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedIds([...selectedIds, asset.id]);
                } else {
                  setSelectedIds(selectedIds.filter(id => id !== asset.id));
                }
              }}
            />
            <span>{asset.name} ({asset.inventoryNumber})</span>
            {asset.qrCode && <span className="text-green-600">✓ QR</span>}
          </label>
        ))}
      </div>

      <Button
        onClick={handleGenerate}
        disabled={selectedIds.length === 0 || loading}
        className="mt-4"
      >
        {loading ? 'Генерация...' : `Сгенерировать QR (${selectedIds.length})`}
      </Button>
    </div>
  );
}
```

---

## Типичный workflow

1. **Импорт реестра ОС:**

   ```bash
   POST /api/import/os
   # Загружается Excel, создаются активы БЕЗ QR-кодов
   ```

2. **Получение списка активов:**

   ```bash
   GET /api/assets
   # Пользователь видит список активов
   ```

3. **Пользователь выбирает активы** (через UI с чекбоксами)

4. **Генерация QR для выбранных:**

   ```bash
   POST /api/import/generate-qr
   Body: { "assetIds": ["id1", "id2", "id3"] }
   ```

5. **Активы обновляются с QR-кодами** и готовы к печати/инвентаризации
