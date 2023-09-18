import { RootState } from '@/store/store'
import { Prompt } from '@/types/types'
import { ytMessageDummy } from '@/utils/dummyData'
import { generateAiAnswer } from '@/utils/openai'
import { textToSpeech } from '@/utils/sound'
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

  const Queue = ({ index, queue }: { index: number; queue: Prompt }) => {
    return (
      <div className="px-3 py-0.5 mt-3 hover:brightness-95 rounded border-2 border-primary-black flex justify-between items-start">
        <p className="w-fit">
          <strong>To {queue.author}:</strong> {queue.message}
        </p>
        <IoMdClose
          onClick={() => {
            const newQueue = queues.filter((_, idx) => index !== idx)
            setQueues(newQueue)
          }}
          className="bg-primary-danger p-0.5 text-xl rounded press-sm press-sm-active cursor-pointer  "
        />
      </div>
    )
  }

  const Message = ({ message }: { message: Prompt }) => {
    return (
      <p
        onClick={async () => {
          // const response = await "Hi";
          const response = await generateAiAnswer(
            message,
            avatarName,
            aiRole,
            livestreamTopic,
            mood,
            language,
            aiKnowlagge,
          )
          console.log(response)
          setEditAnswer({
            author: message.author,
            message: response?.body?.content as string,
          })
          // textToSpeech(response.content)
        }}
        className="px-2 py-0.5 rounded border-2 border-primary-black bg-primary-eight hover:brightness-95 transition-all ease-in-out cursor-pointer"
      >
        <strong>{message.author}:</strong> {message.message}
      </p>
    )
  }
  return (
    <>
      <main className="flex justify-between gap-5 grow">
        <section className="grow flex flex-col">
          <p className="text-3xl font-bold">Message</p>
          <div className="mt-3 flex flex-col gap-2 overflow-hidden hover:overflow-y-auto max-h-[81vh]">
            {messages.map((message, index) => {
              return <Message message={message} key={index} />
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
                return <Queue index={index} queue={message} key={index} />
              })}
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
