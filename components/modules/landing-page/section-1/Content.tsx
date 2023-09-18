import { ButtonSignUp } from '@/components/elements/Button'
import { delaGothicOne, jost } from '@/styles/fonts'
import Hero from './Hero'

// import { useSession } from "next-auth/react";

const Content = () => {
  // const { data: session } = useSession();
  // console.log({ session });

  return (
    <div className="h-[720px] flex justify-between items-center">
      <section className="flex flex-col justify-center text-primary-black gap-7">
        <p className={`${jost.className} font-bold text-6xl`}>
          <span className="bg-primary-two text-primary-white px-2 leading-relaxed border-2 border-primary-black press-sm">
            Beet AI
          </span>
          <br /> AI Streamer <br /> Generator
        </p>
        <p className="w-[37rem] leading-relaxed text-xl">
          Create your amazing smart Artificial Inteligent <br /> Streamer with
          custom personality
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
