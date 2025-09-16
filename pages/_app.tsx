import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { asPath, locale } = router;
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: t("navigation.profile"), href: "/" },
    { name: t("navigation.about"), href: "/#about" },
    { name: t("navigation.companies"), href: "/#companies" },
    { name: t("navigation.blog"), href: "/blog" },
    { name: t("navigation.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  const LangLink = ({ code, label }: { code: "es" | "en"; label: string }) => (
    <Link
      href={asPath}
      locale={code}
      lang={code}
      aria-label={label}
      className={[
        "px-3 py-2 text-sm rounded-md transition-colors",
        locale === code
          ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
          : "text-gray-600 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white",
      ].join(" ")}
    >
      {code.toUpperCase()}
    </Link>
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
    >
      <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded"
        >
          {t("navigation.skipToContent", "Saltar al contenido")}
        </a>

        <header>
          <nav
            className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-[rgba(17,24,39,0.75)]"
            aria-label={t("navigation.mainMenu", "Menú principal")}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-neutral-100">
                    Jorge Farfan Coaguila
                  </h1>

                  <div className="hidden sm:flex sm:space-x-6">
                    {navigation.map((item) => {
                      const isActive = asPath === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={[
                            "inline-flex items-center px-1 pt-1 text-sm font-medium underline-offset-4",
                            isActive
                              ? "text-primary-600 dark:text-primary-400 underline"
                              : "text-gray-600 hover:text-gray-900 hover:underline dark:text-neutral-300 dark:hover:text-white",
                          ].join(" ")}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <LangLink code="es" label="Cambiar idioma a español" />
                  <LangLink code="en" label="Switch language to English" />
                  <ThemeToggle />
                </div>

                <div className="sm:hidden flex items-center gap-2">
                  <LangLink code="es" label="Cambiar idioma a español" />
                  <LangLink code="en" label="Switch language to English" />
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={
                      open
                        ? t("navigation.close", "Cerrar menú")
                        : t("navigation.open", "Abrir menú")
                    }
                    className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[rgb(17,24,39)]"
                  >
                    <span className="sr-only">Toggle menu</span>
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      {open ? (
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      ) : (
                        <path
                          d="M4 7h16M4 12h16M4 17h16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div
              id="mobile-menu"
              className={[
                "sm:hidden border-t border-gray-200 dark:border-neutral-800 transition-[max-height,opacity] duration-200 ease-out overflow-hidden",
                open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
              <div className="px-4 py-3 grid grid-cols-2 gap-3">
                {navigation.map((item) => {
                  const isActive = asPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "block rounded-md px-3 py-3 text-sm text-center underline-offset-4",
                        "bg-white/60 dark:bg-white/5 hover:bg-primary-50 dark:hover:bg-primary-900/20",
                        isActive
                          ? "font-semibold text-primary-700 dark:text-primary-300 underline"
                          : "text-gray-700 dark:text-neutral-200",
                      ].join(" ")}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </header>

        <main
          id="main-content"
          className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6"
        >
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
