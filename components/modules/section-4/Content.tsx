import { delaGothicOne } from "@/styles/fonts";
import hero from "@/public/images/hero.svg";

const Content = () => {
  return (
    <div className="h-[720px] flex items-center justify-center text-primary-black gap-10">
      <div className="flex flex-col gap-10">
        <p className={`${delaGothicOne.className} text-6xl`}>
          IMAGINE A PLACE...
        </p>
        <p className="w-[37rem] leading-relaxed text-xl">
          ...where you can belong to a school club, a gaming group, or a
          worldwide artcommunity. Where just you and a handful or friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
      </div>
      <img src={hero.src} alt="hero" className="w-[45rem]" />
    </div>
  );
};

export default Content;
