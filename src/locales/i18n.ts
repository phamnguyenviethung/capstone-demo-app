import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import transEn from './en/translation.json';
import transVi from './vi/translation.json';
const resources = {
  en: {
    translation: transEn,
  },
  vi: {
    translation: transVi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
