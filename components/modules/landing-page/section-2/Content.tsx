import hero from '@/public/images/avatars/sit-on-tv.png'

const Content: React.FC = () => {
  return (
    <div className="h-[720px] flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-10 text-primary-black">
      <div className="flex flex-col gap-4">
        <p className={`font-bold text-5xl`}>
          Support Many <br /> Platforms
        </p>
        <p className="w-fit lg:w-[37rem] leading-relaxed text-xl">
          Beet AI supports various applications such as Youtube, Tiktok, and
          Twitch.
        </p>
      </div>
      <img src={hero.src} alt="hero" className="lg:h-[30rem] " />
    </div>
  )
}

export default Content
