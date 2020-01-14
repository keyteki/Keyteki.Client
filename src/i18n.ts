import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translations from './translations';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        defaultNS: 'common',
        fallbackNS: 'common',
        resources: translations,
        keySeparator: false,
        interpolation: {
            escapeValue: false
        },
        detection: {
            // order and from where user language should be detected
            order: ['cookie', 'localStorage', 'navigator'],
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
            // cache user language on
            caches: ['localStorage', 'cookie'],

            // optional expire and domain for set cookie
            cookieMinutes: 1000000
        }
    });

export default i18n;
