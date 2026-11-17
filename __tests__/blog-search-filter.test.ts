import { describe, expect, it } from "vitest";
import type { BlogPostSummary } from "@/components/blog/types";
import { filterPostsByKeywords, normalizeSearchText } from "@/lib/blog-search";

const posts: BlogPostSummary[] = [
  {
    slug: "react-hooks",
    meta: {
      title: "Hooks en React",
      excerpt: "Cómo usar useState y useEffect.",
      tags: ["react", "hooks"],
    },
  },
  {
    slug: "next-routing",
    meta: {
      title: "Routing en Next.js",
      excerpt: "Pages Router y rutas dinámicas.",
      tags: ["nextjs"],
    },
  },
  {
    slug: "arquitectura-frontend",
    meta: {
      title: "Arquitectura frontend",
      excerpt: "Organizar la aplicación por funcionalidades.",
      tags: ["arquitectura"],
    },
  },
  {
    slug: "sin-tags",
    meta: {
      title: "Post sin etiquetas",
      excerpt: "Este post no define tags.",
    },
  },
];

const slugs = (result: BlogPostSummary[]) => result.map((p) => p.slug);

describe("normalizeSearchText", () => {
  it("pasa a minúsculas y elimina tildes", () => {
    expect(normalizeSearchText("Arquitectura Ñandú")).toBe("arquitectura nandu");
  });

  it("elimina espacios sobrantes en los extremos", () => {
    expect(normalizeSearchText("  react  ")).toBe("react");
  });
});

describe("filterPostsByKeywords", () => {
  it("devuelve la lista completa, sin cambios, cuando la query está vacía o solo tiene espacios", () => {
    expect(filterPostsByKeywords(posts, "")).toBe(posts);
    expect(filterPostsByKeywords(posts, "   ")).toBe(posts);
  });

  it("encuentra coincidencias por título", () => {
    expect(slugs(filterPostsByKeywords(posts, "routing"))).toEqual([
      "next-routing",
    ]);
  });

  it("encuentra coincidencias por extracto", () => {
    expect(slugs(filterPostsByKeywords(posts, "useEffect"))).toEqual([
      "react-hooks",
    ]);
  });

  it("encuentra coincidencias por etiqueta", () => {
    expect(slugs(filterPostsByKeywords(posts, "hooks"))).toEqual([
      "react-hooks",
    ]);
  });

  it("no busca en el cuerpo: una palabra que solo está fuera de título, extracto y tags no coincide", () => {
    expect(filterPostsByKeywords(posts, "contenido-mdx-inexistente")).toEqual([]);
  });

  it("ignora mayúsculas, minúsculas y tildes", () => {
    expect(slugs(filterPostsByKeywords(posts, "ARQUITECTURA"))).toEqual([
      "arquitectura-frontend",
    ]);
    expect(slugs(filterPostsByKeywords(posts, "arquitectura"))).toEqual([
      "arquitectura-frontend",
    ]);
  });

  it("exige que todas las palabras coincidan, aunque estén en campos distintos", () => {
    expect(slugs(filterPostsByKeywords(posts, "react hooks"))).toEqual([
      "react-hooks",
    ]);
    expect(filterPostsByKeywords(posts, "react nextjs")).toEqual([]);
  });

  it("ignora los espacios entre palabras y en los extremos", () => {
    expect(slugs(filterPostsByKeywords(posts, "  react   hooks  "))).toEqual([
      "react-hooks",
    ]);
  });

  it("mantiene el orden original de la lista", () => {
    const result = filterPostsByKeywords(posts, "a");
    const indexes = slugs(result).map((slug) => slugs(posts).indexOf(slug));
    expect(indexes).toEqual([...indexes].sort((a, b) => a - b));
  });

  it("no falla con posts sin tags ni con valores de frontmatter no válidos", () => {
    const malformed: BlogPostSummary[] = [
      { slug: "sin-meta", meta: undefined },
      { slug: "tags-no-array", meta: { title: "Tags", tags: "react" } },
      { slug: "tags-mixtos", meta: { title: "Mixto", tags: [42, "react", null] } },
    ];

    expect(() => filterPostsByKeywords(malformed, "react")).not.toThrow();
    expect(slugs(filterPostsByKeywords(malformed, "react"))).toEqual([
      "tags-mixtos",
    ]);
    expect(filterPostsByKeywords(malformed, "sin")).toEqual([]);
  });

  it("devuelve un array vacío cuando la lista de posts está vacía", () => {
    expect(filterPostsByKeywords([], "react")).toEqual([]);
  });
});
