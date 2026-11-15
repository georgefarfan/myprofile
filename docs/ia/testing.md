# Testing and Validation Guidelines

## Purpose

Define una validación fiable y alineada con la especificación para el portafolio, que usa Next.js Pages Router, React, TypeScript, Tailwind CSS e internacionalización.

## General Rules

- Usa las herramientas y scripts de testing ya configurados en `package.json`.
- No introduzcas ni reemplaces un framework de testing sin aprobación.
- Testea el comportamiento observable y los requisitos documentados, no los detalles de implementación.
- Mantén los tests deterministas, aislados y fáciles de mantener.
- No modifiques tests no relacionados solo para que la suite pase.
- No afirmes que un test, un check de lint, de tipos o un build pasó si no se ejecutó correctamente.
- Sigue `docs/ia/file-access.md` al buscar archivos.

## Test Scope

Para cada cambio:

1. Identifica los requisitos y escenarios de aceptación de OpenSpec activos, si aplica.
2. Localiza el código afectado y los tests relacionados existentes.
3. Cubre el nuevo comportamiento, las regresiones y los casos límite relevantes.
4. Ejecuta primero los tests focalizados; amplía la validación cuando el impacto lo justifique.
5. Informa de los comandos ejecutados, sus resultados y lo que no se verificó.

## React Components and Pages

- Verifica el renderizado de los estados soportados: carga, éxito, vacío y error, cuando aplique.
- Testea las interacciones, los nombres accesibles, el comportamiento de teclado y la navegación relevante.
- Valida props, renderizado condicional y efectos a través del comportamiento visible para el usuario.
- Mockea la red o las dependencias externas solo cuando sea necesario.
- Preserva el comportamiento de Pages Router y la semántica de obtención de datos existente.

## Branch and Expression Coverage

Evalúa las alternativas significativas de la lógica modificada, incluyendo:

- `if` / `else`, ramas anidadas y retornos tempranos;
- `switch` / `case` y ramas `default`;
- expresiones ternarias (`condición ? a : b`);
- nullish coalescing (`??`), incluidos `null`, `undefined` y los valores falsy válidos (`0`, `false`, `''`);
- optional chaining (`?.`) y valores anidados ausentes;
- operadores lógicos (`&&`, `||`) y comportamiento de cortocircuito;
- errores lanzados, promesas rechazadas, fallbacks y valores límite.

Busca una cobertura de ramas significativa, no tests que solo ejecuten líneas. No inventes umbrales arbitrarios de cobertura.

## TypeScript and Data Handling

- Tipa los fixtures y los mocks; evita `any`.
- Valida los datos desconocidos o externos en el límite adecuado.
- Cubre datos malformados, ausentes o inesperados, cuando sea relevante.
- Evita aserciones de tipo inseguras solo para que los tests compilen.

## Internationalization

- Al cambiar texto visible para el usuario, verifica las claves en español (`es`) e inglés (`en`).
- Preserva los namespaces, la interpolación y el comportamiento de fallback existentes.
- Testea el cambio de idioma cuando se vea afectado.

## Blog, SEO, and Routing

- En cambios del blog, verifica los slugs, los metadatos de los posts y el renderizado MDX cuando se vean afectados.
- En cambios de SEO, verifica title, description, canonical URL, Open Graph y structured data cuando aplique.
- En cambios de routing, verifica las rutas existentes de Pages Router y el comportamiento de navegación.

## Responsive and Accessibility Validation

- Verifica la UI modificada en tamaños móvil, tablet y escritorio cuando aplique.
- Revisa el HTML semántico, el acceso por teclado, el comportamiento del foco y los textos alternativos significativos.
- No afirmes una verificación visual o en navegador si no se realizó.

## Validation Commands

- Revisa los scripts existentes en `package.json` antes de elegir comandos.
- Ejecuta los scripts de lint, test y comprobación de tipos relevantes, si están configurados.
- Ejecuta el build de producción cuando los cambios puedan afectar la compilación, SSR/SSG o el despliegue en Vercel.
- No inventes nombres de scripts ni supongas que hay un test runner instalado.
- Si la validación no puede ejecutarse, indica el motivo y el riesgo restante.

## Failure Handling and Completion

- Investiga los fallos causados por el cambio actual; no los ocultes ni los saltes.
- Distingue los fallos previos de los fallos introducidos, cuando haya evidencia.
- Actualiza el estado de las tareas de OpenSpec solo cuando el trabajo correspondiente esté terminado.
- Informa de: tests añadidos o modificados, comandos ejecutados, resultados de pasa/falla y áreas no verificadas.
