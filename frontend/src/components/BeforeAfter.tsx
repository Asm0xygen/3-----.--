export const BeforeAfter = () => {
  const before = [
    'Бумажные инвентаризационные ведомости',
    'Ручной поиск каждого актива в помещениях',
    'Ручное заполнение данных в Excel',
    'Ошибки при переписывании инвентарных номеров',
    'Недели на подготовку отчётов',
  ];

  const after = [
    'Цифровые формы в онлайн доступе',
    'Мгновенное сканирование QR-кодов',
    'Автоматическая синхронизация данных',
    'Точность благодаря QR-сканированию',
    'Отчёты готовы за минуты',
  ];

  return (
    <section className="section bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Сравнение подходов</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* BEFORE */}
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Традиционный подход</h3>
            </div>
            
            <ul className="space-y-4">
              {before.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AFTER */}
          <div className="card p-8 border-primary-200 dark:border-primary-900 bg-primary-50 dark:!bg-primary-950/30">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-primary-200 dark:border-primary-900">
              <div className="w-10 h-10 bg-primary-700 dark:bg-primary-600 rounded-md flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">С 3авхоз.рф</h3>
            </div>
            
            <ul className="space-y-4">
              {after.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded bg-primary-700 dark:bg-primary-600 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
