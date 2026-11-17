import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { BlogPostSummary } from "@/components/blog/types";

const seoProps = vi.hoisted(() => ({
  last: undefined as undefined | { structuredDataOverride?: unknown },
}));

vi.mock("next/router", () => ({
  useRouter: () => ({ locale: "es" }),
}));

vi.mock("next-i18next", () => ({
  // Devuelve la clave: los tests comprueban qué texto se pide, no su traducción.
  useTranslation: () => ({ t: (key: string) => key }),
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

const STORAGE_KEY = "blog-view";

const posts: BlogPostSummary[] = [
  {
    slug: "post-a",
    meta: {
      title: "Post A",
      excerpt: "Excerpt A",
      date: "2026-01-01",
      tags: ["react", "nextjs"],
      cover: "/a.jpg",
    },
  },
  {
    slug: "post-b",
    meta: {
      title: "Post B",
      excerpt: "Excerpt B",
      date: "2026-02-01",
      tags: [],
    },
  },
];

function getCardsButton() {
  return screen.getByRole("button", { name: /blog\.view\.cards/ });
}

function getListButton() {
  return screen.getByRole("button", { name: /blog\.view\.list/ });
}

beforeEach(() => {
  window.localStorage.clear();
  seoProps.last = undefined;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("BlogIndex: selector de vista", () => {
  it("5.1 muestra tarjetas por defecto y marca el control de tarjetas como activo", () => {
    render(<BlogIndex posts={posts} />);

    expect(getCardsButton().getAttribute("aria-pressed")).toBe("true");
    expect(getListButton().getAttribute("aria-pressed")).toBe("false");
    // En la vista de tarjetas hay imagen de portada cuando el post la tiene.
    expect(screen.getByRole("img", { name: "Post A" })).toBeTruthy();
  });

  it("5.2 al seleccionar lista muestra filas sin imagen y actualiza el control", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.click(getListButton());

    expect(getListButton().getAttribute("aria-pressed")).toBe("true");
    expect(getCardsButton().getAttribute("aria-pressed")).toBe("false");
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("5.3 volver a tarjetas restaura la imagen de portada cuando el post la tiene", () => {
    render(<BlogIndex posts={posts} />);

    fireEvent.click(getListButton());
    expect(screen.queryByRole("img")).toBeNull();

    fireEvent.click(getCardsButton());
    expect(getCardsButton().getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("img", { name: "Post A" })).toBeTruthy();
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("5.4 los controles son botones nativos enfocables dentro de un grupo con nombre", () => {
    render(<BlogIndex posts={posts} />);

    const group = screen.getByRole("group", { name: "blog.view.label" });
    const buttons = within(group).getAllByRole("button");
    expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      expect(button.getAttribute("type")).toBe("button");
    }

    // Tab/Enter/Espacio sobre un <button> nativo activan el click; aquí se
    // comprueba el foco y la activación por click que dispara ese mismo evento.
    getListButton().focus();
    expect(document.activeElement).toBe(getListButton());
    fireEvent.click(document.activeElement as HTMLElement);
    expect(getListButton().getAttribute("aria-pressed")).toBe("true");
    expect(document.activeElement).toBe(getListButton());
  });

  it("5.5 aplica la preferencia guardada al montar y muestra la lista", () => {
    window.localStorage.setItem(STORAGE_KEY, "list");

    render(<BlogIndex posts={posts} />);

    expect(getListButton().getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("list")).toBeTruthy();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe("list");
  });

  it("5.5b ignora un valor guardado no válido y usa tarjetas", () => {
    window.localStorage.setItem(STORAGE_KEY, "grid-raro");

    render(<BlogIndex posts={posts} />);

    expect(getCardsButton().getAttribute("aria-pressed")).toBe("true");
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("5.6 si leer localStorage falla, usa la vista por defecto sin fallar", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    expect(() => render(<BlogIndex posts={posts} />)).not.toThrow();
    expect(getCardsButton().getAttribute("aria-pressed")).toBe("true");
  });

  it("5.6b si escribir localStorage falla, el cambio de vista sigue funcionando", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota exceeded");
    });
    render(<BlogIndex posts={posts} />);

    expect(() => fireEvent.click(getListButton())).not.toThrow();
    expect(getListButton().getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("list")).toBeTruthy();
  });

  it("5.7 sin posts muestra blog.posts.noData y no muestra el control", () => {
    render(<BlogIndex posts={[]} />);

    expect(screen.getByText("blog.posts.noData")).toBeTruthy();
    expect(screen.queryByRole("group")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("5.8 ambas vistas enlazan a los mismos URLs y el JSON-LD ItemList no cambia", () => {
    render(<BlogIndex posts={posts} />);

    const cardHrefs = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));

    fireEvent.click(getListButton());
    const listHrefs = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));

    expect(cardHrefs).toEqual(["/blog/post-a", "/blog/post-b"]);
    expect(listHrefs).toEqual(cardHrefs);

    const jsonLd = seoProps.last?.structuredDataOverride as {
      "@type": string;
      itemListElement: { position: number; url: string; name: string }[];
    };
    expect(jsonLd["@type"]).toBe("ItemList");
    expect(jsonLd.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(jsonLd.itemListElement.map((i) => i.name)).toEqual([
      "Post A",
      "Post B",
    ]);
    expect(jsonLd.itemListElement[0].url).toMatch(/\/blog\/post-a$/);
  });

  it("5.9 los textos del control existen con las mismas claves en es y en", () => {
    const load = (locale: string) =>
      JSON.parse(
        readFileSync(
          path.join(process.cwd(), "public/locales", locale, "common.json"),
          "utf8",
        ),
      ) as { blog: { view: Record<string, string> } };

    const es = load("es").blog.view;
    const en = load("en").blog.view;

    expect(Object.keys(es).sort()).toEqual(["cards", "label", "list"]);
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
    for (const key of Object.keys(es)) {
      expect(es[key]).not.toBe("");
      expect(en[key]).not.toBe("");
    }
  });
});
