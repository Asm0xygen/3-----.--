import { useState } from 'react';
import { Button } from './ui/Button';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Progress from '@radix-ui/react-progress';
import QRCode from 'qrcode';

const demoAssets: Asset[] = [
  { id: '1', name: 'Компьютер Dell Optiplex', inventoryNumber: 'ОС-0001', mol: 'Иванов И.И.', room: 'Кабинет 204', cost: 45000, accountingDate: '2023-01-15', status: 'active' },
  { id: '2', name: 'Принтер HP LaserJet', inventoryNumber: 'ОС-0002', mol: 'Петров П.П.', room: 'Кабинет 204', cost: 25000, accountingDate: '2023-02-20', status: 'active' },
  { id: '3', name: 'Стол офисный', inventoryNumber: 'ОС-0003', mol: 'Сидоров С.С.', room: 'Кабинет 204', cost: 15000, accountingDate: '2023-03-10', status: 'active' },
  { id: '4', name: 'Кресло офисное', inventoryNumber: 'ОС-0004', mol: 'Сидоров С.С.', room: 'Кабинет 204', cost: 8000, accountingDate: '2023-03-10', status: 'active' },
  { id: '5', name: 'Монитор LG 24"', inventoryNumber: 'ОС-0005', mol: 'Иванов И.И.', room: 'Кабинет 204', cost: 12000, accountingDate: '2023-04-05', status: 'active' },
];

interface Asset {
  id: string;
  name: string;
  inventoryNumber: string;
  mol: string;
  room: string;
  cost: number;
  accountingDate?: string;
  status: string;
  qrCode?: string;
}

interface Inventory {
  id: string;
  name: string;
  totalAssets: number;
  foundAssets: number;
  missingAssets: number;
  percentage: number;
}

