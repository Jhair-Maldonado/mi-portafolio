import { LangProvider, useLang } from './i18n'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import { Path, Skills, Contact } from './components/Background'

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
          <Path />
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
