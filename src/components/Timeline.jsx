import { useLang } from '../i18n'
import { TIMELINE } from '../data/content'
import SectionHead from './SectionHead'

/** Formación, experiencia y certificaciones, de lo más reciente a lo más antiguo. */
export default function Timeline() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="path" aria-labelledby="path-title">
      <SectionHead id="path-title" title={t.path.heading} />
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
