import { useLang } from '../i18n'
import { SKILLS } from '../data/content'
import SectionHead from './SectionHead'

/**
 * Conocimientos agrupados por área, con el mismo orden que el CV.
 * Los grupos con `basic: true` se muestran en un tono más suave.
 */
export default function Skills() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <SectionHead id="stack-title" title={t.stack.heading} intro={t.stack.intro} />
      <dl className="skills">
        {SKILLS.map((group) => {
          const items = lang === 'en' && group.itemsEn ? group.itemsEn : group.items
          return (
            <div key={group.es} className={group.basic ? 'is-basic' : undefined}>
              <dt>{group[lang]}</dt>
              <dd>{items.join(', ')}</dd>
            </div>
          )
        })}
      </dl>
    </section>
  )
}
