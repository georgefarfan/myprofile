# Local Development and Commands

## Purpose

Lista los comandos de desarrollo y validación del proyecto, y los problemas conocidos de su configuración.

## Commands

```bash
npm run dev        # next dev en http://localhost:3000
npm run build      # build de producción
npm run lint       # biome check .
npm run format     # biome check --apply
npx tsc --noEmit   # comprobación de tipos (no hay script npm para esto)
```

- `dev-remote` y `build-remote` fuerzan el build con SWC WASM, para entornos sin binarios nativos de SWC.
- No hay framework de tests configurado. La validación se hace con lint, `tsc --noEmit` y `npm run build`.

## Known Issues

- **Biome**: `biome.json` usa el esquema de la versión 1.7, pero se instala Biome 2.5.3. `npm run lint` falla al cargar la configuración hasta ejecutar `npx biome migrate`. El pre-commit hook (lint-staged → `biome check --apply`) falla por el mismo motivo.
- **Pre-push hook**: `.husky/pre-push` ejecuta `npm run typecheck`, que no existe. El paso se marca como fallido, pero el hook continúa con el build.
- **Commits**: `.husky/commit-msg` valida los mensajes con commitlint (Conventional Commits).
