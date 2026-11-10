import { useLang } from '../i18n'
import { PROJECTS, OTHER_WORK } from '../data/content'

function Project({ p }) {
  const { lang, t } = useLang()
  const c = p[lang]
  const name = lang === 'en' && p.nameEn ? p.nameEn : p.name

  return (
    <article className="case" id={`p-${p.id}`} aria-labelledby={`p-${p.id}-title`}>
      <header className="case-head">
        <h3 id={`p-${p.id}-title`} className="case-name">
          {name}
        </h3>
        <p className="case-kind">{c.kind}</p>
        <dl className="case-meta">
          <div>
            <dt className="sr-only">{lang === 'es' ? 'Años' : 'Years'}</dt>
            <dd>{p.years}</dd>
          </div>
          <div>
            <dt className="sr-only">{lang === 'es' ? 'Rol' : 'Role'}</dt>
            <dd>{c.role}</dd>
          </div>
        </dl>
        <div className="case-links">
          {p.demo && (
            <a className="btn btn--solid btn--small" href={p.demo} target="_blank" rel="noreferrer">
              {t.projects.demo}
            </a>
          )}
          {p.links.map((l) => (
            <a key={l.href} className="btn btn--line btn--small" href={l.href} target="_blank" rel="noreferrer">
              {t.projects.code}: {l.label[lang]}
            </a>
          ))}
          {p.backendPending && <p className="case-pending">{t.projects.codeSoon}</p>}
        </div>
      </header>

      <div className="case-body">
        <h4>{t.projects.problem}</h4>
        <p className="case-problem">{c.problem}</p>

        <h4>{t.projects.mine}</h4>
        <ul className="case-mine">
          {c.mine.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        {c.evidence && (
          <>
            <h4>{t.projects.evidence}</h4>
            <dl className="case-evidence">
              {c.evidence.map((e) => (
                <div key={e.label}>
                  <dt>{e.value}</dt>
                  <dd>{e.label}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {c.chat && (
          <figure className="chat">
            <ol>
              {c.chat.map(([who, text], i) => (
                <li key={i} className={`chat-line chat-line--${who}`}>
                  <span className="chat-who">{who === 'you' ? t.projects.chatYou : t.projects.chatBot}</span>
                  <span lang="es">{text}</span>
                </li>
              ))}
            </ol>
            {c.chatNote && <figcaption>{c.chatNote}</figcaption>}
          </figure>
        )}

        <h4 className="sr-only">{t.projects.stack}</h4>
        <ul className="chips" aria-label={t.projects.stack}>
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Projects() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section-head">
        <h2 id="projects-title">{t.projects.heading}</h2>
        <p>{t.projects.intro}</p>
      </div>

      {PROJECTS.map((p) => (
        <Project key={p.id} p={p} />
      ))}

      <h3 className="other-title">{t.projects.otherHeading}</h3>
      <ul className="other">
        {OTHER_WORK.map((w) => {
          const c = w[lang]
          return (
            <li key={w.id}>
              <p className="other-tag">
                {c.tag}, {w.years}
              </p>
              <h4>
                {w.href ? (
                  <a href={w.href} target="_blank" rel="noreferrer">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h4>
              <p>{c.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
