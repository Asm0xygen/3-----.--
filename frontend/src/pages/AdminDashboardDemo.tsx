import { useState } from 'react';
import './AdminDashboardDemo.css';

type IconName =
  | 'administrators'
  | 'analytics'
  | 'arrow-left'
  | 'arrow-right'
  | 'audit'
  | 'billing'
  | 'dashboard'
  | 'mail'
  | 'organizations'
  | 'plans'
  | 'settings'
  | 'system';

interface IconProps {
  name: IconName;
  size?: number;
}

const Icon = ({ name, size = 20 }: IconProps) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'administrators':
      return <svg {...commonProps}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.8M18.5 20a5.5 5.5 0 0 0-2.8-4.8" /></svg>;
    case 'analytics':
      return <svg {...commonProps}><path d="M4 19V5M4 19h16" /><path d="m7 15 3.5-4 3 2.5L20 7" /><path d="M16 7h4v4" /></svg>;
    case 'arrow-left':
      return <svg {...commonProps}><path d="m14.5 6-6 6 6 6" /></svg>;
    case 'arrow-right':
      return <svg {...commonProps}><path d="m9.5 6 6 6-6 6" /></svg>;
    case 'audit':
      return <svg {...commonProps}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5M8.5 11.5l2 2 4.5-4.5M9 17h6" /></svg>;
    case 'billing':
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h3" /></svg>;
    case 'dashboard':
      return <svg {...commonProps}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
    case 'mail':
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>;
    case 'organizations':
      return <svg {...commonProps}><path d="M4 21V5l8-3 8 3v16M8 9h.01M8 13h.01M8 17h.01M16 9h.01M16 13h.01M16 17h.01M10 21v-3h4v3" /></svg>;
    case 'plans':
      return <svg {...commonProps}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" /></svg>;
    case 'settings':
      return <svg {...commonProps}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.2 2.2-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56v.1h-3.1v-.1a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.2-2.2.06-.06A1.7 1.7 0 0 0 6.74 15 1.7 1.7 0 0 0 5.18 14h-.1v-3.1h.1a1.7 1.7 0 0 0 1.56-1.04 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.2-2.2.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56v-.1h3.1v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.2 2.2-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.1V14h-.1A1.7 1.7 0 0 0 19.4 15Z" /></svg>;
    case 'system':
      return <svg {...commonProps}><rect x="4" y="4" width="16" height="6" rx="1.5" /><rect x="4" y="14" width="16" height="6" rx="1.5" /><path d="M8 7h.01M8 17h.01M12 7h4M12 17h4" /></svg>;
  }
};

const navigationItems: Array<{ icon: IconName; label: string; active?: boolean }> = [
  { icon: 'dashboard', label: 'Дашборд', active: true },
  { icon: 'organizations', label: 'Организации' },
  { icon: 'billing', label: 'Биллинг' },
  { icon: 'plans', label: 'Тарифы' },
  { icon: 'mail', label: 'Рассылки' },
  { icon: 'analytics', label: 'Аналитика' },
  { icon: 'system', label: 'Система' },
  { icon: 'audit', label: 'Аудит' },
  { icon: 'settings', label: 'Настройки' },
  { icon: 'administrators', label: 'Администраторы' },
];

const overviewMetrics: Array<{ icon: IconName; value: string; label: string; detail: string; tone: string }> = [
  { icon: 'organizations', value: '164', label: 'организации', detail: '142 активны · 4 заблокированы', tone: 'green' },
  { icon: 'billing', value: '131', label: 'активная подписка', detail: '12 завершаются в ближайшие 30 дней', tone: 'orange' },
  { icon: 'billing', value: '86', label: 'платежей за 30 дней', detail: 'системный агрегат биллинга', tone: 'blue' },
  { icon: 'dashboard', value: '16 480', label: 'ОС во всех организациях', detail: 'без просмотра карточек имущества', tone: 'violet' },
];

const organizationStates = [
  { label: 'Активные', value: '142', detail: '+12 за 30 дней', tone: 'success' },
  { label: 'Пробный период', value: '18', detail: '5 завершаются на неделе', tone: 'warning' },
  { label: 'Заблокированные', value: '4', detail: 'требуют проверки причины', tone: 'danger' },
];

const subscriptionStates = [
  { label: 'Активные подписки', value: '131', tone: 'success' },
  { label: 'Окончание до 30 дней', value: '12', tone: 'warning' },
  { label: 'Просроченные', value: '7', tone: 'danger' },
  { label: 'Счета ожидают оплаты', value: '9', tone: 'neutral' },
];

const activityMetrics = [
  { label: 'Импорты реестров', value: '36' },
  { label: 'Инвентаризации', value: '14' },
  { label: 'Перемещения ОС', value: '68' },
  { label: 'Ведомости', value: '12' },
];

