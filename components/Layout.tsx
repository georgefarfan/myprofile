import { ReactNode } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { asPath, locale } = router;

  const navigation = [
    { name: t("navigation.profile"), href: "/" },
    { name: t("navigation.about", { defaultValue: "About" }), href: "/#about" },
    {
      name: t("navigation.companies", { defaultValue: "Companies" }),
      href: "/#companies",
    },
    {
      name: t("navigation.contact", { defaultValue: "Contact" }),
      href: "/#contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <a href="#main-content" className="skip-link"></a>

      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">Jorge Farfan</h1>

              <div className="hidden sm:flex sm:space-x-6">
                {navigation.map((item) => {
                  const isActive = asPath === item.href;
                  return (
                    <Link
                      key={item.name + item.href}
                      href={item.href}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        isActive
                          ? "text-primary-600 underline underline-offset-4"
                          : "text-gray-600 hover:text-gray-900 hover:underline underline-offset-4"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href={asPath}
                locale="es"
                className={`px-3 py-1 text-sm rounded-md ${
                  locale === "es"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ES
              </Link>
              <Link
                href={asPath}
                locale="en"
                className={`px-3 py-1 text-sm rounded-md ${
                  locale === "en"
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                EN
              </Link>
            </div>
          </div>
        </div>

        <div className="sm:hidden border-t border-gray-200">
          <div className="px-4 py-2 flex flex-wrap gap-4">
            {navigation.map((item) => {
              const isActive = asPath === item.href;
              return (
                <Link
                  key={item.name + item.href}
                  href={item.href}
                  className={`text-sm ${
                    isActive
                      ? "text-primary-600 font-semibold underline underline-offset-4"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main
        id="main-content"
        className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
      >
        {children}
      </main>
    </div>
  );
}
