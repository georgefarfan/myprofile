import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@/components/SEO";
import { useRouter } from "next/router";

type Props = {
  posts: { slug: string; meta: any }[];
};

export default function BlogIndex({ posts }: Props) {
  const { locale } = useRouter();
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://jorge-farfan.vercel.app";

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `${SITE_URL}${locale === "en" ? "/en" : ""}/blog/${p.slug}`,
      // Opcional si quieres enriquecer:
      name: p.meta?.title ?? p.slug,
      ...(p.meta?.date ? { datePublished: p.meta.date } : {}),
    })),
  };

  return (
    <>
      <Seo
        title="Blog — artículos, notas y tutoriales"
        description="Lee artículos cortos sobre frontend, UX y arquitectura: guías prácticas, ejemplos y notas rápidas."
        image="https://jorge-farfan.vercel.app/images/blogs.jpeg"
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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="sr-only">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400">
            No hay publicaciones todavía.
          </p>
        ) : (
          <ul className="space-y-4 sm:space-y-6">
            {posts.map(({ slug, meta }) => (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className={`
                    block rounded-xl border border-gray-200 dark:border-neutral-800
                    bg-white dark:bg-[rgb(31,41,55)]
                    p-4 sm:p-5
                    transition-all duration-200
                    hover:shadow-md active:scale-[0.99]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
                  `}
                >
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-neutral-100">
                      {meta.title}
                    </h2>

                    {meta.excerpt && (
                      <p className="text-sm sm:text-base text-gray-600 dark:text-neutral-300 line-clamp-3">
                        {meta.excerpt}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {meta.date && (
                        <time
                          dateTime={meta.date}
                          className="text-xs sm:text-sm text-gray-400 dark:text-neutral-400"
                        >
                          {meta.date}
                        </time>
                      )}

                      {Array.isArray(meta.tags) && meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {meta.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full border border-gray-200 dark:border-neutral-700 px-2 py-0.5 text-[11px] sm:text-xs text-gray-600 dark:text-neutral-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
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
    revalidate: 60,
  };
};
