'use server'

// import { setNextPageToken, setPageInfo } from '@/store/actions/youtube.slice'

interface LiveChatMessage {
  author: string
  message: string
}

let nextPageToken = ''

// pageInfo: { totalResults: 62, resultsPerPage: 50 }
let pageInfo: { totalResults: number; resultsPerPage: number }

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getYoutubeVideoDetails = async (apiKey: string, livestreamId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${livestreamId}&key=${apiKey}`
  const data = await fetchData(url)
  // console.log(data.items[0]?.liveStreamingDetails)

  return data.items[0]?.liveStreamingDetails || null
}

const getYoutubeLiveChat = async (
  liveChatId: string,
  apiKey: string,
  maxResult: number,
): Promise<LiveChatMessage[]> => {
  // console.log({ nextPageToken })

  const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&pageToken=${nextPageToken}&order=time&part=snippet&key=${apiKey}&maxResults=${maxResult}`
  const data = await fetchData(url)
  nextPageToken = data?.nextPageToken
  pageInfo = data?.pageInfo
  // console.log({ data })

  return data.items.map((item: any) => ({
    author: item.snippet.authorDisplayName,
    message: item.snippet.displayMessage,
  }))
}

export const ytGetLiveChat = async (
  livestreamId: string,
  maxResult: number,
) => {
  if (pageInfo?.totalResults <= pageInfo?.resultsPerPage) return null

  const apiKey: string = process.env.YT_API_KEY || ''
  console.log('log: get live chat')

  try {
    const detailStream = await getYoutubeVideoDetails(apiKey, livestreamId)

    if (detailStream && detailStream.activeLiveChatId) {
      const chatStream = await getYoutubeLiveChat(
        detailStream.activeLiveChatId,
        apiKey,
        maxResult,
      )

      if (chatStream.length > 0) {
        return chatStream
      }
    } else {
      throw new Error(`detailStream empty (stream not found)`)
    }
    return []
  } catch (error) {
    console.log(error)
    return []
  }
}
