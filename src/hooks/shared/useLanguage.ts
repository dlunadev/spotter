import * as Localization from 'expo-localization';

export const useLanguage = () => {
  const language = Localization.getLocales()[0]?.languageCode ?? 'en';

  return language;
}