export const Demo = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleMockUpload = async () => {
    const assetsWithQR = await Promise.all(
      demoAssets.map(async (asset) => ({
        ...asset,
        qrCode: await QRCode.toDataURL(asset.inventoryNumber),
      }))
    );

    setAssets(assetsWithQR);
    setActiveTab('qr');
  };

  const showQR = (asset: Asset) => {
    setSelectedAsset(asset);
    setDialogOpen(true);
  };

  const handleStartInventory = () => {
    setInventory({
      id: '1',
      name: 'Инвентаризация 2024',
      totalAssets: assets.length,
      foundAssets: 0,
      missingAssets: assets.length,
      percentage: 0,
    });
    setActiveTab('scan');
  };

  const handleScan = (assetId: string) => {
    const asset = assets.find((item) => item.id === assetId);

    if (asset && asset.status !== 'found') {
      const updatedAssets = assets.map(a =>
        a.id === asset.id ? { ...a, status: 'found' } : a
      );
      setAssets(updatedAssets);

      const foundCount = updatedAssets.filter(a => a.status === 'found').length;
      const percentage = Math.round((foundCount / updatedAssets.length) * 100);

      setInventory(prev => prev ? {
        ...prev,
        foundAssets: foundCount,
        missingAssets: updatedAssets.length - foundCount,
        percentage,
      } : null);

      if (percentage === 100) {
        setActiveTab('report');
      }
    }
  };

  const downloadReport = () => {
    if (!inventory) return;

    const report = [
      'Инвентаризационная ведомость',
      inventory.name,
      '',
      'Инвентарный номер;Наименование;Результат',
      ...assets.map((asset) => `${asset.inventoryNumber};${asset.name};${asset.status === 'found' ? 'Найдено' : 'Отсутствует'}`),
      '',
      `Всего;${inventory.totalAssets}`,
      `Найдено;${inventory.foundAssets}`,
      `Отсутствует;${inventory.missingAssets}`,
    ].join('\r\n');
    const bytes = Uint8Array.from([...report].map((character) => {
      const code = character.charCodeAt(0);
      if (code <= 0x7f) return code;
      if (code === 0x0401) return 0xa8;
      if (code === 0x0451) return 0xb8;
      if (code >= 0x0410 && code <= 0x044f) return code - 0x350;
      return 0x3f;
    }));
    const url = URL.createObjectURL(new Blob([bytes], { type: 'text/csv;charset=windows-1251' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'инвентаризационная-ведомость.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="demo" className="section bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Интерактивное демо</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Сценарий комнатной инвентаризации: тестовый реестр, QR-метки, проверка кабинета и ведомость. Данные не отправляются на сервер.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="bg-white dark:bg-gray-800 rounded-xl shadow-medium border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
              aria-label="Шаги демонстрации">
              <Tabs.Trigger
                value="upload"
                className="flex-1 px-6 py-4 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-500 data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-500 transition-colors"
              >
                1. Загрузка
              </Tabs.Trigger>
              <Tabs.Trigger
                value="qr"
                disabled={assets.length === 0}
                className="flex-1 px-6 py-4 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-500 data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                2. QR-коды
              </Tabs.Trigger>
              <Tabs.Trigger
                value="scan"
                disabled={!inventory}
                className="flex-1 px-6 py-4 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-500 data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                3. Сканирование
              </Tabs.Trigger>
              <Tabs.Trigger
                value="report"
                disabled={!inventory || inventory.percentage < 100}
                className="flex-1 px-6 py-4 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-500 data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                4. Отчёт
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="upload" className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center text-3xl font-bold">↑</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Загрузите тестовый реестр ОС</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  В демо используется подготовленный CSV-файл с пятью объектами имущества.
                </p>
                <Button size="lg" onClick={handleMockUpload}>
                  Загрузить тестовый реестр
                </Button>
              </div>
            </Tabs.Content>

            <Tabs.Content value="qr" className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">QR-коды сгенерированы</h3>
              <div className="space-y-4 mb-8 max-h-96 overflow-y-auto">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{asset.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {asset.inventoryNumber} • {asset.room} • {asset.cost.toLocaleString()} ₽
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => showQR(asset)}>
                      Показать QR
                    </Button>
                  </div>
                ))}
              </div>
              <Button size="lg" onClick={handleStartInventory} className="w-full">
                Начать инвентаризацию
              </Button>
            </Tabs.Content>

            <Tabs.Content value="scan" className="p-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Инвентаризация: кабинет 204</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Нажмите «Найдено» у объекта. Это имитирует успешное сканирование QR-метки в кабинете 204.</p>
              
              {inventory && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Прогресс инвентаризации</span>
                    <span>{inventory.foundAssets} из {inventory.totalAssets}</span>
                  </div>
                  <Progress.Root className="relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-full h-4" value={inventory.percentage}>
                    <Progress.Indicator
                      className="bg-primary-600 dark:bg-primary-500 h-full transition-transform duration-300 ease-out"
                      style={{ transform: `translateX(-${100 - inventory.percentage}%)` }}
                    />
                  </Progress.Root>
                  <div className="text-center mt-2 font-bold text-primary-600 dark:text-primary-500">
                    {inventory.percentage}%
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      asset.status === 'found' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${asset.status === 'found' ? '✅' : '⭕'}`}>
                        {asset.status === 'found' ? '✅' : '⭕'}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{asset.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{asset.inventoryNumber}</div>
                      </div>
                    </div>
                    {asset.status === 'found' ? (
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">Найдено</span>
                    ) : (
                      <Button size="sm" onClick={() => handleScan(asset.id)}>Найдено</Button>
                    )}
                  </div>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="report" className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center text-3xl font-bold">✓</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Инвентаризация завершена!</h3>
                <p className="text-gray-600 dark:text-gray-400">Отчёт готов к выгрузке</p>
              </div>

              {inventory && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8">
                  <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">{inventory.name}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-500">{inventory.totalAssets}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Всего активов</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">{inventory.foundAssets}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Найдено</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-500">{inventory.missingAssets}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Отсутствует</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-500">{inventory.percentage}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Выполнено</div>
                    </div>
                  </div>
                </div>
              )}

              <Button size="lg" className="w-full" onClick={downloadReport}>
                Скачать отчёт
              </Button>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      {/* QR Dialog */}
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {selectedAsset && (
              <div className="text-center">
                <Dialog.Title className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  {selectedAsset.name}
                </Dialog.Title>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-4">
                  <img src={selectedAsset.qrCode} alt="QR Code" className="w-full max-w-xs mx-auto" />
                </div>
                <div className="text-left bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Инвентарный номер</div>
                  <div className="font-mono font-bold text-xl text-gray-900 dark:text-gray-100">{selectedAsset.inventoryNumber}</div>
                </div>
                <Dialog.Close asChild>
                  <Button variant="secondary" className="w-full">
                    Закрыть
                  </Button>
                </Dialog.Close>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
};
