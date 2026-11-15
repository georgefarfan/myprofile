# OpenSpec Response Format

## Purpose

Define el formato de respuesta que usa OpenCode al ejecutar operaciones relacionadas con OpenSpec.

Este documento amplía las reglas generales definidas en:

`docs/ia/response-format.md`

## Required Structure

Cada respuesta de OpenSpec debe usar las siguientes secciones:

### Status

Indica el estado actual de la operación de OpenSpec.

Ejemplos:

- Cambio creado.
- Análisis completado.
- Especificación actualizada.
- Listo para implementar.
- Implementación completada.
- Validación completada.
- Verificación fallida.
- Bloqueado por requisitos ausentes.

### Action

Describe brevemente la operación de OpenSpec que se realiza.

Mantén esta sección concisa.

Ejemplos:

- Crear un nuevo cambio de OpenSpec.
- Actualizar la especificación afectada.
- Implementar las tareas definidas en el cambio activo.
- Verificar la implementación contra la especificación.
- Archivar el cambio completado.

### Tasks

Lista solo las tareas o artefactos de OpenSpec relevantes, en orden de ejecución.

Ejemplo:

1. Revisar la especificación activa.
2. Actualizar `proposal.md`.
3. Actualizar la spec delta afectada.
4. Actualizar `design.md`.
5. Actualizar `tasks.md`.
6. Validar el cambio.

No incluyas tareas no relacionadas.

### Summary

Proporciona un resumen breve de:

- lo que se encontró;
- qué artefactos están afectados;
- qué cambiará o cambió;
- bloqueos o riesgos, si los hay.

## Operation-Specific Rules

### Explore

Para `/opsx:explore`:

- resume los hallazgos;
- identifica las áreas afectadas;
- menciona los riesgos o restricciones relevantes;
- no crees tareas de implementación salvo que se pidan.

### Propose

Para `/opsx:propose`:

- indica el alcance del cambio;
- menciona los artefactos creados o actualizados;
- resume el comportamiento esperado;
- evita reproducir el contenido completo de los artefactos.

### Continue

Para `/opsx:continue`:

- indica qué artefacto se está creando o actualizando;
- menciona el siguiente artefacto disponible;
- mantén la respuesta centrada en el progreso.

### Apply

Para `/opsx:apply`:

- indica el estado de la implementación;
- lista las tareas que se están implementando;
- menciona el trabajo completado y el pendiente;
- no marques tareas como completadas antes de terminar la implementación.

### Verify

Para `/opsx:verify`:

- indica si la implementación coincide con la especificación;
- menciona los requisitos fallidos o incompletos;
- menciona los problemas de validación de forma clara;
- mantén breves las comprobaciones exitosas.

### Sync

Para `/opsx:sync`:

- indica qué especificaciones se sincronizaron;
- menciona las capacidades afectadas;
- evita reproducir la especificación sincronizada completa.

### Archive

Para `/opsx:archive`:

- indica si el cambio se archivó correctamente;
- menciona las especificaciones sincronizadas;
- menciona los problemas pendientes solo si impiden o afectan al archivado.

## Artifact Rules

Al referirte a los artefactos de OpenSpec, usa sus nombres exactos:

- `proposal.md`
- `design.md`
- `tasks.md`
- `spec.md`

No reproduzcas los artefactos completos salvo que se pidan explícitamente.

Menciona solo los artefactos afectados por la operación actual.

## Requirement Rules

- No inventes requisitos.
- No infieras comportamiento nuevo más allá de la especificación activa.
- Indica claramente los requisitos ausentes o ambiguos.
- Mantén la implementación alineada con el cambio activo.
- Preserva el comportamiento existente salvo que la especificación lo cambie explícitamente.

## Validation Rules

Cuando se ejecute una validación, informa solo de los resultados relevantes.

Ejemplos:

- La validación de OpenSpec pasó.
- La validación de OpenSpec falló con 2 errores.
- La implementación coincide con la especificación activa.
- 1 requisito sigue incompleto.

No afirmes que una validación fue exitosa si no se ejecutó.

## Expected Format

```text
Status
↓
Action
↓
Tasks
↓
Summary
```

Mantén la respuesta completa concisa y centrada en la operación actual de OpenSpec.
