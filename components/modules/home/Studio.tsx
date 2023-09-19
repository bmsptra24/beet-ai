import Message from '@/components/elements/home/Message'
import Queue from '@/components/elements/home/Queue'
import { RootState } from '@/store/store'
import { Prompt } from '@/types/types'
import { ytMessageDummy } from '@/utils/dummyData'
import { generateAiAnswer } from '@/utils/openai'
import { AudioPlayer, textToSpeech } from '@/utils/sound'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
function Studio() {
  const [messages, setMessages] = useState(ytMessageDummy)
  const [editAnswer, setEditAnswer] = useState({
    author: '',
    message: '',
  })
  const [queues, setQueues] = useState<
    {
      author: string
      message: string
    }[]
  >([])

  const {
    aiKnowlagge,
    aiRole,
    avatarName,
    id,
    language,
    livestreamTopic,
    livestreamingId,
    mood,
    platform,
  } = useSelector((state: RootState) => state.currProject)
  console.log({
    aiKnowlagge,
    aiRole,
    avatarName,
    id,
    language,
    livestreamTopic,
    livestreamingId,
    mood,
    platform,
  })

  return (
    <>
      <main className="flex justify-between gap-5 grow">
        <section className="grow flex flex-col">
          <p className="text-3xl font-bold">Message</p>
          <div className="mt-3 flex flex-col gap-2 overflow-hidden hover:overflow-y-auto max-h-[81vh]">
            {messages.map((message, index) => {
              return (
                <Message
                  setEditAnswer={setEditAnswer}
                  message={message}
                  key={index}
                />
              )
            })}
          </div>
        </section>
        <section className="flex flex-col gap-6 justify-between">
          <article className="flex flex-col">
            <p className="text-3xl font-bold">Review</p>
            <textarea
              className="mt-3 border-2 border-primary-black rounded px-2 py-1 bg-transparent"
              placeholder="edit answer"
              onChange={(event) =>
                setEditAnswer((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
              value={editAnswer.message}
              name="review"
              id="review"
              cols={30}
              rows={10}
            ></textarea>
            <button
              disabled={queues.length >= 5}
              onClick={() => {
                if (editAnswer.message === '') return
                setEditAnswer({ author: '', message: '' })
                setQueues([...queues, editAnswer])
              }}
              className="mt-2 px-3 py-0.5 bg-primary-success hover:brightness-95 rounded border-2 border-primary-black"
            >
              save change
            </button>
          </article>
          <article className="w-96 flex flex-col grow">
            <p className="text-3xl font-bold">Queue</p>
            <div className="overflow-y-auto max-h-[33vh]">
              {queues.map((message, index) => {
                return (
                  <Queue
                    index={index}
                    message={message}
                    key={index}
                    queues={queues}
                    setQueues={setQueues}
                  />
                )
              })}
            </div>
          </article>
        </section>
        <section className="flex flex-col">
          <p className="text-3xl font-bold"></p>
          <button
            onClick={() => {
              textToSpeech('Halo semuanya apa kabar')
            }}
            className="mt-3 px-3 py-0.5 bg-primary-danger hover:brightness-95 rounded border-2 border-primary-black"
          >
            Start Livestreaming
          </button>
          <button className="mt-2 px-3 py-0.5 bg-primary-two hover:brightness-95 rounded border-2 border-primary-black">
            Pause Livestreaming
          </button>
          <AudioPlayer setQueue={setQueues} queues={queues} />
        </section>
      </main>
    </>
  )
}

export default Studio
