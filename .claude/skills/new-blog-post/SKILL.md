---
name: new-blog-post
description: Crea un post nuevo del blog en español e inglés (content/blog/es y content/blog/en) con el mismo slug, frontmatter completo y published en false por defecto. Úsala cuando el usuario pida escribir, añadir o redactar un post o artículo del blog.
---

# New Blog Post

Crea un post como dos archivos MDX, uno por locale. Sigue `docs/convenciones.md` (palabras clave en inglés, descripciones en español) y las reglas del blog de `docs/arquitecture/index.md`.

## Entradas

Pregunta solo lo que falte:

- Tema o título provisional.
- Tags (opcional).
- Ruta de la imagen de portada en `public/images/` (opcional).

## Pasos

1. **Slug**: deriva un slug en inglés en kebab-case a partir del título, por ejemplo `conventional-commits`. Comprueba que no existan `content/blog/es/<slug>.mdx` ni `content/blog/en/<slug>.mdx`. Si existe alguno, detente y pregunta.
2. **Fecha**: usa la fecha de hoy en formato `YYYY-MM-DD` (ejecuta `date +%F`).
3. **Frontmatter** en ambos archivos, con las mismas claves en el mismo orden:

   ```yaml
   ---
   title: "..."
   excerpt: "..."
   date: "YYYY-MM-DD"
   tags: ["...", "..."]
   cover: "/images/<file>"   # omite la línea si no hay portada
   published: false
   ---
   ```

   Mantén `published: false` hasta que el usuario apruebe la publicación. `lib/mdx.ts` oculta los posts con `published: false`.
4. **Cuerpo**:
   - `content/blog/es/<slug>.mdx` en español.
   - `content/blog/en/<slug>.mdx` en inglés, como traducción de la versión en español, no como otro artículo.
   - Usa un título `#` y secciones `##`, con la misma estructura en ambos archivos.
   - No importes componentes salvo que el post los necesite. Los posts existentes importan `Link` de `next/link` cuando enlazan contenido interno.
5. **Validación**: ejecuta `npx tsc --noEmit` y `npm run build`. Informa los resultados reales. El build usa `getStaticPaths` con `fallback: false`, así que un archivo ausente o mal formado rompe el build.
6. **Informe**: lista las dos rutas, el slug y los resultados de validación. Recuerda al usuario que `public/sitemap.xml` se mantiene a mano y todavía no incluye posts del blog.

## Reglas

- Nunca hagas commit ni push. Deja los archivos en el árbol de trabajo.
- Nunca pongas `published: true` sin aprobación explícita.
- No modifiques posts existentes, componentes ni configuración.
