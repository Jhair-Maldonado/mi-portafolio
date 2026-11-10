import { createContext, useContext, useEffect, useState } from 'react'
import { CONTENT } from './data/content'

const KEY = 'portfolio-lang'
const LangContext = createContext(null)

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    /* almacenamiento no disponible */
  }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || 'es'
  return nav.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = CONTENT[lang].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', CONTENT[lang].meta.description)
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* sin persistencia */
    }
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext)
}
