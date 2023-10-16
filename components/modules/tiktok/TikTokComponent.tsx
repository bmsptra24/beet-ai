import { generateAiAnswer } from '@/utils/openai'
import { TikTokIOConnection } from './TikTokIOConnection'
import { CurrProjectProps } from '@/types/types'

let backendUrl = 'https://tiktok-chat-reader.zerody.one/' // or http://localhost:8081/
let connection = new TikTokIOConnection(backendUrl)

export function createConnection(uniqueId: string) {
  if (uniqueId !== '') {
    //   $('#stateText').text('Connecting...')

    connection
      .connect(uniqueId, {
        enableExtendedGiftInfo: true,
      })
      .then((state: any) => {
        // $('#stateText').text(`Connected to roomId ${state.roomId}`)
        console.log(`Connected to roomId ${state.roomId}`)

        // reset stats
        // viewerCount = 0
        // likeCount = 0
        // diamondsCount = 0
        // updateRoomStats()
      })
      .catch((errorMessage: any) => {
        // $('#stateText').text(errorMessage)
        console.log(errorMessage)

        // schedule next try if obs username set
        // if (window.settings.username) {
        //   setTimeout(() => {
        //     connect(window.settings.username)
        //   }, 30000)
        // }
      })
  } else {
    alert('no username entered')
  }
}
// Unhandled Runtime Error
// TypeError: connection.closeConnection is not a function

// Source
// components/modules/tiktok/TikTokComponent.tsx (41:19) @ closeConnection

//   39 |
//   40 | export const closeConnection = async () => {
// > 41 | await connection.closeConnection()
//      |                 ^
//   42 | }
//   43 |
//   44 | export const TikTokComponent = (
// Call Stack
// closeConnection
// components/modules/home/Studio.tsx (69:21)
// Show collapsed frames
export const closeConnection = async () => {
  await connection.closeConnection()
}

export const TikTokComponent = (
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        author: string
        message: string
      }[]
    >
  >,
  setEditAnswer: React.Dispatch<
    React.SetStateAction<{
      author: string
      message: string
    }>
  >,
  {
    avatarName,
    aiRole,
    livestreamTopic,
    mood,
    language,
    aiKnowlagge,
  }: CurrProjectProps,
) => {
  // New chat comment received
  connection.on('chat', async (msg: any) => {
    const chat = { author: msg.uniqueId, message: msg.comment }
    setMessages((prev) => {
      if (prev.length > 20) prev.shift()
      return [...prev, chat]
    })
    const response: string = await generateAiAnswer(
      chat,
      avatarName,
      aiRole,
      livestreamTopic,
      mood,
      language,
      aiKnowlagge,
    )
    setEditAnswer({ author: msg.uniqueId, message: response })
  })
}
