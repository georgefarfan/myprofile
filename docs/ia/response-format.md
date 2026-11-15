# Response Format

## Purpose

Define un formato de respuesta conciso y consistente para las interacciones con OpenCode.

Las respuestas deben ser breves, estructuradas y centradas en la tarea solicitada.

## Default Format

Usa esta estructura para las peticiones de implementación, análisis, refactor, validación y las relacionadas con OpenSpec.

### Status

Indica el estado actual en una sola frase corta.

Ejemplos:

- Listo para implementar.
- Análisis completado.
- Implementación completada.
- Validación completada.
- Se requieren cambios.
- Bloqueado por falta de información.

### Action

Describe brevemente qué se hará o qué se hizo.

Limita esta sección a entre 1 y 3 frases cortas.

### Tasks

Lista las tareas relevantes en orden de ejecución.

1. Primera tarea.
2. Segunda tarea.
3. Tercera tarea.

Las tareas deben ser:

- cortas;
- accionables;
- ordenadas;
- limitadas al alcance solicitado.

### Summary

Proporciona un resumen breve de:

- lo que se encontró;
- lo que se cambiará o se cambió;
- bloqueos o riesgos relevantes, si los hay.

Mantén esta sección concisa.

## Response Rules

- Responde en español.
- Mantén las respuestas concisas y directas.
- No expliques el razonamiento interno.
- Evita introducciones innecesarias.
- Evita repetir información ya proporcionada.
- Prefiere listas cortas a párrafos largos.
- No incluyas recomendaciones no relacionadas.
- Menciona los detalles de implementación solo cuando sean relevantes.
- Menciona bloqueos solo cuando afecten a la ejecución.
- No reproduzcas archivos completos ni artefactos de OpenSpec salvo que se pida explícitamente.
- No afirmes que tests, builds, lint o validaciones pasaron si no se ejecutaron correctamente.

## Completed Work

Cuando el trabajo ya se ha realizado, usa la misma estructura:

### Status

Indica si la tarea se completó, se completó parcialmente o está bloqueada.

### Action

Describe brevemente los cambios realizados.

### Tasks

Lista las tareas completadas en el mismo orden de ejecución.

### Summary

Resume el resultado y menciona el trabajo pendiente, si lo hay.

## OpenSpec Responses

Para las operaciones de OpenSpec, mantén el mismo formato.

### Status

Indica el estado actual del cambio o de la operación.

### Action

Describe la operación de OpenSpec que se está realizando.

### Tasks

Lista solo los artefactos o las tareas de implementación relevantes.

Ejemplo:

1. Actualizar la especificación afectada.
2. Actualizar el design.
3. Implementar el cambio.
4. Validar el cambio.

### Summary

Describe brevemente:

- el alcance afectado;
- los hallazgos relevantes;
- el resultado esperado;
- los bloqueos, si los hay.

## OpenSpec Rules

- No reproduzcas los archivos completos `proposal.md`, `design.md`, `tasks.md` ni las especificaciones salvo que se pidan explícitamente.
- Menciona solo los artefactos afectados.
- No inventes requisitos.
- Indica claramente los requisitos ausentes cuando bloqueen la ejecución.
- Mantén breves las descripciones de los artefactos.
- Mantén la implementación alineada con el cambio activo de OpenSpec.

## Expected Response Structure

```text
Status
↓
Action
↓
Tasks
↓
Summary
```
