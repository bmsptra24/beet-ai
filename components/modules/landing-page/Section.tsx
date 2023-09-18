import { childrenProps } from "@/types/types";

const Section = ({ children, color }: childrenProps) => {
  return (
    <section className={`h-[720px] px-[10rem] ${color}`}>
      <div className="container mx-auto relative">{children}</div>
    </section>
  );
};

export default Section;
