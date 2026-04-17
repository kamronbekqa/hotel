import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });

  const applyDomTranslations = useCallback(
    (lang) => {
      const dict = translations[lang];
      if (!dict || typeof window === 'undefined') return;

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        null
      );

      while (walker.nextNode()) {
        const node = walker.currentNode;
        const key = node.getAttribute && node.getAttribute('data-i18n');
        if (!key) continue;

        const segments = key.split('.');
        let value = dict;
        for (const seg of segments) {
          value = value ? value[seg] : undefined;
        }

        if (!value) continue;

        const target = node.getAttribute('data-i18n-target') || 'text';
        if (target === 'placeholder' && 'placeholder' in node) {
          node.placeholder = value;
        } else if (target === 'title' && 'title' in node) {
          node.title = value;
        } else {
          node.textContent = value;
        }
      }
    },
    []
  );

  const setLanguage = useCallback(
    (nextLang) => {
      setLanguageState(nextLang);
      localStorage.setItem('appLanguage', nextLang);
      applyDomTranslations(nextLang);
    },
    [applyDomTranslations]
  );

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
    applyDomTranslations(language);
  }, [language, applyDomTranslations]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
