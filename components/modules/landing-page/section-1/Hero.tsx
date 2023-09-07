import hero from "@/public/images/avatars/all.png";

const Hero: React.FC = () => {
  return (
    <div className="absolute -right-40 -bottom-14">
      <img src={hero.src} alt="hero" className="w-[46rem]" />
    </div>
  );
};

export default Hero;
