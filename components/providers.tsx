"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { translations, type Language } from "@/lib/i18n"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations['en']
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  const [language, setLanguage] = React.useState<Language>('en')

  const value = React.useMemo(() => ({
    language,
    setLanguage,
    t: translations[language]
  }), [language])

  return (
    <NextThemesProvider {...props}>
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    </NextThemesProvider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
