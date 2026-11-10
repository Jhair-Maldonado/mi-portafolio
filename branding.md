Branding y tokens del proyecto

Este documento describe los tokens de color y recomendaciones para ajustar el look & feel.

Tokens definidos (tailwind + CSS variables)

- Tailwind tokens (en `tailwind.config.js`):
  - `primary` -> paleta de acento (emerald)
  - `accent` -> paleta secundaria (sky)
  - `neutral` -> paleta neutra (slate)
  - `background` -> color de fondo principal (hex: #0f1724)
  - `surface` -> color para superficies oscuras (hex: #0b1220)

- CSS variables (en `src/index.css`):
  - `--color-primary` (actual: #34d399)
  - `--color-accent` (actual: #0ea5e9)
  - `--color-bg` (actual: #0f1724)
  - `--color-surface` (actual: #0b1220)

Cómo ajustar los tonos rápidamente

1) Cambiar el valor CSS: editar `:root` en `src/index.css` y ajustar `--color-primary` / `--color-accent`.
   - Ejemplo: `--color-primary: #10b981;` para una versión más viva.

2) Cambiar la paleta en `tailwind.config.js` para mapear `primary` a otra paleta (p. ej. `colors.green`).
   - Esto requiere reiniciar el servidor de desarrollo.

Opciones de estilo sugeridas (elige una para que la aplique automáticamente):

A) Tema "Profesional oscuro" (actual por defecto)
- Fondo muy oscuro: `--color-bg: #0f1724`
- Cartas claras: usar `bg-neutral-50` (contraste alto)
- CTA: `primary-400` (#34d399)

B) Tema "Oscuro suave" (menos contraste)
- Fondo: `#071022`
- Superficies: `#0b1220` (ligeramente más claro)
- Cartas: usar `bg-neutral-800/40` en lugar de `bg-neutral-50` para menos contraste
- CTA: reducir saturación de `primary` a `#2fa16a`

C) Tema "Claro profesional"
- Fondo: `#f8fafc`
- Superficies: `#ffffff`
- Textos: `text-neutral-900`
- CTA: `primary-600` para contraste

Siguientes pasos

- Dime cuál de las opciones prefieres (A/B/C) o describe ajustes concretos (ej.: "CTA más azul", "cartas menos claras").
- Aplico los cambios automáticamente (actualizo variables + componentes si es necesario) y te muestro el commit y archivos modificados.

Notas técnicas

- Después de cambiar `tailwind.config.js` o los tokens principales, reinicia el servidor dev: `npm run dev`.
- Puedo crear un pequeño script de demo que togglee temas en runtime si quieres probar múltiples variantes sin reiniciar.
