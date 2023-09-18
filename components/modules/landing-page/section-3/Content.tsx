import hero from "@/public/images/avatars/use-mechine.svg";

const Content: React.FC = () => {
  return (
    <div className="h-[720px] flex items-center justify-between gap-10 text-primary-black">
      <div className="flex flex-col gap-4">
        <p className={`font-bold text-5xl`}>
          Connect to <br /> Vtuber Studio
        </p>
        <p className="w-[37rem] leading-relaxed text-xl">
          Beet AI can be connect to Vtuber Studio. So you <br /> can use your
          favorite anime avatar.
        </p>
      </div>
      <img
        src={hero.src}
        alt="hero"
        className="h-[35rem] absolute right-0 bottom-0"
      />
    </div>
  );
};

export default Content;
