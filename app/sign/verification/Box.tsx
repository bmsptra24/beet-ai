import { bricolageGrotesque, jost } from '@/styles/fonts'
import { User } from '@/types/types'
import { prismaFindUniqueUser, prismaUpdateUser } from '@/utils/prisma'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

const Box = () => {
  // ! send email (dont use useEffect)
  // ! verivication the code and go to home
  // ! also go this page if user login and not verificated
  const [warning, setWarning] = useState('')

  const invalid = (message: string) => {
    setWarning(message)
    throw new Error(message)
  }

  const { data: session, status } = useSession()

  const code = useRef(0)
  const email = session?.user?.email?.toLowerCase() || ''
  const router = useRouter()

  const isCodeValid = async () => {
    if (code.current === 0) return invalid('Invalid code!')
    if (code.current.toString().length !== 6)
      return invalid('Code must be 6 number!')
    const data: User = await prismaFindUniqueUser({
      where: { email },
      include: { Verification: true },
    })
    if (!data?.Verification?.[0]?.code) return false
    if (data?.Verification?.[0]?.code !== code.current) return false
    await prismaUpdateUser({ where: { email: email }, data: { status: true } })
    alert('User verificated!')
    return true
  }

  return (
    <section className="flex items-center bg-primary-white z-10">
      <div className="w-[24rem] h-[31rem] relative flex flex-col justify-between items-center p-8">
        <p
          style={jost.style}
          className="flex justify-center items-center min-h-[5rem] text-2xl font-bold"
        >
          Verify your account!
        </p>
        <div className="flex flex-col items-center">
          <p>A verification code has been sent to</p>
          <p className="font-semibold">{email}</p>
        </div>
        <p className="text-xs text-red-500 absolute top-[100px]">{warning}</p>

        <p className="text-base text-center">
          Please check your inbox and enter the verification code below to
          verify your email address.
          {/* The code will expire in 05:00 */}
        </p>
        <input
          type="number"
          className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
          placeholder="code"
          onChange={(e) => (code.current = Number(e.target.value))}
        />

        <button
          className="bg-primary-two w-full py-3 rounded-lg press-sm press-sm-active font-bold"
          style={bricolageGrotesque.style}
          onClick={async () => {
            if (!(await isCodeValid())) throw 'Verification Fail!'
            router.push('/home')
          }}
        >
          Continue
        </button>
        <div className="flex text-sm gap-1">
          <Link href={'/sign/up'} className="underline hover:no-underline">
            Resend code
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Box
