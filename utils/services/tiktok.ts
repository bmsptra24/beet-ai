// 'use server'
// import { LiveChatMessage } from '@/types/types'
// import { WebcastPushConnection } from 'tiktok-live-connector'
// export const tiktokLiveChat: (
//   livestreamId: string,
// ) => Promise<LiveChatMessage[]> | null = async (livestreamId) => {
//   // Username of someone who is currently live
//   let tiktokUsername = livestreamId

//   // Create a new wrapper object and pass the username
//   let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername)

//   // Connect to the chat (await can be used as well)
//   tiktokLiveConnection
//     .connect()
//     .then((state: any) => {
//       console.info(`Connected to roomId ${state.roomId}`)
//     })
//     .catch((err: any) => {
//       console.error('Failed to connect', err)
//     })

//   // Define the events that you want to handle
//   // In this case we listen to chat messages (comments)
//   tiktokLiveConnection.once('chat', (data: any) => {
//     console.log(
//       `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`,
//     )
//     return data
//   })

//   // And here we receive gifts sent to the streamer
//   tiktokLiveConnection.once('gift', (data: any) => {
//     console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`)
//     return data
//   })

//   return [{ author: '', message: '' }]
// }
