## Context

`pages/blog/index.tsx` recibe la lista completa de posts publicados del locale activo desde `getStaticProps` (vía `getAllPosts` en `lib/mdx.ts`), ya ordenada por fecha descendente. La página gestiona ya un selector de vista (cards/lista) con estado local y persistencia en `localStorage` protegida con try/catch. El sitio se genera de forma estática y no tiene rutas de API.

Cada `BlogPostSummary` expone `slug` y `meta` (`title`, `excerpt`, `date`, `tags`, `cover`), según `components/blog/types.ts`.

## Goals / Non-Goals

**Goals:**
- Filtrar los posts publicados por palabras clave sobre título, extracto y etiquetas.
- Reutilizar la lista ya cargada, sin peticiones adicionales.
- Mantener la vista activa, el orden por fecha y los textos bilingües.

**Non-Goals:**
- Búsqueda en el cuerpo MDX (requeriría cargar y procesar todo el contenido en el cliente).
- Búsqueda en servidor, API routes, índices externos o dependencias nuevas.
- Resaltado de coincidencias, autocompletado o persistencia del término buscado.

## Decisions

**1. Filtrado en el cliente con `useMemo` dentro de `pages/blog/index.tsx`.**
Los datos ya están en las props. Un filtro derivado del estado `query` no necesita estado duplicado ni efectos, en línea con las reglas de React del proyecto. Alternativa descartada: un hook o componente nuevo con su propio estado de posts; añadiría abstracción sin necesidad para una sola página.

**2. Normalización: minúsculas, sin tildes y palabras separadas por espacios.**
La query se divide por espacios (`trim` y filtrado de vacíos). Cada término y cada campo se normalizan con `normalize("NFD")` eliminando los diacríticos `\p{Diacritic}` o el rango `̀-ͯ`, y `toLowerCase()`. Un post se incluye si cada término aparece en al menos uno de sus campos (AND entre términos, OR entre campos). Esto cubre los escenarios de tildes y múltiples palabras.

Coincidencia por subcadena (`includes`) para título y extracto; las etiquetas también por subcadena, de modo que "react" coincide con la etiqueta "react" y con "react-native".

**3. Función pura de filtrado en `lib/` o en el propio módulo de la página.**
La lógica de normalización y coincidencia se extrae a una función pura exportada (por ejemplo `filterPostsByKeywords(posts, query)`) para poder testearla directamente. Ubicación: preferiblemente un módulo `components/blog/` o `lib/`, según lo que indique el tamaño final; la página sigue siendo responsable solo de composición. La decisión final se toma al implementar, sin exponer nuevas APIs públicas fuera del módulo de búsqueda.

**4. Componente de campo de búsqueda en `components/blog/BlogSearch.tsx`.**
Un componente pequeño con `<label>` asociado a `<input type="search">` y un `<button type="button">` para limpiar. Recibe `value` y `onChange` por props. Usa los mismos patrones de estilo y foco (`focus-visible:ring-2 focus-visible:ring-primary-500`) que los botones de vista existentes.

**5. Anuncio de resultados con `aria-live="polite"`.**
Un texto visible o sr-only que indica el número de resultados se renderiza dentro de una región `aria-live`, para que los lectores de pantalla anuncien cambios sin robar el foco del campo.

**6. Datos SEO sin cambios.**
El `itemListJsonLd` sigue construyéndose sobre la lista completa de posts, no sobre la filtrada. Así el SEO no depende del estado de la búsqueda (los crawlers no escriben en el campo), cumpliendo el requisito de no alterar la metadata existente.

**7. Textos en `common.json` bajo una sección `blog.search`.**
Claves nuevas en inglés con valores en `es` y `en`, en la misma ruta en ambos locales, siguiendo `blog.view.*` ya existente. Ejemplos de claves: `blog.search.label`, `blog.search.placeholder`, `blog.search.clear`, `blog.search.empty`, `blog.search.resultsCount`.

## Risks / Trade-offs

- **Búsqueda solo en metadatos** → Un lector que recuerde una frase del cuerpo no encontrará el post. Mitigación: queda documentado como non-goal; ampliable más adelante generando un índice de texto en build.
- **Coincidencia por subcadena** → "act" coincide con "react". Mitigación: aceptable para un portafolio con pocos posts; la coincidencia por palabra completa se puede añadir si genera ruido.
- **Etiquetas ausentes o no array en algún frontmatter** → El filtro podría fallar. Mitigación: tratar `tags` como opcional (`meta.tags ?? []`) y tipar la entrada sin `any`, cubierto por tests de datos incompletos.
- **Diferencias de normalización Unicode** → Mitigación: `normalize("NFD")` antes de eliminar diacríticos, cubierto por test con "arquitectura"/"Arquitectura" con tilde.

## Testing Strategy

- Tests unitarios de la función pura de filtrado: normalización, AND entre términos, campos incluidos y excluidos, query vacía, espacios, tags ausentes, sin resultados.
- Tests de la página en `__tests__/blog-search.test.tsx` (o ampliando `blog-index.test.tsx`), con los mocks ya usados allí: escribir en el campo, resultados en cards y lista, estado vacío, limpiar, claves de traducción pedidas.
- Cobertura de ramas: `??`, ternarios de estado vacío, rama de query vacía y rama de término sin coincidencias.
- Validación: `npm run test`, `npx tsc --noEmit`, `npm run lint`, y `npm run build` por afectar al SSG de `/blog`.
- Verificación manual responsive y de teclado en móvil, tablet y escritorio, en ambos locales.

## Migration Plan

No hay migración de datos ni cambios de URL. Se despliega como un cambio normal de frontend. Rollback: revertir el commit de la página y del componente nuevo; las claves de traducción adicionales son inocuas.

## Open Questions

- ¿Se quiere mostrar el texto de búsqueda en la URL (`?q=`)? Queda fuera de alcance; la página es estática y no tiene `getServerSideProps`.
