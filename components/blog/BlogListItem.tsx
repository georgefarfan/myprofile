import Link from "next/link";
import type { BlogPostSummary } from "./types";

export function BlogListItem({ slug, meta }: BlogPostSummary) {
  return (
    <li>
      <Link
        href={`/blog/${slug}`}
        className="group block py-4 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400">
          {meta.title}
        </h2>

        {meta.excerpt && (
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300 line-clamp-1">
            {meta.excerpt}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {meta.date && (
            <time
              dateTime={meta.date}
              className="text-xs text-gray-400 dark:text-neutral-400"
            >
              {meta.date}
            </time>
          )}
          {Array.isArray(meta.tags) &&
            meta.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-gray-200 dark:border-neutral-700 px-2 py-0.5 text-[11px] text-gray-600 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
        </div>
      </Link>
    </li>
  );
}
