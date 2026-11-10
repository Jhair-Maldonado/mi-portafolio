// Todo el texto del sitio en español e inglés.
// Cada proyecto lista solo lo que Jhair hizo personalmente.

export const CONTENT = {
  es: {
    meta: {
      title: 'Jhair Maldonado, desarrollo backend',
      description:
        'Estudiante de Ingeniería de Sistemas (UTP) enfocado en backend con Java y Spring Boot. Proyectos, experiencia y contacto.',
    },
    nav: {
      skip: 'Saltar al contenido',
      projects: 'Proyectos',
      path: 'Trayectoria',
      stack: 'Conocimientos',
      contact: 'Contacto',
      cv: 'Descargar CV',
      langLabel: 'Idioma',
    },
    hero: {
      role: 'Desarrollo backend con Java y Spring Boot',
      lede: 'Construyo sistemas con arquitectura hexagonal: el dominio en el centro, y la base de datos, la seguridad y la IA como adaptadores que se pueden cambiar sin romper nada. Cada módulo que entrego viene con sus pruebas.',
      status: 'Noveno ciclo de Ingeniería de Sistemas en la UTP. Busco prácticas preprofesionales en Sistemas y TI.',
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      sceneHint: 'Arrastra para girar. Elige un adaptador para ver dónde lo usé.',
      sceneLabel: 'Modelo 3D de una arquitectura hexagonal con el dominio al centro y seis adaptadores',
      core: 'Dominio',
      coreNote: 'El centro: reglas de negocio puras, sin depender de frameworks.',
    },
    adapters: [
      { id: 'rest', label: 'API REST', note: 'CORAULA: endpoints de Spring Boot para el módulo de administrador.' },
      { id: 'pg', label: 'PostgreSQL', note: 'CORAULA: esquema en Supabase versionado con migraciones de Flyway.' },
      { id: 'jwt', label: 'JWT y roles', note: 'CORAULA: sesión con JWT, permisos por rol, bloqueo por intentos fallidos y auditoría.' },
      { id: 'ai', label: 'Gemini', note: 'SIVI: asistente que consulta ventas e inventario y responde según el rol del usuario.' },
      { id: 'test', label: 'JUnit', note: 'CORAULA: más de 700 pruebas automatizadas en el equipo.' },
      { id: 'ci', label: 'GitHub Actions', note: 'CORAULA: cada cambio pasa por integración continua antes de unirse.' },
    ],
    projects: {
      heading: 'Proyectos',
      intro: 'Tres sistemas donde escribí buena parte del código. En cada uno separo lo que hice yo de lo que hizo el equipo.',
      problem: 'El problema',
      mine: 'Lo que hice',
      evidence: 'Evidencia',
      stack: 'Tecnologías',
      demo: 'Abrir demo',
      code: 'Ver código',
      codeSoon: 'Código del backend: se publicará sin datos sensibles',
      demoNote: 'Demo con datos de prueba en preparación',
      chatYou: 'Tú',
      chatBot: 'Bot',
      otherHeading: 'Otros trabajos',
    },
    path: {
      heading: 'Trayectoria',
    },
    stack: {
      heading: 'Conocimientos',
      intro: 'Lo que uso a diario arriba; lo que estoy aprendiendo, marcado como básico.',
    },
    contact: {
      heading: 'Hablemos',
      intro: 'Si tienes una práctica en desarrollo, sistemas o soporte TI, escríbeme o llámame.',
      email: 'Correo',
      phone: 'Teléfono',
      copy: 'Copiar correo',
      copied: 'Correo copiado',
    },
    footer: 'Diseñado y programado por Jhair Maldonado en 2026, con React y three.js.',
  },

  en: {
    meta: {
      title: 'Jhair Maldonado, backend development',
      description:
        'Systems Engineering student (UTP, Peru) focused on backend development with Java and Spring Boot. Projects, experience and contact.',
    },
    nav: {
      skip: 'Skip to content',
      projects: 'Projects',
      path: 'Background',
      stack: 'Skills',
      contact: 'Contact',
      cv: 'Download CV (Spanish)',
      langLabel: 'Language',
    },
    hero: {
      role: 'Backend development with Java and Spring Boot',
      lede: 'I build systems with hexagonal architecture: the domain at the center, and the database, security and AI as adapters you can swap without breaking anything. Every module I ship comes with its tests.',
      status: 'Ninth-term Systems Engineering student at UTP, Lima. Looking for an internship in software or IT.',
      ctaProjects: 'See projects',
      ctaCv: 'Download CV',
      sceneHint: 'Drag to rotate. Pick an adapter to see where I used it.',
      sceneLabel: '3D model of a hexagonal architecture with the domain at the center and six adapters',
      core: 'Domain',
      coreNote: 'The center: pure business rules, independent of any framework.',
    },
    adapters: [
      { id: 'rest', label: 'REST API', note: 'CORAULA: Spring Boot endpoints for the admin module.' },
      { id: 'pg', label: 'PostgreSQL', note: 'CORAULA: Supabase schema versioned with Flyway migrations.' },
      { id: 'jwt', label: 'JWT & roles', note: 'CORAULA: JWT sessions, role permissions, lockout after failed logins, and audit logs.' },
      { id: 'ai', label: 'Gemini', note: 'SIVI: an assistant that queries sales and stock and answers according to the user’s role.' },
      { id: 'test', label: 'JUnit', note: 'CORAULA: over 700 automated tests across the team.' },
      { id: 'ci', label: 'GitHub Actions', note: 'CORAULA: every change runs through continuous integration before merging.' },
    ],
    projects: {
      heading: 'Projects',
      intro: 'Three systems where I wrote a large share of the code. For each one I separate my work from the team’s.',
      problem: 'The problem',
      mine: 'What I did',
      evidence: 'Evidence',
      stack: 'Technologies',
      demo: 'Open demo',
      code: 'View code',
      codeSoon: 'Backend code: to be published without sensitive data',
      demoNote: 'Demo with sample data in progress',
      chatYou: 'You',
      chatBot: 'Bot',
      otherHeading: 'Other work',
    },
    path: {
      heading: 'Background',
    },
    stack: {
      heading: 'Skills',
      intro: 'Daily tools first; what I’m still learning is marked as basic.',
    },
    contact: {
      heading: 'Let’s talk',
      intro: 'If you have an internship in development, systems or IT support, email or call me.',
      email: 'Email',
      phone: 'Phone',
      copy: 'Copy email',
      copied: 'Email copied',
    },
    footer: 'Designed and built by Jhair Maldonado in 2026, with React and three.js.',
  },
}

