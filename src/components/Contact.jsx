import { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { PROFILE } from '../data/profile'

/** Tiempo que se muestra el aviso "Correo copiado". */
const COPIED_MS = 2200

/** Bloque final de contacto: correo destacado, teléfono, redes y CV. */
export default function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), COPIED_MS)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
    } catch {
      // Sin acceso al portapapeles (p. ej. HTTP o permisos): abrimos el cliente de correo.
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const links = [
    { label: t.contact.phone, href: PROFILE.phoneHref, text: PROFILE.phoneDisplay },
    { label: 'LinkedIn', href: PROFILE.linkedin, text: PROFILE.linkedinLabel, external: true },
    { label: 'GitHub', href: PROFILE.github, text: PROFILE.githubLabel, external: true },
    { label: 'CV', href: PROFILE.cv, text: t.nav.cv, download: true },
  ]

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">{t.contact.heading}</h2>
        <p className="contact-intro">{t.contact.intro}</p>

        <div className="contact-email">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <button type="button" className="btn btn--ghost btn--small" onClick={copyEmail}>
            {copied ? t.contact.copied : t.contact.copy}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? t.contact.copied : ''}
          </span>
        </div>

        <ul className="contact-list">
          {links.map((link) => (
            <li key={link.label}>
              <span>{link.label}</span>
              <a
                href={link.href}
                {...(link.external && { target: '_blank', rel: 'noreferrer' })}
                {...(link.download && { download: true })}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-note">{t.footer}</p>
      </div>
    </section>
  )
}
