## Why

La página de blog muestra todos los posts publicados, pero no permite localizar un artículo concreto por palabra clave. A medida que crece el número de posts, el lector necesita filtrar la lista por términos como una tecnología o un tema.

## What Changes

- Añadir un buscador de palabras clave en la página `/blog` que filtra los posts publicados del locale activo.
- La búsqueda coincide con el título, el extracto y las etiquetas (`tags`) del frontmatter de cada post.
- El filtrado se realiza en el cliente sobre los datos que ya se cargan en `getStaticProps`; no se añaden rutas de API.
- Mostrar un estado vacío cuando ningún post coincida con la búsqueda, y limpiar la búsqueda desde la UI.
- Los textos visibles del buscador (etiqueta, placeholder, estado vacío, botón de limpiar) se añaden en `public/locales/es/common.json` y `public/locales/en/common.json`.
- Los tests del comportamiento de búsqueda se añaden con Vitest y Testing Library, siguiendo `__tests__/blog-index.test.tsx`.

Non-goals:
- No se busca dentro del cuerpo MDX de los posts.
- No se añade búsqueda en el servidor, ni autocompletado, ni resaltado de coincidencias.
- No se modifica la vista de cards/lista ya existente, salvo lo necesario para mostrar los resultados filtrados.

## Capabilities

### New Capabilities
- `blog-search`: buscador de palabras clave sobre los posts publicados del blog, incluyendo coincidencias por título, extracto y etiquetas, estado vacío y limpieza de la búsqueda.

### Modified Capabilities
- Ninguna. `blog-list-view` no cambia sus requisitos; la búsqueda se apoya en la lista existente.

## Impact

- `pages/blog/index.tsx`: estado de la búsqueda y filtrado de `posts` antes de renderizar la vista activa.
- `components/blog/`: posible componente de campo de búsqueda reutilizable, si su tamaño lo justifica.
- `public/locales/es/common.json` y `public/locales/en/common.json`: nuevas claves de traducción en la misma ruta.
- `__tests__/`: nuevos tests de la búsqueda, junto a `blog-index.test.tsx`.
- Sin cambios en `lib/mdx.ts`, dependencias ni `package.json`.
