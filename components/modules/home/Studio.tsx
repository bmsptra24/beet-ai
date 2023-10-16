import Message from '@/components/elements/home/Message'
import Queue from '@/components/elements/home/Queue'
import { RootState } from '@/store/store'
import { ytMessageDummy } from '@/utils/dummyData'
import { ytGetLiveChat } from '@/utils/services/youtube'
import { AudioPlayer } from '@/utils/sound'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './Header'
import { textToSpeech } from '@/utils/tts'
// import { tiktokLiveChat } from '@/utils/services/tiktok'
import { LiveChatMessage } from '@/types/types'
import axios from 'axios'
import { baseurl } from '@/lib/url'
// import { tiktokLiveChat } from '@/utils/services/tiktok'
import {
  TikTokComponent,
  closeConnection,
  createConnection,
} from '../tiktok/TikTokComponent'
import { ButtonThin } from '@/components/elements/Button'
import { generateAiAnswer } from '@/utils/openai'
type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}
const Studio: React.FC<Props> = ({ setIsMenuOpen }) => {
  const [mode, setMode] = useState<'auto' | 'semiauto'>('auto')
  const [messages, setMessages] = useState<
    {
      author: string
      message: string
    }[]
  >([])
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
  const props = useSelector((state: RootState) => state.currProject)
  // console.log({
  //   aiKnowlagge,
  //   aiRole,
  //   avatarName,
  //   id,
  //   language,
  //   livestreamTopic,
  //   livestreamingId,
  //   mood,
  //   platform,
  // })

  useEffect(() => {
    if (platform === 'tiktok') createConnection(livestreamingId)

    // return () => {
    //   closeConnection()
    // }
  }, [])

  useEffect(() => {
    if (platform === 'youtube') {
      console.log('get chat live')
      const fetchData = async () => {
        const response: LiveChatMessage[] | null = await ytGetLiveChat(
          livestreamingId,
          10,
        )

        if (response === null) return

        setMessages(response)

        response.map(async (msg, index) => {
          const chat = { author: msg.author, message: msg.message }
          console.log('get ai answer')

          const answerGPT = await generateAiAnswer(
            chat,
            avatarName,
            aiRole,
            livestreamTopic,
            mood,
            language,
            aiKnowlagge,
          )
          setQueues([...queues, { author: msg.author, message: answerGPT }])
          console.log('add queue auto')
        })
      }

      const interval = setInterval(fetchData, 10000)

      return () => {
        clearInterval(interval)
      }
    }

    if (platform === 'tiktok') {
      // const fetchData = async () => {
      // console.log(await tiktokLiveChat(livestreamingId))

      // const data: any = await axios.get(
      //   baseurl + '/api/tiktok',
      //   { headers: { Connection: 'keep-alive' } },
      //   // ! error
      // )
      // setMessages((prev) => {
      //   if (prev.length > 10) prev.shift()
      //   return [...prev, { author: data.uniqueId, message: data.comment }]
      // })

      // }
      // fetchData()
      TikTokComponent(setMessages, setQueues, props)
    }
  }, [livestreamingId])

  // useEffect(() => {
  //   if (mode === 'auto') setQueues([...queues, editAnswer])
  // }, [editAnswer])

  console.log({ messages })

  return (
    <>
      <Header setIsMenuOpen={setIsMenuOpen} />
      <main className="flex flex-col lg:flex-row justify-between gap-5 grow">
        <section className="grow flex flex-col">
          <p className="text-3xl font-bold">Message</p>
          <div className="mt-3 flex flex-col gap-2 overflow-y-scroll lg:overflow-hidden lg:hover:overflow-y-auto max-h-[30vh] lg:max-h-[81vh]">
            {messages?.map((message, index) => {
              return (
                <Message
                  setEditAnswer={setEditAnswer}
                  mode={mode}
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
              className={`${
                mode === 'auto' ? 'cursor-not-allowed' : 'cursor-text'
              } mt-3 border-2 border-primary-black rounded px-2 py-1 bg-transparent`}
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
              disabled={mode === 'auto'}
            ></textarea>
            <button
              disabled={queues.length >= 5 || mode === 'auto'}
              onClick={() => {
                if (editAnswer.message === '') return
                setEditAnswer({ author: '', message: '' })
                setQueues([...queues, editAnswer])
              }}
              className={`${
                mode === 'auto' ? 'cursor-not-allowed' : 'cursor-pointer'
              } mt-2 px-3 py-0.5 bg-primary-success hover:brightness-95 rounded border-2 border-primary-black`}
            >
              save change
            </button>
          </article>
          <article className="w-full lg:w-96 flex flex-col grow">
            <p className="text-3xl font-bold">Queue</p>
            <div className="overflow-y-auto max-h-[33vh]">
              {queues?.map((message, index) => {
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
          <ButtonThin
            text="Start Livestreaming"
            className="bg-primary-danger"
            onClick={() => {
              textToSpeech('Halo semuanya apa kabar')
            }}
          />
          <ButtonThin text="Pause Livestreaming" className="bg-primary-two" />
          <ButtonThin
            onClick={() => {
              if (mode === 'auto') setMode('semiauto')
              if (mode === 'semiauto') setMode('auto')
            }}
            text={mode === 'auto' ? 'Mode Auto' : 'Mode Semi Auto'}
            className="bg-primary-tree"
          />
          <AudioPlayer setQueue={setQueues} queues={queues} />
        </section>
      </main>
    </>
  )
}

export default Studio
