'use client'
import { Textarea } from '@/components/elements/Input'
import { ytMessageDummy } from '@/utils/dummyData'
import { generateAiAnswer } from '@/utils/openai'
import { prismaFindUniqueProject } from '@/utils/prisma'
import { textToSpeech } from '@/utils/sound'
import React, { useEffect, useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md'
const Control = () => {
  const response = {
    content: 'Halo guys',
  }
  const [editAnswer, setEditAnswer] = useState(response.content)
  const [queue, setQueue] = useState(['hihihi', 'apa iya', 'benarkah itu'])
  // const [editAnswer, setEditAnswer] = useState(" ");
  const [messages, setMessages] = useState(ytMessageDummy)
  // const [messages, setMessages] = useState([{ author: "", message: "" }]);
  const dummyId = 1

  const [livestreamId, setLivestreamId] = useState(' ')
  const [avatarName, setAvatarName] = useState(' ')
  const [aiRole, setAiRole] = useState(' ')
  const [livestreamTopic, setLivestreamTopic] = useState(' ')
  const [mood, setMood] = useState(' ')
  const [platform, setPlatform] = useState(' ')
  const [language, setLanguage] = useState(' ')
  const [aiKnowlagge, setAiKnowlagge] = useState(' ')

  useEffect(() => {
    // (async () => {
    //   setMessages(await ytGetLiveChat("I5vS0buvbwI", 10));
    //   const initState = async () => {
    //     const project = await prismaFindUniqueProject({
    //       where: { id: dummyId },
    //     });
    //     setLivestreamId(project?.livestreamingId || "");
    //     setAvatarName(project?.avatarName || "");
    //     setAiRole(project?.aiRole || "");
    //     setLivestreamTopic(project?.livestreamTopic || "");
    //     setMood(project?.mood || "");
    //     setPlatform(project?.platform || "");
    //     setLanguage(project?.language || "");
    //     setAiKnowlagge(project?.aiKnowlagge || "");
    //   };
    //   initState();
    // })();
  }, [])

  return (
    <main className="flex w-full justify-betwee">
      <section className="flex flex-col w-full py-1 px-3">
        {messages?.map((message, index) => {
          return (
            <p
              key={index}
              className="press-shadow-sm p-1 my-1 press-sm cursor-pointer bg-primary-white"
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
                textToSpeech(response.content)
              }}
            >
              <strong>{`${message.author}:`}</strong>
              {` ${message.message}`}
            </p>
          )
        })}
      </section>
      <section className="flex flex-col w-full py-1 px-3">
        <Textarea
          placeholder="Edit answer"
          setState={setEditAnswer}
          state={editAnswer}
          className={`my-1`}
        />
        <button
          disabled={queue.length >= 5}
          onClick={() => {
            if (editAnswer === '') return
            setEditAnswer('')
            setQueue([...queue, editAnswer])
          }}
          className="press-shadow-sm p-1 mt-1 mb-5 press-sm cursor-pointer bg-green-300"
        >
          Confirm
        </button>
        {queue.map((message, index) => {
          return (
            <p
              key={index}
              className="press-shadow-sm p-1 my-1 press-sm bg-primary-white flex justify-between"
            >
              {message}
              <MdOutlineCancel
                onClick={() => {
                  const newQueue = queue.filter((_, idx) => index !== idx)
                  setQueue(newQueue)
                }}
                className="min-w-[25px] min-h-[25px] mt-[2px] cursor-pointer transition-all ease-in-out text-red-400 hover:text-red-500"
              />
            </p>
          )
        })}
      </section>
    </main>
  )
}

export default Control
