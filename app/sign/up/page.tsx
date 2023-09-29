'use client'
import { bricolageGrotesque, delaGothicOne, jost } from '@/styles/fonts'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import googleIcon from '@/public/icons/google.svg'
import { prismaCreateUser } from '@/utils/prisma'
import { signIn } from 'next-auth/react'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import equals from 'validator/lib/equals'
import { sendCode } from '@/utils/authorize'
import meta from '@/public/images/avatars/meta.png'
import md5 from 'md5'
import Background from '@/components/modules/sign/Background'

const page: React.FC = () => {
  const name = useRef('')
  const username = useRef('')
  const email = useRef('')
  const password = useRef('')
  const confirmPassword = useRef('')
  const [warning, setWarning] = useState('')

  const invalid = (message: string) => {
    setWarning(message)
    throw new Error(message)
  }

  const isValid = (
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    if (isEmpty(name, { ignore_whitespace: true }))
      return invalid("Name can't be empty!")
    if (isEmpty(username, { ignore_whitespace: true }))
      return invalid("Username can't be empty!")
    if (isEmpty(email, { ignore_whitespace: true }))
      return invalid("Email can't be empty!")
    if (isEmpty(password, { ignore_whitespace: true }))
      return invalid("Password can't be empty!")
    if (password.length < 7) return invalid('Password must be 8 words long!')
    if (!equals(password, confirmPassword)) return invalid('Invalid Password!')
    if (!isEmail(email)) return invalid('Invalid Email!')
    return true
  }

  const onSubmit = async () => {
    // validation
    if (
      !isValid(
        name.current,
        username.current,
        email.current,
        password.current,
        confirmPassword.current,
      )
    )
      return

    // create user, send code, go to verification page
    try {
      await prismaCreateUser({
        data: {
          name: name.current,
          username: username.current,
          email: email.current,
          password: md5(password.current),
        },
      })
      await sendCode(email.current)
      console.log('Code sended!')
      await signIn('credentials', {
        email: email.current,
        password: md5(password.current),
        redirect: true,
        callbackUrl: '/sign/verification',
      })
      console.log('User signed!')
    } catch (error) {
      throw error
    }
  }

  return (
    <main className="min-h-screen justify-center lg:justify-start relative text-xl flex bg-primary-white lg:bg-primary-six">
      <section className="flex items-center bg-primary-white z-10">
        <div className="w-[24rem] h-[39rem] relative flex flex-col justify-between items-center p-8">
          <p
            style={jost.style}
            className="flex justify-center items-center min-h-[5rem] text-2xl font-bold"
          >
            Create your account!
          </p>
          <p className="text-xs text-red-500 absolute top-[140px]">{warning}</p>
          <input
            type="text"
            className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="your name"
            onChange={(e) => (name.current = e.target.value)}
          />
          <input
            type="text"
            className="border-2 bg-primary-white border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="username"
            onChange={(e) => (username.current = e.target.value)}
          />
          <input
            type="text"
            className="border-2 bg-primary-white border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="email"
            onChange={(e) => (email.current = e.target.value.toLowerCase())}
          />
          <input
            type="password"
            className="border-2 bg-primary-white border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="password"
            onChange={(e) => (password.current = e.target.value)}
          />
          <input
            type="password"
            className="border-2 bg-primary-white border-primary-black py-6 px-3 text-base w-full h-10 rounded-lg"
            placeholder="confirm your password"
            onChange={(e) => (confirmPassword.current = e.target.value)}
          />
          <button
            className="bg-primary-two w-full py-3 rounded-lg press-sm press-sm-active font-bold"
            style={bricolageGrotesque.style}
            onClick={onSubmit}
          >
            Continue
          </button>
          <div className="flex text-sm gap-1">
            <p>Dont have an account?</p>
            <Link href={'/sign/in'} className="underline hover:no-underline">
              Sign In
            </Link>
          </div>
          {/* <div className="flex justify-between items-center gap-2 w-full">
            <hr className="border-slate-400 w-full" />
            <p className="text-base text-slate-400">or</p>
            <hr className="border-slate-400 w-full" />
          </div>
          <button className="flex press-sm press-sm-active rounded-lg w-full p-3 justify-center items-center relative text-base">
            <img
              src={googleIcon.src}
              alt="google-icon"
              className="absolute left-3 w-7"
            />
            <p>Continue with Google</p>
          </button> */}
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

export default page
