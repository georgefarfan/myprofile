## 1. Preparación de tests (requiere aprobación)

- [x] 1.1 Obtener aprobación para añadir Vitest, React Testing Library y jsdom como devDependencies y un script `test` en `package.json`
  - Aprobado por el usuario (opción: Vitest + React Testing Library + jsdom).
- [x] 1.2 Instalar las devDependencies aprobadas y actualizar `package-lock.json`
- [x] 1.3 Configurar Vitest para TypeScript y Pages Router (archivo de configuración y entorno jsdom)
- [x] 1.4 Verificar que `npm run test` arranca con una prueba de humo que pase

## 2. Traducciones

- [x] 2.1 Añadir claves `blog.view.label`, `blog.view.cards` y `blog.view.list` en `public/locales/es/common.json`
- [ ] 2.2 Añadir las mismas claves en `public/locales/en/common.json` y comprobar que ambos locales tienen las mismas claves
  - Las claves `blog.view.*` coinciden en ambos idiomas. La paridad completa NO se cumple: `profile.location` y `profile.availability` existen solo en `en` (anterior a este change, sin tocar).

## 3. Estado y control de vista

- [x] 3.1 Añadir estado de vista en `pages/blog/index.tsx` con valor inicial `"cards"`
- [x] 3.2 Leer la preferencia de `localStorage` en `useEffect` con try/catch, sin leerla durante el render
- [x] 3.3 Guardar la preferencia al cambiar de vista con try/catch
- [x] 3.4 Renderizar el control como grupo de botones con `aria-pressed` y nombres accesibles traducidos
- [x] 3.5 Ocultar el control cuando no hay posts

## 4. Vista de lista

- [x] 4.1 Renderizar la vista de lista (`<ul>` / `<li>`) con título, extracto, fecha y etiquetas, sin imagen de portada, usando los mismos `href` que las tarjetas
- [x] 4.2 Mantener sin cambios el bloque de tarjetas y el JSON-LD `ItemList`
- [x] 4.3 Componentizar la vista de tarjetas: extraer `BlogCard` a `components/blog/BlogCard.tsx` con los mismos clases y marcado
- [x] 4.4 Componentizar la vista de lista: extraer `BlogListItem` a `components/blog/BlogListItem.tsx` con los mismos clases y marcado
- [x] 4.5 Definir el tipo compartido `BlogPostSummary` (`slug`, `meta`) en `components/blog/types.ts` y usarlo en ambos componentes y en la página
- [x] 4.6 Reducir `pages/blog/index.tsx` a estado, selector y composición de `BlogCard` / `BlogListItem`, sin cambiar la API pública de la página ni el JSON-LD

## 5. Tests

- [x] 5.1 Test: vista por defecto es tarjetas y el control indica la selección
- [x] 5.2 Test: al seleccionar lista se muestran filas sin imagen y el control se actualiza
- [x] 5.3 Test: volver a tarjetas restaura la imagen de portada cuando el post la tiene
- [x] 5.4 Test: el control es operable con teclado (Tab, Enter/Espacio) y mantiene el foco
- [x] 5.5 Test: la preferencia guardada se aplica al montar y el índice se muestra en lista
- [x] 5.6 Test: si `localStorage` lanza error, la página usa la vista por defecto sin fallar
- [x] 5.7 Test: sin posts se muestra `blog.posts.noData` y no se muestra el control
- [x] 5.8 Test: ambas vistas enlazan a los mismos URLs y el JSON-LD `ItemList` no cambia
- [x] 5.9 Test: textos del control en español e inglés con las mismas claves

## 6. Validación

- [x] 6.1 Ejecutar `npm run test` y registrar resultados
- [x] 6.2 Ejecutar `npx tsc --noEmit` y registrar resultados
- [x] 6.3 Ejecutar `npm run build` y registrar resultados
- [x] 6.4 Revisar en `npm run dev` las dos vistas en móvil, tablet y escritorio, en ambos idiomas, e informar que la revisión visual fue manual
- [ ] 6.5 Ejecutar `npm run lint` y registrar que puede fallar por la configuración de Biome documentada en `docs/ia/development.md`, sin atribuirlo al cambio
  - Resultado: falla al cargar la configuración de Biome (error "Unknown keys" en `biome.json`), problema previo y documentado. No se ha podido lintar el código.

## Notas de implementación (change blog-card-list-view)

- Tests: `npm run test` (Vitest 3.2.7, jsdom, RTL 16) → 12 tests pasan (1 smoke + 11 de la página, incluidos 5.5b y 5.6b añadidos).
- Vitest 3 y no 5: Vitest 5 exige `@types/node` ^22 o >=24 y el proyecto fija `^20`. No se ha subido `@types/node`.
- Lockfiles: se actualizó `package-lock.json` con npm. El repo también tiene `pnpm-lock.yaml`, que ahora queda desactualizado respecto a `package.json`.
- 5.4: Tab/Enter/Espacio nativos no se simulan en jsdom; el test comprueba foco y activación del botón nativo.
- 6.4: revisión visual manual en `npm run dev` (`localhost:3001`, porque el puerto 3000 ya estaba ocupado). Revisadas las vistas de tarjetas y lista en móvil (390 px), tablet (768 px) y escritorio (1440 px), en español e inglés; sin desbordamiento horizontal.
- Durante la revisión se detectó un mismatch de hidratación: la importación de `useTranslation` desde `react-i18next` devolvía claves sin traducir durante SSR. Se cambió a `next-i18next`; las etiquetas traducidas se verificaron en SSR y navegador.
- Validación tras el ajuste: `npm run test -- __tests__/blog-index.test.tsx` (11 tests pasan) y `npx tsc --noEmit` (pasa).
