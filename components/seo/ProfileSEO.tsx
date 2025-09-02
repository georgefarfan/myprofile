import SEO from "./SEO";

export default function ProfileSEO() {
  const profileStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Software Engineer",
    jobTitle: "Software Engineer",
    description:
      "Software Engineer con más de 5 años de experiencia creando aplicaciones web modernas. Especializado en React, Node.js, y tecnologías cloud.",
    url: "https://miperfil.vercel.app",
    image: "https://avatars.githubusercontent.com/u/55858336?v=4",
    sameAs: [
      "https://github.com/developer",
      "https://linkedin.com/in/developer",
    ],
    knowsAbout: [
      "React",
      "TypeScript",
      "Node.js",
      "Next.js",
      "JavaScript",
      "Python",
      "AWS",
      "Web Development",
      "Frontend Development",
      "Backend Development",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Tech Company",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Computer Science",
        educationalLevel: "Bachelor's Degree",
        credentialCategory: "degree",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Web Development Bootcamp",
        educationalLevel: "Certificate",
        credentialCategory: "certificate",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Technology",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "ES",
    },
  };

  return (
    <SEO
      title="Mi Perfil - Software Engineer | Portfolio Personal"
      description="Software Engineer con más de 5 años de experiencia. Especializado en React, Node.js, TypeScript y tecnologías cloud. Portfolio con proyectos, experiencia y habilidades técnicas."
      keywords={[
        "Software Engineer",
        "react developer",
        "node.js developer",
        "typescript",
        "next.js",
        "javascript",
        "programador",
        "desarrollo web",
        "frontend developer",
        "backend developer",
        "portfolio",
        "cv programador",
        "desarrollador web",
        "programador react",
        "desarrollador javascript",
      ]}
      structuredData={profileStructuredData}
    />
  );
}
