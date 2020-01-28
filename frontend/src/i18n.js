const NextI18Next = require('next-i18next').default;

const defaultLanguage = 'en';
const languageKeys = {
  en: 'English',
};

const NextI18NextInstance = new NextI18Next({
  defaultLanguage,
  otherLanguages: ['en'],
  localeSubpaths: {},
  fallbackLng: ['en'],
});

module.exports = { ...NextI18NextInstance, defaultLanguage, languageKeys };
