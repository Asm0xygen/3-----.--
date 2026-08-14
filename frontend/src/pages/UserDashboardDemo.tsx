import { useState } from 'react';
import './UserDashboardDemo.css';

type IconName =
  | 'archive'
  | 'arrow-right'
  | 'bell'
  | 'building'
  | 'calendar'
  | 'chevron-left'
  | 'chevron-right'
  | 'clipboard'
  | 'dashboard'
  | 'document'
  | 'download'
  | 'inventory'
  | 'org'
  | 'room'
  | 'search'
  | 'settings'
  | 'stethoscope'
  | 'upload';

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
    case 'archive':
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 9h18M9 13h6" /><path d="M5 3h14v3H5z" /></svg>;
    case 'arrow-right':
      return <svg {...commonProps}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'bell':
      return <svg {...commonProps}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>;
    case 'building':
      return <svg {...commonProps}><path d="M4 21V5l8-3 8 3v16M8 9h.01M8 13h.01M8 17h.01M16 9h.01M16 13h.01M16 17h.01M10 21v-3h4v3" /></svg>;
    case 'calendar':
      return <svg {...commonProps}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
    case 'chevron-left':
      return <svg {...commonProps}><path d="m14.5 6-6 6 6 6" /></svg>;
    case 'chevron-right':
      return <svg {...commonProps}><path d="m9.5 6 6 6-6 6" /></svg>;
    case 'clipboard':
      return <svg {...commonProps}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5M9 12h6M9 16h4" /></svg>;
    case 'dashboard':
      return <svg {...commonProps}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>;
    case 'document':
      return <svg {...commonProps}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>;
    case 'download':
      return <svg {...commonProps}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>;
    case 'inventory':
      return <svg {...commonProps}><path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>;
    case 'org':
      return <svg {...commonProps}><path d="M4 21V5l8-3 8 3v16M8 9h.01M8 13h.01M8 17h.01M16 9h.01M16 13h.01M16 17h.01M10 21v-3h4v3" /></svg>;
    case 'room':
      return <svg {...commonProps}><path d="M4 21V4h12v17M16 12h4v9M8 8h4M8 12h4M8 16h4M18 16h.01" /></svg>;
    case 'search':
      return <svg {...commonProps}><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg>;
    case 'settings':
      return <svg {...commonProps}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.2 2.2-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.56v.1h-3.12v-.1a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.2-2.2.06-.06A1.7 1.7 0 0 0 6.72 15a1.7 1.7 0 0 0-1.56-1.04h-.1v-3.12h.1A1.7 1.7 0 0 0 6.72 9.8a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.2-2.2.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.56v-.1h3.12v.1a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.2 2.2-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.04h.1v3.12h-.1A1.7 1.7 0 0 0 19.4 15Z" /></svg>;
    case 'stethoscope':
      return <svg {...commonProps}><path d="M5 4v5a5 5 0 0 0 10 0V4M5 4H3M15 4h2M8 4v5M12 4v5M15 14h2a3 3 0 1 1-3 3v-1" /><circle cx="15" cy="19" r="1" /></svg>;
    case 'upload':
      return <svg {...commonProps}><path d="M12 16V3M7 8l5-5 5 5M5 21h14" /></svg>;
  }
};

const navigation: Array<{ label: string; icon: IconName; active?: boolean }> = [
  { label: 'Дашборд', icon: 'dashboard', active: true },
  { label: 'Основные средства', icon: 'archive' },
  { label: 'Помещения', icon: 'room' },
  { label: 'Инвентаризация', icon: 'inventory' },
  { label: 'Диагностика', icon: 'stethoscope' },
  { label: 'Документы', icon: 'document' },
  { label: 'Импорт', icon: 'upload' },
  { label: 'Организация', icon: 'org' },
  { label: 'Настройки', icon: 'settings' },
];

const metrics: Array<{ label: string; value: string; detail: string; icon: IconName; tone: string }> = [
  { label: 'Всего ОС', value: '1 248', detail: 'в реестре', icon: 'archive', tone: 'green' },
  { label: 'Стоимость', value: '18,4 млн ₽', detail: 'по данным демо', icon: 'document', tone: 'blue' },
  { label: 'Помещения', value: '42', detail: 'в рабочем контуре', icon: 'room', tone: 'violet' },
  { label: 'На хранении', value: '84', detail: '6,7% от реестра', icon: 'inventory', tone: 'sand' },
  { label: 'Диагностика', value: '12', detail: 'требуют проверки', icon: 'stethoscope', tone: 'orange' },
  { label: 'К списанию', value: '27', detail: 'демо-сценарий', icon: 'clipboard', tone: 'rose' },
];

