'use server'
import { NextResponse, NextRequest } from 'next/server'

interface LiveChatMessage {
  author: string
  message: string
}

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
  return data.items[0]?.liveStreamingDetails || null
}

const getYoutubeLiveChat = async (
  liveChatId: string,
  apiKey: string,
  maxResult: number,
): Promise<LiveChatMessage[]> => {
  const url = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet&key=${apiKey}&maxResults=${maxResult}`
  const data = await fetchData(url)
  return data.items.map((item: any) => ({
    author: item.snippet.authorDisplayName,
    message: item.snippet.displayMessage,
  }))
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const livestreamId: string = searchParams.get('livestreamId') || ''
  const maxResult: string = searchParams.get('maxResult') || ''

  const apiKey: string = process.env.YT_API_KEY || ''
  console.log(apiKey)

  try {
    const detailStream = await getYoutubeVideoDetails(apiKey, livestreamId)

    if (detailStream && detailStream.activeLiveChatId) {
      const chatStream = await getYoutubeLiveChat(
        detailStream.activeLiveChatId,
        apiKey,
        Number(maxResult),
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
