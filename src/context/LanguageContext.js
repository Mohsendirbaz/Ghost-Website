import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('preferred_lang='));
    if (cookie) return cookie.split('=')[1].trim();
    return navigator.language?.startsWith('fa') ? 'fa' : 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    document.cookie = `preferred_lang=${lang}; max-age=31536000; path=/`;
  }, [lang]);

  const toggleLang = () => setLang(l => l === 'en' ? 'fa' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

// Alias for compatibility with Lovable components
export const useLanguage = useLang;
