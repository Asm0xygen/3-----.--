import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

const workflowSteps = [
  ['↥', 'Получите выгрузку', 'Возьмите актуальный реестр основных средств из привычной бухгалтерской системы.'],
  ['≡', 'Соберите реестр', 'Проверьте данные и получите единый рабочий список имущества организации.'],
  ['⌂', 'Укажите помещения', 'Закрепите объекты за кабинетами, складами и другими реальными местами.'],
  ['✓', 'Проведите проверку', 'Зафиксируйте результаты инвентаризации и подготовьте итоговую ведомость.'],
];

const focusItems = [
  ['01', 'Реестр без разрозненных таблиц', 'Соберите базовую информацию об основных средствах в одном рабочем контуре.'],
  ['02', 'Помещения, понятные каждому', 'Свяжите запись об объекте с местом, где имущество должно находиться на самом деле.'],
  ['03', 'Проверка с конкретным итогом', 'Отметьте найденные и требующие сверки позиции, чтобы действовать по результату, а не по догадкам.'],
];

export const Home = () => {
  return (
    <div className="landing-page">
      <a className="landing-skip-link" href="#main-content">Перейти к содержанию</a>
      <Header />

      <main id="main-content">
        <section className="landing-hero" id="top" aria-labelledby="hero-title">
          <div className="landing-wrap landing-hero-grid">
            <div>
              <p className="landing-eyebrow">Учёт основных средств</p>
              <h1 id="hero-title">
                Имущество <span className="landing-title-highlight">под рукой.</span>
                <br />
                Порядок — на виду.
              </h1>
              <p className="landing-hero-copy">
                Завхоз.рф помогает работать с реестром ОС: начать с бухгалтерской выгрузки, закрепить имущество за помещениями и спокойно провести инвентаризацию.
              </p>
              <div className="landing-actions">
                <a className="landing-button landing-button-primary" href="mailto:hello@3авхоз.рф?subject=Пилот%20сервиса%20Завхоз.рф">Запросить доступ к пилоту</a>
                <a className="landing-button landing-button-secondary" href="#workflow">Посмотреть сценарий</a>
              </div>
              <p className="landing-note">Сервис не заменяет бухгалтерскую систему: он не ведёт бухучёт и не меняет стоимость имущества.</p>
            </div>

            <div className="landing-dashboard" aria-label="Концептуальный пример рабочего экрана с помещениями и реестром">
              <div className="landing-dashboard-head">
                <div>
                  <p>Имущество организации</p>
                  <strong>Главный корпус</strong>
                </div>
                <span>Август 2026</span>
              </div>
              <div className="landing-metrics" aria-label="Сводные показатели">
                <div><strong>1 248</strong><span>объектов в реестре</span></div>
                <div><strong>18</strong><span>помещений</span></div>
                <div><strong>76%</strong><span>проверено</span></div>
              </div>
              <div className="landing-floor-card">
                <div className="landing-floor-card-head"><strong>План размещения</strong><span>2-й этаж</span></div>
                <div className="landing-floor-plan" aria-label="Пример помещений">
                  <div className="landing-room landing-room-done">Кабинет 204</div>
                  <div className="landing-room">Кабинет 205</div>
                  <div className="landing-room landing-room-storage">Архив</div>
                </div>
                <div className="landing-floor-footer">
                  <span>Проверено 38 из 50 объектов</span>
                  <span className="landing-progress" role="img" aria-label="Проверено 76 процентов"><span /></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="landing-principles" aria-label="Ключевые принципы сервиса">
          <div className="landing-wrap">
            <div className="landing-principles-row">
              <span>реестр основных средств</span>
              <span>фактические помещения</span>
              <span>бухгалтерская выгрузка</span>
              <span>инвентаризация</span>
              <span>понятный результат</span>
            </div>
          </div>
        </aside>

        <section className="landing-section" id="workflow" aria-labelledby="workflow-title">
          <div className="landing-wrap">
            <div className="landing-section-top">
              <div>
                <p className="landing-eyebrow">Один рабочий цикл</p>
                <h2 id="workflow-title">От выгрузки до инвентаризации — без лишнего ручного труда.</h2>
              </div>
              <p>Не нужно переносить в новый сервис бухгалтерские процессы. В центре работы — то, что важно завхозу: фактическое имущество и его размещение.</p>
            </div>
            <div className="landing-steps">
              {workflowSteps.map(([icon, title, description], index) => (
                <article className="landing-step" key={title}>
                  <span className="landing-step-number">0{index + 1}</span>
                  <span className="landing-step-icon" aria-hidden="true">{icon}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section landing-focus-section" id="features" aria-labelledby="features-title">
          <div className="landing-wrap">
            <div className="landing-section-top">
              <div>
                <p className="landing-eyebrow">Только нужное</p>
                <h2 id="features-title">Меньше неизвестности. Больше ясности в работе с имуществом.</h2>
              </div>
              <p>Концепция пилота строится вокруг понятных задач: увидеть реестр, знать помещения и получить результат проверки.</p>
            </div>
            <div className="landing-focus-grid">
              {focusItems.map(([number, title, description]) => (
                <article className="landing-focus-card" key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section" id="scope" aria-labelledby="scope-title">
          <div className="landing-wrap">
            <div className="landing-section-top">
              <div>
                <p className="landing-eyebrow">Честные границы</p>
                <h2 id="scope-title">Бухгалтерия ведёт учёт. Завхоз.рф помогает контролировать факт.</h2>
              </div>
              <p>Разделение задач сохраняет привычные процессы и даёт хозяйственной работе отдельный, понятный инструмент.</p>
            </div>
            <div className="landing-scope-grid">
              <article className="landing-scope-card">
                <h3><span aria-hidden="true">✓</span>Помогает с имуществом</h3>
                <ul>
                  <li>Работать с реестром основных средств.</li>
                  <li>Фиксировать привязку объекта к помещению.</li>
                  <li>Готовиться к инвентаризации и сверять её результаты.</li>
                  <li>Использовать бухгалтерскую выгрузку как основу реестра.</li>
                </ul>
              </article>
              <article className="landing-scope-card landing-scope-muted">
                <h3><span aria-hidden="true">—</span>Не обещает лишнего</h3>
                <ul>
                  <li>Не заменяет бухгалтерский учёт и не ставит имущество на баланс.</li>
                  <li>Не меняет стоимость и амортизацию ОС.</li>
                  <li>Не заявляет интеграцию с 1С, ЭДО или электронную подпись.</li>
                  <li>Не обещает готовое мобильное приложение, офлайн-режим и автоматизированный биллинг.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="landing-closing" id="request" aria-labelledby="closing-title">
          <div className="landing-wrap landing-closing-grid">
            <div>
              <p className="landing-eyebrow">Начните с реального реестра</p>
              <h2 id="closing-title">Порядок в основных средствах начинается с первого понятного шага.</h2>
              <p>Обсудим задачи вашей организации и покажем, как может выглядеть рабочий путь от бухгалтерской выгрузки до результата инвентаризации.</p>
            </div>
            <div className="landing-closing-action">
              <a className="landing-button landing-button-light" href="mailto:hello@3авхоз.рф?subject=Пилот%20сервиса%20Завхоз.рф">Обсудить пилот</a>
              <span>Для завхозов, специалистов АХЧ и руководителей организаций.</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
