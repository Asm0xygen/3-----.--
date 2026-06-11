export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Загрузка реестра ОС',
      description: 'Загрузите Excel или выгрузку из 1С с перечнем основных средств',
    },
    {
      number: 2,
      title: 'Генерация QR-кодов',
      description: 'Выберите позиции и сгенерируйте QR-коды для выбранных объектов',
    },
    {
      number: 3,
      title: 'Мобильная инвентаризация',
      description: 'Сканируйте QR-коды смартфоном и фиксируйте наличие ОС',
    },
    {
      number: 4,
      title: 'Автоматические отчёты',
      description: 'Получайте готовые инвентаризационные ведомости и акты',
    },
  ];

  return (
    <section className="section bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Как это работает</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Простой процесс от загрузки данных до готовых документов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700 -translate-x-1/2 z-0" />
              )}
              
              <div className="card p-6 relative z-10 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-700 dark:bg-primary-600 text-white rounded-md flex items-center justify-center font-semibold">
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
