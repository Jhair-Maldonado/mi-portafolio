import { lazy, Suspense, useState } from 'react'
import { useLang } from '../i18n'
import { PROFILE } from '../data/profile'

const HexScene = lazy(() => import('./HexScene'))

export default function Hero() {
  const { t } = useLang()
  const [active, setActive] = useState('ai')
  const adapter = t.adapters.find((a) => a.id === active)
  const note = active === 'core' ? t.hero.coreNote : adapter?.note
  const title = active === 'core' ? t.hero.core : adapter?.label

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-role">{t.hero.role}</p>
          <h1 id="hero-name" className="hero-name">
            <span>Jhair</span>
            <span>Maldonado</span>
          </h1>
          <p className="hero-lede">{t.hero.lede}</p>
          <p className="hero-status">
            <span className="dot" aria-hidden="true" />
            {t.hero.status}
          </p>
          <div className="hero-actions">
            <a className="btn btn--solid" href="#projects">
              {t.hero.ctaProjects}
            </a>
            <a className="btn btn--ghost" href={PROFILE.cv} download>
              {t.hero.ctaCv}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <Suspense fallback={<div className="scene" aria-hidden="true" />}>
            <HexScene
              adapters={t.adapters}
              active={active}
              onSelect={setActive}
              coreLabel={t.hero.core}
              label={t.hero.sceneLabel}
            />
          </Suspense>
          <div className="scene-caption" aria-live="polite">
            <p className="scene-caption-title">{title}</p>
            <p>{note}</p>
          </div>
          <p className="scene-hint">{t.hero.sceneHint}</p>
        </div>
      </div>
    </section>
  )
}
