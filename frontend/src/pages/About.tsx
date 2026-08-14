const workflowSteps = [
  ['01', 'Получить выгрузку', 'Начать с актуального реестра основных средств, который уже использует бухгалтерия.'],
  ['02', 'Собрать рабочий список', 'Проверить данные и подготовить понятный реестр имущества организации.'],
  ['03', 'Провести проверку', 'Сверить имущество в кабинетах, мастерских, складах и других помещениях.'],
  ['04', 'Разобрать результат', 'Зафиксировать итоги проверки, чтобы предметно обсуждать расхождения и следующие действия.'],
];

const audiences = [
  'Завхозов.',
  'Специалистов административно-хозяйственной части.',
  'Материально ответственных лиц.',
  'Руководителей образовательных учреждений.',
];

export const About = () => {
  return (
    <main className="landing-page landing-about-page" id="main-content">
      <section className="landing-about-hero" aria-labelledby="about-title">
        <div className="landing-wrap landing-about-hero-content">
          <p className="landing-eyebrow">О сервисе</p>
          <h1 id="about-title">
            Сервис, выросший из <span className="landing-title-highlight">реальной работы.</span>
          </h1>
          <p className="landing-hero-copy">
            Завхоз.рф появился благодаря более чем 15-летнему опыту работы в образовательном учреждении.
          </p>
          <div className="landing-about-intro">
            <p>
              За это время стало очевидно, что учёт основных средств и проведение инвентаризации остаются одними из самых трудоёмких задач для завхоза. Большая часть времени уходит на бумаги, согласования и взаимодействие с бухгалтерией.
            </p>
            <p>
              Особенно хорошо эту проблему понимают сотрудники школ, детских садов и других образовательных учреждений, работающих с централизованной бухгалтерией.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section" aria-labelledby="process-title">
        <div className="landing-wrap">
          <div className="landing-section-top">
            <div>
              <p className="landing-eyebrow">Реальный процесс</p>
              <h2 id="process-title">Инвентаризация — это не один день работы.</h2>
            </div>
            <p>Работа начинается задолго до обхода помещений и продолжается после него: с уточнениями, сверками и согласованием результата.</p>
          </div>
          <div className="landing-about-process-grid">
            <article className="landing-about-process-card">
              <span>01</span>
              <h3>Получить и проверить реестр</h3>
              <p>Нужно запросить актуальные данные в бухгалтерии, дождаться выгрузки, сверить ведомости и подготовить материалы для комиссии.</p>
            </article>
            <article className="landing-about-process-card">
              <span>02</span>
              <h3>Проверить имущество на местах</h3>
              <p>Затем начинается обход кабинетов, мастерских, складов и других помещений: поиск объектов, сверка номеров и фиксация факта.</p>
            </article>
            <article className="landing-about-process-card">
              <span>03</span>
              <h3>Разобрать расхождения</h3>
              <p>После проверки появляются уточнения, исправления и новые согласования. Часто приходится снова обращаться к исходным данным.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-section landing-about-problem" aria-labelledby="problem-title">
        <div className="landing-wrap landing-section-top">
          <div>
            <p className="landing-eyebrow">Наблюдение из практики</p>
            <h2 id="problem-title">Бумаги отнимают больше времени, чем имущество.</h2>
          </div>
          <div className="landing-about-copy">
            <p>Найти компьютер, проектор или станок зачастую проще, чем подготовить и согласовать необходимые документы.</p>
            <p>Поездки в централизованную бухгалтерию, ожидание ведомостей, исправления в актах, повторная печать и поиск актуальной версии файла отнимают часы и дни рабочего времени.</p>
          </div>
        </div>
      </section>

      <section className="landing-section" aria-labelledby="approach-title">
        <div className="landing-wrap">
          <div className="landing-about-statement">
            <p className="landing-eyebrow">Подход</p>
            <h2 id="approach-title">Мы решили упростить этот процесс.</h2>
            <p className="landing-about-lead">Сократить время на рутинные операции и помочь навести порядок в основных средствах.</p>
            <div className="landing-about-statement-copy">
              <p>Без сложных систем, долгого обучения и необходимости менять привычный бухгалтерский учёт.</p>
              <p>Завхоз.рф не заменяет бухгалтерскую систему и не вмешивается в её работу. Сервис помогает работать с уже существующим реестром основных средств удобнее и последовательнее.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section landing-about-workflow" aria-labelledby="workflow-title">
        <div className="landing-wrap">
          <div className="landing-section-top">
            <div>
              <p className="landing-eyebrow">Рабочий путь</p>
              <h2 id="workflow-title">От бухгалтерской выгрузки до результата проверки.</h2>
            </div>
            <p>Пилот строится вокруг простого и понятного цикла: использовать исходные данные, организовать проверку имущества и получить основу для дальнейшей сверки.</p>
          </div>
          <div className="landing-steps">
            {workflowSteps.map(([number, title, description]) => (
              <article className="landing-step" key={number}>
                <span className="landing-step-number">{number}</span>
                <span className="landing-step-icon" aria-hidden="true">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section" aria-labelledby="audience-title">
        <div className="landing-wrap">
          <div className="landing-section-top">
            <div>
              <p className="landing-eyebrow">Для кого</p>
              <h2 id="audience-title">Для тех, кто отвечает за имущество организации.</h2>
            </div>
            <p>Для всех, кто хочет тратить меньше времени на бумажную работу и лучше понимать фактическое состояние основных средств.</p>
          </div>
          <div className="landing-about-audience-grid">
            {audiences.map((audience, index) => (
              <article className="landing-about-audience-card" key={audience}>
                <span>0{index + 1}</span>
                <p>{audience}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-about-outcome" aria-labelledby="outcome-title">
        <div className="landing-wrap landing-about-outcome-grid">
          <div>
            <p className="landing-eyebrow">Главный результат</p>
            <h2 id="outcome-title">Не ещё одна сложная система, а ясность в работе.</h2>
          </div>
          <div className="landing-about-copy">
            <p>Если завхозу не нужно искать нужную ведомость среди стопки документов и повторно заполнять одни и те же данные, работа становится спокойнее.</p>
            <p>Если после проверки имущества есть понятный результат для дальнейшей сверки, уменьшается количество лишних поездок, согласований и ручных исправлений.</p>
            <p className="landing-about-emphasis">Именно так сервис должен помогать в повседневной работе.</p>
          </div>
        </div>
      </section>

      <section className="landing-section" aria-labelledby="origin-title">
        <div className="landing-wrap landing-about-origin">
          <div>
            <p className="landing-eyebrow">Почему появился Завхоз.рф</p>
            <h2 id="origin-title">Учёт основных средств должен помогать управлять имуществом.</h2>
          </div>
          <div>
            <p>За годы работы стало понятно: учёт не должен создавать дополнительную нагрузку. Нужен инструмент, который помогает удерживать в поле зрения фактическое имущество и подготовку к инвентаризации.</p>
            <div className="landing-about-principle">
              <h3>Наш принцип</h3>
              <p>Актуальная выгрузка → понятный реестр → проверка имущества → основа для сверки.</p>
              <span>Меньше бумаг. Меньше согласований. Больше порядка.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-closing" aria-labelledby="closing-title">
        <div className="landing-wrap landing-closing-grid">
          <div>
            <p className="landing-eyebrow">Начните с реальной задачи</p>
            <h2 id="closing-title">Обсудим, как навести порядок в основных средствах вашей организации.</h2>
            <p>Расскажите о текущем процессе учёта и инвентаризации — вместе определим первый понятный шаг для пилота.</p>
          </div>
          <div className="landing-closing-action">
            <a className="landing-button landing-button-light" href="mailto:hello@3авхоз.рф?subject=Пилот%20сервиса%20Завхоз.рф">Обсудить пилот</a>
            <span>Для завхозов, специалистов АХЧ и руководителей организаций.</span>
          </div>
        </div>
      </section>
    </main>
  );
};
