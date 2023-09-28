import { Prompt } from '@/types/types'
import React from 'react'
import { IoMdClose } from 'react-icons/io'

const Queue = ({
  index,
  message,
  queues,
  setQueues,
}: {
  index: number
  message: Prompt
  queues: {
    author: string
    message: string
  }[]
  setQueues: React.Dispatch<
    React.SetStateAction<
      {
        author: string
        message: string
      }[]
    >
  >
}) => {
  return (
    <div className="px-3 py-0.5 mt-3 hover:brightness-95 rounded border-2 border-primary-black flex justify-between items-start">
      <p className="w-fit">
        <strong>To {message.author}:</strong> {message.message}
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

export default Queue
