import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('diyahqa-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('diyahqa-lang', lang);
  }, [lang]);

  // Fungsi penerjemah
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    // Jika tidak ditemukan, fallback ke bahasa Inggris
    if (value === undefined && lang !== 'en') {
      let fallback = translations['en'];
      for (const k of keys) {
        if (fallback === undefined) break;
        fallback = fallback[k];
      }
      return fallback || key;
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