const ageGroups = [
  { label: 'До 3 лет', value: 720, percentage: '57,7%', tone: 'green' },
  { label: 'От 3 до 7 лет', value: 391, percentage: '31,3%', tone: 'yellow' },
  { label: 'Более 7 лет', value: 137, percentage: '11,0%', tone: 'red' },
];

const roomDistribution = [
  { label: 'Учебный корпус, кабинеты 101–116', value: 412, percentage: 33 },
  { label: 'Лабораторный корпус', value: 356, percentage: 29 },
  { label: 'Административный корпус', value: 284, percentage: 23 },
  { label: 'Склад и архив', value: 196, percentage: 15 },
];

const attentionItems: Array<{ label: string; value: string; description: string; icon: IconName; tone: string }> = [
  { label: 'На диагностике', value: '12', description: 'объектов ожидают решения', icon: 'stethoscope', tone: 'orange' },
  { label: 'К списанию', value: '27', description: 'демо-сценарий после диагностики', icon: 'clipboard', tone: 'rose' },
  { label: 'Отсутствует по последней инвентаризации', value: '11', description: 'позиций для сверки', icon: 'inventory', tone: 'red' },
  { label: 'Не в своём помещении', value: '8', description: 'объектов проверить по размещению', icon: 'room', tone: 'yellow' },
];

const quickActions: Array<{ label: string; icon: IconName }> = [
  { label: 'Импорт ОС', icon: 'upload' },
  { label: 'Новая инвентаризация', icon: 'inventory' },
  { label: 'Найти ОС', icon: 'search' },
  { label: 'Печать ведомости', icon: 'download' },
];

