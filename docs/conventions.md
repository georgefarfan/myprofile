# Language Conventions

## Purpose

Define en qué idioma se escribe cada parte del proyecto: palabras clave en inglés y descripciones en español.

## General Rule

- **Palabras clave en inglés**: identificadores, nombres de archivos y carpetas, componentes, funciones, tipos, props, claves de traducción, tipos de commit, comandos y títulos de sección.
- **Descripciones en español**: explicaciones, documentación, comentarios de código, descripciones de cambios y mensajes dirigidos al usuario.

## Reference Table

| Elemento | Idioma | Ejemplo |
| --- | --- | --- |
| Componentes, funciones, variables y tipos | Inglés | `BlogPost`, `getAllPosts`, `PostMeta` |
| Archivos y carpetas | Inglés | `lib/mdx.ts`, `docs/arquitecture/` |
| Claves de traducción | Inglés | `navigation.profile` |
| Valores de traducción | Idioma de cada locale (`es` / `en`) | `"Perfil"` / `"Profile"` |
| Comandos y scripts | Inglés | `npm run lint` |
| Tipos de commit y scope | Inglés | `feat(blog): add category filtering` |
| Comentarios de código | Español | `// Carga los posts del locale activo` |
| Títulos de sección (`#`, `##`, `###`) | Inglés | `## Commands`, `## Exceptions` |
| Documentación en `docs/` | Descripciones en español, palabras clave en inglés | `## Purpose` seguido de una descripción en español |
| Respuestas del asistente | Español | Ver `docs/ia/response-format.md` |

## Exceptions

- **Mensajes de commit**: en inglés, según `AGENTS.md` (Git).
- **Contenido del blog**: el idioma de cada archivo es el de su carpeta (`content/blog/es/`, `content/blog/en/`).
- **Textos visibles en la interfaz**: se guardan en `public/locales/{es,en}/` y no se escriben directamente en los componentes.

## Example

```ts
// Carga los posts del locale activo y los ordena por fecha
export async function getAllPosts(locale?: string): Promise<Post[]> {
  // ...
}
```

## Related Guides

- `docs/ia/coding-standards.md`: reglas de implementación.
- `docs/ia/git.md`: reglas de commits y ramas.
- `docs/ia/response-format.md`: formato de respuesta del asistente.
