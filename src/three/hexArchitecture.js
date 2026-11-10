/**
 * Escena 3D del hero: una arquitectura hexagonal (puertos y adaptadores).
 *
 * - Un prisma hexagonal ámbar en el centro representa el dominio.
 * - Seis adaptadores azules se conectan a cada lado del dominio.
 * - Un contorno punteado marca el límite de la aplicación.
 *
 * Este módulo no sabe nada de React: recibe un contenedor del DOM y funciones
 * para leer el estado, y devuelve una función para liberar recursos.
 * Así la lógica de three.js se puede probar o reutilizar por separado.
 */
import * as THREE from 'three'

const COLORS = {
  line: 0x8fa3d9,
  cobalt: 0x5b7cff,
  amber: 0xf5b83d,
  coreEdge: 0xfff1cc,
}

const GEOMETRY = {
  coreRadius: 1.15,
  coreDepth: 0.55,
  ringRadius: 2.55,
  nodeRadius: 0.34,
  nodeDepth: 0.22,
  /** Distancia extra desde el nodo hasta su etiqueta HTML. */
  labelOffset: 0.95,
}

const MOTION = {
  /** Giro en reposo, en radianes por fotograma. */
  idleSpin: 0.0025,
  dragSpinFactor: 0.008,
  dragTiltFactor: 0.004,
  tiltMin: -1.35,
  tiltMax: -0.35,
  initialTilt: -0.95,
}

const SIDES = 6

/**
 * @typedef {Object} HexSceneOptions
 * @property {() => string} getActive      Id del elemento seleccionado ('core' o el id de un adaptador).
 * @property {() => string[]} getAdapterIds Ids de los adaptadores, en orden.
 * @property {() => (HTMLElement|null)[]} getLabels Etiquetas HTML de los adaptadores, en el mismo orden.
 * @property {() => (HTMLElement|null)} getCoreLabel Etiqueta HTML del dominio.
 */

/**
 * Monta la escena dentro de `mount`.
 *
 * @param {HTMLElement} mount Contenedor con tamaño definido por CSS.
 * @param {HexSceneOptions} options
 * @returns {(() => void) | null} Función de limpieza, o `null` si el navegador no soporta WebGL.
 */
export function createHexScene(mount, options) {
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  const canvas = renderer.domElement
  canvas.style.touchAction = 'pan-y' // en móvil, el desplazamiento vertical sigue funcionando
  mount.appendChild(canvas)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
  camera.position.set(0, 0, 9.5)
  addLights(scene)

  // `tilt` inclina el plano del hexágono; `spin` lo hace girar sobre sí mismo.
  const tilt = new THREE.Group()
  tilt.rotation.x = MOTION.initialTilt
  scene.add(tilt)
  const spin = new THREE.Group()
  tilt.add(spin)

  const disposables = []
  const track = (resource) => {
    disposables.push(resource)
    return resource
  }

  const { core, coreMaterial } = buildCore(spin, track)
  buildBoundary(spin, track)
  const { nodes, anchors } = buildAdapters(spin, track)

  // ---- Tamaño ----
  const resize = () => {
    const width = mount.clientWidth
    const height = mount.clientHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.position.z = width < 520 ? 11.5 : 9.5 // en pantallas estrechas alejamos la cámara
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(mount)
  resize()

  // ---- Interacción ----
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const state = {
    dragging: false,
    hovering: false,
    visible: true,
    lastX: 0,
    lastY: 0,
    velocity: reducedMotion ? 0 : MOTION.idleSpin,
    tiltTarget: MOTION.initialTilt,
  }

  const onPointerDown = (event) => {
    state.dragging = true
    state.lastX = event.clientX
    state.lastY = event.clientY
    canvas.setPointerCapture?.(event.pointerId)
  }
  const onPointerMove = (event) => {
    if (!state.dragging) return
    const dx = event.clientX - state.lastX
    const dy = event.clientY - state.lastY
    state.lastX = event.clientX
    state.lastY = event.clientY
    spin.rotation.z += dx * MOTION.dragSpinFactor
    state.tiltTarget = THREE.MathUtils.clamp(
      state.tiltTarget + dy * MOTION.dragTiltFactor,
      MOTION.tiltMin,
      MOTION.tiltMax
    )
    state.velocity = reducedMotion ? 0 : THREE.MathUtils.clamp(dx * 0.0006, -0.02, 0.02)
  }
  const onPointerUp = () => {
    state.dragging = false
  }
  // El giro se detiene con el puntero o el foco encima, para poder pulsar las etiquetas.
  const onEnter = () => {
    state.hovering = true
  }
  const onLeave = () => {
    state.hovering = false
  }

  canvas.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  mount.addEventListener('pointerenter', onEnter)
  mount.addEventListener('pointerleave', onLeave)
  mount.addEventListener('focusin', onEnter)
  mount.addEventListener('focusout', onLeave)

  // No renderizamos mientras la escena está fuera de pantalla.
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting
  })
  intersectionObserver.observe(mount)

  // ---- Bucle de animación ----
  const scratch = new THREE.Vector3()

  /** Coloca una etiqueta HTML sobre la proyección en pantalla de un objeto 3D. */
  const placeLabel = (object, label) => {
    if (!label) return
    object.getWorldPosition(scratch)
    scratch.project(camera)
    const x = (scratch.x * 0.5 + 0.5) * mount.clientWidth
    const y = (-scratch.y * 0.5 + 0.5) * mount.clientHeight
    label.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
  }

  const clock = new THREE.Clock()
  let frame
  const tick = () => {
    frame = requestAnimationFrame(tick)
    if (!state.visible) return

    if (!state.dragging) {
      spin.rotation.z += state.velocity
      // La inercia del arrastre vuelve poco a poco al giro de reposo.
      const rest = reducedMotion || state.hovering ? 0 : MOTION.idleSpin
      state.velocity += (rest - state.velocity) * 0.02
    }
    tilt.rotation.x += (state.tiltTarget - tilt.rotation.x) * 0.08
    core.position.z = reducedMotion ? 0 : Math.sin(clock.getElapsedTime() * 1.2) * 0.06

    const active = options.getActive()
    const ids = options.getAdapterIds()
    nodes.forEach((node, i) => highlightNode(node, ids[i] === active, scratch))
    coreMaterial.emissiveIntensity = active === 'core' ? 0.6 : 0.25

    renderer.render(scene, camera)
    const labels = options.getLabels()
    anchors.forEach((anchor, i) => placeLabel(anchor, labels[i]))
    placeLabel(core, options.getCoreLabel())
  }
  tick()

  return function dispose() {
    cancelAnimationFrame(frame)
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    canvas.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    mount.removeEventListener('pointerenter', onEnter)
    mount.removeEventListener('pointerleave', onLeave)
    mount.removeEventListener('focusin', onEnter)
    mount.removeEventListener('focusout', onLeave)
    disposables.forEach((resource) => resource.dispose?.())
    renderer.dispose()
    canvas.remove()
  }
}

