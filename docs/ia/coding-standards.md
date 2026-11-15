# Coding Standards

## Purpose

Define las convenciones de implementación para este portafolio Next.js. Aplica estas reglas al código modificado, preservando los patrones y el comportamiento existentes.

## General Principles

- Mantén los cambios enfocados en la tarea activa y en el cambio de OpenSpec aprobado.
- Prefiere los componentes, utilidades y convenciones existentes antes que nuevas abstracciones.
- Evita la lógica duplicada, las dependencias innecesarias y los refactors no relacionados.
- Mantén las funciones y los componentes cohesivos, legibles y mantenibles.
- No cambies interfaces públicas ni comportamiento sin un requisito documentado.
- Consulta `docs/ia/file-access.md` antes de explorar el repositorio.

## TypeScript

- Preserva la compatibilidad con TypeScript estricto; no introduzcas `any` sin una justificación documentada.
- Usa `unknown` para valores no confiables y restringe los tipos antes de usarlos.
- Define tipos explícitos para las props de los componentes, los datos de dominio y los límites de API.
- Reutiliza los tipos establecidos; evita las conversiones de tipo inseguras y las aserciones non-null.
- Usa tipos de retorno claros cuando mejoren la legibilidad de la API.
- Elimina imports, variables y tipos sin usar.
- Maneja `null`, `undefined` y los valores opcionales de forma deliberada.

## React

- Usa componentes funcionales y respeta las Rules of Hooks.
- Mantén los componentes enfocados; extrae UI reutilizable solo cuando esté justificado.
- Prefiere props y composición antes que estado compartido innecesario.
- Deriva los valores de las props o el estado existentes en lugar de duplicar estado.
- Usa los efectos solo para sincronizar con sistemas externos; gestiona correctamente la limpieza y las dependencias.
- Evita la memoización prematura y los re-renders innecesarios.
- Conserva las keys estables en las listas renderizadas.

## Next.js Pages Router

- Preserva la arquitectura de rutas existente en `pages/`; no migres a App Router sin aprobación.
- Mantén las responsabilidades de routing y de carga de datos a nivel de página en `pages/`.
- Coloca la UI reutilizable en `components/`; usa `components/sections/` para las secciones específicas de página cuando corresponda.
- Sigue los patrones existentes de `getStaticProps`, `getStaticPaths` y `getServerSideProps` cuando aplique.
- Nunca expongas secretos del servidor a través de los bundles del cliente o de las props de página.
- Preserva la navegación, el SEO, el manejo de locales y el renderizado existentes.
- Usa las APIs de Next.js antes de añadir infraestructura propia.

## Styling and Responsive Design

- Sigue las utilidades, tokens y convenciones de componentes existentes de Tailwind CSS.
- Prefiere los patrones existentes a los valores arbitrarios o al CSS adicional.
- Mantén los estilos globales en `styles/` limitados a preocupaciones compartidas.
- Preserva la identidad visual establecida y el comportamiento responsive.
- Verifica los layouts móvil, tablet y escritorio cuando se modifique la UI.
- Evita los cambios de layout y las interacciones solo con hover que no sean accesibles.

## Accessibility

- Usa HTML semántico y controles interactivos nativos.
- Asegura la navegación por teclado, el foco visible y las etiquetas accesibles.
- Proporciona textos alternativos significativos para las imágenes informativas; usa alt vacío para las decorativas.
- Mantén un contraste suficiente y un feedback de validación claro.
- No reemplaces los controles nativos por elementos no semánticos sin una necesidad justificada.

## Internationalization

- Soporta español e inglés usando el sistema de traducciones existente.
- Guarda los textos traducibles bajo `public/locales/es/` y `public/locales/en/`.
- Reutiliza los namespaces y las convenciones de claves existentes.
- Añade traducciones equivalentes para todos los locales soportados al introducir texto visible.
- Evita texto traducible escrito directamente en los componentes.
- Preserva el cambio de idioma y el routing con locale.

## Blog and SEO

- Preserva los slugs del blog, las URLs existentes, los metadatos y el renderizado MDX cuando aplique.
- Mantén los titles, las descriptions, las canonical URLs, Open Graph y los metadatos sociales.
- Preserva los structured data existentes; no elimines metadatos sin un requisito.
- Evita cambios que afecten de forma no intencionada la indexación o las vistas previas de enlaces.

## Data and Error Handling

- Valida los datos no confiables en los límites del sistema.
- Modela los estados de error esperados de forma explícita; no ignores fallos en silencio.
- Evita exponer secretos o valores sensibles en logs, en la UI o en errores.
- Maneja los estados de carga, vacío, éxito y fallo cuando sea relevante.
- Prefiere los patrones existentes de obtención de datos y de manejo de errores.

## Testing and Quality

- Sigue `docs/ia/testing.md` para el alcance de los tests, la cobertura de ramas y la ejecución.
- Cubre el comportamiento relevante de éxito, fallo, límites y fallback.
- Incluye las ramas significativas que involucran `if`, `switch`, ternarios, `??`, `?.`, `&&` y `||` cuando se modifiquen.
- Ejecuta los checks de lint, TypeScript, test y build relevantes según la tarea.
- Nunca informes un check como aprobado si no se ejecutó correctamente.

## Dependencies and Configuration

- No añadas ni actualices dependencias sin una necesidad clara y, cuando sea necesario, sin aprobación.
- Usa el gestor de paquetes y el lockfile existentes del repositorio.
- Modifica `next.config.*`, `tsconfig.json` o `vercel.json` solo cuando sea necesario.
- Preserva la compatibilidad con el despliegue existente en Vercel.

## Review Checklist

Antes de dar la implementación por terminada, verifica:

1. Los cambios coinciden con la especificación activa y el alcance solicitado.
2. Se preserva el comportamiento existente de Pages Router, SEO e i18n.
3. Los tipos, la accesibilidad y el comportamiento responsive siguen siendo correctos.
4. Los tests y los comandos de validación relevantes se ejecutaron, o se informaron sus limitaciones.
5. No se modificaron archivos, dependencias ni configuración no relacionados.

## Related Documentation

- `docs/arquitecture/overview.md`: visión general de la arquitectura y sus responsabilidades.
- `docs/ia/file-access.md`: acceso a archivos y límites de contexto.
- `docs/ia/testing.md`: reglas de testing y validación.
- `docs/ia/openspec-workflow.md`: flujo de trabajo guiado por especificaciones.
