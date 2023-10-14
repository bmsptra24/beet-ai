'use client'
import { Dropdown, Input, Textarea } from '@/components/elements/Input'
import { TestSound } from '@/components/test/TestSound'
import {
  currProjectAction,
  initState,
} from '@/store/actions/currIdProject.slice'
import { RootState } from '@/store/store'
import { generateAiAnswer } from '@/utils/openai'
import { prismaFindManyProjects, prismaUpdateProject } from '@/utils/prisma'
import { ytGetLiveChat } from '@/utils/services/ytGetLiveChat'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Configuration = () => {
  const dispatch = useDispatch()

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

  useEffect(() => {
    // Get data project
    ;(async () => {
      const project = await prismaFindManyProjects({
        where: {
          user: { email: 'admin@prisma.io' },
        },
        orderBy: {
          lastOpenAt: 'desc',
        },
        take: 1,
      })

      // set state
      if (project === null) throw new Error('Project not found!')
      dispatch(initState({ ...project[0] }))
    })()
  }, [])
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

  const {
    setAiKnowlagge,
    setAiRole,
    setAvatarName,
    setLanguage,
    setLivestreamTopic,
    setLivestreamingId,
    setMood,
    setPlatform,
  } = currProjectAction

  const handlerGetChatLive = async (livestreamId: string) => {
    console.log(await ytGetLiveChat(livestreamId, 500))
  }

  const handlerGenerateAnswer = async () => {
    console.log(
      await generateAiAnswer(
        { author: 'Bimbim', message: livestreamingId },
        avatarName,
        aiRole,
        livestreamTopic,
        mood,
        language,
        aiKnowlagge,
      ),
    )
  }

  return (
    <>
      <TestSound />
      <div className="flex grow flex-col gap-5">
        <p className="text-4xl">Configuration</p>
        <div className="flex gap-5">
          <Input
            placeholder="your-livestream-id"
            setState={(event) => dispatch(setLivestreamingId(event))}
            state={livestreamingId}
            className="grow"
          />
          <button
            onClick={() => handlerGetChatLive(livestreamingId)}
            className="flex px-3 bg-primary-white items-center justify-between press-shadow-sm press-sm"
          >
            <p className="grow">Connect</p>
          </button>
          <button
            onClick={() => {
              const text = 'Hai nama kamu siapa ya'

              const synth = window.speechSynthesis

              const utterance = new SpeechSynthesisUtterance(text)

              synth.speak(utterance)
            }}
            className="flex px-3 bg-primary-white items-center justify-between press-shadow-sm press-sm"
          >
            <p className="grow">TEST</p>
          </button>
        </div>
        <Input
          placeholder="Your Cool Avatar Name"
          setState={(event) => dispatch(setAvatarName(event))}
          state={avatarName}
        />
        <Input
          placeholder="your-ai-role"
          setState={(event) => dispatch(setAiRole(event))}
          state={aiRole}
        />
        <Input
          placeholder="your-livestream-topic"
          setState={(event) => dispatch(setLivestreamTopic(event))}
          state={livestreamTopic}
        />

        <Dropdown
          setState={(event) => dispatch(setMood(event))}
          state={mood}
          callback={() =>
            prismaUpdateProject({
              where: { id },
              data: { mood },
            })
          }
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
        </Dropdown>

        <Dropdown
          setState={(event) => dispatch(setPlatform(event))}
          state={platform}
          callback={() =>
            prismaUpdateProject({
              where: { id },
              data: { platform },
            })
          }
        >
          <option value="youtube">Youtube</option>
          <option value="tiktok">Tiktok</option>
        </Dropdown>

        <Dropdown
          setState={(event) => dispatch(setLanguage(event))}
          state={language}
          callback={() =>
            prismaUpdateProject({
              where: { id },
              data: { language },
            })
          }
        >
          <option value="indonesia">Indonesia</option>
          <option value="english">English</option>
        </Dropdown>

        <Textarea
          placeholder="your-ai-knowlage"
          state={aiKnowlagge}
          setState={(event) => dispatch(setAiKnowlagge(event))}
        />
      </div>
      <div>
        <button
          disabled
          onClick={() => handlerGenerateAnswer()}
          className="flex text-3xl bg-primary-white px-3 items-center justify-between press-shadow-sm press-sm"
        >
          <p className="grow">Start AI</p>
        </button>
      </div>
    </>
  )
}

export default Configuration
