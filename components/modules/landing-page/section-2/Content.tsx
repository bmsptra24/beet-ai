'use client'
import { multipleRef, multipleState } from '@/app/hooks/multipleHook'
import hero from '@/public/images/avatars/sit-on-tv.png'
import observer from '@/utils/observer'
import 'animate.css'
import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react'

const Content: React.FC = () => {
  const refs = multipleRef<HTMLParagraphElement>(2)
  const [isInViewPorts, setIsInViewPorts] = multipleState(2)

  useEffect(() => {
    observer(refs[0], (value) => setIsInViewPorts(0, value))
    observer(refs[1], (value) => setIsInViewPorts(1, value))
  }, [])

  return (
    <div className="h-[720px] flex flex-col lg:flex-row-reverse items-center justify-center lg:justify-between gap-10 text-primary-black">
      <div className="flex flex-col gap-4">
        <p
          ref={refs[0]}
          className={`${
            isInViewPorts[0] ? 'animate__animated animate__fadeInRight' : ''
          } font-bold text-5xl`}
        >
          Support Many <br /> Platforms
        </p>
        <p
          ref={refs[1]}
          className={`${
            isInViewPorts[1] ? 'animate__animated animate__fadeInRight' : ''
          } w-fit lg:w-[37rem] leading-relaxed text-xl`}
        >
          Beet AI supports various applications such as Youtube, Tiktok, and
          Twitch.
        </p>
      </div>
      <img src={hero.src} alt="hero" className="lg:h-[30rem] " />
    </div>
  )
}

export default Content
