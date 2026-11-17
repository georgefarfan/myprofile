## 1. Traducciones y tipos

- [x] 1.1 Añadir las claves `blog.search.*` (label, placeholder, clear, empty, resultsCount) en `public/locales/es/common.json` y `public/locales/en/common.json` en la misma ruta
- [x] 1.2 Verificar que `components/blog/types.ts` expone `tags` como array opcional y ajustar el tipo solo si hace falta

## 2. Lógica de filtrado

- [x] 2.1 Implementar la función pura `filterPostsByKeywords(posts, query)` con normalización (minúsculas, sin tildes, trim) y AND entre términos
- [x] 2.2 Cubrir con tests unitarios la normalización, los campos incluidos y excluidos (título, extracto, etiquetas, no cuerpo), query vacía, espacios y `tags` ausentes

## 3. Componente de búsqueda

- [x] 3.1 Crear `components/blog/BlogSearch.tsx` con `<label>` asociado a `<input type="search">` y botón de limpiar, usando las clases de foco existentes
- [x] 3.2 Añadir la región `aria-live="polite"` con el número de resultados

## 4. Integración en la página

- [x] 4.1 Añadir el estado de búsqueda en `pages/blog/index.tsx` y derivar la lista filtrada con `useMemo`
- [x] 4.2 Renderizar el buscador solo cuando existan posts y mostrar el estado vacío de búsqueda cuando no haya coincidencias
- [x] 4.3 Mantener la vista activa (cards/lista) y el `itemListJsonLd` calculado sobre la lista completa

## 5. Tests de la página

- [x] 5.1 Crear `__tests__/blog-search.test.tsx` reutilizando los mocks de `blog-index.test.tsx`
- [x] 5.2 Cubrir escribir y filtrar en cards y en lista, estado vacío, limpiar la búsqueda y las claves de traducción solicitadas
- [x] 5.3 Cubrir el anuncio del número de resultados y la operación por teclado del campo y del botón de limpiar

## 6. Validación

- [x] 6.1 Ejecutar `npm run test` y comprobar que todos los tests pasan
- [x] 6.2 Ejecutar `npx tsc --noEmit`, `npm run lint` y `npm run build`, registrando los resultados reales
- [ ] 6.3 Verificar manualmente la UI en móvil, tablet y escritorio, en `/blog` y `/en/blog`, incluyendo navegación por teclado y modo oscuro
