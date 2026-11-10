import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Escena: un prisma hexagonal (dominio) con seis adaptadores conectados a sus lados.
// Las etiquetas son botones HTML que siguen la proyección 3D de cada adaptador.

const LINE = 0x8fa3d9
const COBALT = 0x5b7cff
const AMBER = 0xf5b83d

export default function HexScene({ adapters, active, onSelect, coreLabel, label }) {
  const mountRef = useRef(null)
  const labelRefs = useRef([])
  const coreLabelRef = useRef(null)
  const activeRef = useRef(active)
  const idsRef = useRef([])
  useEffect(() => {
    activeRef.current = active
    idsRef.current = adapters.map((a) => a.id)
  }, [active, adapters])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      mount.dataset.fallback = 'true'
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0, 9.5)

    scene.add(new THREE.AmbientLight(0xffffff, 0.55))
    const key = new THREE.DirectionalLight(0xffffff, 1.6)
    key.position.set(3, 5, 6)
    scene.add(key)
    const glow = new THREE.PointLight(AMBER, 6, 6, 1.5)
    glow.position.set(0, 0, 1.2)
    scene.add(glow)

    // Grupo inclinado: el plano del hexágono mira hacia la cámara en diagonal.
    const tilt = new THREE.Group()
    tilt.rotation.x = -0.95
    scene.add(tilt)
    const spin = new THREE.Group()
    tilt.add(spin)

    const disposables = []
    const track = (o) => (disposables.push(o), o)

    // Núcleo: prisma hexagonal. CylinderGeometry con 6 lados, eje Y -> lo giramos para que el eje sea Z.
    const coreGeo = track(new THREE.CylinderGeometry(1.15, 1.15, 0.55, 6))
    const coreMat = track(
      new THREE.MeshStandardMaterial({ color: AMBER, emissive: AMBER, emissiveIntensity: 0.25, metalness: 0.15, roughness: 0.35 })
    )
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.rotation.x = Math.PI / 2
    spin.add(core)
    const coreEdges = new THREE.LineSegments(
      track(new THREE.EdgesGeometry(coreGeo)),
      track(new THREE.LineBasicMaterial({ color: 0xfff1cc }))
    )
    core.add(coreEdges)

    // Anillo exterior: contorno hexagonal (límite de la aplicación).
    const ringR = 2.55
    const ringPts = []
    for (let i = 0; i <= 6; i++) {
      const a = (i / 6) * Math.PI * 2
      ringPts.push(new THREE.Vector3(Math.cos(a) * ringR, Math.sin(a) * ringR, 0))
    }
    const ring = new THREE.Line(
      track(new THREE.BufferGeometry().setFromPoints(ringPts)),
      track(new THREE.LineDashedMaterial({ color: LINE, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.6 }))
    )
    ring.computeLineDistances()
    spin.add(ring)

    // Adaptadores: en el punto medio de cada lado del anillo, conectados al lado correspondiente del núcleo.
    const nodeGeo = track(new THREE.CylinderGeometry(0.34, 0.34, 0.22, 6))
    const nodes = []
    const anchors = []
    const apothemRing = ringR * Math.cos(Math.PI / 6)
    const apothemCore = 1.15 * Math.cos(Math.PI / 6)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6
      const dir = new THREE.Vector3(Math.cos(a), Math.sin(a), 0)
      const pos = dir.clone().multiplyScalar(apothemRing + 0.25)

      const mat = track(new THREE.MeshStandardMaterial({ color: COBALT, emissive: COBALT, emissiveIntensity: 0.15, metalness: 0.1, roughness: 0.45 }))
      const node = new THREE.Mesh(nodeGeo, mat)
      node.rotation.x = Math.PI / 2
      node.position.copy(pos)
      spin.add(node)
      nodes.push(node)

      const wireMat = track(new THREE.LineBasicMaterial({ color: LINE, transparent: true, opacity: 0.55 }))
      const wire = new THREE.Line(
        track(new THREE.BufferGeometry().setFromPoints([dir.clone().multiplyScalar(apothemCore), dir.clone().multiplyScalar(apothemRing + 0.02)])),
        wireMat
      )
      spin.add(wire)
      node.userData.wire = wireMat

      const anchor = new THREE.Object3D()
      anchor.position.copy(dir.clone().multiplyScalar(apothemRing + 0.95))
      spin.add(anchor)
      anchors.push(anchor)
    }

    // El núcleo hexagonal está orientado con vértice en X; alineamos sus lados con los cables.
    core.rotation.y = 0

    // Tamaño
    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // En pantallas estrechas alejamos la cámara para que quepa todo.
      camera.position.z = w < 520 ? 11.5 : 9.5
      camera.updateProjectionMatrix()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    // Interacción: arrastrar para girar.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dragging = false
    let lastX = 0
    let lastY = 0
    let velocity = reduced ? 0 : 0.0025
    let tiltTarget = tilt.rotation.x
    const el = renderer.domElement
    el.style.touchAction = 'pan-y'
    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
      el.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      spin.rotation.z += dx * 0.008
      tiltTarget = THREE.MathUtils.clamp(tiltTarget + dy * 0.004, -1.35, -0.35)
      velocity = reduced ? 0 : THREE.MathUtils.clamp(dx * 0.0006, -0.02, 0.02)
    }
    const onUp = () => {
      dragging = false
    }
    let hovering = false
    const onEnter = () => (hovering = true)
    const onLeave = () => (hovering = false)
    mount.addEventListener('pointerenter', onEnter)
    mount.addEventListener('pointerleave', onLeave)
    mount.addEventListener('focusin', onEnter)
    mount.addEventListener('focusout', onLeave)
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    // Pausa cuando la escena no está a la vista.
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(mount)

    const v = new THREE.Vector3()
    const project = (obj, elx) => {
      if (!elx) return
      obj.getWorldPosition(v)
      v.project(camera)
      const x = (v.x * 0.5 + 0.5) * mount.clientWidth
      const y = (-v.y * 0.5 + 0.5) * mount.clientHeight
      elx.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
    }

    let raf
    const clock = new THREE.Clock()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = clock.getElapsedTime()
      if (!dragging) {
        spin.rotation.z += velocity
        // La inercia vuelve suavemente al giro lento de reposo.
        // Se detiene mientras el puntero está encima, para poder pulsar las etiquetas.
        const rest = reduced || hovering ? 0 : 0.0025
        velocity += (rest - velocity) * 0.02
      }
      tilt.rotation.x += (tiltTarget - tilt.rotation.x) * 0.08
      core.position.z = reduced ? 0 : Math.sin(t * 1.2) * 0.06

      const act = activeRef.current
      nodes.forEach((n, i) => {
        const on = idsRef.current[i] === act
        n.material.color.setHex(on ? AMBER : COBALT)
        n.material.emissive.setHex(on ? AMBER : COBALT)
        n.material.emissiveIntensity = on ? 0.45 : 0.15
        const s = on ? 1.3 : 1
        n.scale.lerp(v.set(s, s, s), 0.15)
        n.userData.wire.opacity = on ? 1 : 0.45
        n.userData.wire.color.setHex(on ? AMBER : LINE)
      })
      coreMat.emissiveIntensity = act === 'core' ? 0.6 : 0.25

      renderer.render(scene, camera)
      anchors.forEach((a, i) => project(a, labelRefs.current[i]))
      project(core, coreLabelRef.current)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mount.removeEventListener('pointerenter', onEnter)
      mount.removeEventListener('pointerleave', onLeave)
      mount.removeEventListener('focusin', onEnter)
      mount.removeEventListener('focusout', onLeave)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      disposables.forEach((d) => d.dispose?.())
      renderer.dispose()
      mount.removeChild(el)
    }
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
      {adapters.map((a, i) => (
        <button
          key={a.id}
          type="button"
          ref={(el) => (labelRefs.current[i] = el)}
          className={'scene-tag' + (active === a.id ? ' is-active' : '')}
          aria-pressed={active === a.id}
          onClick={() => onSelect(a.id)}
        >
          {a.label}
        </button>
      ))}
    </div>
  )
}
