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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  {t("profile.header.title")}
                  <span className="block text-primary-600">
                    {t("profile.header.subtitle")}
                  </span>
                </h1>

                <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0">
                  {t("profile.aboutText")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#contact"
                  className="group relative px-8 py-4 bg-primary-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative z-10">
                    {t("profile.getInTouch")}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-80 h-80 mx-auto lg:ml-auto">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-300 rounded-full opacity-60"></div>

                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src="/images/profile.jpeg"
                    alt="Profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 320px, 400px"
                  />
                </div>

                <div className="absolute top-8 -left-8 bg-white rounded-lg shadow-lg p-4 animate-float">
                  <div className="text-2xl font-bold text-primary-600">12+</div>
                  <div className="text-sm text-gray-600">
                    {t("profile.yearsExperience")}
                  </div>
                </div>
                <div className="absolute bottom-8 -right-8 bg-white rounded-lg shadow-lg p-4 animate-float animation-delay-1000">
                  <div className="text-2xl font-bold text-primary-600">10+</div>
                  <div className="text-sm text-gray-600">
                    {t("profile.projects")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-20 bg-white">
        <AboutSection />
      </section>
      <section id="companies" className="bg-white scroll-mt-24">
        <CompaniesSection />
      </section>{" "}
      <section id="contact" className=" bg-white scroll-mt-24 pb-10">
        <ContactSection />
      </section>
    </div>
  );
}
