export const CTA = () => {
  return (
    <section className="section bg-primary-700 dark:bg-primary-800 border-y border-primary-800 dark:border-primary-900">
      <div className="container-custom text-center">
        <h2 className="text-white mb-6">
          От выгрузки к контролю имущества за один рабочий день
        </h2>
        <p className="text-lg text-primary-100 dark:text-primary-200 mb-8 max-w-2xl mx-auto">
          Для завхоза, АХЧ и руководителя организации. Одна организация, один ответственный пользователь, без сложной настройки ролей.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#demo" className="bg-white text-primary-700 dark:text-primary-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">Пройти сценарий в демо</a>
          <a href="mailto:hello@3авхоз.рф?subject=Заявка%20на%20пилот%203авхоз" className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border-2 border-white hover:bg-white hover:text-primary-700 dark:hover:text-primary-800 transition-colors">Обсудить внедрение</a>
        </div>
      </div>
    </section>
  );
};
