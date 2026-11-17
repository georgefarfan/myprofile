import type { BlogPostSummary } from "@/components/blog/types";

// Marcas diacríticas combinantes tras la descomposición NFD (tildes, diéresis...).
const COMBINING_MARKS = /[̀-ͯ]/g;

// Normaliza texto para comparar sin distinguir mayúsculas ni tildes.
export function normalizeSearchText(value: string): string {
  return value.normalize("NFD").replace(COMBINING_MARKS, "").toLowerCase().trim();
}

// Extrae título, extracto y etiquetas. Valida los datos del frontmatter porque `meta` es `any`.
function getSearchableFields(post: BlogPostSummary): string[] {
  const title: unknown = post.meta?.title;
  const excerpt: unknown = post.meta?.excerpt;
  const tags: unknown = post.meta?.tags;

  const fields: string[] = [];
  if (typeof title === "string") fields.push(title);
  if (typeof excerpt === "string") fields.push(excerpt);
  if (Array.isArray(tags)) {
    for (const tag of tags) {
      if (typeof tag === "string") fields.push(tag);
    }
  }

  return fields.map(normalizeSearchText);
}

// Devuelve los posts que contienen todas las palabras clave; sin palabras, devuelve la lista completa.
export function filterPostsByKeywords<T extends BlogPostSummary>(
  posts: T[],
  query: string,
): T[] {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return posts;

  return posts.filter((post) => {
    const fields = getSearchableFields(post);
    return terms.every((term) => fields.some((field) => field.includes(term)));
  });
}