export const UserDashboardDemo = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`user-demo ${isSidebarCollapsed ? 'user-demo-sidebar-collapsed' : ''}`}>
      <aside className="user-demo-sidebar" aria-label="Навигация кабинета">
        <div className="user-demo-sidebar-top">
          <div className="user-demo-brand" aria-label="3авхоз.рф">
            <span className="user-demo-brand-mark" aria-hidden="true">3</span>
            <span>3авхоз.рф</span>
          </div>
          <button
            className="user-demo-collapse"
            type="button"
            aria-controls="user-demo-navigation"
            aria-expanded={!isSidebarCollapsed}
            aria-label={isSidebarCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
            title={isSidebarCollapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
            onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
          >
            <Icon name={isSidebarCollapsed ? 'chevron-right' : 'chevron-left'} />
          </button>
        </div>

        <nav className="user-demo-navigation" id="user-demo-navigation" aria-label="Разделы кабинета">
          <p className="user-demo-navigation-caption">Рабочее пространство</p>
          <ul>
            {navigation.map(({ label, icon, active }) => (
              <li key={label}>
                <span
                  className={active ? 'is-active' : ''}
                  aria-current={active ? 'page' : undefined}
                  aria-label={label}
                  title={label}
                >
                  <Icon name={icon} />
                  <span>{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="user-demo-sidebar-bottom">
          <span className="user-demo-demo-dot" aria-hidden="true" />
          <span>Демо-режим</span>
        </div>
      </aside>

      <main className="user-demo-main" id="dashboard">
        <header className="user-demo-topbar">
          <div className="user-demo-search" role="search" aria-label="Глобальный поиск в демонстрации">
            <Icon name="search" size={19} />
            <span>Поиск по имуществу</span>
            <kbd>⌘ K</kbd>
          </div>
          <div className="user-demo-topbar-actions">
            <span className="user-demo-notifications" aria-label="Уведомления: демонстрационный элемент" title="Уведомления — демонстрация">
              <Icon name="bell" size={20} />
              <i aria-hidden="true" />
            </span>
            <span className="user-demo-organization" aria-label="Организация: МБОУ Школа № 1" title="Организация — демонстрация">
              <span className="user-demo-organization-icon"><Icon name="building" size={17} /></span>
              <span>МБОУ «Школа № 1»</span>
              <Icon name="chevron-right" size={16} />
            </span>
          </div>
        </header>

        <div className="user-demo-content">
          <section className="user-demo-page-heading" aria-labelledby="user-demo-title">
            <div>
              <div className="user-demo-breadcrumbs"><span>Имущество организации</span><Icon name="arrow-right" size={14} /><strong>Дашборд</strong></div>
              <h1 id="user-demo-title">Дашборд</h1>
              <p>Сводка по имуществу и последней инвентаризации.</p>
            </div>
            <span className="user-demo-status"><i aria-hidden="true" />Демонстрационные данные · 14.08.2026</span>
          </section>

          <aside className="user-demo-scope-note" aria-label="Границы демонстрации">
            <span className="user-demo-scope-icon"><Icon name="clipboard" size={18} /></span>
            <p><strong>Изолированный макет.</strong> Цифры и события не связаны с сервисом. Диагностика и списание показаны как сценарии интерфейса и не входят в первый релиз.</p>
          </aside>

          <section className="user-demo-metrics" aria-label="Ключевые показатели имущества, демонстрационные данные">
            {metrics.map(({ label, value, detail, icon, tone }) => (
              <article className="user-demo-metric-card" key={label}>
                <span className={`user-demo-metric-icon is-${tone}`}><Icon name={icon} /></span>
                <div>
                  <strong>{value}</strong>
                  <h2>{label}</h2>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </section>

          <section className="user-demo-overview-grid" aria-label="Возраст имущества и распределение по помещениям">
            <article className="user-demo-panel user-demo-age-panel">
              <div className="user-demo-panel-heading">
                <div>
                  <p className="user-demo-panel-eyebrow">Состав реестра · демо</p>
                  <h2>Возраст ОС</h2>
                </div>
                <span className="user-demo-panel-icon"><Icon name="calendar" size={19} /></span>
              </div>
              <div className="user-demo-age-legend" aria-label="Информационный светофор возраста основных средств">
                {ageGroups.map(({ label, value, percentage, tone }) => (
                  <div className={`is-${tone}`} key={label}>
                    <span><i aria-hidden="true" />{label}</span>
                    <strong>{value}</strong>
                    <small>{percentage}</small>
                  </div>
                ))}
              </div>
              <div className="user-demo-age-bar" aria-hidden="true">
                <span className="is-green" style={{ width: '57.7%' }} />
                <span className="is-yellow" style={{ width: '31.3%' }} />
                <span className="is-red" style={{ width: '11%' }} />
              </div>
              <p className="user-demo-panel-note">Возраст рассчитан демонстрационно по дате принятия к учёту. Это ориентир для планирования, не оценка технического состояния, не диагноз и не основание для списания.</p>
            </article>

            <article className="user-demo-panel user-demo-rooms-panel">
              <div className="user-demo-panel-heading">
                <div>
                  <p className="user-demo-panel-eyebrow">Распределение · демо</p>
                  <h2>Имущество по помещениям</h2>
                </div>
                <span className="user-demo-panel-icon"><Icon name="room" size={19} /></span>
              </div>
              <ul className="user-demo-room-list">
                {roomDistribution.map(({ label, value, percentage }) => (
                  <li key={label}>
                    <div><span>{label}</span><strong>{value} ОС</strong></div>
                    <span className="user-demo-room-progress" aria-label={`${percentage} процентов демонстрационного реестра`}><i style={{ width: `${percentage}%` }} /></span>
                  </li>
                ))}
              </ul>
              <p className="user-demo-panel-note">Условное распределение 1 248 объектов по группам помещений.</p>
            </article>
          </section>

          <section className="user-demo-lower-grid" aria-label="Внимание и последняя инвентаризация">
            <article className="user-demo-panel user-demo-attention-panel">
              <div className="user-demo-panel-heading">
                <div>
                  <p className="user-demo-panel-eyebrow">Сводка задач · демо</p>
                  <h2>Требует внимания</h2>
                </div>
                <span className="user-demo-attention-badge">58 позиций</span>
              </div>
              <ul className="user-demo-attention-list">
                {attentionItems.map(({ label, value, description, icon, tone }) => (
                  <li key={label}>
                    <span className={`user-demo-attention-icon is-${tone}`}><Icon name={icon} size={17} /></span>
                    <span><strong>{label}</strong><small>{description}</small></span>
                    <b>{value}</b>
                  </li>
                ))}
              </ul>
            </article>

            <article className="user-demo-panel user-demo-inventory-panel">
              <div className="user-demo-panel-heading">
                <div>
                  <p className="user-demo-panel-eyebrow">Завершена · демо</p>
                  <h2>Последняя инвентаризация</h2>
                </div>
                <span className="user-demo-panel-icon"><Icon name="inventory" size={19} /></span>
              </div>
              <div className="user-demo-inventory-date"><Icon name="calendar" size={16} /><span>12.08.2026</span><em>Полная проверка</em></div>
              <div className="user-demo-inventory-results" aria-label="Демонстрационные результаты инвентаризации">
                <div><strong>1 248</strong><span>проверено</span></div>
                <div><strong>1 237</strong><span>найдено</span></div>
                <div><strong>11</strong><span>отсутствует</span></div>
              </div>
              <div className="user-demo-inventory-footer"><span>Результат проверки</span><strong>99,1% найдено</strong></div>
            </article>
          </section>

          <section className="user-demo-quick-actions" aria-labelledby="user-demo-actions-title">
            <div>
              <p className="user-demo-panel-eyebrow">Действия · демо</p>
              <h2 id="user-demo-actions-title">Быстрый старт</h2>
            </div>
            <div className="user-demo-action-list">
              {quickActions.map(({ label, icon }, index) => (
                <button className={index === 0 ? 'is-primary' : ''} type="button" disabled key={label} title="Действие не подключено в демонстрации">
                  <Icon name={icon} size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
