import { useState } from 'react'
import { useLang } from '../i18n'
import { TIMELINE, SKILLS } from '../data/content'
import { PROFILE } from '../data/profile'

export function Path() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="path" aria-labelledby="path-title">
      <div className="section-head">
        <h2 id="path-title">{t.path.heading}</h2>
      </div>
      <ol className="timeline">
        {TIMELINE.map((item) => (
          <li key={item.es.title}>
            <p className="timeline-when">{item.when[lang]}</p>
            <div>
              <h3>{item[lang].title}</h3>
              <p>{item[lang].place}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function Skills() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="section-head">
        <h2 id="stack-title">{t.stack.heading}</h2>
        <p>{t.stack.intro}</p>
      </div>
      <dl className="skills">
        {SKILLS.map((g) => (
          <div key={g.es} className={g.basic ? 'is-basic' : undefined}>
            <dt>{g[lang]}</dt>
            <dd>{(lang === 'en' && g.itemsEn ? g.itemsEn : g.items).join(', ')}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function Contact() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">{t.contact.heading}</h2>
        <p className="contact-intro">{t.contact.intro}</p>

        <div className="contact-email">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <button type="button" className="btn btn--ghost btn--small" onClick={copy}>
            {copied ? t.contact.copied : t.contact.copy}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? t.contact.copied : ''}
          </span>
        </div>

        <ul className="contact-list">
          <li>
            <span>{t.contact.phone}</span>
            <a href={PROFILE.phoneHref}>{PROFILE.phoneDisplay}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              {PROFILE.linkedinLabel}
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              {PROFILE.githubLabel}
            </a>
          </li>
          <li>
            <span>CV</span>
            <a href={PROFILE.cv} download>
              {t.nav.cv}
            </a>
          </li>
        </ul>
        <p className="footer-note">{t.footer}</p>
      </div>
    </section>
  )
}
