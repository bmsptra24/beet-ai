import hero from "@/public/images/avatars/all.svg";

const Hero: React.FC = () => {
  return (
    <div className="absolute right-0">
      <img src={hero.src} alt="hero" className="w-[40rem]" />
    </div>
  );
};

export default Hero;
