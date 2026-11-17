import { GetStaticProps } from "next";
import { getAllPosts } from "@/lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@/components/SEO";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogListItem } from "@/components/blog/BlogListItem";
import { BlogSearch } from "@/components/blog/BlogSearch";
import type { BlogPostSummary } from "@/components/blog/types";
import { filterPostsByKeywords } from "@/lib/blog-search";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";

type Props = {
  posts: BlogPostSummary[];
};

type ViewMode = "cards" | "list";

const VIEW_STORAGE_KEY = "blog-view";

export default function BlogIndex({ posts }: Props) {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
  const [view, setView] = useState<ViewMode>("cards");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(
    () => filterPostsByKeywords(posts, query),
    [posts, query],
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(VIEW_STORAGE_KEY);
      if (saved === "cards" || saved === "list") setView(saved);
    } catch {
      // Sin almacenamiento disponible: se mantiene la vista por defecto.
    }
  }, []);

  const changeView = (next: ViewMode) => {
    setView(next);
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, next);
    } catch {
      // Sin almacenamiento disponible: la elección vale solo para esta carga.
    }
  };

  const viewButtonClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
      active
        ? "bg-primary-600 border-primary-600 text-white"
        : "border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
    }`;

  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jorge-farfan.vercel.app";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}${locale === "en" ? "/en" : ""}/blog/${p.slug}`,
      name: p.meta?.title ?? p.slug,
      ...(p.meta?.date ? { datePublished: p.meta.date } : {}),
    })),
  };

  return (
    <>
      <Seo
        title={t("seo.blogs.title")}
        description={t("seo.blogs.description")}
        image={t("seo.blogs.image")}
        type="website"
        keywords={[
          "blog",
          "frontend",
          "react",
          "nextjs",
          "arquitectura",
          "javascript",
          "ux",
        ]}
        structuredDataOverride={itemListJsonLd}
      />

      <div className="max-w-1xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="sr-only">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400">
            {t("blog.posts.noData")}
          </p>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <BlogSearch
                value={query}
                onChange={setQuery}
                label={t("blog.search.label")}
                placeholder={t("blog.search.placeholder")}
                clearLabel={t("blog.search.clear")}
              />
              <div
                role="group"
                aria-label={t("blog.view.label")}
                className="flex justify-end gap-2"
              >
                <button
                  type="button"
                  aria-pressed={view === "cards"}
                  onClick={() => changeView("cards")}
                  className={viewButtonClass(view === "cards")}
                >
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  {t("blog.view.cards")}
                </button>
                <button
                  type="button"
                  aria-pressed={view === "list"}
                  onClick={() => changeView("list")}
                  className={viewButtonClass(view === "list")}
                >
                  <List className="h-4 w-4" aria-hidden="true" />
                  {t("blog.view.list")}
                </button>
              </div>
            </div>

            <p
              aria-live="polite"
              className="mb-6 text-sm text-gray-500 dark:text-neutral-400"
            >
              {query.trim()
                ? t("blog.search.resultsCount", { count: filteredPosts.length })
                : ""}
            </p>

            {filteredPosts.length === 0 ? (
              <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400">
                {t("blog.search.empty")}
              </p>
            ) : view === "list" ? (
              <ul className="flex flex-col divide-y divide-gray-200 dark:divide-neutral-800 border-y border-gray-200 dark:border-neutral-800">
                {filteredPosts.map((post) => (
                  <BlogListItem key={post.slug} {...post} />
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[420px]">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = (await getAllPosts(locale)).map((p) => ({
    slug: p.slug,
    meta: p.meta,
  }));

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
      posts,
    },
  };
};
