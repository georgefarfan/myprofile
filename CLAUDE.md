# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` contiene las reglas del proyecto. Léelo y síguelo. Este archivo es un índice breve; las guías detalladas están en `docs/`.

## Commands

```bash
npm run dev        # next dev en http://localhost:3000
npm run build      # build de producción
npm run lint       # biome check .
npm run format     # biome check --apply
npx tsc --noEmit   # comprobación de tipos (no hay script npm para esto)
```

No hay un framework de tests configurado. Los problemas conocidos de configuración (esquema de Biome, pre-push hook) se describen en `docs/ia/development.md`.

## Documentation Map

- Reglas de idioma (palabras clave en inglés, descripciones en español): `docs/conventions.md`
- Visión general de la arquitectura (shell, i18n, pipeline del blog, SEO, estilos): `docs/arquitecture/overview.md`
- Estructura del contenido del blog: `docs/arquitecture/index.md`
- Comandos y problemas conocidos: `docs/ia/development.md`
- Estándares de código, testing, git, acceso a archivos, flujo de OpenSpec y formato de respuesta: `docs/ia/`

## File Modification Policy

- Modifica solo los archivos directamente relacionados con la tarea.
- No refactorices código no relacionado.
- No modifiques package.json sin aprobación.
- No modifiques package-lock.json sin aprobación.
- No modifiques la configuración de Angular sin aprobación.
- No crees documentación innecesaria.
- No crees plan.md salvo que se pida explícitamente.
- Preserva las APIs públicas existentes.
- Prefiere cambios mínimos y enfocados.
