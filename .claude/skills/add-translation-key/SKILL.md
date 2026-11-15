---
name: add-translation-key
description: Añade una clave de traducción de la interfaz a public/locales/es/common.json y public/locales/en/common.json en la misma ruta, y verifica que ambos locales tengan las mismas claves. Úsala cuando se añada texto visible a un componente o página.
---

# Add Translation Key

Añade texto de la interfaz al namespace `common` en ambos locales. Sigue `docs/convenciones.md`: claves en inglés, valores en el idioma de cada locale. Sigue `docs/ia/coding-standards.md` (Internationalization).

## Pasos

1. **Encuentra el lugar correcto**: lee la estructura anidada de `public/locales/es/common.json` y reutiliza un objeto padre existente cuando encaje, por ejemplo `blog.*` o `profile.*`. No dupliques claves.
2. **Nombra la clave**: camelCase en inglés, anidada por funcionalidad, por ejemplo `blog.noPosts`. Las claves se usan con `keySeparator: "."`.
3. **Añade la clave en ambos archivos** en la misma ruta y en la misma posición:
   - `es/common.json`: valor en español.
   - `en/common.json`: valor en inglés.
   Mantén el formato existente (indentación de 2 espacios, sin comas finales).
4. **Úsala en el código** con `useTranslation("common")` y `t("<key>")`. No escribas el texto directamente en el componente.
5. **Verifica la paridad** desde la raíz del proyecto:

   ```bash
   node -e 'const f=o=>Object.entries(o).flatMap(([k,v])=>typeof v==="object"?f(v).map(x=>k+"."+x):[k]);const a=f(require("./public/locales/es/common.json")),b=f(require("./public/locales/en/common.json"));console.log({onlyEs:a.filter(x=>!b.includes(x)),onlyEn:b.filter(x=>!a.includes(x))})'
   ```

   Ambos arrays deben estar vacíos. Si no lo están, corrige la diferencia antes de informar.
6. **Informe**: la clave, los dos valores, el componente que la usa y el resultado de paridad tal como lo imprime el comando.

## Reglas

- No cambies valores existentes salvo que el usuario lo pida.
- No añadas una clave a un solo locale.
- No hagas commit ni push.
