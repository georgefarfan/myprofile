import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/lib/mdx";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@/components/SEO";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Image from "next/image";

type Props = {
  posts: { slug: string; meta: any }[];
};

export default function BlogIndex({ posts }: Props) {
  const { locale } = useRouter();
  const { t } = useTranslation("common");
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
        title="t('blogs.title')"
        description="t('blogs.description')"
        image="t('blogs.image')"
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

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="sr-only">Blog</h1>

        {posts.length === 0 ? (
          <p className="text-sm sm:text-base text-gray-500 dark:text-neutral-400">
            {t("blog.posts.noData")}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(({ slug, meta }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className={`
            group block rounded-xl border border-gray-200 dark:border-neutral-800
            bg-white dark:bg-[rgb(31,41,55)]
            overflow-hidden
            transition-all duration-200
            hover:shadow-lg hover:-translate-y-1 active:scale-[0.99]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
          `}
              >
                {meta.cover && (
                  <div className="relative w-full h-40 sm:h-48">
                    <Image
                      src={meta.cover}
                      alt={meta.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                )}

                <div className="flex flex-col h-full p-5 gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {meta.title} 
                  </h2>

                  {meta.excerpt && (
                    <p className="text-sm text-gray-600 dark:text-neutral-300">
                      {meta.excerpt}
                    </p>
                  )}

             
                  <div className="flex flex-wrap items-center gap-2">
                    {meta.date && (
                      <time
                        dateTime={meta.date}
                        className="text-xs text-gray-400 dark:text-neutral-400"
                      >
                        {meta.date}
                      </time>
                    )}
                    {Array.isArray(meta.tags) && meta.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {meta.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-gray-200 dark:border-neutral-700 px-2 py-0.5 text-[11px] text-gray-600 dark:text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
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
