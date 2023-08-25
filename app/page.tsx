import Header from "@/components/modules/section-1/Header";
import Content1 from "@/components/modules/section-1/Content";
import Content2 from "@/components/modules/section-2/Content";
import Content3 from "@/components/modules/section-3/Content";
import Content4 from "@/components/modules/section-4/Content";
import Content5 from "@/components/modules/section-5/Content";
import Section from "@/components/modules/Section";
import { NextAuthProvider } from "@/app/providers";

export default function Home() {
  return (
    <>
      <Section color="bg-primary-one">
        <Header />
        <NextAuthProvider>
          <Content1 />
        </NextAuthProvider>
      </Section>
      <Section color="bg-primary-white">
        <Content2 />
      </Section>
      <Section color="bg-primary-four">
        <Content3 />
      </Section>
      <Section color="bg-primary-white">
        <Content4 />
      </Section>
      <Section color="bg-slate-800">
        <Content5 />
      </Section>
    </>
  );
}
