export const About = () => {
  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#17221d]">
      <div className="container-custom py-16 md:py-[82px]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-[13px] font-extrabold uppercase tracking-wider text-[#14623d]">О сервисе</p>
            <h1 className="mb-6 text-[42px] font-semibold leading-[1.03] tracking-[-.055em] text-[#17221d] md:text-[60px]">
            Сервис, выросший из реальной работы
            </h1>
            <p className="text-xl leading-relaxed text-[#617067]">
            3авхоз.рф появился благодаря более чем 15-летнему опыту работы в образовательном учреждении.
            </p>
          </div>

          <div className="space-y-16">
            <section>
              <p className="mb-4 text-lg leading-relaxed text-[#43534a]">
                За это время стало очевидно, что учёт основных средств и проведение инвентаризации остаются одними из самых трудоёмких задач для завхоза. И дело не только в самом имуществе. Большая часть времени уходит на бумаги, согласования и взаимодействие с бухгалтерией.
              </p>
              <p className="text-lg leading-relaxed text-[#43534a]">
                Особенно хорошо эту проблему понимают сотрудники школ, детских садов и других образовательных учреждений, работающих с централизованной бухгалтерией.
              </p>
            </section>

            <section className="border-l-4 border-[#14623d] pl-6">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Инвентаризация — это не один день работы
              </h2>
              <div className="space-y-4 leading-relaxed text-[#43534a]">
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

            <section className="rounded-[15px] border border-[#dce5de] bg-white p-8 md:p-10">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Бумаги отнимают больше времени, чем имущество
              </h2>
              <div className="space-y-4 leading-relaxed text-[#43534a]">
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

            <section className="border-l-4 border-[#14623d] pl-6">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Мы решили упростить этот процесс
              </h2>
              <div className="space-y-4 leading-relaxed text-[#43534a]">
                <p>
                  При создании сервиса мы поставили перед собой простую задачу:
                </p>
                <p className="text-xl font-semibold text-[#14623d]">
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

            <section className="rounded-[15px] border border-[#d5e3d6] bg-[#eaf3eb] p-8 md:p-10">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Как работает 3авхоз.рф
              </h2>
              <p className="mb-6 leading-relaxed text-[#43534a]">
                В основе сервиса лежит простой сценарий.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14623d] font-bold text-white">1</div>
                  <p className="pt-1 leading-relaxed text-[#43534a]">
                    Загрузите реестр ОС из 1С или Excel.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14623d] font-bold text-white">2</div>
                  <p className="pt-1 leading-relaxed text-[#43534a]">
                    Получите единый цифровой реестр имущества организации.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14623d] font-bold text-white">3</div>
                  <p className="pt-1 leading-relaxed text-[#43534a]">
                    Сформируйте QR-коды для необходимых объектов.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14623d] font-bold text-white">4</div>
                  <p className="pt-1 leading-relaxed text-[#43534a]">
                    Проводите инвентаризацию со смартфона без бумажных ведомостей и ручных отметок.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14623d] font-bold text-white">5</div>
                  <p className="pt-1 leading-relaxed text-[#43534a]">
                    Получайте готовые результаты, отчёты и документы автоматически.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Для кого создан сервис
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-[13px] border border-[#d5e3d6] bg-[#f9fcf9] p-6">
                  <p className="leading-relaxed text-[#43534a]">
                    Для завхозов.
                  </p>
                </div>
                <div className="rounded-[13px] border border-[#d5e3d6] bg-[#f9fcf9] p-6">
                  <p className="leading-relaxed text-[#43534a]">
                    Для специалистов административно-хозяйственной части.
                  </p>
                </div>
                <div className="rounded-[13px] border border-[#d5e3d6] bg-[#f9fcf9] p-6">
                  <p className="leading-relaxed text-[#43534a]">
                    Для материально ответственных лиц.
                  </p>
                </div>
                <div className="rounded-[13px] border border-[#d5e3d6] bg-[#f9fcf9] p-6">
                  <p className="leading-relaxed text-[#43534a]">
                    Для руководителей образовательных учреждений.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-lg leading-relaxed text-[#43534a]">
                Для всех, кто отвечает за основные средства организации и хочет тратить меньше времени на бумажную работу.
              </p>
            </section>

            <section className="border-l-4 border-[#14623d] pl-6">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Что мы считаем главным результатом
              </h2>
              <div className="space-y-4 leading-relaxed text-[#43534a]">
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
                <p className="text-lg font-semibold text-[#17221d]">
                  Значит сервис работает именно так, как задумывался.
                </p>
              </div>
            </section>

            <section className="rounded-[15px] border border-[#dce5de] bg-white p-8 md:p-10">
              <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[#17221d]">
                Почему появился 3авхоз.рф
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-[#43534a]">
                Потому что за годы работы стало понятно: учёт основных средств должен помогать управлять имуществом, а не создавать дополнительную нагрузку.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-[#43534a]">
                Мы создали сервис, который позволяет держать основные средства под контролем, быстрее проводить инвентаризацию и освобождать время для действительно важных задач.
              </p>
              
              <div className="rounded-[13px] border border-[#d5e3d6] bg-[#eaf3eb] p-6">
                <h3 className="mb-4 text-xl font-semibold text-[#17221d]">
                  Наш принцип
                </h3>
                <p className="mb-4 text-xl font-semibold text-[#14623d]">
                  Загрузил реестр ОС → управляй имуществом → проведи инвентаризацию → получи отчёты и документы.
                </p>
                <p className="text-lg text-[#43534a]">
                  Меньше бумаг. Меньше согласований. Больше порядка.
                </p>
              </div>
            </section>

            <section className="rounded-[15px] bg-[#16291e] p-8 text-center text-white md:p-12">
              <h2 className="mb-4 text-3xl font-semibold text-white">
                Готовы попробовать?
              </h2>
              <p className="mb-6 text-lg text-[#bfcec3]">
                Начните использовать 3авхоз.рф уже сегодня
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#demo" className="inline-block rounded-[9px] bg-[#fa7545] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#e55e31]">
                  Попробовать демо
                </a>
                <a href="mailto:info@3авхоз.рф" className="inline-block rounded-[9px] border border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#14623d]">
                  Связаться с нами
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
