export const Features = () => {
  const features = [
    {
      title: 'Реестр имущества',
      description: 'Карточки ОС с инвентарным и серийным номером, статусом, помещением и сроком использования.',
    },
    {
      title: 'Помещения и перемещения',
      description: 'Реестр помещений и неизменяемая история: откуда, куда, когда и по какой причине переместили ОС.',
    },
    {
      title: 'QR и Code128',
      description: 'Массовая генерация и печать меток. Быстрый поиск и открытие карточки объекта при сканировании.',
    },
    {
      title: 'Диагностика',
      description: 'Фиксируйте состояние имущества для подготовки к ремонту или списанию.',
    },
    {
      title: 'Инвентаризация',
      description: 'Полная проверка или проверка комнат: найдено, отсутствует, не в своём помещении.',
    },
    {
      title: 'Документы и аналитика',
      description: 'Книга учёта, ведомости, акты и дашборд для контроля имущества организации.',
    },
  ];

  return (
    <section className="section bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Возможности</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Сервис отвечает за фактическое имущество. Бухгалтерский учёт, амортизация и стоимость остаются в вашей учётной системе.
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
