import { useLang } from '../i18n'
import { PROJECTS, OTHER_WORK } from '../data/content'
import SectionHead from './SectionHead'
import CaseStudy from './CaseStudy'

/** Sección de proyectos: casos de estudio principales y una lista de otros trabajos. */
export default function Projects() {
  const { t, lang } = useLang()
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <SectionHead id="projects-title" title={t.projects.heading} intro={t.projects.intro} />

      {PROJECTS.map((project) => (
        <CaseStudy key={project.id} project={project} />
      ))}

      <h3 className="other-title">{t.projects.otherHeading}</h3>
      <ul className="other">
        {OTHER_WORK.map((work) => {
          const copy = work[lang]
          return (
            <li key={work.id}>
              <p className="other-tag">
                {copy.tag}, {work.years}
              </p>
              <h4>
                {work.href ? (
                  <a href={work.href} target="_blank" rel="noreferrer">
                    {copy.name}
                  </a>
                ) : (
                  copy.name
                )}
              </h4>
              <p>{copy.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
