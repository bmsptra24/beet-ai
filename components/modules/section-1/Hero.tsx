import hero from "@/public/images/hero.svg";

const Hero = () => {
  return (
    <div className="absolute -right-40 bottom-0">
      <img src={hero.src} alt="hero" className="w-[45rem]" />
    </div>
  );
};

export default Hero;
