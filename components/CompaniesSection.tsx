import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CompaniesSection() {
  const { t } = useTranslation("common");

  const companies = [
    {
      src: "/images/gft.webp",
      alt: "GFT",
      link: "https://www.gft.com/es/es",
    },

    { src: "/images/mango.jpg", alt: "Mango", link: "https://shop.mango.com/" },
    {
      src: "/images/ebantic.jpeg",
      alt: "Ebantic",
      link: "https://ebantic.com/",
    },
    {
      src: "/images/k-lagan.jpeg",
      alt: "K-Lagan",
      link: "https://www.k-lagan.com/",
    },
    {
      src: "/images/xside.jpeg",
      alt: "XSide",
      link: "https://xsidesolutions.com/",
    },
    {
      src: "/images/synaptic.png",
      alt: "Synaptic",
      link: "https://synaptic.com/",
    },
    {
      src: "/images/globant.webp",
      alt: "Globant",
      link: "https://www.globant.com/",
    },
    {
      src: "/images/globallogic.png",
      alt: "GlobalLogic",
      link: "https://www.globallogic.com/",
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            {t("profile.companies.title")}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
          {companies.map((c) => (
            <Link key={c.alt} href={c.link} target="_blank" className="w-full">
              <div className="mx-auto w-40 sm:w-44 md:w-48">
                <div className="relative h-28 sm:h-32 md:h-36 rounded-xl bg-white p-3 flex items-center justify-center shadow-sm hover:shadow-md transition-all">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, 192px"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
