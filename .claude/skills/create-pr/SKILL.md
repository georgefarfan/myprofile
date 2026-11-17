---
name: create-pr
description: Crea un commit a partir de un change de OpenSpec, lo sube y abre un pull request en DRAFT contra la rama que el usuario indique (por defecto main) con gh CLI, con tag asociado al desarrollo. Úsala cuando el usuario pida abrir, crear o preparar un PR o MR.
---

# Create PR

Convierte un change de OpenSpec en un commit, una rama subida y un pull request en **draft**. Sigue `docs/ia/git.md` (Commits y Pull Requests), `docs/conventions.md`, las reglas de `commitlint.config.mjs` y las convenciones de `.claude/rules/convention.md` para redactar commits y PR.

Haz push, crea tags y abre el PR solo tras confirmación explícita del usuario. Cada una de esas acciones es visible fuera del equipo.

## Pasos

### 1. Elige el change y la rama destino
- Lista los changes en `openspec/changes/` (ignora `archive/`). Si hay más de uno, pregunta cuál usar.
- Lee `openspec/changes/<change>/proposal.md`. Su sección **Why** y **What Changes** es el contexto del PR. Si falta, detente y avisa.
- Pregunta contra qué **rama destino** abrir el PR. Por defecto es `main`. No continúes sin respuesta.

### 2. Comprueba la rama de trabajo
```bash
git branch --show-current
git rev-list --count <destino>..HEAD
```
- Si la rama actual es `main`, la rama destino o cualquier rama protegida, detente y pregunta el nombre de la rama. No crees ramas sin autorización.
- Para crear la rama de trabajo, pide el nombre al usuario. Usa `feature/<change>` solo si lo confirma.

### 3. Prepara los archivos del commit
```bash
git status --short
```
- El commit debe contener solo los archivos del change y los que el propio change requiera. Lista esos archivos y pide confirmación antes de hacer stage.
- Si hay archivos staged o modificados que no pertenecen al change (por ejemplo, `.claude/`, lockfiles o `pnpm-workspace.yaml`), muéstralos y pregunta si incluirlos o dejarlos fuera. No hagas stash, reset ni clean.
- Si el change añade dependencias en `package.json` o lockfiles, comprueba que el usuario lo ha aprobado. El `design.md` del change suele exigirlo.
- Añade los archivos con rutas explícitas: `git add <ruta> ...`. No uses `git add .`.

### 4. Redacta el mensaje de commit
Lee `.claude/rules/convention.md` antes de redactar. Interpreta la intención del cambio a partir de lo que el usuario explicó y de los archivos reales, no de sus palabras literales. Si el change agrupa cambios independientes, propón commits separados. Elige el tipo según la tabla de esa guía. Recuerda que el tipo se decide por el cambio real, no por el verbo usado.

Debe cumplir `commitlint.config.mjs`:
- Formato `type(scope): subject`.
- `type` en minúsculas y en la lista permitida: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- `scope` en kebab-case, por ejemplo `blog`.
- `subject` en minúsculas, sin punto final, modo imperativo en inglés.
- Cabecera de máximo 100 caracteres.

Ejemplo para este change: `feat(blog): add cards and list view toggle`.

Valida el mensaje antes de commitear:
```bash
printf '%s\n' "<mensaje>" | npx --no -- commitlint
```
Si falla, corrígelo y vuelve a validar. Enseña el mensaje validado al usuario y pide confirmación.

### 5. Valida el cambio
Usa la skill `verify-project` (tipos, lint y build). Anota el resultado real de cada comando. Si algo falla, detente y no abras el PR como listo.

### 6. Haz el commit (tras confirmación)
```bash
git commit -m "<mensaje>" -m "Co-Authored-By: Claude Haiku 5.5 <noreply@anthropic.com>"
```
- Nunca uses `--no-verify`. Los hooks de husky ejecutan lint-staged y commitlint, y deben pasar.
- Si un hook falla, informa del error y no lo saltes.

### 7. Propón el tag (tras confirmación)
- Busca el último tag con `git describe --tags --abbrev=0`. Si no hay ninguno, usa `package.json` como referencia.
- Propón un tag semver según el tipo del commit: `feat` sube la versión menor, `fix` la de parche y un cambio breaking la mayor. Ejemplo: `v1.1.0`.
- Pide confirmación del nombre del tag, o acepta otro que indique el usuario.
- Crea un tag anotado sobre el commit nuevo:
  ```bash
  git tag -a <tag> -m "<resumen corto en español>"
  ```

### 8. Sube la rama y el tag (tras confirmación)
```bash
git push -u origin <rama>
git push origin <tag>
```
Nunca uses `--force`.

### 9. Abre el PR en draft (tras confirmación)
Guarda la descripción en `$TMPDIR/pr-body.md` y ejecuta:
```bash
gh pr create --draft --base <destino> --head <rama> --title "<título>" --label "<etiqueta>" --body-file "$TMPDIR/pr-body.md"
```

- **Título**: el mismo asunto del commit, en formato Conventional Commits.
- **Etiqueta**: se deriva del tipo del commit. Comprueba que existe con `gh label list`.
  - `feat` → `enhancement`
  - `fix` → `bug`
  - `docs` → `documentation`
  - Resto de tipos (`refactor`, `perf`, `test`, `style`, `build`, `ci`, `chore`, `revert`) → una etiqueta con el nombre del tipo. Si no existe, pregunta antes de crearla con `gh label create`.
- **Reviewer**: la skill no asigna reviewer. Deja la sección `👀 Reviewer` del template para que el usuario la edite.
- **Descripción** en español, con este formato:

  ```markdown
  ## 📝 Resumen
  Qué cambia y por qué, a partir de **Why** y **What Changes** del proposal.

  ## 🧩 Change de OpenSpec
  `openspec/changes/<change>/`

  ## 🏷️ Tag
  `<tag>`

  ## ✅ Validación
  - ✅ / ❌ `npx tsc --noEmit`: <resultado real>
  - ✅ / ❌ `npm run lint`: <resultado real>
  - ✅ / ❌ `npm run build`: <resultado real>

  ## ⚠️ Limitaciones conocidas
  Tareas pendientes de `tasks.md`, aprobaciones pendientes o "Ninguna".

  ## 👀 Reviewer
  `<reviewer>`

  ```

Usa un icono por sección y uno de ✅ o ❌ en cada resultado de validación. No inventes resultados: si un comando no se ejecutó, márcalo como ⏭️ "no ejecutado". La descripción sigue el tono de `.claude/rules/convention.md`, pero se escribe en español.

Escribe solo resultados que hayas ejecutado. Si un comando no se ejecutó, indícalo.

### 10. Informa
Devuelve la URL del PR, el título, la rama destino, el tag creado y el resultado de la validación. No marques el PR como listo para revisión ni hagas merge.

## Reglas

- Nunca hagas merge, cierres el PR, ni cambies el estado de draft.
- Nunca uses `--force` ni `--no-verify`.
- Nunca afirmes que las comprobaciones pasaron sin haberlas ejecutado con resultado exitoso.
- No incluyas secretos, tokens ni datos personales en el commit, el tag o el PR.
- No modifiques archivos del proyecto dentro de esta skill, salvo los que el usuario confirme en el paso 3.
- Si `tasks.md` tiene tareas abiertas, indícalo en Limitaciones conocidas y pregunta si continuar.
