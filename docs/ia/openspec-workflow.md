# OpenSpec Workflow

## Purpose

Define un flujo de desarrollo guiado por especificaciones (SDD) para este portafolio existente con Next.js Pages Router. Mantiene los requisitos, la implementación y la verificación trazables, minimizando el uso innecesario de contexto.

## Scope and Sources of Truth

- `AGENTS.md` contiene las instrucciones generales del proyecto.
- `docs/ia/coding-standards.md` define las convenciones de implementación.
- `docs/ia/file-access.md` define las pautas de acceso al repositorio.
- `docs/ia/testing.md` define las expectativas de validación.
- `docs/ia/openspec-response-format.md` define el formato de respuesta para las tareas de OpenSpec.
- `openspec/specs/` contiene las especificaciones actuales de cada capacidad.
- `openspec/changes/<change-name>/` contiene los cambios propuestos y sus artefactos de implementación.
- `openspec/config.yaml` contiene la configuración específica del proyecto de OpenSpec, cuando exista.

Lee solo los documentos relevantes para la tarea activa. No revises los cambios archivados salvo que se pida o sean necesarios para resolver una dependencia concreta.

## When to Use OpenSpec

Usa OpenSpec para nuevas funcionalidades, cambios de comportamiento, cambios de contrato de API o de datos, refactors significativos y trabajo transversal.

Para cambios triviales (como erratas aisladas o formato), sigue el flujo normal del repositorio, salvo que el usuario pida una especificación.

## Workflow

### 1. Discover

1. Identifica el comportamiento solicitado y la capacidad afectada.
2. Comprueba si un cambio activo ya cubre la petición.
3. Lee solo las especificaciones existentes y los archivos fuente afectados.
4. Identifica restricciones, dependencias y preguntas abiertas.
5. No implementes durante el descubrimiento salvo que se pida explícitamente.

### 2. Propose

Crea o actualiza el cambio activo con el flujo de OpenSpec instalado. Según la versión y el perfil configurados, el comando puede ser `/opsx:propose` o un comando equivalente que muestre la integración de OpenSpec.

Un cambio típico contiene:

```text
openspec/changes/<change-name>/
├── proposal.md
├── design.md
├── tasks.md
└── specs/
    └── <capability>/
        └── spec.md
```

Crea solo los artefactos que requiera el flujo activo de OpenSpec; no asumas que cada cambio necesita todos los archivos.

- **Proposal:** explica el problema, los objetivos, el alcance y el impacto.
- **Design:** documenta las decisiones técnicas importantes, las alternativas y los riesgos.
- **Specs:** define requisitos y escenarios testeables, incluidos los casos límite.
- **Tasks:** define pasos de implementación pequeños y verificables.

No inventes requisitos. Marca claramente las ambigüedades y pide aclaraciones cuando afecten al comportamiento.

### 3. Review and Approval

Antes de implementar:

1. Comprueba que los requisitos y escenarios sean inequívocos y testeables.
2. Confirma la compatibilidad con Next.js Pages Router, la i18n existente, el SEO, el comportamiento de blog/MDX y el despliegue en Vercel cuando sea relevante.
3. Comprueba que las tareas correspondan a los requisitos y eviten refactors no relacionados.
4. Presenta las decisiones o bloqueos relevantes para su aprobación.
5. No empieces la implementación hasta que el usuario apruebe el cambio propuesto, salvo que haya pedido explícitamente un flujo combinado de propuesta e implementación.

### 4. Implement

Usa el comando de apply de OpenSpec instalado (por ejemplo, `/opsx:apply` si está disponible).

- Implementa solo los requisitos aprobados.
- Sigue la arquitectura y los estándares de código existentes del proyecto.
- Reutiliza los componentes y utilidades existentes.
- Mantén los cambios enfocados y revisables.
- Preserva el comportamiento existente fuera del alcance especificado.
- Actualiza o añade tests para el comportamiento modificado.
- Marca una tarea como completada solo cuando su trabajo y su verificación relevante hayan terminado.
- Si la especificación entra en conflicto con el código o surge un requisito nuevo, detente y actualiza la especificación o pide aprobación antes de ampliar el alcance.

### 5. Verify

Usa el comando de verify de OpenSpec instalado (por ejemplo, `/opsx:verify` si está disponible) y ejecuta los checks relevantes del proyecto.

Verifica:

- Cada requisito y escenario tiene evidencia de implementación correspondiente.
- Las tareas completadas están realmente implementadas.
- Los tests relevantes pasan, incluidas las ramas condicionales y los casos límite.
- Los checks de TypeScript, lint y build se ejecutan cuando aplique.
- Las traducciones en español e inglés se mantienen consistentes cuando se vean afectadas.
- El SEO, la accesibilidad, el comportamiento responsive y la compatibilidad con Pages Router se preservan cuando se vean afectados.

No afirmes que los checks pasaron si no se ejecutaron. Informa de los comandos ejecutados, sus resultados, los checks omitidos y los riesgos restantes. No cambies tests no relacionados solo para obtener un resultado correcto.

### 6. Archive

Archiva solo cuando el cambio esté completo, verificado y aprobado explícitamente para su archivo. Usa el comando de archive de OpenSpec instalado (por ejemplo, `/opsx:archive` si está disponible).

- Confirma que las especificaciones finales reflejen el comportamiento implementado.
- Sigue el proceso configurado de OpenSpec para sincronizar las especificaciones de cada capacidad.
- No archives cambios incompletos ni descartes en silencio los problemas sin resolver.
- No leas de forma rutinaria los cambios archivados después del archivo.

## Context and Agent Efficiency

- Trabaja con un solo cambio activo a la vez, salvo que el usuario pida lo contrario.
- Prefiere las búsquedas de archivos dirigidas y las secciones relevantes de las especificaciones.
- Evita volver a leer artefactos sin cambios que ya están en el contexto.
- Delega en agentes especializados solo cuando la tarea se beneficie de ello.
- Da a los subagentes el nombre del cambio activo, la tarea exacta, las rutas relevantes y los criterios de aceptación.
- Todos los agentes y subagentes deben respetar `docs/ia/file-access.md`.
- No crees commits, no hagas push, no despliegues ni realices operaciones destructivas de Git sin aprobación explícita.

## Reporting

Para el trabajo relacionado con OpenSpec, sigue `docs/ia/openspec-response-format.md`. Mantén las actualizaciones concisas e incluye:

- Cambio activo y fase actual.
- Requisitos o tareas abordados.
- Archivos modificados, si los hay.
- Validación realizada y resultados reales.
- Bloqueos, desviaciones y siguiente acción.

## Completion Criteria

Un cambio está listo para completarse cuando sus requisitos aprobados están implementados, sus escenarios relevantes están verificados, el estado de las tareas es correcto y los riesgos pendientes están informados de forma explícita. El archivado sigue siendo una acción aparte que requiere aprobación.
