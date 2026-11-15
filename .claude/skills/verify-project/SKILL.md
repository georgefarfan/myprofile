---
name: verify-project
description: Ejecuta las comprobaciones reales del proyecto (comprobación de tipos de TypeScript, lint y build de producción) e informa los resultados sin afirmar que algo pasó si no se ejecutó. Úsala antes de dar un cambio por terminado o cuando el usuario pida verificar, validar o comprobar el proyecto.
---

# Verify Project

Ejecuta los checks de `docs/ia/testing.md` y `docs/ia/development.md` e informa de lo que realmente ocurrió. Sigue `docs/ia/testing.md` (Validation Commands).

## Pasos

1. **Comprobación de tipos**: ejecuta `npx tsc --noEmit`. Ten en cuenta que `npm run typecheck` no existe.
2. **Lint**: ejecuta `npm run lint`. Problema conocido: `biome.json` usa el esquema de la versión 1.7 y está instalado Biome 2.5.3, así que el comando puede fallar al cargar la configuración. Si falla por eso, informa que es un fallo previo de configuración. No cambies `biome.json` ni ejecutes `biome migrate` sin aprobación.
3. **Build**: ejecuta `npm run build` solo cuando el cambio pueda afectar la compilación, SSG, el routing o el despliegue. Los cambios en el blog y en locales siempre cuentan. El build puede tardar, así que usa un timeout generoso.
4. **Paridad de traducciones**: cuando cambie `public/locales/`, ejecuta la comprobación de paridad de la skill `add-translation-key`.
5. **Informe** con este formato:

   | Check | Comando | Resultado |
   | --- | --- | --- |
   | Type check | `npx tsc --noEmit` | passed / failed (primeros errores) / not run |
   | Lint | `npm run lint` | passed / failed (primeros errores) / not run |
   | Build | `npm run build` | passed / failed (primeros errores) / skipped (motivo) |
   | Paridad de traducciones | `node -e ...` | passed / failed / not run |

## Reglas

- Di "passed" solo cuando el comando terminó con éxito en esta ejecución.
- Si un check se omitió, indica el motivo.
- Muestra las primeras líneas de error relevantes de cualquier fallo. No las ocultes.
- No cambies código para que un check pase salvo que el usuario lo pida. Informa del fallo y su causa.
- No afirmes que el cambio fue verificado en el navegador. Esta skill cubre solo comandos.
