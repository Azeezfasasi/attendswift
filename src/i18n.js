import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const storedLanguage = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: storedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    // debug: process.env.NODE_ENV === 'development',
  });

export default i18n;
