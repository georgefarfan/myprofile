## Why

La página de índice del blog (`pages/blog/index.tsx`) solo muestra los posts en formato de tarjetas en cuadrícula. Los lectores que quieren escanear muchos títulos rápidamente tienen que desplazarse por tarjetas de altura fija; una vista de lista compacta mejora ese escaneo. Añadir un selector de vista permite elegir el formato sin cambiar el contenido ni la navegación.

## What Changes

- Añadir un control para cambiar entre **vista de tarjetas** (comportamiento actual, por defecto) y **vista de lista** en el índice del blog.
- La vista de lista muestra cada post en una fila compacta con título, extracto, fecha y etiquetas, sin imagen de portada.
- El control es accesible por teclado y comunica el estado seleccionado a los lectores de pantalla.
- La elección de vista persiste durante la sesión de navegación del usuario (por ejemplo, en `localStorage` o en la URL); el comportamiento exacto se decide en `design.md`.
- Los textos nuevos de la interfaz se añaden en `public/locales/es/common.json` y `public/locales/en/common.json`.
- Se añaden tests automatizados que cubren el renderizado de ambas vistas, el cambio entre ellas y el caso sin posts.

Sin cambios de contenido MDX, de rutas ni de `getStaticProps`.

## Capabilities

### New Capabilities
- `blog-list-view`: selector de vista (tarjetas / lista) en el índice del blog, incluyendo su estado por defecto, persistencia, accesibilidad y comportamiento con y sin posts.

### Modified Capabilities
<!-- Ninguna: no existe openspec/specs/ con requisitos previos del blog que cambien. -->

## Impact

- **Código**: `pages/blog/index.tsx` (principal). Posible extracción de subcomponentes de tarjeta y lista en `components/` si mejora la legibilidad, sin cambiar la API pública de la página.
- **Traducciones**: nuevas claves en `public/locales/es/common.json` y `public/locales/en/common.json`, en la misma ruta.
- **Tests**: el proyecto no tiene framework de tests configurado. Añadir uno implica modificar `package.json` y `package-lock.json`, lo que requiere aprobación explícita (ver `design.md`).
- **SEO**: el JSON-LD `ItemList` y los enlaces de los posts deben mantenerse idénticos en ambas vistas.
- **Despliegue**: sin impacto en Vercel; no cambia la generación estática (`getStaticProps`).

### Fuera de alcance (non-goals)
- Paginación, filtros por etiqueta o búsqueda.
- Cambios en el diseño de la tarjeta actual o en la página de detalle del post.
- Refactors no relacionados del componente `Seo` o de la lógica de i18n.
