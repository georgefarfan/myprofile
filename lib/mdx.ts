import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

type PostMeta = {
  title: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  cover?: string;
  published?: boolean;
};

function getDirForLocale(locale?: string) {
  return path.join(BLOG_DIR, locale || "es");
}

export function getPostSlugs(locale?: string) {
  const dir = getDirForLocale(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

export function getPostBySlug(slug: string, locale?: string) {
  const dir = getDirForLocale(locale);
  const full = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;

  const file = fs.readFileSync(full, "utf-8");
  const { data, content } = matter(file);
  return {
    slug,
    meta: (data as PostMeta) || {},
    content,
  };
}

export async function getAllPosts(locale?: string) {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((f) => f.replace(/\.mdx$/, ""))
    .map((slug) => getPostBySlug(slug, locale)!)
    .filter((p) => p?.meta?.published !== false)
    .sort((a, b) => +new Date(b.meta.date || 0) - +new Date(a.meta.date || 0));

  return posts;
}

export async function serializePostContent(mdx: string) {
  return serialize(mdx, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { behavior: "append", properties: { className: ["anchor"] } },
        ],
      ],
    },
  });
}
