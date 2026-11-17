## Context

`pages/blog/index.tsx` renderiza los posts (`posts: { slug, meta }[]`, obtenidos en `getStaticProps` con `getAllPosts(locale)`) en una cuadrícula de tarjetas de altura fija (`auto-rows-[420px]`) con imagen de portada opcional. Ya usa `useTranslation("common")` para el mensaje sin posts y genera el JSON-LD `ItemList` a partir de la misma lista. No hay ningún control de vista ni estado de cliente en la página.

El proyecto no tiene framework de tests: `package.json` no define scripts de test ni dependencias de testing, y `docs/ia/testing.md` exige aprobación antes de introducir uno. El requisito del usuario de incluir tests es, por tanto, una decisión que necesita aprobación.

## Goals / Non-Goals

**Goals:**
- Permitir alternar entre tarjetas (por defecto) y lista en `/blog`.
- Mantener la elección entre navegaciones de la misma sesión de navegador.
- Cubrir el comportamiento con tests automatizados.
- Reutilizar la lógica de enlaces, `Link`, `meta` y traducciones existentes.

**Non-Goals:**
- Cambiar `getStaticProps`, el MDX, las rutas ni la página de detalle del post.
- Añadir paginación, filtros o búsqueda.
- Refactorizar `Seo`, la configuración de i18n o Biome.

## Decisions

### D1. Estado de vista en cliente, no en `getStaticProps`
La vista se decide en el cliente con `useState` inicializado en `"cards"`. El HTML generado en build sigue siendo el de tarjetas, así que SSG y SEO no cambian y no hace falta duplicar datos.
- Alternativa descartada: leer la preferencia en servidor. No es posible con SSG sin perder la generación estática.

### D2. Persistencia con `localStorage` envuelto en try/catch
La preferencia se guarda en `localStorage` con una clave propia (p. ej. `blog-view`). Se lee tras el montaje (en `useEffect`) para evitar desajustes de hidratación; las lecturas y escrituras van en try/catch y, si fallan, la página usa la vista por defecto.
- Alternativa: parámetro de URL (`?view=list`). Es compartible, pero cambia URLs y añade canonicalización; se descarta para no tocar SEO.
- Riesgo: parpadeo de la vista por defecto antes de leer la preferencia → se acepta, o se mitiga con un estado inicial estable y una transición leve.

### D3. Control accesible como grupo de botones
Dos botones dentro de un `role="group"` con `aria-pressed` (o dos `radio` con etiqueta visible). Nombres accesibles en `common.json` (`blog.view.cards`, `blog.view.list`, `blog.view.label`). Esto cumple la navegación por teclado nativa sin lógica extra.

### D4. Componentes `BlogCard` y `BlogListItem` en `components/blog/`
La página decide la vista y compone uno de los dos componentes por post. Cada componente recibe `{ slug, meta }` (tipo `BlogPostSummary` en `components/blog/types.ts`) y genera su propio `Link` a `/blog/${slug}`. Así la lógica de enlaces vive en un solo sitio por vista y la página queda solo con estado y JSON-LD. El marcado y las clases se mueven sin cambios para no alterar el aspecto.

_Decisión original (superada en parte):_ renderizado alternativo en la misma página; se mantiene la idea de que ambas vistas comparten datos y `href`.
Se añade un bloque de lista (`<ul>` con `<li>` y `Link` por post) junto al bloque de tarjetas existente, seleccionado por el estado. Los datos y `href` son los mismos (`/blog/${slug}`), así que la lógica de enlaces y el JSON-LD no se duplican. Si el bloque crece, se extraen `BlogCard` y `BlogListItem` a `components/blog/`, sin cambiar la API de la página.

### D5. Estado vacío
Si `posts.length === 0`, se muestra el mensaje actual y no el selector, para no introducir un control sin contenido.
- Nota: el spec dice que el selector no se muestra vacío; con esta decisión se oculta por completo cuando no hay posts.

### D6. Tests: framework pendiente de aprobación (decisión abierta)
Propuesta: **Vitest + React Testing Library + jsdom**, con un script `test` en `package.json`.
- Motivo: Vitest es rápido, compatible con TypeScript y no requiere Babel adicional con Next.js; RTL prueba comportamiento visible y accesibilidad, como pide `docs/ia/testing.md`.
- Alternativa: Jest + RTL (más antiguo, requiere más configuración con SWC/TS).
- Coste: añade devDependencies y modifica `package.json` y `package-lock.json`. **Requiere aprobación explícita** antes de instalar.
- Si no se aprueba, los tests de UI no pueden ejecutarse en el repo y la tarea de tests queda bloqueada; el resto de la implementación sigue siendo posible.

## Risks / Trade-offs

- **[Hidratación]** El estado leído de `localStorage` difiere del HTML de SSG → Leer en `useEffect` y mantener "cards" como estado inicial; no leer durante el render.
- **[SEO]** Cambiar a lista no debe alterar los enlaces ni el JSON-LD → Mismos datos y mismos `href`; test que compara los slugs de ambas vistas.
- **[Accesibilidad]** Botones sin nombre o sin estado comunicado → Test con consultas por rol y nombre accesible.
- **[Dependencias]** Añadir Vitest/RTL aumenta el mantenimiento → Solo devDependencies, aprobadas antes de instalar.
- **[Sin verificación visual]** No se puede afirmar diseño en navegador sin ejecutar la app → Verificar en móvil, tablet y escritorio con `npm run dev` y reportarlo como manual.

## Migration Plan

No hay migración de datos ni cambios de contrato. Despliegue normal en Vercel. Rollback: revertir el commit; la preferencia guardada en `localStorage` queda ignorada al no existir el código que la lee.

## Open Questions

1. ¿Apruebas añadir Vitest + React Testing Library + jsdom como devDependencies y un script `test`? (Requisito de `docs/ia/testing.md` y de tu petición.)
2. ¿Prefieres `localStorage` (D2, por defecto) o un parámetro de URL?
3. ¿El control debe aparecer también cuando solo hay un post?
