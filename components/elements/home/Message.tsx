import { RootState } from '@/store/store'
import { Prompt } from '@/types/types'
import { generateAiAnswer } from '@/utils/openai'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {
  message: Prompt
  setEditAnswer: React.Dispatch<
    React.SetStateAction<{
      author: string
      message: string
    }>
  >
  mode: 'auto' | 'semiauto'
}

const Message: React.FC<Props> = ({ message, setEditAnswer, mode }) => {
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

  return (
    <p
      onClick={async () => {
        if (mode === 'auto') return
        // const response = await "Hi";
        console.log('get ai answer')
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
          message:
            (response?.content as string) ||
            (response?.data as string) ||
            (response?.body?.content as string),
        })
        // textToSpeech(response.content)
      }}
      className={`${
        mode === 'auto' ? '' : 'cursor-pointer hover:brightness-95'
      } px-2 py-0.5 rounded border-2 border-primary-black bg-primary-eight transition-all ease-in-out`}
    >
      <strong>{message.author}:</strong> {message.message}
    </p>
  )
}

export default Message
