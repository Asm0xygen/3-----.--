import { FormEvent, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { lookupOrganization, type Organization } from '../api/organization';
import './Auth.css';

type AuthMode = 'login' | 'register';

type FieldErrors = Partial<Record<'name' | 'inn' | 'email' | 'password' | 'consent', string>>;

interface LoginForm {
  email: string;
  password: string;
}

interface RegistrationForm extends LoginForm {
  name: string;
  inn: string;
  consent: boolean;
}

const innCheckDigit = (inn: string, coefficients: number[]) =>
  coefficients.reduce((sum, coefficient, index) => sum + Number(inn[index]) * coefficient, 0) % 11 % 10;

const isValidInn = (inn: string) => {
  if (/^\d{10}$/.test(inn)) {
    return innCheckDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]) === Number(inn[9]);
  }

  if (/^\d{12}$/.test(inn)) {
    return (
      innCheckDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) === Number(inn[10]) &&
      innCheckDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) === Number(inn[11])
    );
  }

  return false;
};

const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

export const Auth = () => {
  const passwordHintId = useId();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: '', password: '' });
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    name: '',
    inn: '',
    email: '',
    password: '',
    consent: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState('');
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isOrganizationConfirmed, setIsOrganizationConfirmed] = useState(false);
  const [isOrganizationLookupPending, setIsOrganizationLookupPending] = useState(false);
  const [organizationLookupError, setOrganizationLookupError] = useState('');

  const switchMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setErrors({});
    setStatus('');
  };

  const resetOrganization = () => {
    setOrganization(null);
    setIsOrganizationConfirmed(false);
    setOrganizationLookupError('');
  };

  const handleOrganizationLookup = async () => {
    if (!isValidInn(registrationForm.inn)) {
      setErrors({ ...errors, inn: 'Проверьте ИНН: нужен корректный 10- или 12-значный номер.' });
      return;
    }

    setIsOrganizationLookupPending(true);
    setOrganizationLookupError('');
    resetOrganization();

    try {
      setErrors((currentErrors) => ({ ...currentErrors, inn: undefined }));
      setOrganization(await lookupOrganization(registrationForm.inn));
    } catch (error) {
      setOrganizationLookupError(error instanceof Error ? error.message : 'Не удалось проверить организацию по ИНН.');
    } finally {
      setIsOrganizationLookupPending(false);
    }
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FieldErrors = {};

    if (!isValidEmail(loginForm.email)) {
      nextErrors.email = 'Укажите email в формате name@example.ru.';
    }

    if (!loginForm.password) {
      nextErrors.password = 'Введите пароль.';
    }

    setErrors(nextErrors);
    setStatus(
      Object.keys(nextErrors).length
        ? 'Проверьте отмеченные поля.'
        : 'Данные не отправлены: защищённый вход через API /api/v1 ещё не подключён.',
    );
  };

  const handleRegistrationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FieldErrors = {};

    if (!isOrganizationConfirmed) {
      nextErrors.inn = 'Подтвердите найденную организацию.';
    }

    if (registrationForm.name.trim().length < 2) {
      nextErrors.name = 'Укажите имя владельца учётной записи.';
    }

    if (!isValidInn(registrationForm.inn)) {
      nextErrors.inn = 'Проверьте ИНН: нужен корректный 10- или 12-значный номер.';
    }

    if (!isValidEmail(registrationForm.email)) {
      nextErrors.email = 'Укажите email в формате name@example.ru.';
    }

    if (registrationForm.password.length < 12) {
      nextErrors.password = 'Пароль должен содержать не менее 12 символов.';
    }

    if (!registrationForm.consent) {
      nextErrors.consent = 'Для регистрации необходимо согласие на обработку персональных данных.';
    }

    setErrors(nextErrors);
    setStatus(
      Object.keys(nextErrors).length
        ? 'Проверьте отмеченные поля.'
        : 'Данные прошли только локальную проверку и не отправлены. Регистрация станет доступна после подключения защищённого API.',
    );
  };

  const passwordType = showPassword ? 'text' : 'password';
  const passwordToggleLabel = showPassword ? 'Скрыть пароль' : 'Показать пароль';

  return (
    <div className="auth-page auth-drawer-page">
      <a className="auth-skip-link" href="#auth-content">Перейти к форме</a>

      <Link className="auth-drawer-backdrop" to="/" aria-label="Закрыть форму авторизации" />

      <main className="auth-drawer" id="auth-content">
        <header className="auth-drawer-header">
          <div>
            <p className="auth-eyebrow">Рабочий кабинет</p>
            <h1>{mode === 'login' ? 'Вход в сервис' : 'Регистрация'}</h1>
          </div>
          <Link className="auth-drawer-close" to="/" aria-label="Закрыть форму авторизации">×</Link>
        </header>

        <section className="auth-card" aria-label={mode === 'login' ? 'Вход в кабинет' : 'Регистрация организации'}>
          <div className="auth-card-head">
            <p className="auth-eyebrow">{mode === 'login' ? 'Вход в кабинет' : 'Регистрация организации'}</p>
            <h2>{mode === 'login' ? 'С возвращением.' : 'Начните с организации.'}</h2>
            <p>{mode === 'login' ? 'Введите email и пароль владельца учётной записи.' : 'Все поля нужны для создания владельца и организации.'}</p>
          </div>

          <div className="auth-prototype-note" role="note">
            <span aria-hidden="true">i</span>
            <p><strong>Экран проектируется.</strong> Форма не подключена к рабочему API и не отправляет введённые данные. Не используйте реальные персональные данные до запуска защищённого контура.</p>
          </div>

          <div className="auth-tabs" role="tablist" aria-label="Выбор действия">
            <button aria-controls="auth-panel" aria-selected={mode === 'login'} className={mode === 'login' ? 'is-active' : ''} id="login-tab" onClick={() => switchMode('login')} role="tab" type="button">Войти</button>
            <button aria-controls="auth-panel" aria-selected={mode === 'register'} className={mode === 'register' ? 'is-active' : ''} id="register-tab" onClick={() => switchMode('register')} role="tab" type="button">Регистрация</button>
          </div>

          {mode === 'login' ? (
            <form aria-labelledby="login-tab" id="auth-panel" noValidate onSubmit={handleLoginSubmit} role="tabpanel">
              <div className="auth-fields">
                <div className="auth-field">
                  <label htmlFor="login-email">Рабочий email</label>
                  <input aria-describedby={errors.email ? 'login-email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" id="login-email" inputMode="email" onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} placeholder="name@organization.ru" type="email" value={loginForm.email} />
                  {errors.email && <p className="auth-field-error" id="login-email-error">{errors.email}</p>}
                </div>

                <div className="auth-field">
                  <div className="auth-label-row">
                    <label htmlFor="login-password">Пароль</label>
                    <button className="auth-text-button" onClick={() => setStatus('Восстановление доступа будет доступно после подключения почтового сервиса и API.')} type="button">Не помню пароль</button>
                  </div>
                  <div className="auth-password-control">
                    <input aria-describedby={errors.password ? 'login-password-error' : undefined} aria-invalid={Boolean(errors.password)} autoComplete="current-password" id="login-password" onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} type={passwordType} value={loginForm.password} />
                    <button aria-label={passwordToggleLabel} className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? 'Скрыть' : 'Показать'}</button>
                  </div>
                  {errors.password && <p className="auth-field-error" id="login-password-error">{errors.password}</p>}
                </div>
              </div>

              <button className="auth-submit" type="submit">Войти в кабинет</button>
              <p className="auth-switch-copy">Нет учётной записи? <button className="auth-text-button" onClick={() => switchMode('register')} type="button">Зарегистрировать организацию</button></p>
            </form>
          ) : (
            <form aria-labelledby="register-tab" id="auth-panel" noValidate onSubmit={handleRegistrationSubmit} role="tabpanel">
              <div className="auth-fields">
                <div className="auth-field">
                  <label htmlFor="register-inn">ИНН организации</label>
                  <input aria-describedby={errors.inn ? 'register-inn-error' : 'register-inn-hint'} aria-invalid={Boolean(errors.inn)} autoComplete="organization" id="register-inn" inputMode="numeric" maxLength={12} onChange={(event) => {
                    resetOrganization();
                    setRegistrationForm({ ...registrationForm, inn: event.target.value.replace(/\D/g, '').slice(0, 12) });
                  }} placeholder="1234567890" value={registrationForm.inn} />
                  <p className="auth-field-hint" id="register-inn-hint">10 цифр для юридического лица или 12 цифр для ИП.</p>
                  {errors.inn && <p className="auth-field-error" id="register-inn-error">{errors.inn}</p>}
                </div>

                <button className="auth-inn-check" disabled={isOrganizationLookupPending} onClick={() => void handleOrganizationLookup()} type="button">
                  {isOrganizationLookupPending ? 'Проверяем ИНН...' : 'Проверить ИНН'}
                </button>

                {organization && (
                  <section className="auth-organization-result" aria-label="Найденная организация">
                    <p><strong>{organization.name}</strong></p>
                    <dl>
                      <div><dt>Адрес</dt><dd>{organization.address}</dd></div>
                      <div><dt>Руководитель</dt><dd>{organization.managerName}</dd></div>
                    </dl>
                    <label className="auth-organization-confirmation">
                      <input checked={isOrganizationConfirmed} onChange={(event) => setIsOrganizationConfirmed(event.target.checked)} type="checkbox" />
                      <span>Подтверждаю организацию</span>
                    </label>
                  </section>
                )}
                {organizationLookupError && <p className="auth-field-error" role="alert">{organizationLookupError}</p>}

                <fieldset className="auth-registration-fields" disabled={!isOrganizationConfirmed}>
                  <div className="auth-field">
                    <label htmlFor="register-name">Имя владельца учётной записи</label>
                    <input aria-describedby={errors.name ? 'register-name-error' : undefined} aria-invalid={Boolean(errors.name)} autoComplete="name" id="register-name" onChange={(event) => setRegistrationForm({ ...registrationForm, name: event.target.value })} placeholder="Мария Иванова" value={registrationForm.name} />
                    {errors.name && <p className="auth-field-error" id="register-name-error">{errors.name}</p>}
                  </div>

                  <div className="auth-field">
                    <label htmlFor="register-email">Рабочий email</label>
                    <input aria-describedby={errors.email ? 'register-email-error' : 'register-email-hint'} aria-invalid={Boolean(errors.email)} autoComplete="email" id="register-email" inputMode="email" onChange={(event) => setRegistrationForm({ ...registrationForm, email: event.target.value })} placeholder="name@organization.ru" type="email" value={registrationForm.email} />
                    <p className="auth-field-hint" id="register-email-hint">На этот адрес придёт ссылка для подтверждения входа.</p>
                    {errors.email && <p className="auth-field-error" id="register-email-error">{errors.email}</p>}
                  </div>

                  <div className="auth-field">
                    <label htmlFor="register-password">Придумайте пароль</label>
                    <div className="auth-password-control">
                      <input aria-describedby={errors.password ? 'register-password-error' : passwordHintId} aria-invalid={Boolean(errors.password)} autoComplete="new-password" id="register-password" minLength={12} onChange={(event) => setRegistrationForm({ ...registrationForm, password: event.target.value })} type={passwordType} value={registrationForm.password} />
                      <button aria-label={passwordToggleLabel} className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? 'Скрыть' : 'Показать'}</button>
                    </div>
                    <p className="auth-field-hint" id={passwordHintId}>Не менее 12 символов. Не используйте пароль от почты или других сервисов.</p>
                    {errors.password && <p className="auth-field-error" id="register-password-error">{errors.password}</p>}
                  </div>
                </fieldset>
              </div>

              <fieldset className="auth-consent" aria-describedby={errors.consent ? 'consent-error' : 'consent-note'} disabled={!isOrganizationConfirmed}>
                <legend>Согласие на обработку персональных данных</legend>
                <label className="auth-consent-check">
                  <input checked={registrationForm.consent} onChange={(event) => setRegistrationForm({ ...registrationForm, consent: event.target.checked })} type="checkbox" />
                  <span>Даю согласие на обработку имени, рабочего email и ИНН для создания и обслуживания учётной записи организации.</span>
                </label>
                <p className="auth-consent-note" id="consent-note">Перед запуском формы необходимо опубликовать прошедшие юридическую проверку политику обработки персональных данных и полный текст согласия, а сервер должен сохранять их версию и время принятия.</p>
                {errors.consent && <p className="auth-field-error" id="consent-error">{errors.consent}</p>}
              </fieldset>

              <button className="auth-submit" disabled={!isOrganizationConfirmed} type="submit">Создать учётную запись</button>
              <p className="auth-switch-copy">Уже есть учётная запись? <button className="auth-text-button" onClick={() => switchMode('login')} type="button">Войти</button></p>
            </form>
          )}

          <p aria-live="polite" className="auth-form-status" role="status">{status}</p>
        </section>
        <p className="auth-drawer-footer">Учётная запись предназначена для владельца организации. Вход администратора платформы расположен в отдельном контуре.</p>
      </main>
    </div>
  );
};
