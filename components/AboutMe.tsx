import { useTranslation } from "next-i18next";

export function AboutMe() {
  const { t } = useTranslation("common");

  const skills = [
    { name: "Angular", color: "bg-[#f637e3]" },
    {
      name: "Next.js",
      color: "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900",
    },
    { name: "JavaScript", color: "bg-yellow-400 text-black" },
    { name: "TypeScript", color: "bg-[#3178c6]" },
    { name: "AWS", color: "bg-[#ff9902] text-black" },
    { name: "Node.js", color: "bg-[#417e38]" },
    { name: "NestJS", color: "bg-[#ea2845]" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16" aria-labelledby="about-title">
      <div className="text-center mb-16">
        <h2
          id="about-title"
          className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6"
        >
          {t("profile.about")}
        </h2>
        <div
          className="w-24 h-1 bg-primary-600 mx-auto rounded-full"
          aria-hidden="true"
        ></div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-600 dark:text-neutral-300 leading-relaxed">
          {t("profile.aboutMe")}
        </p>
      </div>

      <div className="mt-10">
        <h3 className="sr-only">{t("profile.skills", "Habilidades")}</h3>
        <ul className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <li key={skill.name}>
              <span
                className={`px-4 py-2 text-sm font-semibold text-white rounded-full shadow ${skill.color}`}
              >
                {skill.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