function addLights(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.55))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(3, 5, 6)
  scene.add(key)
  const glow = new THREE.PointLight(COLORS.amber, 6, 6, 1.5)
  glow.position.set(0, 0, 1.2)
  scene.add(glow)
}

/** Prisma hexagonal del dominio, con sus aristas resaltadas. */
function buildCore(parent, track) {
  const geometry = track(
    new THREE.CylinderGeometry(GEOMETRY.coreRadius, GEOMETRY.coreRadius, GEOMETRY.coreDepth, SIDES)
  )
  const coreMaterial = track(
    new THREE.MeshStandardMaterial({
      color: COLORS.amber,
      emissive: COLORS.amber,
      emissiveIntensity: 0.25,
      metalness: 0.15,
      roughness: 0.35,
    })
  )
  const core = new THREE.Mesh(geometry, coreMaterial)
  core.rotation.x = Math.PI / 2 // el eje del cilindro pasa de Y a Z
  core.add(
    new THREE.LineSegments(
      track(new THREE.EdgesGeometry(geometry)),
      track(new THREE.LineBasicMaterial({ color: COLORS.coreEdge }))
    )
  )
  parent.add(core)
  return { core, coreMaterial }
}

/** Contorno hexagonal punteado: el límite de la aplicación. */
function buildBoundary(parent, track) {
  const points = []
  for (let i = 0; i <= SIDES; i++) {
    const angle = (i / SIDES) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * GEOMETRY.ringRadius, Math.sin(angle) * GEOMETRY.ringRadius, 0))
  }
  const boundary = new THREE.Line(
    track(new THREE.BufferGeometry().setFromPoints(points)),
    track(
      new THREE.LineDashedMaterial({
        color: COLORS.line,
        dashSize: 0.12,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.6,
      })
    )
  )
  boundary.computeLineDistances()
  parent.add(boundary)
}

/**
 * Un adaptador por lado: un nodo en el borde, un cable hasta el dominio
 * y un punto de anclaje invisible donde se coloca su etiqueta.
 */
function buildAdapters(parent, track) {
  const geometry = track(
    new THREE.CylinderGeometry(GEOMETRY.nodeRadius, GEOMETRY.nodeRadius, GEOMETRY.nodeDepth, SIDES)
  )
  // Apotema: distancia del centro al punto medio de un lado.
  const ringApothem = GEOMETRY.ringRadius * Math.cos(Math.PI / SIDES)
  const coreApothem = GEOMETRY.coreRadius * Math.cos(Math.PI / SIDES)
  const nodes = []
  const anchors = []

  for (let i = 0; i < SIDES; i++) {
    const angle = (i / SIDES) * Math.PI * 2 + Math.PI / SIDES
    const direction = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0)
    const at = (distance) => direction.clone().multiplyScalar(distance)

    const material = track(
      new THREE.MeshStandardMaterial({
        color: COLORS.cobalt,
        emissive: COLORS.cobalt,
        emissiveIntensity: 0.15,
        metalness: 0.1,
        roughness: 0.45,
      })
    )
    const node = new THREE.Mesh(geometry, material)
    node.rotation.x = Math.PI / 2
    node.position.copy(at(ringApothem + 0.25))
    parent.add(node)

    const wireMaterial = track(new THREE.LineBasicMaterial({ color: COLORS.line, transparent: true, opacity: 0.55 }))
    parent.add(
      new THREE.Line(
        track(new THREE.BufferGeometry().setFromPoints([at(coreApothem), at(ringApothem + 0.02)])),
        wireMaterial
      )
    )
    node.userData.wire = wireMaterial
    nodes.push(node)

    const anchor = new THREE.Object3D()
    anchor.position.copy(at(ringApothem + GEOMETRY.labelOffset))
    parent.add(anchor)
    anchors.push(anchor)
  }
  return { nodes, anchors }
}

/** Resalta (en ámbar y más grande) el adaptador seleccionado. */
function highlightNode(node, isActive, scratch) {
  const color = isActive ? COLORS.amber : COLORS.cobalt
  node.material.color.setHex(color)
  node.material.emissive.setHex(color)
  node.material.emissiveIntensity = isActive ? 0.45 : 0.15
  const scale = isActive ? 1.3 : 1
  node.scale.lerp(scratch.set(scale, scale, scale), 0.15)
  node.userData.wire.opacity = isActive ? 1 : 0.45
  node.userData.wire.color.setHex(isActive ? COLORS.amber : COLORS.line)
}