export const PROJECTS = [
  {
    id: 'coraula',
    name: 'CORAULA',
    years: '2026',
    demo: 'https://coraula-front.vercel.app',
    links: [
      { kind: 'code', href: 'https://github.com/Jhair-Maldonado/CORAULA-FRONT', label: { es: 'Frontend', en: 'Frontend' } },
    ],
    backendPending: true,
    stack: ['Java 17', 'Spring Boot 3.4', 'Spring Security', 'PostgreSQL', 'Flyway', 'Next.js 16', 'TypeScript'],
    es: {
      kind: 'Sistema de gestión académica',
      role: 'Backend y módulo de administrador, en equipo',
      problem:
        'Una institución necesita gestionar cursos, docentes, alumnos y asistencia desde una sola plataforma, con permisos distintos para cada perfil.',
      mine: [
        'Desarrollé la mayor parte del backend con Java y Spring Boot, separado en dominio, aplicación e infraestructura.',
        'Construí el módulo de administrador de punta a punta, del endpoint a la pantalla.',
        'Implementé autenticación con JWT, control de acceso por roles, bloqueo de cuentas tras intentos fallidos y auditoría de cambios.',
        'Propuse las reglas de arquitectura y el flujo de ramas que siguió el equipo.',
      ],
      evidence: [
        { value: '700+', label: 'pruebas automatizadas' },
        { value: 'CI', label: 'en cada cambio con GitHub Actions' },
        { value: '100+', label: 'commits propios en cada repositorio' },
      ],
    },
    en: {
      kind: 'Academic management system',
      role: 'Backend and admin module, team project',
      problem:
        'A school needs to manage courses, teachers, students and attendance on one platform, with different permissions for each profile.',
      mine: [
        'Wrote most of the backend in Java and Spring Boot, split into domain, application and infrastructure layers.',
        'Built the admin module end to end, from endpoint to screen.',
        'Implemented JWT authentication, role-based access control, account lockout after failed logins, and change auditing.',
        'Proposed the architecture rules and branching workflow the team followed.',
      ],
      evidence: [
        { value: '700+', label: 'automated tests' },
        { value: 'CI', label: 'on every change with GitHub Actions' },
        { value: '100+', label: 'of my own commits in each repository' },
      ],
    },
  },
  {
    id: 'sivi',
    name: 'SIVI',
    years: '2025–2026',
    demo: 'https://sivi-front.pages.dev',
    links: [
      { kind: 'code', href: 'https://github.com/Jhair-Maldonado/SIVI_FRONT', label: { es: 'Frontend', en: 'Frontend' } },
    ],
    backendPending: true,
    stack: ['Java', 'Spring Boot', 'Gemini API', 'React 19', 'Vite', 'jsPDF'],
    es: {
      kind: 'Ventas e inventario para un minimarket',
      role: 'Reportería, IA y compras, en equipo',
      problem:
        'Un minimarket necesita vender, controlar su stock y comprar a proveedores sin perder de vista sus números.',
      mine: [
        'Integré un asistente con Gemini que consulta inventario, ventas y proveedores, y solo muestra lo que el rol del usuario tiene permitido ver.',
        'Desarrollé toda la reportería: ventas, inventario y finanzas, exportables a PDF y Excel.',
        'Construí el módulo de órdenes de compra, del registro a la aprobación, con actualización automática del inventario.',
      ],
      evidence: [
        { value: '3', label: 'módulos completos a mi cargo' },
        { value: 'PDF y Excel', label: 'en cada reporte' },
      ],
    },
    en: {
      kind: 'Sales and inventory for a grocery store',
      role: 'Reporting, AI and purchasing, team project',
      problem:
        'A small grocery store needs to sell, track stock and buy from suppliers without losing sight of its numbers.',
      mine: [
        'Integrated a Gemini assistant that queries inventory, sales and suppliers, and only shows what the user’s role is allowed to see.',
        'Built all the reporting: sales, inventory and finance, exportable to PDF and Excel.',
        'Built the purchase order module, from request to approval, with automatic stock updates.',
      ],
      evidence: [
        { value: '3', label: 'complete modules I owned' },
        { value: 'PDF & Excel', label: 'export on every report' },
      ],
    },
  },
  {
    id: 'chatbot',
    name: 'Chatbot de tareas',
    nameEn: 'Task chatbot',
    years: '2025',
    links: [
      { kind: 'code', href: 'https://github.com/Jhair-Maldonado/GestionTareas_Gemini', label: { es: 'Repositorio', en: 'Repository' } },
    ],
    stack: ['Python', 'Gemini 2.0 Flash', 'PyDatalog'],
    es: {
      kind: 'Proyecto del curso Lenguajes de Programación',
      role: 'Desarrollo completo',
      problem: 'Gestionar tareas escribiendo como se habla, sin aprender comandos.',
      mine: [
        'Gemini traduce cada instrucción a predicados lógicos; PyDatalog decide qué hacer y el estado cambia solo con funciones puras.',
        'Combina tres paradigmas en un mismo flujo: lógico, funcional e IA, con persistencia en JSON.',
      ],
      chat: [
        ['you', 'agrega una tarea para mañana de enviar el informe'],
        ['bot', 'Tarea agregada: “enviar el informe” [ID 1]'],
        ['you', '¿qué tengo pendiente?'],
        ['bot', '[ID 1] enviar el informe (2025-12-08)'],
      ],
    },
    en: {
      kind: 'Programming Languages course project',
      role: 'Sole developer',
      problem: 'Manage tasks by writing the way you talk, without learning commands.',
      mine: [
        'Gemini turns each instruction into logic predicates; PyDatalog decides what to do, and state changes only through pure functions.',
        'Combines three paradigms in one flow: logic, functional and AI, with JSON persistence.',
      ],
      chat: [
        ['you', 'agrega una tarea para mañana de enviar el informe'],
        ['bot', 'Tarea agregada: “enviar el informe” [ID 1]'],
        ['you', '¿qué tengo pendiente?'],
        ['bot', '[ID 1] enviar el informe (2025-12-08)'],
      ],
      chatNote: 'The bot speaks Spanish.',
    },
  },
]

