import React from 'react'
import meta from '@/public/images/avatars/meta.png'

const Background = () => {
  return (
    <section className="hidden lg:flex flex-col items-center w-full text-base">
      <div className="flex flex-col items-center p-20 gap-5 z-10">
        <p className="text-3xl text-center">Stream AI is here!</p>
        <p className="text-center">
          Create your own amazing streamer AI with costum emotional, avatar, and
          knowladge you <br /> want. And create unbreakeble story to everybody.
        </p>
        <p className="font-bold underline hover:no-underline cursor-pointer">
          See what&#180;s new
        </p>
      </div>
      <img src={meta.src} alt="hero" className="absolute bottom-0" />
    </section>
  )
}

export default Background
