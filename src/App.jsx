import { LangProvider, useLang } from './i18n'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Contact from './components/Contact'

/** Estructura de la página. Las secciones claras van dentro de `.page`. */
function Page() {
  const { t } = useLang()
  return (
    <>
      <a href="#content" className="skip-link">
        {t.nav.skip}
      </a>
      <Header />
      <main id="content">
        <Hero />
        <div className="page">
          <Projects />
          <Timeline />
          <Skills />
        </div>
        <Contact />
      </main>
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}
