import hero from '@/public/images/avatars/all.svg'

const Hero: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={hero.src} alt="hero" className="md:w-[80%]" />
    </div>
  )
}

export default Hero
