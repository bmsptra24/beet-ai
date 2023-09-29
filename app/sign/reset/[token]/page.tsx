'use client'
import Background from '@/components/modules/sign/Background'
import { bricolageGrotesque, jost } from '@/styles/fonts'
import { sendResetLink } from '@/utils/authorize'
import { prismaFindUniqueUser, prismaUpdateUser } from '@/utils/prisma'
import React, { useRef, useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'

const page = ({ params }: { params: { token: string } }) => {
  const getData = async () => {
    // const user = await prismaFindUniqueUser({where:{tokenResetPassword: params.token}})
  }

  const [warning, setWarning] = useState('')

  const newPassword = useRef('')
  const confirmPassword = useRef('')

  const invalid = (message: string) => {
    setWarning(message)
    throw new Error(message)
  }
  return (
    <main className="min-h-screen justify-center lg:justify-start relative text-xl flex bg-primary-white lg:bg-primary-six">
      <section className="flex items-center bg-primary-white z-10">
        <div className="w-[24rem] h-[20rem] relative flex flex-col justify-between items-center p-8">
          <p
            style={jost.style}
            className="flex justify-center items-center min-h-[5rem] text-2xl font-bold"
          >
            Forgot password
          </p>
          <p className="text-xs text-red-500 absolute top-[90px]">{warning}</p>

          <div className="w-full flex flex-col gap-3">
            <div className="w-full">
              <input
                type="password"
                className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
                placeholder="new password"
                onChange={(e) => {
                  newPassword.current = e.target.value
                  setWarning('')
                }}
              />
            </div>

            <div className="w-full">
              <input
                type="password"
                className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
                placeholder="confirm password"
                onChange={(e) => {
                  confirmPassword.current = e.target.value
                  setWarning('')
                }}
              />
            </div>

            <button
              className="bg-primary-two w-full py-3 rounded-lg press-sm press-sm-active font-bold"
              style={bricolageGrotesque.style}
              onClick={async () => {
                if (
                  isEmpty(newPassword.current) ||
                  isEmpty(confirmPassword.current)
                )
                  return invalid('Invalid password!')
                // await prismaUpdateUser({where})
                alert('Password success changed!')
              }}
            >
              Reset password
            </button>
          </div>
        </div>
      </section>

      <Background />
    </main>
  )
}

export default page
