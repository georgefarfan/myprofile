import { useTranslation } from "react-i18next";
import { AboutMe } from "@/components/AboutMe";
import Companies from "@/components/Companies";
import Contact from "@/components/Contact";
import Image from "next/image";
import Link from "next/link";
import Seo from "@/components/SEO";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

export default function Home() {
  const { t, i18n } = useTranslation("common");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized) {
      setReady(true);
    }
  }, [i18n.isInitialized]);

  if (!ready) return null;

  return (
    <>
      <Seo
        title="Jorge Farfan — Software Engineer (React, Node.js)"
        description="Portafolio de Jorge Farfan: proyectos, experiencia y artículos sobre React, Node.js y arquitectura frontend."
        image="https://jorge-farfan.vercel.app/images/web-posts.jpeg"
        keywords={[
          "software engineer",
          "react",
          "node.js",
          "next.js",
          "typescript",
        ]}
      ></Seo>
      <div className="px-4 sm:px-0">
        <section className="relative flex min-h-[80vh] items-center py-20">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 dark:text-neutral-100 sm:text-5xl lg:text-6xl">
                  {t("profile.header.title")}
                  <span className="block text-primary-600 dark:text-primary-400">
                    {t("profile.header.subtitle")}
                  </span>
                </h1>

                <p className="mx-auto max-w-lg text-lg leading-relaxed text-gray-600 dark:text-neutral-400 lg:mx-0">
                  {t("profile.aboutText")}
                </p>
              </div>

              <div className="flex justify-center lg:justify-start">
                <Link
                  href="#contact"
                  className="inline-flex items-center rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-gray-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-offset-[rgb(17,24,39)]"
                >
                  {t("profile.getInTouch")}
                </Link>
              </div>

              <dl className="flex justify-center gap-10 border-t border-gray-200 pt-8 dark:border-neutral-800 lg:justify-start">
                <div>
                  <dt className="sr-only">{t("profile.yearsExperience")}</dt>
                  <dd className="text-3xl font-semibold text-gray-900 dark:text-neutral-100">
                    12+
                  </dd>
                  <dd className="text-sm text-gray-500 dark:text-neutral-400">
                    {t("profile.yearsExperience")}
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">{t("profile.projects")}</dt>
                  <dd className="text-3xl font-semibold text-gray-900 dark:text-neutral-100">
                    10+
                  </dd>
                  <dd className="text-sm text-gray-500 dark:text-neutral-400">
                    {t("profile.projects")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative mx-auto aspect-square w-72 sm:w-80 lg:ml-auto lg:mr-0">
              <div className="relative h-full w-full overflow-hidden rounded-3xl ring-1 ring-black/5 dark:ring-white/10">
                <Image
                  src="/images/profile.jpeg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 320px, 400px"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="scroll-mt-24 border-t border-gray-100 py-20 dark:border-neutral-800"
        >
          <AboutMe />
        </section>

        <section
          id="companies"
          className="scroll-mt-24 border-t border-gray-100 py-20 dark:border-neutral-800"
        >
          <Companies />
        </section>

        <section
          id="contact"
          className="scroll-mt-24 border-t border-gray-100 dark:border-neutral-800"
        >
          <Contact />
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
  };
};
