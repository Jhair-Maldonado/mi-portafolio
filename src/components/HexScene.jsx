import { useEffect, useRef } from 'react'
import { createHexScene } from '../three/hexArchitecture'

/**
 * Modelo 3D interactivo de la arquitectura hexagonal.
 *
 * La escena de three.js se monta una sola vez. El estado que cambia
 * (adaptador activo, etiquetas por idioma) se lee desde refs en cada fotograma,
 * así cambiar de idioma o de selección no reconstruye la escena.
 *
 * Si el navegador no soporta WebGL, las etiquetas se muestran como una lista
 * de botones (ver `.scene[data-fallback]` en index.css).
 *
 * @param {Object} props
 * @param {{ id: string, label: string }[]} props.adapters Seis adaptadores, en orden.
 * @param {string} props.active Id seleccionado: 'core' o el id de un adaptador.
 * @param {(id: string) => void} props.onSelect Se llama al pulsar una etiqueta.
 * @param {string} props.coreLabel Texto de la etiqueta central.
 * @param {string} props.label Descripción accesible de la escena.
 */
export default function HexScene({ adapters, active, onSelect, coreLabel, label }) {
  const mountRef = useRef(null)
  const labelRefs = useRef([])
  const coreLabelRef = useRef(null)
  const activeRef = useRef(active)
  const idsRef = useRef([])

  useEffect(() => {
    activeRef.current = active
    idsRef.current = adapters.map((adapter) => adapter.id)
  }, [active, adapters])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const dispose = createHexScene(mount, {
      getActive: () => activeRef.current,
      getAdapterIds: () => idsRef.current,
      getLabels: () => labelRefs.current,
      getCoreLabel: () => coreLabelRef.current,
    })
    if (!dispose) mount.dataset.fallback = 'true'
    return dispose ?? undefined
  }, [])

  return (
    <div className="scene" ref={mountRef} role="group" aria-label={label}>
      <button
        type="button"
        ref={coreLabelRef}
        className={'scene-tag scene-tag--core' + (active === 'core' ? ' is-active' : '')}
        aria-pressed={active === 'core'}
        onClick={() => onSelect('core')}
      >
        {coreLabel}
      </button>
      {adapters.map((adapter, i) => (
        <button
          key={adapter.id}
          type="button"
          ref={(el) => {
            labelRefs.current[i] = el
          }}
          className={'scene-tag' + (active === adapter.id ? ' is-active' : '')}
          aria-pressed={active === adapter.id}
          onClick={() => onSelect(adapter.id)}
        >
          {adapter.label}
        </button>
      ))}
    </div>
  )
}
