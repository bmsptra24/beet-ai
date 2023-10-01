'use client'
import Loading from '@/app/loading'
import Background from '@/components/modules/sign/Background'
import { bricolageGrotesque, jost } from '@/styles/fonts'
import { sendResetLink } from '@/utils/authorize'
import {
  prismaFindUniqueToken,
  prismaFindUniqueUser,
  prismaUpdateUser,
} from '@/utils/prisma'
import md5 from 'md5'
import Error from 'next/error'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import isEmpty from 'validator/lib/isEmpty'

const page = ({ params }: { params: { token: string } }) => {
  const [isTokenValid, setIsTokenValid]: [
    'loading' | 'invalid' | 'valid',
    React.Dispatch<React.SetStateAction<'loading' | 'invalid' | 'valid'>>,
  ] = useState<'loading' | 'invalid' | 'valid'>('loading')
  const [warning, setWarning] = useState('')
  const user: React.MutableRefObject<
    | {
        id: number
        resetPassword: string | null
        userId: number
      }
    | null
    | undefined
  > = useRef()

  const getData = async () => {
    user.current = await prismaFindUniqueToken({
      where: { resetPassword: params.token },
    })
    if (user.current === null) {
      setIsTokenValid('invalid')
      throw 'Invalid token!'
    }
    setIsTokenValid('valid')
  }
  useEffect(() => {
    getData()
  }, [])

  const newPassword = useRef('')
  const confirmPassword = useRef('')

  const invalid = (message: string) => {
    setWarning(message)
    throw message
  }

  const router = useRouter()

  return isTokenValid === 'loading' ? (
    <Loading />
  ) : isTokenValid === 'invalid' ? (
    <Error statusCode={404} title="Page not found!" />
  ) : (
    <main className="min-h-screen justify-center lg:justify-start relative text-xl flex bg-primary-white lg:bg-primary-six">
      <section className="flex items-center bg-primary-white z-10">
        <div className="w-[24rem] h-[20rem] relative flex flex-col justify-between items-center p-8">
          <p
            style={jost.style}
            className="flex justify-center items-center min-h-[5rem] text-2xl font-bold"
          >
            Create new password
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
                if (newPassword.current !== confirmPassword.current)
                  return invalid('Password and confirm password different!')
                await prismaUpdateUser({
                  where: { id: user.current?.userId },
                  data: {
                    password: md5(newPassword.current),
                    Token: { delete: { resetPassword: params.token } },
                  },
                })

                alert('Password success changed!')
                router.push('/sign/in')
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
