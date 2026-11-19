"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const companies = [
  { src: "/images/gft.webp", alt: "GFT", link: "https://www.gft.com/es/es" },
  { src: "/images/mango.jpg", alt: "Mango", link: "https://shop.mango.com/" },
  { src: "/images/ebantic.jpeg", alt: "Ebantic", link: "https://ebantic.com/" },
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

export default function Companies() {
  const { t } = useTranslation("common");

  // Dos grupos idénticos: la animación desplaza -50% y el bucle es continuo.
  const renderGroup = (copy: "main" | "clone") => (
    <ul
      className="companies-group flex shrink-0 gap-4 pr-4"
      aria-hidden={copy === "clone" ? true : undefined}
    >
      {companies.map((c, idx) => (
        <li key={`${copy}-${c.alt}`} className="shrink-0">
          <Link
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={copy === "clone" ? -1 : undefined}
            aria-label={`${t("profile.companies.visit", { defaultValue: "Visit" })} ${c.alt}`}
            className="block w-40 sm:w-44 md:w-48"
          >
            <div className="relative h-28 sm:h-32 md:h-36 rounded-xl bg-[rgb(var(--card))] p-3 flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none hover:shadow-md transition-shadow">
              <Image
                src={c.src}
                alt={copy === "clone" ? "" : c.alt}
                fill
                className="object-contain"
                priority={copy === "main" && idx < 2}
                sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, 192px"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="bg-[rgb(var(--bg))]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[rgb(var(--fg))]">
            {t("profile.companies.title")}
          </h2>
        </div>
      </div>

      <div className="companies-marquee group overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="companies-track flex w-max group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {renderGroup("main")}
          {renderGroup("clone")}
        </div>
      </div>
    </div>
  );
}
