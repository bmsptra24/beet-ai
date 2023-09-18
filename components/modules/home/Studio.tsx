import React from 'react'
import { IoMdClose } from 'react-icons/io'
function Studio() {
  const Queue = () => {
    return (
      <div className="px-3 py-0.5 mt-3 hover:brightness-95 rounded border-2 border-primary-black flex justify-between items-start">
        <p className="w-fit">
          <strong>To Anto:</strong> Lorem ipsum dolor sit ame sds dss dsadsa
          dsad aswe dsad at Lorem ipsum dolor sit amet.
        </p>
        <IoMdClose className="bg-primary-danger p-0.5 text-2xl rounded press-sm press-sm-active cursor-pointer mt-2" />
      </div>
    )
  }

  const Message = () => {
    return (
      <p className="px-2 py-0.5 rounded border-2 border-primary-black bg-primary-eight hover:brightness-95 transition-all ease-in-out cursor-pointer">
        <strong>Anto:</strong> Haloo hai hai hia!!
      </p>
    )
  }
  return (
    <>
      <main className="flex justify-between gap-5 grow">
        <section className="grow flex flex-col">
          <p className="text-3xl font-bold">Message</p>
          <div className="mt-3 flex flex-col gap-2 overflow-hidden hover:overflow-y-auto max-h-[81vh]">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
        </section>
        <section className="flex flex-col gap-6 justify-between">
          <article className="flex flex-col">
            <p className="text-3xl font-bold">Review</p>
            <textarea
              className="mt-3 border-2 border-primary-black rounded px-2 py-1 bg-transparent"
              placeholder="edit answer"
              name="review"
              id="review"
              cols={30}
              rows={10}
            ></textarea>
            <button className="mt-2 px-3 py-0.5 bg-primary-success hover:brightness-95 rounded border-2 border-primary-black">
              save change
            </button>
          </article>
          <article className="w-96 flex flex-col grow">
            <p className="text-3xl font-bold">Queue</p>
            <div className="overflow-y-auto max-h-[33vh]">
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
              <Queue />
            </div>
          </article>
        </section>
        <section className="flex flex-col">
          <p className="text-3xl font-bold"></p>
          <button className="mt-3 px-3 py-0.5 bg-primary-danger hover:brightness-95 rounded border-2 border-primary-black">
            Start Livestreaming
          </button>
          <button className="mt-2 px-3 py-0.5 bg-primary-two hover:brightness-95 rounded border-2 border-primary-black">
            Pause Livestreaming
          </button>
        </section>
      </main>
    </>
  )
}

export default Studio
