'use client'
import { multipleRef, multipleState } from '@/app/hooks/multipleHook'
import logo from '@/public/logo/logo-white.png'
import observer from '@/utils/observer'
import Link from 'next/link'
import { LegacyRef, Ref, useEffect } from 'react'
import { BsInstagram, BsYoutube, BsTiktok } from 'react-icons/bs'

const Footer = () => {
  const refs = multipleRef(2)
  const [isInViewPorts, setIsInViewPorts] = multipleState(2)

  useEffect(() => {
    observer(refs[0], (value) => setIsInViewPorts(0, value))
    observer(refs[1], (value) => setIsInViewPorts(1, value))
  }, [])
  return (
    <div className="bg-primary-four p-6 px-8 text-primary-white flex items-center justify-between">
      <div
        ref={refs[0] as LegacyRef<HTMLDivElement> | undefined}
        className={`${
          isInViewPorts[0] ? 'animate__animated animate__fadeInUp ' : ''
        }flex items-center gap-6 text-xl`}
      >
        <img
          src={logo.src}
          alt="logo"
          className={`h-9 px-3 cursor-pointer hover:opacity-80 transition-all ease-in-out`}
        />
        <BsInstagram className="cursor-pointer hover:text-slate-300 transition-all ease-in-out" />
        <BsYoutube className="cursor-pointer hover:text-slate-300 transition-all ease-in-out" />
        <BsTiktok className="cursor-pointer hover:text-slate-300 transition-all ease-in-out" />
      </div>
      <Link
        ref={refs[1] as Ref<HTMLAnchorElement> | undefined}
        className={`${
          isInViewPorts[1] ? 'animate__animated animate__fadeInUp ' : ''
        }cursor-pointer hover:text-slate-300 transition-all ease-in-out`}
        href={'https://bmsptra.medium.com/cara-pakai-beet-ai-5bd5a7b38756'}
      >
        Help
      </Link>
    </div>
  )
}

export default Footer
