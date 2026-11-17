---
name: update-pr
description: Actualiza un pull request existente en GitHub con gh CLI (título, descripción, etiqueta, reviewer y, si el usuario lo pide, nuevos commits y tag). Úsala cuando el usuario pida actualizar, editar o completar un PR ya abierto.
---

# Update PR

Actualiza un PR que ya existe. No crea PR nuevos; para eso usa `create-pr`. Sigue `.claude/rules/convention.md` para títulos, commits y etiquetas, y `docs/ia/git.md` (Pull Requests and Merges).

Cada cambio en GitHub es visible fuera del equipo. Muestra el diff antes de aplicarlo y espera confirmación explícita.

## Pasos

### 1. Identifica el PR
```bash
git branch --show-current
gh pr view --json number,title,state,isDraft,baseRefName,headRefName,labels,reviewRequests,url
```
- Si no hay PR abierto para la rama actual, detente y pregunta el número del PR. No lo inventes.
- Si el PR está cerrado o fusionado, detente e informa. No lo reabras.
- Si el PR no es draft, no lo cambies a draft ni a listo sin pedirlo.

### 2. Lee el estado actual
```bash
gh pr view <número> --json title,body,labels,reviewRequests,isDraft
```
Muestra al usuario el título, las etiquetas y los reviewers actuales antes de proponer cambios.

### 3. Decide qué se actualiza
Pregunta solo por lo que el usuario no haya indicado:
- **Título**: si cambia el tipo o el asunto, redáctalo en Conventional Commits en inglés según `.claude/rules/convention.md`.
- **Descripción**: regenérala con el template de `create-pr`, paso 9. Usa resultados de validación que hayas ejecutado en esta sesión. Si no los tienes, márcalos como ⏭️ "no ejecutado".
- **Etiqueta**: deriva el tipo del commit según la tabla de `create-pr` (`feat` → `enhancement`, `fix` → `bug`, `docs` → `documentation`). Comprueba la etiqueta con `gh label list`. Si no existe, pregunta antes de crearla.
- **Reviewer**: no lo asignes. Si el usuario indica un reviewer, usa su login real. Si no lo indica, deja la sección `👀 Reviewer` del template como está.
- **Commit nuevo**: si hay cambios que el PR debe incluir, crea un commit con ellos.
  1. Revisa `git status --short` y lista los archivos del cambio. Añádelos con rutas explícitas (`git add <ruta> ...`). Nunca uses `git add .`.
  2. Redacta el mensaje según `.claude/rules/convention.md` y el paso 4 de `create-pr`: `type(scope): subject` en inglés, en minúsculas, en imperativo, sin punto final.
  3. Valídalo con `printf '%s\n' "<mensaje>" | npx --no -- commitlint`. Si falla, corrígelo.
  4. Enseña los archivos y el mensaje validado y pide confirmación.
  5. Tras confirmación: `git commit -m "<mensaje>" -m "Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>"`. Nunca uses `--no-verify`. Si un hook falla, informa y no lo saltes.
- **Push**: tras el commit, pide confirmación y ejecuta `git push origin <rama>`. Nunca uses `--force`.

### 4. Enseña el diff y pide confirmación
Muestra el resultado final de cada campo que vas a cambiar, con el valor actual y el nuevo, y el commit y push si aplican. Espera un sí explícito antes de cada acción de GitHub o de git que escriba.

### 5. Aplica los cambios (tras confirmación)
Usa solo los flags que correspondan:
```bash
gh pr edit <número> --title "<título>"
gh pr edit <número> --body-file "$TMPDIR/pr-body.md"
gh pr edit <número> --add-label "<etiqueta>" --remove-label "<etiqueta anterior>"
gh pr edit <número> --add-reviewer "<login>"
```
Guarda la descripción nueva en `$TMPDIR/pr-body.md`.

### 6. Informa
Devuelve la URL del PR y los campos que cambiaron. No marques el PR como listo para revisión, no lo fusiones ni lo cierres.

## Reglas

- Nunca hagas merge, cierres, reabras ni cambies el estado de draft sin pedirlo.
- Nunca uses `--force` ni `--no-verify`.
- Nunca afirmes que una validación pasó sin haberla ejecutado en esta sesión.
- No incluyas secretos, tokens ni datos personales en el título o la descripción.
- No asignes reviewers por tu cuenta.
