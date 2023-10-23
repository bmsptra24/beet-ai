'use client'
import { multipleRef, multipleState } from '@/app/hooks/multipleHook'
import hero from '@/public/images/avatars/use-mechine.svg'
import observer from '@/utils/observer'
import { useEffect } from 'react'

const Content: React.FC = () => {
  const refs = multipleRef<HTMLParagraphElement>(2)
  const [isInViewPorts, setIsInViewPorts] = multipleState(2)

  useEffect(() => {
    observer(refs[0], (value) => setIsInViewPorts(0, value))
    observer(refs[1], (value) => setIsInViewPorts(1, value))
  }, [])

  return (
    <div className="flex flex-col justify-evenly gap-10 text-primary-black min-h-screen">
      <div className="flex flex-col gap-4">
        <p
          ref={refs[0]}
          className={`${
            isInViewPorts[0] ? 'animate__animated animate__fadeInLeft' : ''
          } font-bold text-5xl`}
        >
          Connect to <br /> Vtuber Studio
        </p>
        <p
          ref={refs[1]}
          className={`${
            isInViewPorts[0] ? 'animate__animated animate__fadeInLeft' : ''
          } w-fit lg:w-[37rem] leading-relaxed text-xl`}
        >
          Beet AI can be connect to Vtuber Studio. So you{' '}
          <br className="hidden lg:block" /> can use your favorite anime avatar.
        </p>
      </div>
      {/* keep the text in the evenly top */}
      <div className="block lg:hidden"></div>
      <img
        src={hero.src}
        alt="hero"
        className="absolute sm:h-[35rem] md:h-[27rem] lg:h-[30rem] xl:h-[35rem] right-auto lg:right-0 bottom-0"
      />
    </div>
  )
}
export default Content