const auditEvents: Array<{ icon: IconName; title: string; detail: string; time: string; tone: string }> = [
  { icon: 'organizations', title: 'Организация заблокирована', detail: 'Объект ORG-0148 · результат: выполнено', time: '12:24', tone: 'orange' },
  { icon: 'billing', title: 'Подписка продлена вручную', detail: 'Объект SUB-0921 · результат: выполнено', time: '11:57', tone: 'green' },
  { icon: 'mail', title: 'Техническое сообщение поставлено в очередь', detail: 'Рассылка MSG-0087 · результат: принято', time: '10:16', tone: 'blue' },
  { icon: 'settings', title: 'Изменены системные настройки', detail: 'Объект SET-0004 · результат: выполнено', time: 'Вчера', tone: 'violet' },
];

const systemServices = ['API', 'База данных', 'Хранилище', 'Почта', 'DaData', 'Платежи'];

export const AdminDashboardDemo = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`admin-demo ${isSidebarCollapsed ? 'admin-demo-sidebar-collapsed' : ''}`}>
      <aside className="admin-demo-sidebar" aria-label="Навигация кабинета администратора">
        <div className="admin-demo-sidebar-top">
          <div className="admin-demo-brand" aria-label="Завхоз.рф">
            <span className="admin-demo-brand-mark" aria-hidden="true">З</span>
            <span className="admin-demo-brand-name">Завхоз.рф</span>
          </div>
          <button
            className="admin-demo-collapse"
            type="button"
            onClick={() => setIsSidebarCollapsed((value) => !value)}
            aria-controls="admin-demo-navigation"
            aria-label={isSidebarCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
            aria-expanded={!isSidebarCollapsed}
            title={isSidebarCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
          >
            <Icon name={isSidebarCollapsed ? 'arrow-right' : 'arrow-left'} size={18} />
          </button>
        </div>

        <nav className="admin-demo-navigation" id="admin-demo-navigation" aria-label="Разделы администратора">
          <p className="admin-demo-navigation-caption">Управление проектом</p>
          <ul>
            {navigationItems.map(({ icon, label, active }) => (
              <li key={label}>
                <span className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined} aria-label={label} title={label}>
                  <Icon name={icon} />
                  <span>{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="admin-demo-sidebar-bottom">
          <div className="admin-demo-project" aria-label="Контур проекта Завхоз.рф">
            <span className="admin-demo-project-initials" aria-hidden="true">ЗР</span>
            <span className="admin-demo-project-copy">
              <strong>Завхоз.рф</strong>
              <small>Контур SaaS-проекта</small>
            </span>
          </div>
        </div>
      </aside>

      <main className="admin-demo-main">
        <header className="admin-demo-topbar">
          <div className="admin-demo-breadcrumbs" aria-label="Текущий раздел">
            <span>Администрирование</span>
            <strong>Дашборд</strong>
          </div>
          <p className="admin-demo-period">Демонстрационный срез · 14 августа 2026</p>
        </header>

        <div className="admin-demo-content">
          <section className="admin-demo-welcome" aria-labelledby="admin-demo-title">
            <div>
              <p className="admin-demo-eyebrow">Операционный центр SaaS</p>
              <h1 id="admin-demo-title">Дашборд администратора</h1>
              <p>Сводные показатели платформы, подписок, коммуникаций и технического контура. Карточки имущества организаций в админке не редактируются.</p>
            </div>
            <span className="admin-demo-demo-status"><i aria-hidden="true" />Демонстрационные данные</span>
          </section>

          <aside className="admin-demo-demo-note" aria-label="Ограничения демонстрационного экрана">
            <Icon name="system" size={18} />
            <p><strong>Изолированный прототип.</strong> Показатели, события и статусы на экране — пример системной сводки; API, платежи, мониторинг и действия не подключены.</p>
          </aside>

          <section className="admin-demo-kpis" aria-label="Ключевые показатели проекта">
            {overviewMetrics.map(({ icon, value, label, detail, tone }) => (
              <article className="admin-demo-kpi-card" key={label}>
                <div className={`admin-demo-kpi-icon admin-demo-kpi-icon-${tone}`}><Icon name={icon} /></div>
                <div>
                  <strong>{value}</strong>
                  <h2>{label}</h2>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="admin-demo-primary-grid" aria-label="Организации и биллинг">
            <article className="admin-demo-panel">
              <div className="admin-demo-panel-heading">
                <div>
                  <p className="admin-demo-panel-eyebrow">Организации</p>
                  <h2>Состояние клиентской базы</h2>
                </div>
                <Icon name="organizations" size={19} />
              </div>
              <dl className="admin-demo-state-list">
                {organizationStates.map(({ label, value, detail, tone }) => (
                  <div key={label}>
                    <dt><i className={`is-${tone}`} aria-hidden="true" />{label}</dt>
                    <dd><b>{value}</b><span>{detail}</span></dd>
                  </div>
                ))}
              </dl>
              <p className="admin-demo-panel-note">В рабочем разделе доступны поиск, фильтры по статусу, тарифу и дате регистрации.</p>
            </article>

            <article className="admin-demo-panel">
              <div className="admin-demo-panel-heading">
                <div>
                  <p className="admin-demo-panel-eyebrow">Биллинг</p>
                  <h2>Контроль подписок и счетов</h2>
                </div>
                <Icon name="billing" size={19} />
              </div>
              <ul className="admin-demo-billing-list">
                {subscriptionStates.map(({ label, value, tone }) => (
                  <li key={label}><span>{label}</span><b className={`is-${tone}`}>{value}</b></li>
                ))}
              </ul>
              <p className="admin-demo-panel-note">Платежи, счета и возвраты остаются отдельными подразделами биллинга.</p>
            </article>
          </section>

          <section className="admin-demo-secondary-grid" aria-label="Активность продукта и рассылки">
            <article className="admin-demo-panel admin-demo-activity-panel">
              <div className="admin-demo-panel-heading">
                <div>
                  <p className="admin-demo-panel-eyebrow">Использование сервиса</p>
                  <h2>Действия организаций за 30 дней</h2>
                </div>
                <Icon name="analytics" size={19} />
              </div>
              <div className="admin-demo-activity-metrics">
                {activityMetrics.map(({ label, value }) => (
                  <div key={label}><strong>{value}</strong><span>{label}</span></div>
                ))}
              </div>
              <p className="admin-demo-panel-note">Агрегаты помогают оценить использование, не открывая содержимое учёта отдельной организации.</p>
            </article>

            <article className="admin-demo-panel admin-demo-mailings-panel">
              <div className="admin-demo-panel-heading">
                <div>
                  <p className="admin-demo-panel-eyebrow">Рассылки</p>
                  <h2>Технические и биллинговые сообщения</h2>
                </div>
                <Icon name="mail" size={19} />
              </div>
              <div className="admin-demo-mailing-summary"><strong>3</strong><span>кампании в очереди</span></div>
              <ul className="admin-demo-mailing-list">
                <li><span>Технические</span><b>2</b></li>
                <li><span>Биллинговые</span><b>1</b></li>
                <li><span>Тестовые отправки</span><b>0</b></li>
              </ul>
              <p className="admin-demo-panel-note">Шаблоны, предпросмотр и история рассылок — в отдельном разделе.</p>
            </article>
          </section>

          <section className="admin-demo-lower-grid" aria-label="Система, аудит и доступы">
            <article className="admin-demo-panel admin-demo-system-panel">
              <div className="admin-demo-panel-heading">
                <div>
                  <p className="admin-demo-panel-eyebrow">Система</p>
                  <h2>Техническое состояние</h2>
                </div>
                <span className="admin-demo-unavailable">Нет телеметрии</span>
              </div>
              <ul className="admin-demo-service-list">
                {systemServices.map((service) => (
                  <li key={service}><span>{service}</span><em><i aria-hidden="true" />не подключено</em></li>
                ))}
              </ul>
              <p className="admin-demo-panel-note">Макет предусматривает API, БД, хранилище, почту, DaData и платежи.</p>
            </article>

            <article className="admin-demo-panel admin-demo-audit-panel">
              <div className="admin-demo-panel-heading">
                <div>
                  <p className="admin-demo-panel-eyebrow">Аудит</p>
                  <h2>Последние системные события</h2>
                </div>
                <Icon name="audit" size={19} />
              </div>
              <ul className="admin-demo-audit-list">
                {auditEvents.map(({ icon, title, detail, time, tone }) => (
                  <li key={`${title}-${time}`}>
                    <span className={`admin-demo-audit-icon is-${tone}`}><Icon name={icon} size={16} /></span>
                    <span><strong>{title}</strong><small>{detail}</small></span>
                    <time>{time}</time>
                  </li>
                ))}
              </ul>
              <p className="admin-demo-panel-note">Полная запись хранит дату, действие, объект, результат, IP и администратора.</p>
            </article>

            <article className="admin-demo-admins-panel">
              <p className="admin-demo-panel-eyebrow">Администраторы</p>
              <h2>Контроль доступа</h2>
              <dl className="admin-demo-access-list">
                <div><dt>Авторизация</dt><dd>отдельный контур</dd></div>
                <div><dt>2FA</dt><dd>обязательна</dd></div>
                <div><dt>Роли</dt><dd>после MVP</dd></div>
              </dl>
              <p>Минимальная карточка администратора включает email, статус и дату последнего входа.</p>
            </article>
          </section>

          <section className="admin-demo-priority-actions" aria-labelledby="priority-actions-title">
            <div>
              <p className="admin-demo-panel-eyebrow">Приоритетные действия</p>
              <h2 id="priority-actions-title">Что требует внимания</h2>
            </div>
            <ul>
              <li><Icon name="billing" size={17} /><span>Проверить 7 просроченных подписок</span></li>
              <li><Icon name="organizations" size={17} /><span>Проверить причины блокировки 4 организаций</span></li>
              <li><Icon name="mail" size={17} /><span>Подготовить техническое сообщение</span></li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};
