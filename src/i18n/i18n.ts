import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en_auth_signup from './locales/en/auth/sign-up/translation.json';
import es_auth_signup from './locales/es/auth/sign-up/translation.json';
import en_auth_signin from './locales/en/auth/sign-in/translation.json';
import es_auth_signin from './locales/es/auth/sign-in/translation.json';
import en_auth_code from './locales/en/auth/code/translation.json';
import es_auth_code from './locales/es/auth/code/translation.json';
import en_auth_reset from './locales/en/auth/reset-password/translation.json';
import es_auth_reset from './locales/es/auth/reset-password/translation.json';
import en_auth_recovery_password from './locales/en/auth/recovery-password/translation.json';
import es_auth_recovery_password from './locales/es/auth/recovery-password/translation.json';

const resources = {
  en: {
    auth_signup: en_auth_signup,
    auth_signin: en_auth_signin,
    auth_recovery_password: en_auth_recovery_password,
    auth_code: en_auth_code,
    auth_reset: en_auth_reset
  },
  es: {
    auth_signup: es_auth_signup,
    auth_signin: es_auth_signin,
    auth_recovery_password: es_auth_recovery_password,
    auth_code: es_auth_code,
    auth_reset: es_auth_reset
  },
};

const language_code = Localization.getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: language_code,
    fallbackLng: 'en',
    resources,
    ns: ['auth_signup', 'auth_signin', 'auth_recovery_password', 'auth_code', 'auth_reset'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
