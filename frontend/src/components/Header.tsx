import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#f7f9f6]/95 backdrop-blur border-b border-[#dce5de]">
      <nav className="container-custom h-[76px] flex items-center justify-between" aria-label="Основная навигация">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-[22px] font-extrabold tracking-tight text-[#17221d]">
            <div className="grid h-[30px] w-[30px] place-items-center rounded-[9px] bg-[#14623d] text-[17px] text-white">
              3
            </div>
            <span>авхоз</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            <a href="/#process" className="text-sm font-semibold text-[#43534a] transition-colors hover:text-[#14623d]">Как работает</a>
            <a href="/#features" className="text-sm font-semibold text-[#43534a] transition-colors hover:text-[#14623d]">Возможности</a>
            <Link to="/about" className="text-sm font-semibold text-[#43534a] transition-colors hover:text-[#14623d]">О сервисе</Link>
          </div>
          <a href="/#request" className="inline-flex min-h-[42px] items-center justify-center rounded-[9px] border border-[#14623d] px-4 text-sm font-bold text-[#14623d] transition hover:bg-[#dff3e7]">Запросить доступ</a>
        </div>
      </nav>
    </header>
  );
};
