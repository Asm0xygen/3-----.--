import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="landing-wrap landing-footer-inner">
        <div><Link to="/">Завхоз.рф</Link> · Учёт основных средств</div>
        <p>Источник данных — ваша бухгалтерская система.</p>
      </div>
    </footer>
  );
};
