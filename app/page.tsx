import Header from "@/components/modules/landing-page/section-1/Header";
import Content1 from "@/components/modules/landing-page/section-1/Content";
import Content2 from "@/components/modules/landing-page/section-2/Content";
import Content3 from "@/components/modules/landing-page/section-3/Content";
import Content4 from "@/components/modules/landing-page/section-4/Content";
import Content5 from "@/components/modules/landing-page/section-5/Content";
import Section from "@/components/modules/landing-page/Section";
import { NextAuthProvider } from "@/app/providers";
import Footer from "@/components/modules/landing-page/Footer";

const Home: React.FC = () => {
  return (
    <>
      <Section color="bg-primary-white">
        <Header />
        <NextAuthProvider>
          <Content1 />
        </NextAuthProvider>
      </Section>
      <Section color="bg-primary-tree">
        <Content2 />
      </Section>
      <Section color="bg-primary-white">
        <Content3 />
      </Section>
      <Footer />
    </>
  );
};
export default Home;
