import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en_auth from './locales/en/auth/sign-up/translation.json';
import es_auth from './locales/es/auth/sign-up/translation.json';

const resources = {
  en: {
    auth_signup: en_auth,
  },
  es: {
    auth_signup: es_auth
  },
}

const language_code = 'es';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: language_code,
    fallbackLng: 'en',
    resources,
    ns: ['auth_signup'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
