import { languages, translations, defaultLang, type Language } from '../i18n/ui';

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  return (lang in languages ? lang : defaultLang) as Language;
}

export function useTranslations(lang: Language) {
  return function t(key: string, fallback?: string): string {
    try {
      const keys = key.split('.');
      let translation: any = translations[lang];

      for (const k of keys) {
        translation = translation[k];
        if (translation === undefined) {
          // Try fallback to English if translation is missing
          translation = translations[defaultLang];
          for (const fallbackKey of keys) {
            translation = translation[fallbackKey];
            if (translation === undefined) break;
          }
          break;
        }
      }

      return translation || fallback || key;
    } catch (error) {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
      return fallback || key;
    }
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}