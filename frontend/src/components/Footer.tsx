import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#102118] py-7 text-[13px] text-[#a7b7aa]">
      <div className="container-custom flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div><Link to="/" className="font-bold text-white">3авхоз.рф</Link> · Учёт основных средств</div>
        <p>Источник данных — ваша бухгалтерская система.</p>
      </div>
    </footer>
  );
};
