import Link from "next/link";
import Image from "next/image";
import type { BlogPostSummary } from "./types";

export function BlogCard({ slug, meta }: BlogPostSummary) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={`
            group block rounded-xl border border-gray-200 dark:border-neutral-800
            bg-white dark:bg-[rgb(31,41,55)]
            overflow-hidden
            transition-all duration-200
            hover:shadow-lg hover:-translate-y-1 active:scale-[0.99]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
            h-full flex flex-col
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

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 line-clamp-2">
          {meta.title}
        </h2>

        {meta.excerpt && (
          <p className="text-sm text-gray-600 dark:text-neutral-300 line-clamp-2">
            {meta.excerpt}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2">
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
  );
}
