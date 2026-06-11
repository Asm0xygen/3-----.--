export const Hero = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container-custom section">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center mb-6">
            Современный учёт и инвентаризация основных средств
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-10 max-w-3xl mx-auto">
            Загрузите реестр ОС из 1С или Excel, используйте QR-коды для быстрого доступа к информации об имуществе, проводите инвентаризацию со смартфона и формируйте документы автоматически.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={scrollToDemo}
              className="btn btn-primary px-8 py-3"
            >
              Начать бесплатно
            </button>
            <button 
              onClick={scrollToDemo}
              className="btn btn-secondary px-8 py-3"
            >
              Посмотреть демо
            </button>
          </div>

          {/* KEY MESSAGE - строгий стиль */}
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-700 dark:bg-primary-600 text-white rounded-md flex items-center justify-center font-semibold text-lg">
                  1
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Загрузка реестра</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Excel или 1С</div>
                </div>
              </div>
              
              <div className="hidden lg:block text-gray-400 dark:text-gray-600 text-2xl">→</div>
              
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-700 dark:bg-primary-600 text-white rounded-md flex items-center justify-center font-semibold text-lg">
                  2
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Сканирование QR</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">С любого смартфона</div>
                </div>
              </div>
              
              <div className="hidden lg:block text-gray-400 dark:text-gray-600 text-2xl">→</div>
              
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-700 dark:bg-primary-600 text-white rounded-md flex items-center justify-center font-semibold text-lg">
                  3
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">Готовые отчёты</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Автоматически</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
