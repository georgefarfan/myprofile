import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import type { BlogPostSummary } from "@/components/blog/types";

vi.mock("next/router", () => ({
  useRouter: () => ({ locale: "es" }),
}));

vi.mock("next-i18next", () => ({
  // Devuelve la clave: los tests comprueban qué texto se pide, no su traducción.
  useTranslation: () => ({ t: (key: string) => key }),
}));

const seoProps = vi.hoisted(() => ({
  last: undefined as undefined | { structuredDataOverride?: unknown },
}));

vi.mock("@/components/SEO", () => ({
  default: (props: { structuredDataOverride?: unknown }) => {
    seoProps.last = props;
    return null;
  },
}));

vi.mock("@/lib/mdx", () => ({ getAllPosts: vi.fn() }));
vi.mock("next-i18next/serverSideTranslations", () => ({
  serverSideTranslations: vi.fn(),
}));

import BlogIndex from "@/pages/blog/index";

const posts: BlogPostSummary[] = [
  {
    slug: "post-react",
    meta: {
      title: "Hooks en React",
      excerpt: "Cómo usar useState.",
      date: "2026-02-01",
      tags: ["react"],
    },
  },
  {
    slug: "post-next",
    meta: {
      title: "Routing en Next",
      excerpt: "Pages Router.",
      date: "2026-01-01",
      tags: ["nextjs"],
    },
  },
];

function getSearchInput() {
  return screen.getByRole("searchbox", { name: "blog.search.label" });
}

function getClearButton() {
  return screen.queryByRole("button", { name: "blog.search.clear" });
}

function getListButton() {
  return screen.getByRole("button", { name: /blog\.view\.list/ });
}

function visibleLinks() {
  return screen
    .queryAllByRole("link")
    .map((a) => a.getAttribute("href"));
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("BlogIndex: buscador por palabras clave", () => {
  it("6.1 muestra el campo con etiqueta accesible asociada cuando hay posts", () => {
    render(<BlogIndex posts={posts} />);

    const input = getSearchInput();
    expect(input.getAttribute("type")).toBe("search");
    expect(input.getAttribute("placeholder")).toBe("blog.search.placeholder");
  });

  it("6.2 filtra los posts al escribir y muestra solo las coincidencias en tarjetas", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.change(getSearchInput(), { target: { value: "react" } });

    expect(visibleLinks()).toEqual(["/blog/post-react"]);
  });

  it("6.3 mantiene el filtro al cambiar a la vista de lista", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.change(getSearchInput(), { target: { value: "routing" } });
    fireEvent.click(getListButton());

    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(1);
    expect(visibleLinks()).toEqual(["/blog/post-next"]);
  });

  it("6.4 muestra el estado vacío de búsqueda cuando no hay coincidencias", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.change(getSearchInput(), { target: { value: "inexistente" } });

    expect(screen.getByText("blog.search.empty")).toBeTruthy();
    expect(visibleLinks()).toEqual([]);
  });

  it("6.5 el botón de limpiar aparece solo con texto y restaura la lista completa", () => {
    render(<BlogIndex posts={posts} />);

    expect(getClearButton()).toBeNull();

    fireEvent.change(getSearchInput(), { target: { value: "react" } });
    expect(getClearButton()).not.toBeNull();

    fireEvent.click(getClearButton() as HTMLElement);

    expect((getSearchInput() as HTMLInputElement).value).toBe("");
    expect(visibleLinks()).toEqual(["/blog/post-react", "/blog/post-next"]);
    expect(getClearButton()).toBeNull();
  });

  it("6.6 anuncia el número de resultados en una región aria-live solo con búsqueda activa", () => {
    render(<BlogIndex posts={posts} />);

    const region = document.querySelector('[aria-live="polite"]');
    expect(region?.textContent).toBe("");

    fireEvent.change(getSearchInput(), { target: { value: "react" } });
    expect(region?.textContent).toBe("blog.search.resultsCount");
  });

  it("6.7 el JSON-LD ItemList sigue incluyendo la lista completa aunque haya filtro activo", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.change(getSearchInput(), { target: { value: "react" } });

    expect(visibleLinks()).toHaveLength(1);
    const jsonLd = seoProps.last?.structuredDataOverride as {
      itemListElement: { name: string }[];
    };
    expect(jsonLd.itemListElement.map((i) => i.name)).toEqual([
      "Hooks en React",
      "Routing en Next",
    ]);
  });

  it("6.8 el campo y el botón de limpiar son controles nativos enfocables", () => {
    render(<BlogIndex posts={posts} />);

    const input = getSearchInput();
    input.focus();
    expect(document.activeElement).toBe(input);

    fireEvent.change(input, { target: { value: "react" } });
    const clear = getClearButton() as HTMLElement;
    expect(clear.tagName).toBe("BUTTON");
    expect(clear.getAttribute("type")).toBe("button");
    clear.focus();
    expect(document.activeElement).toBe(clear);
  });

  it("6.9 con la búsqueda activa, el selector de vista sigue funcionando", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.change(getSearchInput(), { target: { value: "next" } });
    fireEvent.click(getListButton());

    expect(getListButton().getAttribute("aria-pressed")).toBe("true");
    expect(visibleLinks()).toEqual(["/blog/post-next"]);
  });

  it("6.10 sin posts no muestra el buscador", () => {
    render(<BlogIndex posts={[]} />);

    expect(screen.queryByRole("searchbox")).toBeNull();
  });
});
