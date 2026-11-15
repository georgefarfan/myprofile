# File Access and Context Management

## Purpose

Define las reglas de acceso a archivos y de gestión de contexto para los agentes de IA que trabajan en este repositorio.

Objetivos:

- Proteger la información sensible.
- Evitar accesos a archivos innecesarios y el consumo de tokens.
- Mantener las búsquedas centradas en la tarea activa.
- Preservar la integridad del repositorio.

## Restricted Directories

No leas, busques, inspecciones ni analices archivos dentro de estos directorios, incluido su contenido anidado:

- `node_modules/`
- `.next/`
- `dist/`
- `build/`
- `coverage/`
- `.git/`
- `.turbo/`
- `.vercel/`
- `tmp/`
- `temp/`

Excluye estas rutas de las búsquedas en el repositorio.

## Restricted Files

No leas ni incluyas en el contexto de la IA:

- `.env`
- `.env.*` (incluido `.env.example`, salvo excepción explícita)
- `*.log`
- `*.tsbuildinfo`
- `.DS_Store`

Nunca reveles credenciales, contraseñas, tokens de acceso, claves privadas ni secretos.

## Conditional Access

Inspecciona estos archivos solo cuando sean directamente relevantes para la tarea:

- `package-lock.json`
- `pnpm-lock.yaml`
- `yarn.lock`
- `next.config.*`
- `vercel.json`
- `tsconfig.json`

## Repository Search Rules

1. Identifica el conjunto más pequeño de archivos o directorios relevantes.
2. Prefiere búsquedas dirigidas por nombre de archivo o por contenido.
3. Excluye las rutas restringidas y los artefactos generados.
4. Lee solo las secciones necesarias para completar la tarea.
5. Evita volver a leer archivos sin cambios que ya están en el contexto.
6. Amplía el alcance de la búsqueda solo cuando sea técnicamente justificado.

## OpenSpec Access

Las ubicaciones permitidas incluyen:

- `openspec/specs/`
- `openspec/changes/`
- `openspec/config.yaml`

Reglas:

- Identifica el cambio activo antes de leer las especificaciones.
- Lee solo el proposal, design, tasks y las specs relevantes.
- No inspecciones `openspec/changes/archive/` salvo que se pida o sea necesario.
- Evita cargar directorios de especificaciones completos.

## Documentation Access

- Consulta los archivos de `docs/` solo cuando sean relevantes para la tarea actual.
- Sigue las referencias de `AGENTS.md` según sea necesario.
- No cargues toda la documentación automáticamente.
- Prefiere las referencias a duplicar contenido innecesariamente.

## Agents and Subagents

- Aplica las mismas restricciones a las tareas delegadas.
- Delega solo el contexto y los archivos mínimos necesarios.
- No uses subagentes para eludir las restricciones.
- Evita crear agentes innecesarios o explorar todo el repositorio.

## File Modification Rules

- Modifica solo los archivos necesarios para la tarea activa.
- No modifiques archivos restringidos ni configuración no relacionada.
- Preserva el trabajo existente y la estructura del proyecto.
- No elimines ni sobrescribas archivos sin aprobación explícita.

## Exceptions

Si se necesita contenido restringido:

1. Explica por qué se necesita el acceso.
2. Solicita aprobación explícita.
3. Actualiza los permisos técnicos aplicables antes de acceder al contenido.
4. Accede solo a la información mínima necesaria.
5. Nunca reveles secretos.

La aprobación por sí sola no anula las restricciones técnicas.

## Enforcement

Este documento contiene instrucciones de comportamiento, **no es un límite de seguridad**.

- Para Claude Code, configura las restricciones compatibles en `.claude/settings.json`.
- Para GitHub Copilot, usa sus mecanismos de exclusión y permisos.
- Para un aislamiento más fuerte, usa controles de sistema de archivos o sandbox.
- Ten en cuenta que los comandos de shell y las herramientas externas pueden dar acceso indirecto si no están restringidos por separado.

## Core Principles

- Lee solo lo necesario.
- Mantén las búsquedas dirigidas.
- Protege los secretos.
- Minimiza el consumo de contexto.
- Respeta el cambio activo de OpenSpec.
- Preserva la integridad del repositorio.