export const OTHER_WORK = [
  {
    id: 'maquinaria',
    years: '2026',
    es: {
      name: 'Gestión de maquinaria pesada',
      text: 'Levanté requerimientos y documenté el diseño funcional y la arquitectura técnica para controlar jornadas, mantenimiento e incidencias.',
      tag: 'Análisis y diseño',
    },
    en: {
      name: 'Heavy machinery management',
      text: 'Gathered requirements and documented the functional design and technical architecture for tracking shifts, maintenance and incidents.',
      tag: 'Analysis and design',
    },
  },
  {
    id: 'paratodos',
    years: '2026',
    href: 'https://github.com/Jhair-Maldonado/ParaTodos',
    es: {
      name: 'ParaTodos',
      text: 'Prototipo de tienda de ropa inclusiva. Lo audité con las heurísticas de Nielsen y corregí los problemas de accesibilidad encontrados.',
      tag: 'React, accesibilidad',
    },
    en: {
      name: 'ParaTodos',
      text: 'Inclusive clothing store prototype. I audited it against Nielsen’s heuristics and fixed the accessibility issues found.',
      tag: 'React, accessibility',
    },
  },
  {
    id: 'signs',
    years: '2026',
    href: 'https://github.com/Jhair-Maldonado/INTERPRET_SIGNS',
    es: {
      name: 'InterpretSigns',
      text: 'Reconocimiento de gestos de lengua de señas en el navegador, con la cámara y MediaPipe.',
      tag: 'Angular, MediaPipe',
    },
    en: {
      name: 'InterpretSigns',
      text: 'Sign language gesture recognition in the browser, using the webcam and MediaPipe.',
      tag: 'Angular, MediaPipe',
    },
  },
]

