import { useTranslation } from "next-i18next";
import CompaniesSection from "./CompaniesSection";
import ContactSection from "./ContactSection";
import { AboutSection } from "./AboutSection";
import Link from "next/link";
import Image from "next/image";

export default function ProfileSection() {
  const { t } = useTranslation("common");

  return (
    <div className="px-4 sm:px-0">
      {/* Hero */}
      <section
        className="
          relative min-h-screen flex items-center justify-center overflow-hidden
          bg-gradient-to-br from-gray-50 via-white to-primary-50
          dark:from-[rgb(17,24,39)] dark:via-[rgb(17,24,39)] dark:to-[rgb(31,41,55)]
        "
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1
                  className="
                    text-5xl lg:text-7xl font-bold leading-tight
                    text-gray-900 dark:text-neutral-100
                  "
                >
                  {t("profile.header.title")}
                  <span className="block text-primary-600 dark:text-primary-400">
                    {t("profile.header.subtitle")}
                  </span>
                </h1>

                <p className="text-lg text-gray-600 dark:text-neutral-300 max-w-lg mx-auto lg:mx-0">
                  {t("profile.aboutText")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#contact"
                  className="
                    group relative px-8 py-4
                    bg-primary-600 text-white font-semibold rounded-full overflow-hidden
                    transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-xl
                    dark:bg-primary-500 dark:hover:bg-primary-600
                  "
                >
                  <span className="relative z-10">
                    {t("profile.getInTouch")}
                  </span>
                  <div
                    className="
                      absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      dark:from-primary-500 dark:to-primary-600
                    "
                  />
                </Link>
              </div>
            </div>

            {/* Photo + stats */}
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto lg:ml-auto">
                {/* Bubbles */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 dark:bg-primary-900/30 rounded-full opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-300 dark:bg-primary-800/40 rounded-full opacity-60" />

                {/* Avatar */}
                <div
                  className="
                    relative w-full h-full rounded-full overflow-hidden shadow-2xl
                    ring-1 ring-black/5 dark:ring-white/10
                  "
                >
                  <Image
                    src="/images/profile.jpeg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 320px, 400px"
                  />
                </div>

                {/* Stats cards */}
                <div
                  className="
                    absolute top-8 -left-8 rounded-lg shadow-lg p-4 animate-float
                    bg-white dark:bg-[rgb(31,41,55)] border border-gray-100 dark:border-neutral-800
                  "
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    12+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-neutral-300">
                    {t("profile.yearsExperience")}
                  </div>
                </div>

                <div
                  className="
                    absolute bottom-8 -right-8 rounded-lg shadow-lg p-4 animate-float animation-delay-1000
                    bg-white dark:bg-[rgb(31,41,55)] border border-gray-100 dark:border-neutral-800
                  "
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    10+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-neutral-300">
                    {t("profile.projects")}
                  </div>
                </div>
              </div>
            </div>
            {/* /Photo */}
          </div>
        </div>
      </section>

      {/* Secciones */}
      <section id="about" className="py-20 bg-white dark:bg-[rgb(31,41,55)]">
        <AboutSection />
      </section>

      <section
        id="companies"
        className="py-20 bg-white dark:bg-[rgb(31,41,55)] scroll-mt-24"
      >
        <CompaniesSection />
      </section>

      <section
        id="contact"
        className=" bg-white dark:bg-[rgb(31,41,55)] scroll-mt-24 "
      >
        <ContactSection />
      </section>
    </div>
  );
}
