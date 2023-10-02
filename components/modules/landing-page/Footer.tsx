'use client'
import { multipleRef, multipleState } from '@/app/hooks/multipleHook'
import logo from '@/public/logo/logo-white.png'
import observer from '@/utils/observer'
import { useEffect } from 'react'
import { BsInstagram, BsYoutube, BsTiktok } from 'react-icons/bs'

const Footer = () => {
  const refs = multipleRef<any>(2)
  const [isInViewPorts, setIsInViewPorts] = multipleState(2)

  useEffect(() => {
    observer(refs[0], (value) => setIsInViewPorts(0, value))
    observer(refs[1], (value) => setIsInViewPorts(1, value))
  }, [])
  return (
    <div className="bg-primary-four p-6 px-8 text-primary-white flex items-center justify-between">
      <div
        ref={refs[0]}
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
      <p
        ref={refs[1]}
        className={`${
          isInViewPorts[1] ? 'animate__animated animate__fadeInUp ' : ''
        }cursor-pointer hover:text-slate-300 transition-all ease-in-out`}
      >
        Help
      </p>
    </div>
  )
}

export default Footer
