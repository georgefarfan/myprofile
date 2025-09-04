import Head from "next/head";
import { useRouter } from "next/router";

type TypeSeo = "website" | "article" | "profile";
type CommonSeo = {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
  type?: TypeSeo;
  url?: string;
};

type ArticleSeo = {
  type: TypeSeo;
  authorName: string;
  publishedTime: string; // ISO
  modifiedTime?: string; // ISO
  tags?: string[];
};

type SeoProps = CommonSeo &
  Partial<ArticleSeo> & {
    structuredDataOverride?: any;
  };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jorge-farfan.vercel.app";
const SITE_NAME = "";
const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.jpg`;

export default function Seo({
  title,
  description,
  image = DEFAULT_IMAGE,
  keywords = [],
  type = "website",
  url,
  authorName = "Jorge Farfan",
  publishedTime,
  modifiedTime,
  tags = [],
  structuredDataOverride,
}: SeoProps) {
  const router = useRouter();
  const currentUrl = url ?? `${SITE_URL}${router.asPath.split("?")[0]}`;
  const locale = router.locale ?? "es";
  const ogLocale = locale === "en" ? "en_US" : "es_ES";
  const alternateLocales = ["es_ES", "en_US"].filter((l) => l !== ogLocale);

  // JSON-LD dinámico
  const jsonLd =
    structuredDataOverride ??
    (type === "article"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: currentUrl,
          headline: title,
          description,
          image,
          author: { "@type": "Person", name: authorName },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/favicon-32x32.png`,
            },
          },
          datePublished: publishedTime,
          ...(modifiedTime ? { dateModified: modifiedTime } : {}),
          ...(tags.length ? { keywords: tags.join(", ") } : {}),
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description,
          inLanguage: locale,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        });

  return (
    <Head>
      {/* Base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={currentUrl} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={ogLocale} />
      {alternateLocales.map((l) => (
        <meta key={l} property="og:locale:alternate" content={l} />
      ))}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link
        rel="alternate"
        hrefLang="es"
        href={`${SITE_URL}${router.asPath.replace(/^\/en/, "")}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${SITE_URL}/en${router.asPath.replace(/^\/en/, "")}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${router.asPath.replace(/^\/en/, "")}`}
      />

      {type === "article" && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags.length > 0 && (
            <meta property="article:tag" content={tags.join(", ")} />
          )}
          <meta property="article:author" content={authorName} />
        </>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
