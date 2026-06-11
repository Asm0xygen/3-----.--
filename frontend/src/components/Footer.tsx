import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="text-lg font-semibold text-white">3авхоз.рф</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Сервис автоматизации учёта основных средств. Инвентаризация без бумажных ведомостей.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-gray-300 transition-colors">
                  О сервисе
                </Link>
              </li>
              <li>
                <a href="/#demo" className="hover:text-gray-300 transition-colors">
                  Демо
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-gray-300 transition-colors">
                  Возможности
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@3авхоз.рф</li>
              <li>Телефон: +7 (xxx) xxx-xx-xx</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm">&copy; 2024 3авхоз.рф. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
