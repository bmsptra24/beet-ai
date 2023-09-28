'use client'
import { callbackProps } from '@/types/types'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

type buttonProps = {
  text: ReactNode
  className?: string
} & callbackProps

const Button: React.FC<buttonProps> = ({ text, callback, className = '' }) => {
  const router = useRouter()
  return (
    <button
      onClick={() => callback()}
      className={`${className} bg-primary-one rounded press-shadow border border-primary-black transition-all ease-in-out`}
    >
      <p className="text-primary-white text-base">{text}</p>
    </button>
  )
}
export const ButtonSignIn = () => {
  const router = useRouter()
  return (
    <Button
      text="Login"
      callback={() => {
        // const session = await getServerSession(authOptions);
        //! buat logic jika user teraunticated maka dia langsung ke home, jika tidak dia akan login
        router.push('/sign/in')
      }}
      className="bg-primary-one px-3 lg:px-12 py-0.5 rounded text-xl press-shadow border border-primary-black transition-all ease-in-out"
    />
  )
}
export const ButtonSignUp = () => {
  const router = useRouter()
  return (
    <Button
      text="Get Started"
      callback={() => {
        router.push('/sign/up')
      }}
      className="bg-primary-one px-16 py-3 rounded text-xl press-shadow border border-primary-black transition-all ease-in-out"
    />
  )
}

export default Button
