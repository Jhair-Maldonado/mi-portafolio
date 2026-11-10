import { useLang } from '../i18n'

/**
 * Caso de estudio de un proyecto: a la izquierda, nombre, rol y enlaces
 * (fijos al hacer scroll en escritorio); a la derecha, problema, aporte personal,
 * evidencia y tecnologías.
 *
 * @param {Object} props
 * @param {import('../data/content').Project} props.project
 */
export default function CaseStudy({ project }) {
  const { lang, t } = useLang()
  const copy = project[lang]
  const name = lang === 'en' && project.nameEn ? project.nameEn : project.name
  const titleId = `p-${project.id}-title`

  return (
    <article className="case" id={`p-${project.id}`} aria-labelledby={titleId}>
      <header className="case-head">
        <h3 id={titleId} className="case-name">
          {name}
        </h3>
        <p className="case-kind">{copy.kind}</p>
        <dl className="case-meta">
          <div>
            <dt className="sr-only">{lang === 'es' ? 'Años' : 'Years'}</dt>
            <dd>{project.years}</dd>
          </div>
          <div>
            <dt className="sr-only">{lang === 'es' ? 'Rol' : 'Role'}</dt>
            <dd>{copy.role}</dd>
          </div>
        </dl>
        <div className="case-links">
          {project.demo && (
            <a className="btn btn--solid btn--small" href={project.demo} target="_blank" rel="noreferrer">
              {t.projects.demo}
            </a>
          )}
          {project.links.map((link) => (
            <a key={link.href} className="btn btn--line btn--small" href={link.href} target="_blank" rel="noreferrer">
              {t.projects.code}: {link.label[lang]}
            </a>
          ))}
          {project.backendPending && <p className="case-pending">{t.projects.codeSoon}</p>}
        </div>
      </header>

      <div className="case-body">
        <h4>{t.projects.problem}</h4>
        <p className="case-problem">{copy.problem}</p>

        <h4>{t.projects.mine}</h4>
        <ul className="case-mine">
          {copy.mine.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {copy.evidence && (
          <>
            <h4>{t.projects.evidence}</h4>
            <dl className="case-evidence">
              {copy.evidence.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.value}</dt>
                  <dd>{fact.label}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {copy.chat && <ChatSample lines={copy.chat} note={copy.chatNote} />}

        <h4 className="sr-only">{t.projects.stack}</h4>
        <ul className="chips" aria-label={t.projects.stack}>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

/**
 * Conversación de ejemplo con el chatbot. El bot responde en español,
 * por eso cada mensaje se marca con `lang="es"`.
 *
 * @param {Object} props
 * @param {['you' | 'bot', string][]} props.lines
 * @param {string} [props.note]
 */
function ChatSample({ lines, note }) {
  const { t } = useLang()
  return (
    <figure className="chat">
      <ol>
        {lines.map(([who, text], i) => (
          <li key={i} className={`chat-line chat-line--${who}`}>
            <span className="chat-who">{who === 'you' ? t.projects.chatYou : t.projects.chatBot}</span>
            <span lang="es">{text}</span>
          </li>
        ))}
      </ol>
      {note && <figcaption>{note}</figcaption>}
    </figure>
  )
}
