export const Features = () => {
  const features = [
    {
      title: 'Импорт из Excel/1С',
      description: 'Загружайте реестр ОС одним файлом без ручного ввода',
    },
    {
      title: 'Генерация QR-кодов по запросу',
      description: 'Выберите позиции и создайте уникальные метки для нужных активов',
    },
    {
      title: 'Мобильное сканирование',
      description: 'Проводите инвентаризацию со смартфона в любом месте',
    },
    {
      title: 'Контроль статусов',
      description: 'Фиксируйте наличие, отсутствие и состояние ОС',
    },
    {
      title: 'Автоматические отчёты',
      description: 'Получайте ведомости и акты без ручного заполнения',
    },
    {
      title: 'Отслеживание прогресса',
      description: 'Контролируйте процент выполнения инвентаризации в реальном времени',
    },
  ];

  return (
    <section className="section bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Возможности</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Всё необходимое для быстрой и точной инвентаризации
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-2 h-2 bg-primary-700 dark:bg-primary-600 rounded-full mt-2" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
