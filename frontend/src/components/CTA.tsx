export const CTA = () => {
  return (
    <section className="section bg-primary-700 dark:bg-primary-800 border-y border-primary-800 dark:border-primary-900">
      <div className="container-custom text-center">
        <h2 className="text-white mb-6">
          Начните цифровую инвентаризацию сегодня
        </h2>
        <p className="text-lg text-primary-100 dark:text-primary-200 mb-8 max-w-2xl mx-auto">
          Загрузил реестр ОС → отсканировал QR-коды → получил отчёты и документы
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-700 dark:text-primary-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
            Начать бесплатно
          </button>
          <button className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border-2 border-white hover:bg-white hover:text-primary-700 dark:hover:text-primary-800 transition-colors">
            Связаться с нами
          </button>
        </div>
      </div>
    </section>
  );
};
