import { Header } from '../components/Header';
import { Demo } from '../components/Demo';
import { Footer } from '../components/Footer';

const steps = [
  ['Загрузите реестр', 'Импортируйте XLS, XLSX или CSV. Сопоставьте колонки и проверьте данные до подтверждения.'],
  ['Разместите ОС', 'Создайте помещения, назначьте имущество и сохраните историю каждого перемещения.'],
  ['Напечатайте метки', 'Сформируйте QR-метки для выбранных объектов и подготовьте лист для печати.'],
  ['Проведите проверку', 'Проверьте всю организацию или отдельные помещения. Скачайте итоговую ведомость.'],
];

const features = [
  ['↥', 'Управляемый импорт', 'Предпросмотр, проверка строк и понятные изменения до загрузки в реестр.'],
  ['⌕', 'Реестр и поиск', 'Находите ОС по номеру, названию, статусу и помещению за несколько секунд.'],
  ['⌘', 'QR-метки', 'Версионированные метки без персональных данных и массовая подготовка к печати.'],
  ['↔', 'Перемещения', 'Фиксируйте источник, назначение, дату и причину. История остаётся неизменной.'],
  ['✓', 'Инвентаризация', 'Отмечайте найденное, отсутствующее и имущество не в своём помещении.'],
  ['↓', 'Ведомости', 'Получайте результат инвентаризации в PDF и XLSX для дальнейшей работы.'],
];

