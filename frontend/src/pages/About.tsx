export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Сервис, выросший из реальной работы
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            3авхоз.рф появился благодаря более чем 15-летнему опыту работы в образовательном учреждении.
          </p>

          <div className="space-y-16">
            <section>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                За это время стало очевидно, что учёт основных средств и проведение инвентаризации остаются одними из самых трудоёмких задач для завхоза. И дело не только в самом имуществе. Большая часть времени уходит на бумаги, согласования и взаимодействие с бухгалтерией.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Особенно хорошо эту проблему понимают сотрудники школ, детских садов и других образовательных учреждений, работающих с централизованной бухгалтерией.
              </p>
            </section>

            <section className="border-l-4 border-primary-600 dark:border-primary-500 pl-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Инвентаризация — это не один день работы
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Обычно всё начинается с получения реестра основных средств.
                </p>
                <p>
                  Нужно запросить актуальные данные в бухгалтерии, дождаться выгрузки, проверить ведомости, распечатать документы и подготовить материалы для комиссии.
                </p>
                <p>
                  После этого начинается обход кабинетов, мастерских, складов и других помещений. Необходимо найти имущество, сверить инвентарные номера, проверить фактическое наличие объектов и зафиксировать результаты.
                </p>
                <p>
                  Но даже после завершения проверки работа не заканчивается.
                </p>
                <p>
                  Появляются расхождения, уточнения, исправления и новые согласования.
                </p>
                <p>
                  Часто приходится снова обращаться в бухгалтерию, уточнять данные, перепечатывать документы или вносить изменения в уже подготовленные ведомости.
                </p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Бумаги отнимают больше времени, чем имущество
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  За годы работы стало понятно, что основная проблема заключается не в самой инвентаризации.
                </p>
                <p>
                  Найти компьютер, проектор или станок зачастую проще, чем подготовить и согласовать все необходимые документы.
                </p>
                <p>
                  Поездки в централизованную бухгалтерию, ожидание нужных ведомостей, исправления в актах, повторная печать документов, поиск актуальной версии файла — всё это отнимает часы и дни рабочего времени.
                </p>
                <p>
                  Вместо того чтобы заниматься хозяйственными вопросами и развитием материальной базы учреждения, завхоз вынужден заниматься бумажным документооборотом.
                </p>
              </div>
            </section>

            <section className="border-l-4 border-primary-600 dark:border-primary-500 pl-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Мы решили упростить этот процесс
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  При создании сервиса мы поставили перед собой простую задачу:
                </p>
                <p className="text-xl font-semibold text-primary-700 dark:text-primary-500">
                  сократить время на рутинные операции и помочь навести порядок в основных средствах.
                </p>
                <p>
                  Без сложных систем. Без долгого обучения.
                </p>
                <p>
                  Без необходимости менять привычный бухгалтерский учёт.
                </p>
                <p>
                  3авхоз.рф не заменяет 1С и не вмешивается в работу бухгалтерии.
                </p>
                <p>
                  Сервис помогает работать с уже существующим реестром основных средств удобнее и быстрее.
                </p>
              </div>
            </section>

            <section className="bg-primary-50 dark:bg-gray-800 rounded-xl p-8 border border-primary-200 dark:border-gray-700">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Как работает 3авхоз.рф
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                В основе сервиса лежит простой сценарий.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                    Загрузите реестр ОС из 1С или Excel.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                    Получите единый цифровой реестр имущества организации.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                    Сформируйте QR-коды для необходимых объектов.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                    Проводите инвентаризацию со смартфона без бумажных ведомостей и ручных отметок.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-700 dark:bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                    Получайте готовые результаты, отчёты и документы автоматически.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Для кого создан сервис
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Для завхозов.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Для специалистов административно-хозяйственной части.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Для материально ответственных лиц.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Для руководителей образовательных учреждений.
                  </p>
                </div>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
                Для всех, кто отвечает за основные средства организации и хочет тратить меньше времени на бумажную работу.
              </p>
            </section>

            <section className="border-l-4 border-primary-600 dark:border-primary-500 pl-6">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Что мы считаем главным результатом
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Мы не стремимся создать ещё одну сложную информационную систему.
                </p>
                <p>
                  Наша цель гораздо проще.
                </p>
                <p>
                  Если завхозу больше не нужно искать нужную ведомость среди стопки документов.
                </p>
                <p>
                  Если не приходится тратить время на повторное заполнение одних и тех же данных.
                </p>
                <p>
                  Если результаты инвентаризации доступны сразу после проверки имущества.
                </p>
                <p>
                  Если количество поездок, согласований и ручных исправлений становится меньше.
                </p>
                <p className="font-semibold text-lg">
                  Значит сервис работает именно так, как задумывался.
                </p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Почему появился 3авхоз.рф
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Потому что за годы работы стало понятно: учёт основных средств должен помогать управлять имуществом, а не создавать дополнительную нагрузку.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Мы создали сервис, который позволяет держать основные средства под контролем, быстрее проводить инвентаризацию и освобождать время для действительно важных задач.
              </p>
              
              <div className="bg-primary-50 dark:bg-gray-700 rounded-lg p-6 border border-primary-200 dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Наш принцип
                </h3>
                <p className="text-xl font-semibold text-primary-700 dark:text-primary-500 mb-4">
                  Загрузил реестр ОС → управляй имуществом → проведи инвентаризацию → получи отчёты и документы.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Меньше бумаг. Меньше согласований. Больше порядка.
                </p>
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary-700 to-primary-600 dark:from-primary-800 dark:to-primary-700 rounded-xl p-8 text-white text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">
                Готовы попробовать?
              </h2>
              <p className="text-lg mb-6 text-primary-100 dark:text-primary-200">
                Начните использовать 3авхоз.рф уже сегодня
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#demo" className="bg-white text-primary-700 dark:text-primary-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors inline-block">
                  Попробовать демо
                </a>
                <a href="mailto:info@3авхоз.рф" className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border-2 border-white hover:bg-white hover:text-primary-700 dark:hover:text-primary-800 transition-colors inline-block">
                  Связаться с нами
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
