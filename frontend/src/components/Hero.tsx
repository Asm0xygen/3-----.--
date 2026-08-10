export const Hero = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="absolute -top-36 -right-24 w-96 h-96 rounded-full bg-primary-100/70 dark:bg-primary-900/20 blur-3xl" />
      <div className="container-custom section relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="badge badge-blue mb-6">Оперативный учёт основных средств</div>
            <h1 className="mb-6 text-5xl md:text-6xl">Знайте, где находится каждое ОС.</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              3авхоз превращает выгрузку из бухгалтерии в рабочую систему: имущество, помещения, перемещения, диагностика, инвентаризация и документы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
            <button 
              onClick={scrollToDemo}
              className="btn btn-primary px-8 py-3"
            >
              Открыть интерактивное демо
            </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Работает поверх вашей бухгалтерской системы. Стоимость и бухучёт не изменяются.</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-hard p-5 md:p-7">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-5 mb-5"><div><p className="text-xs text-gray-500 mb-1">ООО «Север»</p><p className="font-semibold">Контроль имущества</p></div><span className="badge badge-blue">август 2026</span></div>
            <div className="grid grid-cols-3 gap-3 mb-5"><div className="bg-white dark:bg-gray-800 rounded-lg p-3"><b className="text-xl">1 248</b><span className="block text-xs text-gray-500 mt-1">объектов</span></div><div className="bg-white dark:bg-gray-800 rounded-lg p-3"><b className="text-xl text-green-700 dark:text-green-400">96%</b><span className="block text-xs text-gray-500 mt-1">проверено</span></div><div className="bg-white dark:bg-gray-800 rounded-lg p-3"><b className="text-xl text-amber-700 dark:text-amber-400">12</b><span className="block text-xs text-gray-500 mt-1">на контроле</span></div></div>
            <div className="space-y-2"><div className="flex justify-between text-sm bg-white dark:bg-gray-800 rounded-lg p-3"><span>Кабинет 204</span><span className="text-green-700 dark:text-green-400 font-medium">38 из 38</span></div><div className="flex justify-between text-sm bg-white dark:bg-gray-800 rounded-lg p-3"><span>Склад</span><span className="text-amber-700 dark:text-amber-400 font-medium">42 из 47</span></div><div className="flex justify-between text-sm bg-white dark:bg-gray-800 rounded-lg p-3"><span>Диагностика</span><span className="text-gray-500">6 объектов</span></div></div>
            </div>
          </div>
        </div>
    </section>
  );
};
