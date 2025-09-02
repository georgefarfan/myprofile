import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any;
}

export default function SEO({
  title = "Mi Perfil - Software Engineer",
  description = "Software Engineer especializado en React, Node.js y tecnologías cloud. Portfolio personal con proyectos, experiencia y artículos sobre desarrollo web.",
  image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face",
  url,
  type = "website",
  keywords = [
    "Software Engineer",
    "react developer",
    "node.js",
    "typescript",
    "next.js",
    "programador",
    "desarrollo web",
    "frontend",
    "backend",
    "javascript",
  ],
  author = "Software Engineer",
  publishedTime,
  modifiedTime,
  structuredData,
}: SEOProps) {
  const router = useRouter();
  const currentUrl = url || `https://miperfil.vercel.app${router.asPath}`;
  const siteName = "Mi Perfil - Software Engineer";

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Software Engineer",
    jobTitle: "Software Engineer",
    description: description,
    url: currentUrl,
    image: image,
    sameAs: [
      "https://github.com/developer",
      "https://linkedin.com/in/developer",
    ],
    knowsAbout: [
      "React",
      "TypeScript",
      "Node.js",
      "Next.js",
      "JavaScript",
      "Web Development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Tech Company",
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@developer" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Mi Perfil" />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Alternate Language Versions */}
      <link
        rel="alternate"
        hrefLang="es"
        href={`https://miperfil.vercel.app${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`https://miperfil.vercel.app/en${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`https://miperfil.vercel.app${router.asPath}`}
      />

      {/* Article specific meta tags */}
      {type === "article" && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          <meta property="article:author" content={author} />
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content={keywords.join(", ")} />
        </>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}
