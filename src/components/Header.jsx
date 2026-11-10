import { useLang } from '../i18n'
import { PROFILE } from '../data/profile'

/**
 * Barra superior fija: marca, enlaces a secciones (ocultos en móvil) y selector de idioma.
 */
export default function Header() {
  const { t, lang, setLang } = useLang()
  const links = [
    ['projects', t.nav.projects],
    ['path', t.nav.path],
    ['stack', t.nav.stack],
    ['contact', t.nav.contact],
  ]

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#top" className="brand" aria-label={PROFILE.name}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M12 2.5 20.2 7.25v9.5L12 21.5 3.8 16.75v-9.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path d="M12 8.6 15 10.3v3.4L12 15.4 9 13.7v-3.4Z" fill="var(--amber)" />
          </svg>
          <span>{PROFILE.name}</span>
        </a>

        <nav aria-label={lang === 'es' ? 'Secciones' : 'Sections'} className="topnav">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="lang" role="group" aria-label={t.nav.langLabel}>
          {['es', 'en'].map((code) => (
            <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)} lang={code}>
              {code === 'es' ? 'ES' : 'EN'}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
