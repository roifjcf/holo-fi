'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { en } from "@/locales/en";
import { jp } from "@/locales/jp";
import { id } from "@/locales/id";

type Language = "EN" | "JP" | "ID";
const translationsMap = { EN: en, JP: jp, ID: id };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof en;
  translate: (key: string) => string | string[]; // translation fallback
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("EN");

  const translate = (key: string) => {
    const current = translationsMap[lang] as Record<string, any>;
    if (key in current) return current[key];
    return en[key as keyof typeof en] ?? key; // fallback
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translationsMap[lang], translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}