import i18next, { type Resource, type TFunction } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const getResources = (): Resource => {
  const localesContext = require.context('../../locales');
  return localesContext.keys().reduce((acc, cur) => {
    const m = cur.match(/([^/]*)(?:\.([^.]+$))/);
    if (m === null) throw new Error(`Invalid import path: ${cur}`);
    return { ...acc, [m[1]]: localesContext(cur) };
  }, {});
};

type InitI18nParams = Partial<{
  useDetector: boolean;
  lng: string;
}>;
export const initI18n = (params?: InitI18nParams): Promise<TFunction> =>
  (params?.useDetector ?? true ? i18next.use(LanguageDetector) : i18next)
    .use(initReactI18next)
    .init({
      resources: getResources(),
      lng: params?.lng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      debug: process.env.NODE_ENV === 'development'
    });
