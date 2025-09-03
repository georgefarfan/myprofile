import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllPosts } from "@/lib/mdx";

type Props = {
  posts: { slug: string; meta: any }[];
};

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <main className="max-w-3xl mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <ul className="space-y-6">
          {posts.map(({ slug, meta }) => (
            <li key={slug} className="border-b pb-4">
              <Link href={`/blog/${slug}`} className="text-xl font-semibold">
                {meta.title}
              </Link>
              {meta.excerpt && (
                <p className="text-gray-600 mt-1">{meta.excerpt}</p>
              )}
              {meta.date && (
                <p className="text-sm text-gray-400 mt-1">{meta.date}</p>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = (await getAllPosts(locale)).map((p) => ({
    slug: p.slug,
    meta: p.meta,
  }));

  return { props: { posts }, revalidate: 60 };
};
