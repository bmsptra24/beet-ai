import { ButtonSignUp } from '@/components/elements/Button'
import { delaGothicOne, jost } from '@/styles/fonts'
import Hero from './Hero'

// import { useSession } from "next-auth/react";

const Content = () => {
  // const { data: session } = useSession();
  // console.log({ session });

  return (
    <div className="min-h-full flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-center static gap-5 py-20 lg:py-0 ">
      <section className="flex flex-col justify-center text-primary-black gap-7 lg:w-[25rem]">
        <div className={`${jost.className} font-bold text-5xl lg:text-6xl`}>
          <div className="ring-1 ring-primary-black w-fit">
            <div className="bg-primary-two px-2 press-sm w-fit">
              <p className="text-primary-white leading-none">Beet AI</p>
            </div>
          </div>
          AI Streamer <br /> Generator
        </div>
        <p className="w-fit lg:w-[37rem] leading-relaxed text-xl">
          Create your amazing smart Artificial Inteligent
          <br className="hidden lg:block" /> Streamer with custom personality
        </p>
        <div className="flex gap-7 items-center">
          <ButtonSignUp />
          <i className="bg-primary-white h-8 w-px">&nbsp;</i>
          {/* <button className="text-xl">Open Video</button> */}
        </div>
      </section>
      <Hero />
    </div>
  )
}

export default Content
