import Button from "@/components/elements/Button";
import { delaGothicOne } from "@/styles/fonts";
import Hero from "./Hero";

// import { useSession } from "next-auth/react";

const Content = () => {
  // const { data: session } = useSession();
  // console.log({ session });

  return (
    <div className="h-[720px] flex flex-col justify-center text-primary-white gap-10">
      <p className={`${delaGothicOne.className} text-6xl`}>
        IMAGINE A PLACE...
      </p>
      <p className="w-[37rem] leading-relaxed text-xl">
        ...where you can belong to a school club, a gaming group, or a worldwide
        artcommunity. Where just you and a handful or friends can spend time
        together. A place that makes it easy to talk every day and hang out more
        often.
      </p>
      <div className="flex gap-7 items-center">
        <Button
          callback={async () => {
            "use server";
            console.log("hi");
          }}
          text="Get Started"
        />
        <i className="bg-primary-white h-8 w-px">&nbsp;</i>
        <button className="text-xl">Open Video</button>
      </div>
      <Hero />
    </div>
  );
};

export default Content;
