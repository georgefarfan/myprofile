import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../components/Layout";
import ProfileSection from "../components/ProfileSection";
import ProfileSEO from "../components/seo/ProfileSEO";

export default function Home() {
  return (
    <>
      <ProfileSEO />
      <Layout>
        <ProfileSection />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});
