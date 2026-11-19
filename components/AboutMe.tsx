import { useTranslation } from "next-i18next";

export function AboutMe() {
  const { t } = useTranslation("common");

  const skills = [
    "Angular",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "AWS",
    "Node.js",
    "NestJS",
  ];

  return (
    <div className="mx-auto max-w-6xl px-6" aria-labelledby="about-title">
      <div className="mb-12 text-center">
        <h2
          id="about-title"
          className="mb-4 text-3xl font-semibold tracking-tight text-gray-900 dark:text-neutral-100 sm:text-4xl"
        >
          {t("profile.about")}
        </h2>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-lg leading-relaxed text-gray-600 dark:text-neutral-400">
          {t("profile.aboutMe")}
        </p>
      </div>

      <div className="mt-10">
        <h3 className="sr-only">{t("profile.skills", "Habilidades")}</h3>
        <ul className="flex flex-wrap justify-center gap-2">
          {skills.map((skill) => (
            <li key={skill}>
              <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm font-medium text-gray-700 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-200">
                {skill}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
