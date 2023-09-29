import Background from '@/components/modules/sign/Background'
import { bricolageGrotesque, jost } from '@/styles/fonts'
import Link from 'next/link'
import React from 'react'

const page = () => {
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

          <div className="w-full">
            <p className="text-base mb-2 text-center">
              Please enter your email adddress!
            </p>
            <input
              type="email"
              className="border-2 border-primary-black bg-primary-white py-6 px-3 text-base w-full h-10 rounded-lg"
              placeholder="your email"
              // onChange={(e) => (code.current = Number(e.target.value))}
            />
          </div>

          <button
            className="bg-primary-two w-full py-3 rounded-lg press-sm press-sm-active font-bold"
            style={bricolageGrotesque.style}
            // onClick={async () => {
            //   if (!(await isCodeValid())) throw 'Verification Fail!'
            //   router.push('/home')
            // }}
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
