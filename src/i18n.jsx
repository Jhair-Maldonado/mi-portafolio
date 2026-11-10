import { createContext, useContext, useEffect, useState } from 'react'
import { CONTENT } from './data/content'

/**
 * Idioma del sitio (es/en).
 *
 * - Primera visita: se usa el idioma del navegador.
 * - Después: se recuerda la elección en localStorage (si está disponible).
 * - Al cambiar, se actualizan `<html lang>`, el título y la meta descripción.
 */

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

  return <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</LangContext.Provider>
}

/**
 * @returns {{ lang: 'es' | 'en', setLang: (lang: 'es' | 'en') => void, t: typeof CONTENT.es }}
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext)
}