export const TIMELINE = [
  {
    when: { es: 'En curso', en: 'Ongoing' },
    es: { title: 'Preparación para Oracle Java OCA y OCP', place: 'Certificación' },
    en: { title: 'Preparing for Oracle Java OCA and OCP', place: 'Certification' },
  },
  {
    when: { es: '2025', en: '2025' },
    es: { title: 'Power BI, Python y SQL', place: 'Cursos PIT, Universidad Nacional de Ingeniería' },
    en: { title: 'Power BI, Python and SQL', place: 'PIT courses, Universidad Nacional de Ingeniería' },
  },
  {
    when: { es: 'Mar.–nov. 2024', en: 'Mar–Nov 2024' },
    es: {
      title: 'Soporte técnico TI, freelance',
      place: 'Atendí incidencias de hardware y software en laptops, computadoras e impresoras; diagnóstico, mantenimiento preventivo y revisión de red.',
    },
    en: {
      title: 'IT support, freelance',
      place: 'Fixed hardware and software issues on laptops, desktops and printers; diagnostics, preventive maintenance and network checks.',
    },
  },
  {
    when: { es: '2022–hoy', en: '2022–now' },
    es: { title: 'Ingeniería de Sistemas', place: 'Universidad Tecnológica del Perú, noveno ciclo' },
    en: { title: 'Systems Engineering', place: 'Universidad Tecnológica del Perú, ninth term' },
  },
]

export const SKILLS = [
  { es: 'Lenguajes', en: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'SQL'] },
  { es: 'Backend', en: 'Backend', items: ['Spring Boot', 'Spring Security', 'APIs REST', 'Arquitectura hexagonal'], itemsEn: ['Spring Boot', 'Spring Security', 'REST APIs', 'Hexagonal architecture'] },
  { es: 'Frontend', en: 'Frontend', items: ['React', 'Next.js', 'Angular', 'Tailwind CSS'] },
  { es: 'Datos', en: 'Data', items: ['PostgreSQL', 'MySQL', 'Supabase', 'Flyway'] },
  { es: 'Seguridad', en: 'Security', items: ['JWT', 'BCrypt', 'Roles y permisos', 'Auditoría'], itemsEn: ['JWT', 'BCrypt', 'Roles and permissions', 'Auditing'] },
  { es: 'Calidad', en: 'Quality', items: ['Git', 'GitHub Actions', 'Maven', 'JUnit', 'Pruebas funcionales'], itemsEn: ['Git', 'GitHub Actions', 'Maven', 'JUnit', 'Functional testing'] },
  { es: 'Análisis', en: 'Analysis', items: ['Requerimientos', 'Especificación SRS', 'Casos de prueba'], itemsEn: ['Requirements', 'SRS specs', 'Test cases'] },
  { es: 'IA', en: 'AI', items: ['Integración de Gemini'], itemsEn: ['Gemini integration'] },
  { es: 'Básico', en: 'Basic', basic: true, items: ['Python', 'Docker', 'k6', 'Power BI', 'Redes'], itemsEn: ['Python', 'Docker', 'k6', 'Power BI', 'Networking'] },
  { es: 'Inglés', en: 'English', items: ['Lectura técnica intermedia', 'Conversación básica'], itemsEn: ['Intermediate technical reading', 'Basic conversation'] },
]
