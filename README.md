# Portafolio de Jhair Maldonado

Sitio personal para presentar mi trabajo en desarrollo backend con Java y Spring Boot. Está en español e inglés y tiene un modelo 3D interactivo de arquitectura hexagonal en la portada.

**Demo:** _pendiente de publicar en Vercel_

## Qué muestra

- **Portada:** un modelo 3D de puertos y adaptadores. El dominio está al centro y hay seis adaptadores (API REST, PostgreSQL, JWT, Gemini, JUnit y GitHub Actions). Al elegir uno, se explica en qué proyecto lo usé.
- **Proyectos:** casos de estudio de CORAULA, SIVI y un chatbot con Gemini. Cada uno separa mi aporte del trabajo del equipo.
- **Trayectoria, conocimientos y contacto,** con el CV descargable.

## Tecnologías

| Área        | Herramientas                                       |
| ----------- | -------------------------------------------------- |
| Interfaz    | React 19, CSS propio con variables (sin framework) |
| 3D          | three.js, cargado bajo demanda                     |
| Compilación | Vite                                               |
| Calidad     | ESLint, Prettier, EditorConfig                     |
| Despliegue  | Vercel                                             |

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

| Comando           | Qué hace                                                |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente          |
| `npm run build`   | Compila el sitio en `dist/`                             |
| `npm run preview` | Sirve la versión compilada para revisarla               |
| `npm run lint`    | Revisa el código con ESLint                             |
| `npm run format`  | Da formato a todo el proyecto con Prettier              |
| `npm run check`   | Lint, formato y build: lo que debe pasar antes de subir |

## Estructura

```
src/
├── main.jsx                 Punto de entrada
├── App.jsx                  Orden de las secciones
├── i18n.jsx                 Idioma (es/en): contexto, persistencia y <html lang>
├── index.css                Tokens de diseño y estilos de todo el sitio
├── data/
│   ├── content.js           Todos los textos, proyectos, trayectoria y conocimientos
│   └── profile.js           Datos de contacto
├── components/
│   ├── Header.jsx           Barra superior y selector de idioma
│   ├── Hero.jsx             Portada
│   ├── HexScene.jsx         Puente entre React y la escena 3D
│   ├── Projects.jsx         Sección de proyectos
│   ├── CaseStudy.jsx        Un caso de estudio
│   ├── Timeline.jsx         Trayectoria
│   ├── Skills.jsx           Conocimientos
│   ├── Contact.jsx          Contacto y pie
│   └── SectionHead.jsx      Título de sección reutilizable
└── three/
    └── hexArchitecture.js   Escena three.js, sin dependencias de React
public/
├── cv-jhair-maldonado.pdf   CV que se descarga desde el sitio
└── favicon.svg
```

## Cómo editar el contenido

No hace falta tocar los componentes:

- **Textos, proyectos y conocimientos:** `src/data/content.js`. Cada entrada tiene su versión `es` y `en`, y los tipos están documentados con JSDoc al inicio del archivo.
- **Correo, teléfono y redes:** `src/data/profile.js`.
- **CV:** reemplaza `public/cv-jhair-maldonado.pdf` con el mismo nombre.
- **Colores y tipografía:** las variables al inicio de `src/index.css`.

## Decisiones de diseño

- **La arquitectura hexagonal como identidad.** Es la forma en que trabajo en el backend, así que el motivo visual sale de ahí: el modelo 3D, las viñetas hexagonales y el logo.
- **three.js separado de React.** `hexArchitecture.js` recibe un contenedor y funciones de lectura, y devuelve su función de limpieza. La escena se monta una sola vez; cambiar de idioma o de selección no la reconstruye.
- **Carga diferida del 3D.** three.js se descarga en un bloque aparte, así el texto de la portada aparece antes.
- **Sin framework de CSS.** Un solo archivo con variables para los temas claro y oscuro, fácil de leer y sin clases de utilidad en el JSX.

## Accesibilidad

- Enlace para saltar al contenido y foco visible en todos los controles.
- Las etiquetas del modelo 3D son botones reales: se pueden usar con teclado y lector de pantalla, y el giro se detiene al recibir foco o al pasar el puntero.
- Respeta `prefers-reduced-motion` (sin giro automático) y `prefers-color-scheme`.
- Si el navegador no tiene WebGL, las etiquetas se muestran como una lista.
- El idioma se refleja en `<html lang>` y los fragmentos en español dentro de la versión en inglés llevan `lang="es"`.

## Despliegue

El proyecto se publica en Vercel desde GitHub. Vercel detecta Vite automáticamente:

- Comando de build: `npm run build`
- Carpeta de salida: `dist`

Cada `push` a `main` publica una nueva versión.

## Contacto

- Correo: jhairmaldonadoquintana@gmail.com
- LinkedIn: [jhair-junior-maldonado-quintana](https://www.linkedin.com/in/jhair-junior-maldonado-quintana-b319b3273)
- GitHub: [Jhair-Maldonado](https://github.com/Jhair-Maldonado)
