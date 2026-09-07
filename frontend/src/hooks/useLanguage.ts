import { en } from '../config/languages/en';
import { hi } from '../config/languages/hi';

export const useLanguage = () => {
  // In a real app, this would be a context provider
  const currentLang = 'en'; // default

  const t = (key: string, lang: string = currentLang) => {
    const translations: Record<string, any> = { en, hi };
    return translations[lang]?.[key] || key;
  };

  return { t, currentLang };
};
