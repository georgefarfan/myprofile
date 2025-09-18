import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents, Meta } from "@/components/MDXComponents";
import { getAllPosts, getPostBySlug, serializePostContent } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@/components/SEO";
import Image from "next/image";

type Props = {
  slug: string;
  meta: Meta;
  source: any;
};

export default function BlogPost({ meta, source }: Props) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1)
      router.back();
    else router.push("/blog");
  };

  return (
    <>
      <Seo
        type="article"
        title={meta.title}
        description={meta.excerpt ?? ""}
        image={
          meta.cover ?? "https://jorge-farfan.vercel.app/images/web-posts.jpeg"
        }
        authorName="Jorge Farfan"
        publishedTime={meta.date ?? "2025-09-03T08:00:00.000Z"}
        modifiedTime={new Date().toISOString()}
        tags={meta.tags ?? []}
      />

      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-4 sm:py-10">

        <div className="mb-3 sm:mb-6">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-md px-3 py-3 sm:py-2
                       text-sm font-medium text-primary-600 hover:text-primary-800
                       hover:bg-primary-50 dark:hover:bg-primary-900/20
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={t("back") ?? "Back"}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">{t("back") ?? "Back"}</span>
          </button>
        </div>

        {meta.cover && (
          <div className="mb-6 sm:mb-8">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-[16/9]">
              <Image
                src={meta.cover}
                alt={meta.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
            </div>
          </div>
        )}

        <article
          className={[
            "prose prose-sm dark:prose-invert",
            "sm:prose",
            "lg:prose-lg",
            "prose-img:rounded-lg",
            "prose-pre:rounded-lg",
            "prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-neutral-800",
            "[&_:where(pre,code,table)]:max-w-full",
            "[&_:where(pre,code,table)]:overflow-x-auto",
            "prose-a:no-underline hover:prose-a:underline",
          ].join(" ")}
        >
          <MDXRemote {...source} components={MDXComponents as any} />
        </article>
      </div>
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
  };
};
