import { childrenProps } from '@/types/types'

const Section = ({ children, color }: childrenProps) => {
  return (
    <section className={`px-[2rem] md:px-[3rem] lg:px-[10rem] ${color}`}>
      <div className="container mx-auto relative min-h-screen lg:min-h-[720px] flex flex-col justify-center">
        {children}
      </div>
    </section>
  )
}

export default Section
