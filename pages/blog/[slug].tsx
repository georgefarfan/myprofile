import Head from "next/head";
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
  meta: any;
  source: any;
};

export default function BlogPost({ meta, source }: Props) {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        {meta.excerpt && <meta name="description" content={meta.excerpt} />}
      </Head>
      <article className="prose dark:prose-invert mx-auto max-w-3xl py-10">
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="inline-flex items-center gap-2 rounded-md px-2 py-1
                 text-sm font-medium text-primary-600 hover:text-primary-800
                 hover:bg-primary-50 dark:hover:bg-primary-900/20"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span>{t("back")}</span>
        </button>

        <MDXRemote {...source} components={MDXComponents as any} />
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
