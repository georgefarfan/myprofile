import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeToggle } from "@/components/ThemeToggle";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { asPath, locale } = router;

  const navigation = [
    { name: t("navigation.profile"), href: "/" },
    { name: t("navigation.about"), href: "/#about" },
    { name: t("navigation.companies"), href: "/#companies" },
    { name: t("navigation.blog"), href: "/blog" },
    { name: t("navigation.contact"), href: "/#contact" },
  ];

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
            className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 dark:bg-[rgba(17,24,39,0.75)] dark:border-neutral-800"
            aria-label={t("navigation.mainMenu", "Menú principal")}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 gap-4">

                <div className="flex items-center gap-8">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-neutral-100">
                    Jorge Farfan
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

                <div className="flex items-center gap-2">
                  <Link
                    href={asPath}
                    locale="es"
                    lang="es"
                    aria-label="Cambiar idioma a español"
                    className={[
                      "px-3 py-1 text-sm rounded-md transition-colors",
                      locale === "es"
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                        : "text-gray-500 hover:text-gray-700 dark:text-neutral-300 dark:hover:text-white",
                    ].join(" ")}
                  >
                    ES
                  </Link>
                  <Link
                    href={asPath}
                    locale="en"
                    lang="en"
                    aria-label="Switch language to English"
                    className={[
                      "px-3 py-1 text-sm rounded-md transition-colors",
                      locale === "en"
                        ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                        : "text-gray-500 hover:text-gray-700 dark:text-neutral-300 dark:hover:text-white",
                    ].join(" ")}
                  >
                    EN
                  </Link>

                  <ThemeToggle />
                </div>
              </div>
            </div>

            <div className="sm:hidden border-t border-gray-200 dark:border-neutral-800">
              <div className="px-4 py-2 flex flex-wrap gap-4">
                {navigation.map((item) => {
                  const isActive = asPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "text-sm underline-offset-4",
                        isActive
                          ? "text-primary-600 dark:text-primary-400 font-semibold underline"
                          : "text-gray-600 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white",
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
          className="flex-grow max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
        >
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);