import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileSection from "../components/sections/ProfileSection";
import Seo from "@/components/SEO";

export default function Home() {
  return (
    <>
      <Seo
        title="Jorge Farfan — Software Engineer (React, Node.js)"
        description="Portafolio de Jorge Farfan: proyectos, experiencia y artículos sobre React, Node.js y arquitectura frontend."
        image="https://miperfil.vercel.app/images/home.jpeg"
        keywords={[
          "software engineer",
          "react",
          "node.js",
          "next.js",
          "typescript",
        ]}
      ></Seo>
      <ProfileSection />
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
