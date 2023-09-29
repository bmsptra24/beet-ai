'use client'
import { bricolageGrotesque, delaGothicOne, jost } from '@/styles/fonts'
import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'
import googleIcon from '@/public/icons/google.svg'
import { signIn, useSession } from 'next-auth/react'
import isEmail from 'validator/lib/isEmail'
import { prismaFindUniqueUser } from '@/utils/prisma'
import { User } from '@/types/types'
import { useRouter } from 'next/navigation'
import meta from '@/public/images/avatars/meta.png'
import md5 from 'md5'
import Background from '@/components/modules/sign/Background'

const SignIn: React.FC = () => {
  const [input, setInput] = useState({ email: '', password: '' })
  const [warning, setWarning] = useState('')
  const rememberMe = useRef(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    const email = localStorage.getItem('email') || ''
    const password = localStorage.getItem('password') || ''
    setInput({ email, password })
  }, [])

  // useEffect(() => {
  //   if (status === "authenticated") console.log("user authenticated");
  //   if (status === "authenticated") router.push("/home");
  // }, [session]);

  const invalid = (message: string) => {
    setWarning(message)
    throw new Error(message)
  }

  const isValid = async (input: { email: string; password: string }) => {
    if (input.password.length === 0) return invalid('Invalid Password!')
    if (!isEmail(input.email)) return invalid('Invalid Email!')
    const user: User = await prismaFindUniqueUser({
      where: { email: input.email },
    })
    if (!user) return invalid('User not found!')
    if (md5(input.password) !== user.password)
      return invalid('Invalid Password!')
    if (!user.status) return invalid('User not verified!')
    return true
  }

  const onSubmit = async () => {
    if ((await isValid(input)) !== true) throw 'Invalid Input!'

    if (rememberMe.current) {
      // save to local
      localStorage.setItem('email', input.email)
      localStorage.setItem('password', input.password)
    }

    await signIn('credentials', {
      email: input.email,
      password: md5(input.password),
      redirect: true,
      callbackUrl: '/home',
    })
  }
  return (
    <main className="min-h-screen justify-center lg:justify-start relative text-xl flex bg-primary-white lg:bg-primary-six">
      <section className="flex items-center bg-primary-white z-10">
        <div className="w-[24rem] h-[39rem] relative flex flex-col justify-between items-center p-8">
          <p
            style={jost.style}
            className="flex justify-center items-center min-h-[5rem] text-2xl font-bold"
          >
            Welcome Back!
          </p>
          <p className="text-xs text-red-500 absolute top-[100px]">{warning}</p>
          <input
            type="text"
            value={input.email}
            className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="email"
            onChange={(e) => {
              setInput({ ...input, email: e.target.value.toLowerCase() })
              setWarning('')
            }}
          />
          <input
            type="password"
            defaultValue={input.password}
            className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="password"
            onChange={(e) => {
              setInput({ ...input, password: e.target.value })
              setWarning('')
            }}
          />
          <div className="flex justify-between w-full px-2 text-sm">
            <div className="flex gap-1">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="w-4 cursor-pointer"
                onChange={() => (rememberMe.current = !rememberMe.current)}
              />
              <label htmlFor="remember-me" className="cursor-pointer">
                Remember me
              </label>
            </div>
            <Link href="#" className="underline hover:no-underline">
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-primary-two w-full py-3 rounded-lg press-sm press-sm-active font-bold"
            style={bricolageGrotesque.style}
            onClick={onSubmit}
          >
            Continue
          </button>
          <div className="flex text-sm gap-1">
            <p>Dont have an account?</p>
            <Link href={'/sign/up'} className="underline hover:no-underline">
              Sign Up
            </Link>
          </div>
          <div className="flex justify-between items-center gap-2 w-full">
            <hr className="border-slate-400 w-full" />
            <p className="text-base text-slate-400">or</p>
            <hr className="border-slate-400 w-full" />
          </div>
          <button
            onClick={async () => {
              signIn('google', { redirect: true, callbackUrl: '/home' })
            }}
            className="flex press-sm press-sm-active rounded-lg w-full p-3 justify-center items-center relative text-base"
          >
            <img
              src={googleIcon.src}
              alt="google-icon"
              className="absolute left-3 w-7"
            />
            <p>Continue with Google</p>
          </button>
          <p className="text-xs text-center">
            by Continuing, you accept our{' '}
            <Link href={'#'} className="underline hover:no-underline">
              Terms and Conditions, Privacy Policy
            </Link>
          </p>
        </div>
      </section>
      <Background />
    </main>
  )
}

export default SignIn
