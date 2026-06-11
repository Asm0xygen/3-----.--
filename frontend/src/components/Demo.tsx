import { useState } from 'react';
import { Button } from './ui/Button';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Progress from '@radix-ui/react-progress';
import QRCode from 'qrcode';

interface Asset {
  id: string;
  name: string;
  inventoryNumber: string;
  mol: string;
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
  const [scanInput, setScanInput] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // STEP 1: Upload and import demo data
  const handleMockUpload = async () => {
    const mockData: Asset[] = [
      { id: '1', name: 'Компьютер Dell Optiplex', inventoryNumber: 'ОС-0001', mol: 'Иванов И.И.', cost: 45000, accountingDate: '2023-01-15', status: 'active' },
      { id: '2', name: 'Принтер HP LaserJet', inventoryNumber: 'ОС-0002', mol: 'Петров П.П.', cost: 25000, accountingDate: '2023-02-20', status: 'active' },
      { id: '3', name: 'Стол офисный', inventoryNumber: 'ОС-0003', mol: 'Сидоров С.С.', cost: 15000, accountingDate: '2023-03-10', status: 'active' },
      { id: '4', name: 'Кресло офисное', inventoryNumber: 'ОС-0004', mol: 'Сидоров С.С.', cost: 8000, accountingDate: '2023-03-10', status: 'active' },
      { id: '5', name: 'Монитор LG 24"', inventoryNumber: 'ОС-0005', mol: 'Иванов И.И.', cost: 12000, accountingDate: '2023-04-05', status: 'active' },
    ];

    // Generate QR codes
    const assetsWithQR = await Promise.all(
      mockData.map(async (asset) => ({
        ...asset,
        qrCode: await QRCode.toDataURL(asset.inventoryNumber),
      }))
    );

    setAssets(assetsWithQR);
    setActiveTab('qr');
  };

  // STEP 2: Show QR code dialog
  const showQR = (asset: Asset) => {
    setSelectedAsset(asset);
    setDialogOpen(true);
  };

  // STEP 3: Start inventory
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

  // STEP 3: Scan asset
  const handleScan = () => {
    const asset = assets.find(a => a.inventoryNumber === scanInput.trim().toUpperCase());
    
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

    setScanInput('');
  };

  return (
    <section id="demo" className="section bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Интерактивное демо</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Попробуйте сами: загрузите данные, сгенерируйте QR, отсканируйте активы
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
                <div className="text-6xl mb-6">📤</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Загрузите реестр основных средств</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Загрузите Excel или CSV файл с данными об основных средствах
                </p>
                <Button size="lg" onClick={handleMockUpload}>
                  Загрузить демо-данные
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
                        {asset.inventoryNumber} • {asset.accountingDate ? new Date(asset.accountingDate).toLocaleDateString('ru-RU') : 'Дата не указана'} • {asset.cost.toLocaleString()} ₽
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
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Сканирование QR-кодов</h3>
              
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

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Отсканируйте QR-код или введите инвентарный номер
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={scanInput}
                    onChange={(e) => setScanInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    placeholder="Например: ОС-0001"
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Button onClick={handleScan} disabled={!scanInput}>
                    Сканировать
                  </Button>
                </div>
              </div>

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
                    {asset.status === 'found' && (
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">Найдено</span>
                    )}
                  </div>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="report" className="p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎉</div>
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

              <Button size="lg" className="w-full">
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
