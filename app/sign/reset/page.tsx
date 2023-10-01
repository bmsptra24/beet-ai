'use client'
import Background from '@/components/modules/sign/Background'
import { bricolageGrotesque, jost } from '@/styles/fonts'
import { sendResetLink } from '@/utils/authorize'
import { prismaFindUniqueUser } from '@/utils/prisma'
import React, { useRef, useState } from 'react'
import isEmail from 'validator/lib/isEmail'

const page = () => {
  const email = useRef('')
  const [warning, setWarning] = useState('')

  const invalid = (message: string) => {
    setWarning(message)
    throw new Error(message)
  }
  return (
    <main className="min-h-screen justify-center lg:justify-start relative text-xl flex bg-primary-white lg:bg-primary-six">
      <section className="flex items-center bg-primary-white z-10">
        <div className="w-[24rem] h-[19rem] relative flex flex-col justify-between items-center p-8">
          <p
            style={jost.style}
            className="flex justify-center items-center min-h-[5rem] text-2xl font-bold"
          >
            Forgot password
          </p>
          <p className="text-xs text-red-500 absolute top-[100px]">{warning}</p>

          <div className="w-full">
            <p className="text-base mb-2 text-center">
              Please enter your email adddress!
            </p>
            <input
              type="email"
              className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
              placeholder="your email"
              onChange={(e) => {
                email.current = e.target.value
                setWarning('')
              }}
            />
          </div>

          <button
            className="bg-primary-two w-full py-3 rounded-lg press-sm press-sm-active font-bold"
            style={bricolageGrotesque.style}
            onClick={async () => {
              if (!isEmail(email.current)) return invalid('Invalid email!')

              // check is user exist
              const data = await prismaFindUniqueUser({
                where: { email: email.current },
              })
              if (data === null)
                return invalid('User with this email not found!')
              await sendResetLink(email.current)
              alert('Email sent! Check your inbox!')
            }}
          >
            Reset password
          </button>
        </div>
      </section>

      <Background />
    </main>
  )
}

export default page
