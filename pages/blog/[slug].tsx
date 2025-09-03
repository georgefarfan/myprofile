import Head from "next/head";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/MDXComponents";
import { getAllPosts, getPostBySlug, serializePostContent } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  slug: string;
  meta: {
    title: string;
    excerpt?: string;
    date?: string;
    tags?: string[];
    cover?: string;
  };
  source: any;
};

export default function BlogPost({ meta, source }: Props) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/blog");
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {meta.excerpt && <meta name="description" content={meta.excerpt} />}
        <meta property="og:title" content={meta.title} />
        {meta.excerpt && (
          <meta property="og:description" content={meta.excerpt} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-6 sm:py-10">
        {/* Back */}
        <div className="mb-4 sm:mb-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2
                      text-sm font-medium text-primary-600 hover:text-primary-800
                      hover:bg-primary-50 dark:hover:bg-primary-900/20
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={t("back") ?? "Back"}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">{t("back") ?? "Back"}</span>
          </button>
        </div>

        <header className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-neutral-100">
            {meta.title}
          </h1>

          {(meta.date || (meta.tags && meta.tags.length > 0)) && (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {meta.date && (
                <time
                  dateTime={meta.date}
                  className="text-sm text-gray-500 dark:text-neutral-400"
                >
                  {meta.date}
                </time>
              )}
              {Array.isArray(meta.tags) &&
                meta.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-gray-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-gray-600 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </header>

        <div className="prose dark:prose-invert prose-img:rounded-lg prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-neutral-800">
          <MDXRemote {...source} components={MDXComponents as any} />
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: { params: { slug: string }; locale?: string }[] = [];

  for (const locale of locales || ["es"]) {
    const posts = await getAllPosts(locale);
    posts.forEach((p) => {
      paths.push({ params: { slug: p.slug }, locale });
    });
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = String(params?.slug);
  const post = getPostBySlug(slug, locale);
  if (!post) return { notFound: true };

  const source = await serializePostContent(post.content);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
      slug,
      meta: post.meta,
      source,
    },
    revalidate: 60,
  };
};