export const Home = () => {
  return (
    <>
      <Header />
      <main className="bg-[#f7f9f6] text-[#17221d]">
        <section className="container-custom grid items-center gap-12 py-16 md:grid-cols-[1.04fr_.96fr] md:gap-16 md:py-[86px]">
          <div>
            <span className="inline-flex rounded-full bg-[#dff3e7] px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#14623d]">Учёт основных средств</span>
            <h1 className="mt-[18px] max-w-[680px] text-[42px] font-semibold leading-[1.03] tracking-[-.055em] text-[#17221d] md:text-[68px]">Имущество на <span className="text-[#14623d]">своём месте.</span> Всегда.</h1>
            <p className="mt-5 max-w-[560px] text-[17px] text-[#617067] md:text-[19px]">3авхоз помогает загрузить реестр ОС, разместить имущество по помещениям, напечатать QR-метки и провести инвентаризацию без хаоса в таблицах.</p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              <a href="#request" className="inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#14623d] bg-[#14623d] px-5 font-bold text-white transition hover:-translate-y-px hover:bg-[#0d4c2e]">Запросить доступ к пилоту</a>
              <a href="#process" className="inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#14623d] px-5 font-bold text-[#14623d] transition hover:bg-[#dff3e7]">Посмотреть процесс</a>
            </div>
            <p className="mt-[18px] text-[13px] text-[#718077]">Для завхозов, АХЧ и руководителей организаций.</p>
          </div>

          <div className="rotate-0 overflow-hidden rounded-[18px] border border-[#dce5de] bg-white p-5 shadow-[0_22px_50px_rgba(24,55,37,.10)] md:rotate-[1.5deg]" aria-label="Пример реестра имущества">
            <div className="flex items-center justify-between border-b border-[#edf1ed] pb-4 text-xs text-[#617067]"><span>Реестр имущества</span><span className="flex gap-1"><i className="h-[7px] w-[7px] rounded-full bg-[#d8e1da]" /><i className="h-[7px] w-[7px] rounded-full bg-[#d8e1da]" /><i className="h-[7px] w-[7px] rounded-full bg-[#d8e1da]" /></span></div>
            <p className="my-[18px] text-[17px] font-extrabold">ООО «Север» · Главный корпус</p>
            <div className="grid grid-cols-3 gap-2">{[['1 248', 'объектов'], ['96%', 'проверено'], ['12', 'без помещения']].map(([value, label]) => <div key={label} className="rounded-[9px] bg-[#f5f8f5] p-3"><b className="block text-xl">{value}</b><span className="text-[10px] text-[#617067]">{label}</span></div>)}</div>
            <div className="mt-[13px] overflow-hidden rounded-[10px] border border-[#eef2ee] text-[11px]">{[['Ноутбук Lenovo', 'Каб. 204', 'Найден'], ['Принтер HP', 'Склад', 'Найден'], ['Проектор Epson', 'Каб. 311', 'Нет метки']].map(([name, room, status]) => <div key={name} className="grid grid-cols-[1fr_62px_60px] gap-2 border-b border-[#eef2ee] p-2.5 last:border-0"><b>{name}</b><span className="text-[#617067]">{room}</span><span className={status === 'Найден' ? 'font-bold text-[#14623d]' : 'font-bold text-[#c95a33]'}>{status}</span></div>)}</div>
          </div>
        </section>

        <section id="process" className="container-custom py-[60px] md:py-[82px]">
          <div className="mb-9 max-w-[650px]"><div className="text-[13px] font-extrabold uppercase tracking-wider text-[#14623d]">Понятный процесс</div><h2 className="mt-2.5 text-[32px] font-semibold leading-[1.1] tracking-[-.045em] md:text-[45px]">От выгрузки до ведомости за один рабочий цикл</h2><p className="mt-3 text-[17px] text-[#617067]">Сервис берёт данные из бухгалтерской системы и помогает вести фактическое размещение имущества.</p></div>
          <div className="grid border-l border-t border-[#dce5de] sm:grid-cols-2 lg:grid-cols-4">{steps.map(([title, text], index) => <article key={title} className="min-h-[222px] border-b border-r border-[#dce5de] bg-white p-[25px]"><div className="font-mono text-[13px] font-extrabold text-[#fa7545]">0{index + 1}</div><h3 className="mb-2 mt-12 text-lg font-extrabold">{title}</h3><p className="text-sm text-[#617067]">{text}</p></article>)}</div>
        </section>

        <section id="features" className="bg-[#eaf3eb] py-[60px] md:py-[82px]"><div className="container-custom"><div className="mb-9 max-w-[650px]"><div className="text-[13px] font-extrabold uppercase tracking-wider text-[#14623d]">Только нужное</div><h2 className="mt-2.5 text-[32px] font-semibold leading-[1.1] tracking-[-.045em] md:text-[45px]">Инструменты для фактического учёта</h2><p className="mt-3 text-[17px] text-[#617067]">Без бухгалтерии, CRM и лишних модулей. Сервис дополняет вашу учётную систему, а не заменяет её.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map(([icon, title, text]) => <article key={title} className="rounded-[13px] border border-[#d5e3d6] bg-[#f9fcf9] p-6"><div className="mb-[25px] grid h-10 w-10 place-items-center rounded-[10px] bg-[#dff3e7] font-black text-[#14623d]">{icon}</div><h3 className="mb-2 text-lg font-extrabold">{title}</h3><p className="text-sm text-[#617067]">{text}</p></article>)}</div></div></section>

        <Demo />

        <section id="result" className="container-custom py-[60px] md:py-[82px]"><div className="mb-9 max-w-[650px]"><div className="text-[13px] font-extrabold uppercase tracking-wider text-[#14623d]">Результат</div><h2 className="mt-2.5 text-[32px] font-semibold leading-[1.1] tracking-[-.045em] md:text-[45px]">Меньше ручной сверки. Больше уверенности в данных.</h2></div><div className="grid gap-[18px] md:grid-cols-2"><article className="rounded-[15px] bg-[#fff0ea] p-8"><h3 className="mb-5 text-[23px] font-extrabold">Без 3авхоза</h3>{['Реестр в нескольких таблицах', 'Непонятно, где находится имущество', 'Инвентаризация вручную и без истории', 'Результаты нужно сводить отдельно'].map(item => <p key={item} className="border-t border-[#17221d]/10 py-3 before:mr-2.5 before:font-black before:text-[#fa7545] before:content-['×']">{item}</p>)}</article><article className="rounded-[15px] bg-[#14623d] p-8 text-white"><h3 className="mb-5 text-[23px] font-extrabold text-white">С 3авхозом</h3>{['Единый реестр имущества и помещений', 'QR-проверка на месте', 'История размещения каждого объекта', 'Готовая ведомость по итогам проверки'].map(item => <p key={item} className="border-t border-white/20 py-3 before:mr-2.5 before:font-black before:text-[#b7efc8] before:content-['✓']">{item}</p>)}</article></div></section>

        <section id="request" className="bg-[#16291e] px-4 py-[60px] text-center text-white md:py-[82px]"><h2 className="mx-auto max-w-[720px] text-[33px] font-semibold leading-[1.05] tracking-[-.05em] text-white md:text-[53px]">Наведите порядок в имуществе организации.</h2><p className="mx-auto mt-4 max-w-[550px] text-[17px] text-[#bfcec3]">Оставьте заявку на пилотный доступ к 3авхозу. Начните с реального реестра ОС.</p><a href="mailto:hello@3авхоз.рф?subject=Заявка%20на%20пилот%203авхоз" className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-[9px] border border-[#fa7545] bg-[#fa7545] px-5 font-bold text-white transition hover:-translate-y-px hover:bg-[#e55e31]">Запросить доступ к пилоту</a></section>
      </main>
      <Footer />
    </>
  );
};
