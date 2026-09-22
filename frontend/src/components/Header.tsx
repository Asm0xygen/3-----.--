import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="landing-header">
      <nav className="landing-wrap landing-nav" aria-label="Основная навигация">
        <Link to="/" className="landing-logo" aria-label="Завхоз.рф — в начало страницы">
          <span className="landing-logo-mark" aria-hidden="true">
            З
          </span>
          <span>Завхоз.рф</span>
        </Link>

        <div className="landing-nav-links">
          <a href="/#workflow">Как работает</a>
          <a href="/#features">Возможности</a>
          <a href="/#scope">Границы сервиса</a>
          <Link to="/about">О сервисе</Link>
        </div>

        <Link
          className="landing-button landing-button-primary landing-header-action"
          to="/auth"
        >
          Вход | Регистрация
        </Link>
      </nav>
    </header>
  );
};
