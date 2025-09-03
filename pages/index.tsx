import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileSection from "../components/sections/ProfileSection";
import ProfileSEO from "../components/seo/ProfileSEO";

export default function Home() {
  return (
    <>
      <ProfileSEO />
      <ProfileSection />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
    revalidate: 60,
  };
};
