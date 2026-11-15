# Git Guidelines

## Purpose

Define prácticas de Git seguras y consistentes para este repositorio Next.js. Sigue la tarea activa y preserva el trabajo existente.

## Branches and Working Tree

- Revisa la rama actual y el estado del árbol de trabajo antes de cualquier operación de Git.
- Nunca asumas que el árbol de trabajo está limpio.
- Preserva los cambios staged y unstaged, incluidos los archivos untracked.
- No crees, renombres, cambies, fusiones, hagas rebase ni elimines ramas sin autorización explícita.
- No modifiques directamente las ramas protegidas.
- No reescribas el historial ni hagas force-push sin autorización explícita.
- Evita comandos destructivos como `git reset --hard`, `git clean -fd` y `git push --force`.
- No hagas stash automático de los cambios; pide aprobación primero.
- Al trabajar en un worktree, confirma su rama y ubicación antes de actuar.

## Commits

- Usa Conventional Commits compatibles con la configuración de Commitlint del repositorio.
- Escribe los asuntos de los commits en inglés.
- Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert` (sujeto a las reglas reales de Commitlint del repositorio).
- Usa un scope descriptivo cuando aclare el área afectada.
- Usa un asunto breve en modo imperativo, sin punto final.
- Mantén cada commit enfocado en un solo cambio lógico.
- Nunca hagas stage, commit, amend o push automáticamente salvo que se pida explícitamente.

Ejemplos:

```text
feat(blog): add category filtering
fix(i18n): correct language selector behavior
refactor(seo): simplify metadata generation
test(blog): cover empty post lists
docs: update architecture guidelines
```

## Pull Requests and Merges

- No abras ni fusiones pull requests sin autorización explícita.
- Describe el cambio, el cambio de OpenSpec relevante, la validación realizada y las limitaciones conocidas.
- Nunca afirmes que los tests pasaron si sus comandos no terminaron correctamente.
- Respeta las ramas protegidas y el proceso de revisión del repositorio.
- Pide confirmación antes de resolver conflictos en archivos no relacionados.

## OpenSpec Traceability

- Mantén los commits alineados con el cambio activo aprobado.
- No incluyas cambios no relacionados en un commit de funcionalidad.
- Referencia el identificador del cambio en las descripciones de PR cuando corresponda.
- No archives cambios de OpenSpec como parte de operaciones de Git sin aprobación.

## Safety and Reporting

- Nunca expongas tokens, credenciales ni secretos en la salida de Git ni en los mensajes de commit.
- Sigue `docs/ia/file-access.md` para las lecturas del repositorio.
- No inspecciones el contenido de `.git/` directamente; usa los comandos de Git adecuados para el estado y el historial.
- Resume los archivos afectados, los comandos ejecutados y los problemas sin resolver.
