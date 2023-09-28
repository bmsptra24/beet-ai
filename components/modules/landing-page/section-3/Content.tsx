import hero from '@/public/images/avatars/use-mechine.svg'

const Content: React.FC = () => {
  return (
    <div className="flex flex-col justify-evenly gap-10 text-primary-black min-h-screen">
      <div className="flex flex-col gap-4">
        <p className={`font-bold text-5xl`}>
          Connect to <br /> Vtuber Studio
        </p>
        <p className="w-fit lg:w-[37rem] leading-relaxed text-xl">
          Beet AI can be connect to Vtuber Studio. So you{' '}
          <br className="hidden lg:block" /> can use your favorite anime avatar.
        </p>
      </div>
      {/* keep the text in the evenly top */}
      <div className="block lg:hidden"></div>
      <img
        src={hero.src}
        alt="hero"
        className="lg:h-[35rem] absolute right-auto lg:right-0 bottom-0"
      />
    </div>
  )
}
export default Content
