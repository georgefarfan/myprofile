# Architecture Overview

## Purpose

Resume cómo encajan las piezas del portafolio. Para la estructura de contenido del blog, ver `docs/arquitecture/index.md`.

## Technical Base

- Next.js 15 con **Pages Router** (React 18, TypeScript estricto, Tailwind CSS 3).
- Alias de importación `@/*` apuntando a la raíz del repositorio.
- Todas las páginas se generan de forma estática (`getStaticProps` / `getStaticPaths`). No hay rutas de API.

## Application Shell (`pages/_app.tsx`)

- Envuelve la app con `appWithTranslation` (next-i18next) y `ThemeProvider` (next-themes, modo oscuro basado en clase, `storageKey` `theme`).
- Renderiza la navegación fija (escritorio y menú móvil), los enlaces de idioma ES/EN, el selector de tema, `<main id="main-content">` y el footer.
- No existe un componente Layout separado.
- Los elementos de navegación son enlaces a secciones de la home (`/#about`, `/#companies`, `/#contact`) y a `/blog`.

## Internationalization: Two Independent Systems

- **Textos de interfaz**: `next-i18next` con un único namespace `common` en `public/locales/{es,en}/common.json`. El locale por defecto es `es` (`next-i18next.config.js`, enlazado desde `next.config.js`). Cada página debe cargar el namespace con `serverSideTranslations(locale ?? "es", ["common"])` en `getStaticProps`.
- **Contenido del blog**: un archivo MDX por locale en `content/blog/{es,en}/<slug>.mdx`. Los posts equivalentes comparten slug entre idiomas.

## Blog Pipeline (`lib/mdx.ts`)

- Lee `content/blog/<locale>/` con `fs` y parsea el frontmatter con `gray-matter` (`title`, `excerpt`, `date`, `tags`, `cover`, `published`).
- Filtra los posts con `published: false` y ordena el resto por fecha, del más reciente al más antiguo.
- `serializePostContent` procesa el MDX con `next-mdx-remote` y los plugins remark-gfm, rehype-slug y rehype-autolink-headings.
- `pages/blog/[slug].tsx` genera las rutas para cada locale y cada post (`fallback: false`) y renderiza con `MDXRemote` y los componentes de `components/MDXComponents.tsx`.
- El acceso a sistema de archivos y MDX se mantiene en `lib/`, fuera de los componentes.

## SEO

- `components/SEO.tsx` es el único punto que genera title, description, canonical, Open Graph, Twitter y JSON-LD.
- Las páginas le pasan sus datos por props. Los posts usan `type="article"` con los metadatos del frontmatter.
- `public/sitemap.xml` y `public/robots.txt` son archivos estáticos mantenidos a mano.

## Styling

- Tailwind CSS con `@tailwindcss/typography` (clase `prose` en los artículos).
- Paleta propia `primary-*` y variables CSS (`--bg`, `--fg`) en `styles/globals.css` para los colores del tema.
- Todo cambio de UI necesita variantes `dark:` y comportamiento responsive (`sm:`, `lg:`), siguiendo el código existente.
