import { RootState } from '@/store/store'
import { Prompt } from '@/types/types'
import { generateAiAnswer } from '@/utils/openai'
import React from 'react'
import { useSelector } from 'react-redux'

const Message = ({
  message,
  setEditAnswer,
}: {
  message: Prompt
  setEditAnswer: React.Dispatch<
    React.SetStateAction<{
      author: string
      message: string
    }>
  >
}) => {
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
          message:
            (response?.content as string) ||
            (response?.body?.content as string),
        })
        // textToSpeech(response.content)
      }}
      className="px-2 py-0.5 rounded border-2 border-primary-black bg-primary-eight hover:brightness-95 transition-all ease-in-out cursor-pointer"
    >
      <strong>{message.author}:</strong> {message.message}
    </p>
  )
}

export default Message
