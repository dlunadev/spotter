import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { ns, resources } from './resources/resources';

const language_code = Localization.getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    lng: language_code,
    fallbackLng: 'en',
    resources: resources,
    ns: ns,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
