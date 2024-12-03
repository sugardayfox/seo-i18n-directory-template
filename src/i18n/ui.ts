import en from './locales/en.json';
import es from './locales/es.json';

export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  hu: 'Magyar',
  pl: 'Polski',
  nl: 'Nederlands',
  sv: 'Svenska',
  no: 'Norsk',
  da: 'Dansk',
  fi: 'Suomi'
} as const;

export const translations = {
  en,
  es,
  // Add other language translations as they become available
  fr: en, // Fallback to English for now
  de: en,
  it: en,
  pt: en,
  hu: en,
  pl: en,
  nl: en,
  sv: en,
  no: en,
  da: en,
  fi: en
};

export const defaultLang = 'en';

export type Language = keyof typeof languages;
export type TranslationKey = keyof typeof translations[typeof defaultLang];